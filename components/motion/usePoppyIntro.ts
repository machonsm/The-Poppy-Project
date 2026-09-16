"use client";

import { useLayoutEffect, type RefObject } from "react";

/** Move the real hero cluster from the centre into its final layout position. */
export function usePoppyIntro(clusterRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const cluster = clusterRef.current;
    if (!cluster || html.dataset.poppyIntro !== "pending") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let animation: Animation | undefined;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      html.dataset.poppyIntro = "done";
      animation?.cancel();
      if (fallback) clearTimeout(fallback);
      try { sessionStorage.setItem("poppy-intro-v8-clean", "seen"); } catch { /* The intro also works without storage. */ }
    };
    const skipForMotion = () => {
      if (preference.matches || html.dataset.motion === "off") finish();
    };
    const skipForScroll = () => { if (window.scrollY > 30) finish(); };
    const skipForKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") finish();
    };

    const start = () => {
      if (disposed || html.dataset.poppyIntro !== "pending") return;
      if (preference.matches || html.dataset.motion === "off" || window.scrollY > 30 || typeof cluster.animate !== "function") { finish(); return; }
      const box = cluster.getBoundingClientRect();
      const headerBottom = document.querySelector(".pp-header")?.getBoundingClientRect().bottom ?? 0;
      const heroBottom = document.querySelector(".pp-hero")?.getBoundingClientRect().bottom ?? innerHeight;
      const introBottom = Math.min(heroBottom, innerHeight);
      const centreX = innerWidth / 2 - (box.left + box.width / 2);
      const centreY = (headerBottom + introBottom) / 2 - (box.top + box.height / 2);
      const centred = `translate(calc(-50% + ${centreX}px), ${centreY}px)`;

      html.dataset.poppyIntro = "playing";
      animation = cluster.animate([
        { transform: centred, offset: 0 },
        { transform: centred, offset: .42, easing: "cubic-bezier(.65, 0, .2, 1)" },
        { transform: "translate(-50%, 0px)", offset: 1 }
      ], { duration: 2000, easing: "linear", fill: "both" });
      void animation.finished.then(finish).catch(() => {});
      fallback = setTimeout(finish, 2700);
    };

    window.addEventListener("poppy-motion-change", skipForMotion);
    window.addEventListener("scroll", skipForScroll, { passive: true });
    window.addEventListener("resize", finish);
    window.addEventListener("keydown", skipForKeyboard);
    preference.addEventListener("change", skipForMotion);
    void document.fonts.ready.then(start);

    return () => {
      disposed = true;
      animation?.cancel();
      if (fallback) clearTimeout(fallback);
      window.removeEventListener("poppy-motion-change", skipForMotion);
      window.removeEventListener("scroll", skipForScroll);
      window.removeEventListener("resize", finish);
      window.removeEventListener("keydown", skipForKeyboard);
      preference.removeEventListener("change", skipForMotion);
    };
  }, [clusterRef]);
}
