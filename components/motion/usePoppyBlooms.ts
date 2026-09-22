"use client";

import { useEffect, type RefObject } from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Animate the shared footer flowers independently of the page-level scroll scene. */
export function usePoppyBlooms(footerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const html = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const border = footer.querySelector<HTMLElement>(".pp-bloom-border");
    const anchor = border?.closest<HTMLElement>(".pp-footer__wordmark") ?? border;
    if (!border || !anchor) return;

    const blooms = Array.from(border.querySelectorAll<SVGSVGElement>(".pp-bloom-border__plant")).map((plant, index) => {
      const stem = plant.querySelector<SVGPathElement>(".pp-bloom-border__stem")!;
      return {
        stem,
        head: plant.querySelector<SVGGElement>(".pp-bloom-border__head")!,
        sway: plant.querySelector<SVGGElement>(".pp-bloom-border__sway")!,
        length: stem.getTotalLength(),
        delay: Number(plant.dataset.bloomDelay),
        lean: Number(plant.dataset.bloomLean),
        frequency: .55 + (index % 6) * .13,
        phase: index * 1.7,
        motionStrength: 0,
      };
    });

    let frame = 0;
    let previousTime = 0;
    let bloomTime = 0;
    let visible = false;
    let dirty = true;
    let lastGrowth = -1;
    const allowed = () => !reduced.matches && html.dataset.motion !== "off";

    const paint = () => {
      const bounds = anchor.getBoundingClientRect();
      const entered = innerHeight - bounds.top;
      const distance = Math.min(innerHeight * .42, Math.max(60, bounds.height * .8));
      const growth = allowed() ? clamp((entered - 24) / distance) : (entered > 24 ? 1 : 0);
      visible = entered > 24 && bounds.bottom > 0 && bounds.top < innerHeight;
      border.style.opacity = entered > 24 ? "1" : "0";

      if (growth === lastGrowth) return;
      blooms.forEach(bloom => {
        const p = clamp((growth - bloom.delay) / (1 - bloom.delay));
        const stemGrowth = 1 - Math.pow(1 - p, 2);
        const blossom = clamp((p - .22) / .78);
        const point = bloom.stem.getPointAtLength(bloom.length * stemGrowth);
        bloom.stem.style.strokeDashoffset = String(1 - stemGrowth);
        bloom.head.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${bloom.lean * (1 - blossom * .75)}) scale(${.22 + .78 * blossom})`);
        bloom.head.style.opacity = String(clamp(blossom * 3));
        bloom.motionStrength = blossom * blossom * (3 - 2 * blossom);
      });
      lastGrowth = growth;
    };

    const tick = (time: number) => {
      if (document.hidden) { frame = 0; return; }
      const delta = Math.min(50, time - (previousTime || time - 16.7));
      if (dirty) { paint(); dirty = false; }
      if (visible && allowed() && html.dataset.poppyIntro === "done") {
        bloomTime += delta / 1000;
        blooms.forEach(bloom => {
          const angle = Math.sin(bloomTime * bloom.frequency + bloom.phase) * 1.6 * bloom.motionStrength;
          bloom.sway.setAttribute("transform", `rotate(${angle.toFixed(3)} 80 272)`);
        });
      }
      previousTime = time;
      frame = requestAnimationFrame(tick);
    };

    const configure = () => {
      dirty = true;
      lastGrowth = -1;
      blooms.forEach(bloom => bloom.sway.removeAttribute("transform"));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const markDirty = () => { dirty = true; };
    const resume = () => {
      if (!document.hidden && !frame) {
        previousTime = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const mutation = new MutationObserver(configure);
    mutation.observe(html, { attributes: true, attributeFilter: ["data-motion", "data-poppy-intro"] });
    const resize = new ResizeObserver(markDirty);
    resize.observe(footer);
    window.addEventListener("scroll", markDirty, { passive: true });
    window.addEventListener("resize", markDirty);
    document.addEventListener("visibilitychange", resume);
    reduced.addEventListener("change", configure);
    configure();

    return () => {
      cancelAnimationFrame(frame);
      mutation.disconnect();
      resize.disconnect();
      blooms.forEach(bloom => bloom.sway.removeAttribute("transform"));
      window.removeEventListener("scroll", markDirty);
      window.removeEventListener("resize", markDirty);
      document.removeEventListener("visibilitychange", resume);
      reduced.removeEventListener("change", configure);
    };
  }, [footerRef]);
}
