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
    let lastBloomGrowth = -1;
    let bloomVisible = false;
    let bloomTime = 0;
    const hero = root.querySelector<HTMLElement>(".pp-hero");
    const flower = root.querySelector<HTMLElement>(".pp-flower-stage");
    const about = root.querySelector<HTMLElement>(".pp-about");
    const bloomBorder = root.querySelector<HTMLElement>(".pp-bloom-border");
    const blooms = Array.from(root.querySelectorAll<SVGSVGElement>(".pp-bloom-border__plant")).map((plant, index) => {
      const stem = plant.querySelector<SVGPathElement>(".pp-bloom-border__stem")!;
      return {
        stem, head: plant.querySelector<SVGGElement>(".pp-bloom-border__head")!,
        sway: plant.querySelector<SVGGElement>(".pp-bloom-border__sway")!,
        length: stem.getTotalLength(), delay: Number(plant.dataset.bloomDelay), lean: Number(plant.dataset.bloomLean),
        // The reference's seven independent sway tempos, repeated across our denser row.
        frequency: .55 + (index % 7) * .13, phase: index * 1.7,
        motionStrength: 0,
      };
    });
    const portraits = Array.from(root.querySelectorAll<HTMLElement>(".pp-team__portrait"));
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".pp-editorial-card"));
    const collection = root.querySelector<HTMLElement>(".pp-explore__grid");
    const workspace = root.querySelector<HTMLElement>(".pfe-workspace");
    const pins = Array.from(root.querySelectorAll<HTMLElement>(".pfe-pin"));
    const instagramTrack = root.querySelector<HTMLElement>(".pp-instagram__track");
    const marquee = root.querySelector<HTMLElement>(".pp-marquee__track");
    const allowed = () => !reduced.matches && html.dataset.motion !== "off";
    const progress = (element: HTMLElement, end = .4) => {
      const rect = element.getBoundingClientRect();
      return clamp((innerHeight - rect.top) / (innerHeight * (1 - end) + Math.min(rect.height, 400)));
    };

    const paint = () => {
      const cinematic = allowed() && desktop.matches;
      const height = document.documentElement.scrollHeight - innerHeight;
      root.style.setProperty("--page-progress", String(height > 0 ? scrollY / height : 0));
      const travel = Math.min(scrollY, hero?.offsetHeight ?? 900);
      root.style.setProperty("--hero-copy-y", `${cinematic ? -travel * .07 : 0}px`);
      flower?.style.setProperty("--flower-scroll", `${cinematic ? Math.min(travel * .16, 115) : 0}px`);
      root.style.setProperty("--orbit-turn", `${cinematic ? travel * .016 : 0}deg`);
      if (about && bloomBorder) {
        const edge = about.getBoundingClientRect().top;
        const entered = innerHeight - edge;
        const growth = allowed() ? clamp((entered - 24) / Math.min(innerHeight * .42, 380)) : (entered > 24 ? 1 : 0);
        bloomVisible = entered > 24 && edge > 0 && edge - bloomBorder.offsetHeight < innerHeight;
        const fade = growth * growth * (3 - 2 * growth);
        root.style.setProperty("--hero-scene-opacity", String(cinematic ? 1 - fade : 1));
        bloomBorder.style.opacity = entered > 24 ? "1" : "0";
        if (growth !== lastBloomGrowth) blooms.forEach(bloom => {
          const { stem, head, length, delay, lean } = bloom;
          const p = clamp((growth - delay) / (1 - delay));
          const stemGrowth = 1 - Math.pow(1 - p, 2);
          const blossom = clamp((p - .22) / .78);
          const point = stem.getPointAtLength(length * stemGrowth);
          stem.style.strokeDashoffset = String(1 - stemGrowth);
          head.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${lean * (1 - blossom * .75)}) scale(${.22 + .78 * blossom})`);
          head.style.opacity = String(clamp(blossom * 3));
          bloom.motionStrength = blossom * blossom * (3 - 2 * blossom);
        });
        lastBloomGrowth = growth;
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

    const swayBlooms = (delta: number) => {
      if (!bloomVisible || !allowed() || html.dataset.poppyIntro !== "done") return;
      bloomTime += delta / 1000;
      blooms.forEach(({ sway, frequency, phase, motionStrength }) => {
        // Rotate the complete plant around its planted base. The inner head
        // transform stays exclusively owned by the scroll-growth animation.
        const angle = Math.sin(bloomTime * frequency + phase) * 1.6 * motionStrength;
        sway.setAttribute("transform", `rotate(${angle.toFixed(3)} 80 272)`);
      });
    };

    const tick = (time: number) => {
      if (document.hidden) { frame = 0; return; }
      lenis?.raf(time);
      const delta = Math.min(50, time - (previousTime || time - 16.7));
      const velocity = Math.abs(scrollY - previousScroll) / Math.max(delta, 1);
      const targetSpeed = 1 + Math.min(velocity * .65, 2.2);
      speed += (targetSpeed - speed) * (1 - Math.exp(-delta / 180));
      marquee?.getAnimations().forEach(animation => animation.updatePlaybackRate(speed));
      if (dirty || Math.abs(scrollY - previousScroll) > .01) { paint(); dirty = false; }
      swayBlooms(delta);
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
        });
      }
      dirty = true;
      previousTime = 0;
      previousScroll = scrollY;
      paint();
      if (allowed()) frame = requestAnimationFrame(tick);
      else {
        blooms.forEach(({ sway }) => sway.removeAttribute("transform"));
        marquee?.getAnimations().forEach(animation => animation.updatePlaybackRate(1));
      }
    };
    const onScroll = () => { dirty = true; if (!allowed()) paint(); };
    const onResize = () => { dirty = true; };
    const onInstagramWheel = (event: WheelEvent) => {
      if (!instagramTrack || !desktop.matches || !allowed() || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const max = instagramTrack.scrollWidth - instagramTrack.clientWidth;
      if (max <= 0) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 24 : event.deltaMode === 2 ? innerHeight : 1);
      const next = Math.max(0, Math.min(max, instagramTrack.scrollLeft + delta));
      if (Math.abs(next - instagramTrack.scrollLeft) < .5) return;
      event.preventDefault();
      instagramTrack.scrollLeft = next;
    };
    const onVisibility = () => { if (!document.hidden) { previousTime = 0; if (allowed() && !frame) frame = requestAnimationFrame(tick); } };
    const scrollTo = (event: Event) => {
      const target = (event as CustomEvent<HTMLElement>).detail;
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: -(root.querySelector(".pp-header")?.clientHeight ?? 100) - 16 });
      else target.scrollIntoView({ behavior: allowed() ? "smooth" : "instant", block: "start" });
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
        const offset = -(root.querySelector<HTMLElement>(".pp-header")?.clientHeight ?? 100) - 16;
        if (lenis) lenis.scrollTo(target, { offset, immediate: true });
        else window.scrollTo({ top: target.getBoundingClientRect().top + scrollY + offset, behavior: "instant" });
      }));
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    instagramTrack?.addEventListener("wheel", onInstagramWheel, { passive: false });
    window.addEventListener("poppy-scroll-to", scrollTo);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", configure);
    desktop.addEventListener("change", configure);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame); lenis?.destroy(); mutation.disconnect(); resize.disconnect();
      blooms.forEach(({ sway }) => sway.removeAttribute("transform"));
      root.classList.remove("pp-motion-ready", "pp-cinematic");
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize);
      instagramTrack?.removeEventListener("wheel", onInstagramWheel);
      window.removeEventListener("poppy-scroll-to", scrollTo);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", configure); desktop.removeEventListener("change", configure);
    };
  }, [rootRef]);
}
