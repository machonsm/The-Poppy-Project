import assert from "node:assert/strict";

export async function checkEventsScrolling({ send, evaluate, navigate, until, delay }) {
  const screens = [
    { name: "large desktop", width: 2560, height: 1440, mobile: false, cinematic: true },
    { name: "laptop", width: 1440, height: 900, mobile: false, cinematic: true },
    { name: "short laptop", width: 1366, height: 650, mobile: false, cinematic: false },
    { name: "phone", width: 390, height: 844, mobile: true, cinematic: false }
  ];

  for (const screen of screens) {
    await send("Emulation.setDeviceMetricsOverride", { width: screen.width, height: screen.height, deviceScaleFactor: screen.mobile ? 2 : 1, mobile: screen.mobile });
    await send("Emulation.setTouchEmulationEnabled", { enabled: screen.mobile });
    await navigate("/en/");
    await evaluate("Array.from(document.querySelectorAll('.poppy-cookie button')).find(b => b.textContent.includes('Reject'))?.click()");
    await until(() => evaluate("document.querySelectorAll('.pp-event').length > 0"), "Events did not load");
    const metrics = await evaluate("({cinematic:document.querySelector('.pp-site').classList.contains('pp-cinematic'),width:innerWidth,height:innerHeight,count:document.querySelectorAll('.pp-event').length,overflow:document.querySelector('.pp-events__results').scrollHeight > document.querySelector('.pp-events__results').clientHeight})");
    assert.equal(metrics.cinematic, screen.cinematic, `${screen.name}: incorrect smooth-scroll mode`);
    assert(metrics.overflow, `${screen.name}: test requires enough events to overflow`);
    await evaluate("document.querySelector('.pp-events__results').scrollIntoView({block:'center',behavior:'instant'})");
    await delay(250);
    const point = await evaluate("(() => {const r=document.querySelector('.pp-events__results').getBoundingClientRect();return {x:Math.round(r.left+r.width/2),y:Math.round(Math.max(110,r.top)+Math.min(r.height,innerHeight-120)/3)};})()");
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", ...point });
    await send("Input.dispatchMouseEvent", { type: "mouseWheel", ...point, deltaX: 0, deltaY: 240 });
    await delay(600);
    const position = await evaluate("({list:document.querySelector('.pp-events__results').scrollTop,page:scrollY})");
    assert(position.list > 30, `${screen.name}: wheel did not scroll events (${JSON.stringify({metrics,position})})`);

    if (screen.cinematic) {
      await evaluate("const events=document.querySelector('.pp-events__results');events.scrollTop=events.scrollHeight");
      await delay(150);
      const before = await evaluate("scrollY");
      await send("Input.dispatchMouseEvent", { type: "mouseWheel", ...point, deltaX: 0, deltaY: 240 });
      await until(async () => (await evaluate("scrollY")) > before + 30, `${screen.name}: page scrolling was trapped at the end of the list`);
    }

    console.log(`PASS: ${screen.name} wheel scrolling${screen.cinematic ? ' and page handoff at list boundary' : ''}`);

    // Compact navigation remains usable when macOS hides its native scrollbar.
    await evaluate("document.querySelector('.pp-events__results').scrollTop=0");
    await until(() => evaluate("!!document.querySelector('[data-events-scroll=\"down\"]:not(:disabled)')"), "Scroll controls missing");
    await evaluate("document.querySelector('[data-events-scroll=\"down\"]').click()");
    await until(() => evaluate("document.querySelector('.pp-events__results').scrollTop > 30"), "Down control did not scroll");
    await evaluate("document.querySelector('[data-events-expand]').click()");
    await until(() => evaluate("document.querySelector('.pp-events__results').scrollHeight <= document.querySelector('.pp-events__results').clientHeight+1"), "Show all did not reveal the full list");
    await evaluate("document.querySelector('[data-events-expand]').click()");
    await until(() => evaluate("document.querySelector('.pp-events__results').scrollHeight > document.querySelector('.pp-events__results').clientHeight"), "Collapse did not restore compact list");
    console.log(`PASS: ${screen.name} controls and full-list fallback`);
  }
}
