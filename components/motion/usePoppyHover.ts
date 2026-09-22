"use client";

import { useEffect, type RefObject } from "react";

/** Paired petals flutter independently while the flower itself stays still. */
export function usePoppyHover(markRef: RefObject<HTMLDivElement | null>, continuous = false) {
  useEffect(() => {
    const mark = markRef.current;
    if (!mark) return;

    const html = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const bounds = mark.getBoundingClientRect();
    let visible = bounds.bottom > 0 && bounds.top < innerHeight && bounds.right > 0 && bounds.left < innerWidth;
    let hovered = mark.matches(":hover");
    let focused = mark.matches(":focus-visible");
    let disposed = false;
    let generation = 0;
    let phase: "idle" | "wind" | "return" = "idle";
    const animations = new Map<SVGElement, Animation>();

    const permitted = () => !disposed && visible && !document.hidden &&
      html.dataset.poppyIntro === "done" && html.dataset.motion !== "off" && !reduced.matches;
    const engaged = () => continuous || focused || (hovered && fineHover.matches);
    const cancel = () => {
      generation += 1;
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };

    const rest = (immediate: boolean) => {
      if (phase === "idle" || (!immediate && phase === "return")) return;
      // Read before cancelling, so even a quick leave/re-entry keeps its pose.
      const positions = immediate ? [] : Array.from(animations.keys(), element => {
        const style = getComputedStyle(element);
        return { element, transform: style.transform, origin: style.transformOrigin };
      });
      cancel();
      phase = immediate ? "idle" : "return";
      const currentGeneration = generation;
      positions.forEach(({ element, transform, origin }) => {
        const animation = element.animate([
          { transform, transformOrigin: origin, transformBox: "view-box" },
          { transform: "none", transformOrigin: origin, transformBox: "view-box" },
        ], { duration: 400, easing: "cubic-bezier(.22, .7, .3, 1)", fill: "both" });
        animations.set(element, animation);
        void animation.finished.then(() => {
          if (disposed || generation !== currentGeneration) return;
          animation.cancel();
          animations.delete(element);
          if (!animations.size) phase = "idle";
        }).catch(() => {});
      });
      if (!positions.length) phase = "idle";
    };

    const flutter = () => {
      if (phase === "wind") return;
      // Pivots use the SVG's original source coordinates, before its framing
      // matrix. The paired layers must share a clock to keep their seams intact.
      const parts = [
        { side: "left", angles: [-.8, 1.3, -1.3, -.8], origin: "1824px 1870px", delay: 0, duration: 2400 },
        { side: "right", angles: [.8, -1.3, 1.3, .8], origin: "1846px 1870px", delay: 80, duration: 2800 },
      ].map(part => ({
        ...part,
        elements: Array.from(mark.querySelectorAll<SVGElement>(`[data-petal-side="${part.side}"]`))
          .filter(element => typeof element.animate === "function")
          .map(element => ({ element, transform: getComputedStyle(element).transform })),
      }));
      if (!parts.some(part => part.elements.length)) return;
      cancel();
      phase = "wind";
      const currentGeneration = generation;

      parts.forEach(({ elements, angles, origin, delay, duration }) => {
        const firstPose = `rotate(${angles[0]}deg)`;
        const entranceStart = document.timeline.currentTime;
        const entrances = elements.map(({ element, transform }) => {
          const entrance = element.animate([
            { transform, transformOrigin: origin, transformBox: "view-box" },
            { transform: firstPose, transformOrigin: origin, transformBox: "view-box" },
          ], {
            duration: 320,
            delay,
            easing: "cubic-bezier(.3, 0, .5, 1)",
            fill: "both",
          });
          if (typeof entranceStart === "number") entrance.startTime = entranceStart;
          animations.set(element, entrance);
          return entrance;
        });
        void Promise.all(entrances.map(animation => animation.finished)).then(() => {
          if (generation !== currentGeneration || !permitted() || !engaged()) return;
          entrances.forEach(animation => animation.cancel());
          const loopStart = document.timeline.currentTime;
          elements.forEach(({ element }) => {
            const animation = element.animate(angles.map((angle, step) => ({
              transform: `rotate(${angle}deg)`,
              transformOrigin: origin,
              transformBox: "view-box",
              offset: [0, .35, .72, 1][step],
              easing: "cubic-bezier(.45, 0, .55, 1)",
            })), { duration, iterations: Infinity });
            if (typeof loopStart === "number") animation.startTime = loopStart;
            animations.set(element, animation);
          });
        }).catch(() => {});
      });
    };

    const update = () => {
      if (!permitted()) { rest(true); return; }
      if (engaged()) flutter();
      else rest(false);
    };
    const enter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      hovered = true;
      update();
    };
    const leave = () => {
      hovered = false;
      update();
    };
    const focus = () => {
      focused = mark.matches(":focus-visible");
      update();
    };
    const blur = () => { focused = false; update(); };
    const mutations = new MutationObserver(update);
    mutations.observe(html, { attributes: true, attributeFilter: ["data-poppy-intro", "data-motion"] });
    const intersection = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio > 0);
      update();
    });
    intersection.observe(mark);

    mark.addEventListener("pointerenter", enter);
    mark.addEventListener("pointerleave", leave);
    mark.addEventListener("pointercancel", leave);
    mark.addEventListener("focus", focus);
    mark.addEventListener("blur", blur);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("poppy-motion-change", update);
    reduced.addEventListener("change", update);
    fineHover.addEventListener("change", update);
    update();

    return () => {
      disposed = true;
      cancel();
      mutations.disconnect();
      intersection.disconnect();
      mark.removeEventListener("pointerenter", enter);
      mark.removeEventListener("pointerleave", leave);
      mark.removeEventListener("pointercancel", leave);
      mark.removeEventListener("focus", focus);
      mark.removeEventListener("blur", blur);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("poppy-motion-change", update);
      reduced.removeEventListener("change", update);
      fineHover.removeEventListener("change", update);
    };
  }, [markRef, continuous]);
}
