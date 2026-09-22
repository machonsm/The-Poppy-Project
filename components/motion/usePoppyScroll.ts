"use client";

import { useEffect, type RefObject } from "react";
import Lenis from "lenis";

const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** One clock for smooth scrolling and the editorial scenes. No React renders per frame. */
export function usePoppyScroll(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 901px) and (min-height: 700px) and (pointer: fine)");
    let lenis: Lenis | undefined;
    let disposed = false;
    let frame = 0;
    let previousTime = 0;
    let previousScroll = scrollY;
    let speed = 1;
    let dirty = true;
    const hero = root.querySelector<HTMLElement>(".pp-hero");
    const flower = root.querySelector<HTMLElement>(".pp-flower-stage");
    const about = root.querySelector<HTMLElement>(".pp-about");
    const mapStack = root.querySelector<HTMLElement>(".pp-events-stack");
    const mapSection = mapStack?.querySelector<HTMLElement>(".pp-map");
    const portraits = Array.from(root.querySelectorAll<HTMLElement>(".pp-team__portrait"));
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".pp-editorial-card"));
    const collection = root.querySelector<HTMLElement>(".pp-explore__grid");
    const workspace = root.querySelector<HTMLElement>(".pfe-workspace");
    const pins = Array.from(root.querySelectorAll<HTMLElement>(".pfe-pin"));
    const marquee = root.querySelector<HTMLElement>(".pp-marquee__track");
    const allowed = () => !reduced.matches && html.dataset.motion !== "off";
    const getHeaderHeight = () =>
      root.querySelector<HTMLElement>(".pp-header")?.getBoundingClientRect().height ?? 100;
    const getTargetTop = (target: HTMLElement) => {
      const headerHeight = getHeaderHeight();
      let offset = headerHeight + 16;
      let targetTop = target.getBoundingClientRect().top + window.scrollY;
      if (target.matches(".pp-map") && mapStack) {
        // The map becomes sticky while scrolling. Its parent keeps the map's
        // natural document position, so anchor navigation remains exact.
        targetTop = mapStack.getBoundingClientRect().top + window.scrollY;
      }
      if (target.matches(".pp-contact")) {
        // Contact should meet the sticky header with no glimpse of the olive
        // events section. The one-pixel overlap also avoids subpixel seams.
        offset = Math.max(0, headerHeight - 1);
      }
      if (target.matches(".pp-events-stack > .pp-events")) {
        // Tuck the rounded edge behind the header so the sticky map cannot peek through.
        const radius = parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0;
        offset -= 16 + radius + 2;
      }
      return Math.max(0, targetTop - offset);
    };
    const progress = (element: HTMLElement, end = .4) => {
      const rect = element.getBoundingClientRect();
      return clamp((innerHeight - rect.top) / (innerHeight * (1 - end) + Math.min(rect.height, 400)));
    };

    const paint = () => {
      const cinematic = allowed() && desktop.matches;
      if (mapStack && mapSection) {
        const headerHeight = root.querySelector<HTMLElement>(".pp-header")?.getBoundingClientRect().height ?? 100;
        mapStack.style.setProperty("--map-stack-top", `${Math.min(headerHeight, innerHeight - mapSection.offsetHeight)}px`);
      }
      const height = document.documentElement.scrollHeight - innerHeight;
      root.style.setProperty("--page-progress", String(height > 0 ? scrollY / height : 0));
      const travel = Math.min(scrollY, hero?.offsetHeight ?? 900);
      root.style.setProperty("--hero-copy-y", `${cinematic ? -travel * .07 : 0}px`);
      flower?.style.setProperty("--flower-scroll", `${cinematic ? Math.min(travel * .16, 115) : 0}px`);
      root.style.setProperty("--orbit-turn", `${cinematic ? travel * .016 : 0}deg`);
      if (about) {
        const edge = about.getBoundingClientRect().top;
        const entered = innerHeight - edge;
        const growth = allowed() ? clamp((entered - 24) / Math.min(innerHeight * .42, 380)) : (entered > 24 ? 1 : 0);
        const fade = growth * growth * (3 - 2 * growth);
        root.style.setProperty("--hero-scene-opacity", String(cinematic ? 1 - fade : 1));
      }
      portraits.forEach((portrait, index) => {
        const parent = portrait.closest<HTMLElement>(".pp-team")!;
        const p = progress(parent, .3);
        portrait.style.setProperty("--portrait-y", `${cinematic ? (1 - p) * (index ? 65 : 30) : 0}px`);
        portrait.style.setProperty("--portrait-turn", `${cinematic ? (1 - p) * (index ? 2 : -2) : 0}deg`);
      });
      if (collection) {
        const p = progress(collection, .45);
        cards.forEach((card, index) => {
          card.style.setProperty("--card-turn", `${cinematic ? (1 - p) * (index - 1) * 6 : 0}deg`);
          card.style.setProperty("--card-y", `${cinematic ? (1 - p) * (index === 1 ? 10 : 65) : 0}px`);
        });
      }
      if (workspace) {
        const rect = workspace.getBoundingClientRect();
        const drawDistance = Math.min(innerHeight * .5, Math.max(260, rect.height * .55));
        const p = cinematic ? clamp((innerHeight * .82 - rect.top) / drawDistance) : 1;
        workspace.style.setProperty("--map-draw", String(1 - p));
        pins.forEach((pin, index) => {
          const reveal = clamp((p - index / pins.length * .6) / .4);
          pin.style.setProperty("--pin-reveal", String(cinematic ? reveal : 1));
        });
      }
    };

    const tick = (time: number) => {
      if (document.hidden) { frame = 0; return; }
      // Keep Lenis's clock current even while its animation is paused, so the
      // first frame after handing back control cannot receive a huge delta.
      lenis?.raf(time);
      const delta = Math.min(50, time - (previousTime || time - 16.7));
      const velocity = Math.abs(scrollY - previousScroll) / Math.max(delta, 1);
      const targetSpeed = 1 + Math.min(velocity * .65, 2.2);
      speed += (targetSpeed - speed) * (1 - Math.exp(-delta / 180));
      marquee?.getAnimations().forEach(animation => animation.updatePlaybackRate(speed));
      if (dirty || Math.abs(scrollY - previousScroll) > .01) { paint(); dirty = false; }
      previousTime = time;
      previousScroll = scrollY;
      frame = requestAnimationFrame(tick);
    };

    const configure = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = undefined;
      root.classList.toggle("pp-motion-ready", allowed());
      root.classList.toggle("pp-cinematic", allowed() && desktop.matches);
      if (allowed() && desktop.matches) {
        lenis = new Lenis({ lerp: .1, smoothWheel: true, syncTouch: false,
          anchors: { offset: -(root.querySelector(".pp-header")?.getBoundingClientRect().height ?? 100) - 16 },
          prevent: node => node.hasAttribute("data-lenis-prevent"),
          virtualScroll: ({ event }) => !event.defaultPrevented,
        });
      }
      dirty = true;
      previousTime = 0;
      previousScroll = scrollY;
      paint();
      if (allowed()) frame = requestAnimationFrame(tick);
      else {
        marquee?.getAnimations().forEach(animation => animation.updatePlaybackRate(1));
      }
    };
    const onScroll = () => {
      dirty = true;
      if (!allowed()) paint();
    };
    const onResize = () => { dirty = true; };
    const onVisibility = () => { if (!document.hidden) { previousTime = 0; if (allowed() && !frame) frame = requestAnimationFrame(tick); } };
    const scrollTo = (event: Event) => {
      const target = (event as CustomEvent<HTMLElement>).detail;
      if (!target) return;
      const top = getTargetTop(target);
      if (lenis) lenis.scrollTo(top);
      else window.scrollTo({ top, behavior: allowed() ? "smooth" : "instant" });
    };
    const mutation = new MutationObserver(configure);
    mutation.observe(html, { attributes: true, attributeFilter: ["data-motion"] });
    const resize = new ResizeObserver(onResize);
    resize.observe(root);
    configure();
    // A deep link from another page can land before fonts and the pinned map
    // settle, leaving the previous section visible above the intended one.
    const initialHash = window.location.hash;
    if (initialHash) void document.fonts.ready.then(() => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (disposed || window.location.hash !== initialHash) return;
        let targetId: string;
        try { targetId = decodeURIComponent(initialHash.slice(1)); } catch { return; }
        const target = document.getElementById(targetId);
        if (!target) return;
        const top = getTargetTop(target);
        if (lenis) lenis.scrollTo(top, { immediate: true });
        else window.scrollTo({ top, behavior: "instant" });
      }));
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("poppy-scroll-to", scrollTo);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", configure);
    desktop.addEventListener("change", configure);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame); lenis?.destroy(); mutation.disconnect(); resize.disconnect();
      root.classList.remove("pp-motion-ready", "pp-cinematic");
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize);
      window.removeEventListener("poppy-scroll-to", scrollTo);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", configure); desktop.removeEventListener("change", configure);
    };
  }, [rootRef]);
}
