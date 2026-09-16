import { readFile, writeFile, rename, mkdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const config = JSON.parse(await readFile(new URL("../data/substack-config.json", import.meta.url), "utf8"));
export const publication = new URL(config.url);
const output = new URL("../public/data/substack-posts.json", import.meta.url);

// The public archive used by Substack's own website. No login, token, full
// article bodies, subscriber information or paid content is requested/stored.
// This is not a versioned API; fail closed if its shape changes.
function normalizeCover(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    if (!["substack-post-media.s3.amazonaws.com", "substackcdn.com"].includes(url.hostname)) return null;
    return url.href;
  } catch { return null; }
}

export function normalizePost(post) {
  const url = new URL(post.canonical_url);
  if (url.origin !== publication.origin || !/^\/p\/[^/]+$/.test(url.pathname)) throw new Error("Unexpected post URL");
  if (!Number.isSafeInteger(post.id) || typeof post.title !== "string" || !post.title.trim() || !Number.isFinite(Date.parse(post.post_date))) throw new Error("Invalid archive post");
  return {
    id: String(post.id),
    title: post.title.trim(),
    description: String(post.subtitle || post.description || "").trim().slice(0, 500),
    coverImage: normalizeCover(post.cover_image),
    url: url.href,
    publishedAt: new Date(post.post_date).toISOString()
  };
}

export async function fetchPage(offset) {
  const url = new URL("api/v1/archive", publication);
  url.search = new URLSearchParams({ sort: "new", offset: String(offset), limit: "50" }).toString();
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(25000) });
      if (!response.ok) throw new Error(`Substack archive: HTTP ${response.status}`);
      const page = await response.json();
      if (!Array.isArray(page)) throw new Error("Substack archive is not an array");
      return page;
    } catch (error) {
      if (attempt === 2) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
}

export async function collectArchive(readPage = fetchPage) {
  const posts = new Map();
  let offset = 0;
  for (let pageNumber = 0; pageNumber < 200; pageNumber++) {
    const batch = await readPage(offset);
    if (!Array.isArray(batch)) throw new Error("Invalid archive response");
    if (batch.length === 0) {
      if (posts.size === 0) throw new Error("Empty archive; keeping the previous snapshot");
      return [...posts.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id));
    }
    let added = 0;
    for (const item of batch) {
      const post = normalizePost(item);
      if (!posts.has(post.id)) added++;
      posts.set(post.id, post);
    }
    if (!added) throw new Error("Archive pagination did not advance; keeping the previous snapshot");
    // Substack may return fewer items than the requested limit. Continue until
    // an actual empty page, never assume one short page is the whole archive.
    offset += batch.length;
  }
  throw new Error("Archive exceeded the pagination safety limit");
}

export async function syncArchive() {
  const posts = await collectArchive();
  const snapshot = { version: 1, publication: config, syncedAt: new Date().toISOString(), posts };
  await mkdir(new URL("../public/data/", import.meta.url), { recursive: true });
  const temporary = fileURLToPath(output) + ".tmp";
  await writeFile(temporary, JSON.stringify(snapshot, null, 2) + "\n");
  await rename(temporary, output);
  console.log(`Synced ${posts.length} public Substack posts, newest first. No subscriber data was accessed.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  syncArchive().catch(error => {
    console.error(`Substack sync failed: ${error.message}. The existing snapshot is unchanged.`);
    process.exitCode = 1;
  });
}
