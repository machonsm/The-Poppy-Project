// Browser smoke test against the static export. Uses an isolated profile and
// mocks every external request; no real analytics events or forms are submitted.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const exportRoot = path.resolve(fileURLToPath(new URL("../out/", import.meta.url)));
const browserPath = process.env.PRIVACY_TEST_BROWSER || [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
].find(existsSync);
assert(browserPath, "Set PRIVACY_TEST_BROWSER to a Chromium browser executable");
assert(existsSync(path.join(exportRoot, "polityka-prywatnosci/index.html")), "Run npm run build first");
const profile = await mkdtemp(path.join(tmpdir(), "poppy-privacy-"));
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const filename = path.resolve(exportRoot, `.${pathname.endsWith("/") ? pathname + "index.html" : pathname}`);
    if (!filename.startsWith(exportRoot + path.sep)) throw new Error("Invalid path");
    const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
    response.setHeader("Content-Type", types[path.extname(filename)] || "application/octet-stream");
    response.end(await readFile(filename));
  } catch { response.writeHead(404); response.end(); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = spawn(browserPath, ["--headless=new", "--disable-gpu", "--disable-background-networking", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { windowsHide: true, stdio: "ignore" });
let socket;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(read, message) {
  for (let attempt = 0; attempt < 150; attempt++) {
    try { const result = await read(); if (result) return result; } catch { /* Wait for the browser or page. */ }
    await delay(100);
  }
  throw new Error(message);
}

try {
  const port = await until(async () => (await readFile(path.join(profile, "DevToolsActivePort"), "utf8")).split("\n")[0], "Browser did not start");
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  socket = new WebSocket(targets.find(target => target.type === "page").webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let nextId = 1;
  const pending = new Map();
  const external = [];
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
    pending.set(id, { resolve, reject, timeout });
    socket.send(JSON.stringify({ id, method, params }));
  });
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const task = pending.get(message.id);
      if (!task) return;
      clearTimeout(task.timeout); pending.delete(message.id);
      if (message.error) task.reject(new Error(message.error.message)); else task.resolve(message.result);
    } else if (message.method === "Fetch.requestPaused") {
      const { requestId, request } = message.params;
      if (request.url.startsWith(origin + "/")) send("Fetch.continueRequest", { requestId }).catch(() => {});
      else {
        external.push(request.url);
        send("Fetch.fulfillRequest", { requestId, responseCode: 200, responseHeaders: [{ name: "Content-Type", value: "application/javascript" }], body: "" }).catch(() => {});
      }
    }
  };
  await send("Page.enable");
  await send("Fetch.enable", { patterns: [{ urlPattern: "*", requestStage: "Request" }] });
  const evaluate = async expression => {
    const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const navigate = async pathname => {
    await send("Page.navigate", { url: origin + pathname });
    await until(() => evaluate(`location.pathname === ${JSON.stringify(pathname)} && document.readyState === 'complete' && !!document.querySelector('.poppy-cookie-settings')`), "Page did not load");
    await delay(300);
  };
  const banner = () => evaluate("!!document.querySelector('.poppy-cookie')");
  const analyticsRequests = () => external.filter(url => /googletagmanager|google-analytics|goatcounter|gc\.zgo\.at/.test(url));
  const spotifyRequests = () => external.filter(url => /(?:^https?:\/\/)(?:[^/]+\.)?spotify\.com\//.test(url));

  if (process.env.POPPY_TEST_SCENARIO === "events") {
    const { checkEventsScrolling } = await import("./events-scroll-checks.mjs");
    await checkEventsScrolling({ send, evaluate, navigate, until, delay });
  } else {
  await navigate("/podcast/");
  await until(banner, "Consent banner was not shown before a choice");
  assert.equal(await evaluate("document.querySelectorAll('iframe[src*=\"open.spotify.com\"]').length"), 0, "Spotify loaded before a cookie choice");
  assert.equal(spotifyRequests().length, 0, "Spotify requested before consent");
  assert.equal(analyticsRequests().length, 0, "Our analytics requested before consent");
  await evaluate("localStorage.setItem('poppy-cookie-consent-v3', JSON.stringify({version:'2026-11-06',at:Date.now(),analytics:false,external:true}))");
  await navigate("/podcast/");
  await until(banner, "Previous notice version did not require a new choice");
  assert.equal(await evaluate("document.querySelectorAll('iframe[src*=\"open.spotify.com\"]').length"), 0, "Old newsletter-only consent enabled Spotify");
  assert.equal(spotifyRequests().length, 0, "Old consent caused a Spotify request");
  console.log("PASS: Spotify and analytics blocked before consent; previous notice requires a new choice");
  await navigate("/polityka-prywatnosci/");
  await until(banner, "Consent banner was not shown");
  assert(await evaluate("document.querySelector('main').textContent.includes('Sandra Machoń')"));
  assert.equal(analyticsRequests().length, 0, "Analytics requested before consent");
  await evaluate("Array.from(document.querySelectorAll('.poppy-cookie button')).find(b => b.textContent.includes('Odrzuć')).click()");
  await until(async () => !(await banner()), "Banner did not close after rejection");
  await navigate("/podcast/");
  assert.equal(analyticsRequests().length, 0, "Analytics requested after rejection");
  assert.equal(await evaluate("document.querySelectorAll('iframe[src*=\"open.spotify.com\"]').length"), 0, "Spotify loaded after Reject optional");
  assert.equal(spotifyRequests().length, 0, "Spotify requested after rejection");
  assert(await evaluate("!!document.querySelector('a[href*=\"open.spotify.com/episode/\"]')"), "Direct Spotify link missing after rejection");
  console.log("PASS: refusal persists and blocks Spotify and analytics; direct Spotify links remain");

  await evaluate("document.querySelector('.poppy-cookie-settings').click()");
  await until(banner, "Settings did not reopen");
  await evaluate("Array.from(document.querySelectorAll('.poppy-cookie button')).find(b => b.textContent.includes('Akceptuj')).click()");
  await until(async () => analyticsRequests().length === 2, "Analytics scripts were not activated after acceptance");
  assert(await evaluate("document.querySelectorAll('iframe[src*=\"open.spotify.com\"]').length > 0"), "Spotify is missing after acceptance");
  const commands = await evaluate("window.dataLayer.map(command => Array.from(command))");
  assert(commands.some(command => command[0] === "consent" && command[2]?.ad_storage === "denied"));
  assert(commands.some(command => command[0] === "config" && command[2]?.cookie_expires === 15552000 && command[2]?.allow_google_signals === false));
  const views = commands.filter(command => command[0] === "event" && command[1] === "page_view");
  assert.equal(views.length, 1, "Expected one page view after acceptance");
  console.log("PASS: accept all activates Spotify and analytics, advertising denied, cookie lifetime limited");

  await navigate("/");
  await until(() => evaluate("!!document.querySelector('[data-supascribe-embed-id]') && !!document.querySelector('script[src*=\"js.supascribe.com\"]')"), "Saved external-content consent did not activate newsletter");
  assert.equal(await evaluate("document.querySelectorAll('.pp-substack-signup__fallback').length"), 0, "Extra activation panel is still shown after consent");
  console.log("PASS: saved consent automatically activates newsletter on another page");

  await evaluate("document.cookie='_ga=privacy-test; path=/'; document.querySelector('.poppy-cookie-settings').click()");
  await until(banner, "Settings did not reopen for withdrawal");
  const beforeWithdrawal = analyticsRequests().length;
  await evaluate("Array.from(document.querySelectorAll('.poppy-cookie button')).find(b => b.textContent.includes('Odrzuć')).click()");
  await delay(800);
  await until(() => evaluate("document.readyState === 'complete' && !document.cookie.includes('_ga=') && !window.gtag"), "Withdrawal did not remove cookie and stop scripts");
  assert.equal(analyticsRequests().length, beforeWithdrawal, "Analytics requested during withdrawal reload");
  assert.equal(await evaluate("document.querySelectorAll('[data-supascribe-embed-id]').length"), 0, "Newsletter remained active after withdrawal");
  console.log("PASS: withdrawal deletes accessible GA cookies and stops our analytics and newsletter embed");
  await navigate("/podcast/");
  assert.equal(await evaluate("document.querySelectorAll('iframe[src*=\"open.spotify.com\"]').length"), 0, "Spotify remained active after withdrawal");
  await navigate("/");

  await evaluate("document.querySelector('.poppy-cookie-settings').click()");
  await until(() => evaluate("!!document.querySelector('input[name=\"cookie-external\"]')"), "Category settings did not open");
  assert(await evaluate("!document.querySelector('input[name=\"cookie-external\"]').checked && !document.querySelector('input[name=\"cookie-analytics\"]').checked"), "Rejected categories were preselected");
  await evaluate("document.querySelector('input[name=\"cookie-external\"]').click(); Array.from(document.querySelectorAll('.poppy-cookie button')).find(b => b.textContent.includes('Zapisz')).click()");
  await until(() => evaluate("!!document.querySelector('[data-supascribe-embed-id]')"), "External-only choice did not activate newsletter");
  assert.equal(analyticsRequests().length, beforeWithdrawal, "External-only consent activated analytics");
  await navigate("/podcast/");
  assert(await evaluate("document.querySelectorAll('iframe[src*=\"open.spotify.com\"]').length > 0 && !window.gtag"), "External-only preference was not restored on podcast page");
  console.log("PASS: external-content consent activates Spotify and newsletter without analytics");

  await evaluate("document.querySelector('.poppy-cookie-settings').click()");
  await until(() => evaluate("!!document.querySelector('input[name=\"cookie-analytics\"]')"), "Category settings did not reopen");
  await evaluate("document.querySelector('input[name=\"cookie-external\"]').click(); document.querySelector('input[name=\"cookie-analytics\"]').click(); Array.from(document.querySelectorAll('.poppy-cookie button')).find(b => b.textContent.includes('Zapisz')).click()");
  await until(() => evaluate("document.readyState === 'complete' && !!window.gtag && document.querySelectorAll('iframe[src*=\"open.spotify.com\"]').length === 0"), "Analytics-only choice did not remove Spotify");
  console.log("PASS: analytics-only choice keeps Spotify blocked and revoking external content removes players");

  await evaluate("document.querySelector('.poppy-cookie-settings').click()");
  await until(banner, "Settings did not open for final rejection");
  await evaluate("Array.from(document.querySelectorAll('.poppy-cookie button')).find(b => b.textContent.includes('Odrzuć')).click()");
  await until(() => evaluate("document.readyState === 'complete' && !window.gtag"), "Final rejection did not stop analytics");

  await navigate("/en/privacy-policy/");
  assert(await evaluate("document.querySelector('h1').textContent.includes('Privacy and cookie policy')"));
  assert(await evaluate("!!document.querySelector('footer a[href=\"/en/privacy-policy/\"]')"));
  await evaluate("document.querySelector('.poppy-cookie-settings').click()");
  await until(() => evaluate("Array.from(document.querySelectorAll('.poppy-cookie button')).some(b => b.textContent.includes('Reject'))"), "English cookie settings missing");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  assert(await evaluate("Array.from(document.querySelectorAll('.poppy-cookie button')).every(b => { const r=b.getBoundingClientRect(); return r.width > 0 && r.right <= innerWidth && r.bottom <= innerHeight; })"), "Consent buttons not visible on mobile");
  console.log("PASS: English policy/footer/settings and mobile consent actions");
  await evaluate("Array.from(document.querySelectorAll('.poppy-cookie button')).find(b => b.textContent.includes('Reject')).click()");
  await navigate("/en/podcast/");
  assert.equal(await evaluate("document.querySelectorAll('iframe[src*=\"open.spotify.com\"]').length"), 0, "English podcast loaded Spotify after rejection");
  await evaluate("document.querySelector('.poppy-cookie-settings').click()");
  await until(banner, "English settings did not open");
  await evaluate("Array.from(document.querySelectorAll('.poppy-cookie button')).find(b => b.textContent.includes('Accept')).click()");
  await until(() => evaluate("document.querySelectorAll('iframe[src*=\"open.spotify.com\"]').length > 0"), "English acceptance did not activate Spotify");
  await evaluate("document.querySelector('.poppy-cookie-settings').click()");
  await until(banner, "English settings did not reopen");
  await evaluate("Array.from(document.querySelectorAll('.poppy-cookie button')).find(b => b.textContent.includes('Reject')).click()");
  await until(() => evaluate("document.readyState === 'complete' && !window.gtag && document.querySelectorAll('iframe[src*=\"open.spotify.com\"]').length === 0"), "English withdrawal did not remove Spotify");
  console.log("PASS: English rejection, acceptance and withdrawal control Spotify");

  await navigate("/");
  assert(await evaluate("!!document.querySelector('#zglos-firme a[href*=\"polityka-prywatnosci\"]') && !document.querySelector('#zglos-firme input[name=\"consent\"]')"));
  assert(await evaluate("!!document.querySelector('input[name=\"privacy_notice_version\"][value=\"2026-11-06.1\"]')"));
  assert.equal(await evaluate("document.querySelectorAll('[data-supascribe-embed-id], script[src*=\"js.supascribe.com\"]').length"), 0, "Newsletter embed loaded despite remembered refusal");
  console.log("PASS: company notice/version and newsletter privacy gate");
  }
} finally {
  socket?.close();
  browser.kill();
  await new Promise(resolve => server.close(resolve));
  await delay(500);
  // Only remove the isolated, validated temporary browser profile created above.
  const temporaryRoot = path.resolve(tmpdir()) + path.sep;
  if (path.resolve(profile).startsWith(temporaryRoot) && path.basename(profile).startsWith("poppy-privacy-")) {
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  }
}
