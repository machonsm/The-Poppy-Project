"use client";

import { useEffect, useRef } from "react";

type GravityDotGridProps = {
  className?: string;
  fullWidth?: boolean;
};

type Dot = {
  bx: number;
  by: number;
  x: number;
  y: number;
  accent: boolean;
  opacity: number;
};

const COLS = 6;
const ROWS = 11;
const BASE_R = 2.35;
const HOVER_RADIUS = 98;
const HOVER_PUSH = 21;
const FOLLOW_SPEED = 13;

export function GravityDotGrid({ className = "", fullWidth = false }: GravityDotGridProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;

    if (!canvas || !wrap) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let spacing = 0;
    let dots: Dot[] = [];
    let animationId = 0;
    let previousTime = performance.now();
    let inView = false;
    let disposed = false;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = { x: -9999, y: -9999, on: false };

    const buildGrid = () => {
      spacing = fullWidth ? 46 : Math.min(width / (COLS + 1), height / (ROWS + 1));
      const cols = fullWidth ? Math.max(1, Math.floor(width / spacing)) : COLS;
      const rows = fullWidth ? Math.max(1, Math.floor(height / spacing)) : ROWS;
      const ox = (width - (cols - 1) * spacing) / 2;
      const oy = (height - (rows - 1) * spacing) / 2;
      const closestIndex = (fraction: number, count: number) =>
        Math.max(0, Math.min(count - 1, Math.round((count - 1) * fraction)));
      const accentDots = fullWidth
        ? (width <= 650
            ? [[closestIndex(.2, cols), closestIndex(.65, rows)], [closestIndex(.72, cols), closestIndex(.8, rows)]]
            : [[closestIndex(.64, cols), closestIndex(.3, rows)], [closestIndex(.87, cols), closestIndex(.62, rows)]])
        : [[2, 2]];
      const copy = fullWidth ? wrap.closest(".pp-hero")?.querySelector<HTMLElement>(".pp-hero__copy") : null;
      const copyBottom = copy ? copy.getBoundingClientRect().bottom - wrap.getBoundingClientRect().top : height * .45;
      const smoothstep = (value: number) => {
        const t = Math.max(0, Math.min(1, value));
        return t * t * (3 - 2 * t);
      };

      dots = [];

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const bx = ox + col * spacing;
          const by = oy + row * spacing;
          const accent = accentDots.some(([accentCol, accentRow]) => col === accentCol && row === accentRow);
          // Fade smoothly out of the copy area; red accents retain their own contrast.
          const fade = width <= 650
            ? smoothstep((by - copyBottom) / 160)
            : smoothstep((bx / width - .52) / .24);
          const opacity = fullWidth ? (accent ? .85 : .07 + .15 * fade) : 1;
          dots.push({ bx, by, x: bx, y: by, accent, opacity });
        }
      }
    };

    const tick = (delta: number) => {
      const follow = 1 - Math.exp(-FOLLOW_SPEED * delta);
      let settling = false;

      for (const dot of dots) {
        let tx = dot.bx;
        let ty = dot.by;

        if (mouse.on) {
          const dx = dot.bx - mouse.x;
          const dy = dot.by - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < HOVER_RADIUS) {
            const push = (1 - dist / HOVER_RADIUS) ** 2 * HOVER_PUSH;
            const directionX = dist > 0.01 ? dx / dist : dot.bx < width / 2 ? -1 : 1;
            const directionY = dist > 0.01 ? dy / dist : 0;
            tx += directionX * push;
            ty += directionY * push;
          }
        }

        const remainingX = tx - dot.x;
        const remainingY = ty - dot.y;
        dot.x = Math.abs(remainingX) < 0.05 ? tx : dot.x + remainingX * follow;
        dot.y = Math.abs(remainingY) < 0.05 ? ty : dot.y + remainingY * follow;
        settling ||= Math.abs(tx - dot.x) > 0.05 || Math.abs(ty - dot.y) > 0.05;
      }

      return settling;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const dot of dots) {
        context.globalAlpha = dot.opacity;
        context.fillStyle = dot.accent ? "#8B1A1A" : "#6E7248";
        context.beginPath();
        context.arc(dot.x, dot.y, dot.accent ? BASE_R * 1.08 : BASE_R, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const canAnimate = () =>
      !disposed &&
      inView &&
      !document.hidden &&
      width > 0 &&
      height > 0 &&
      !reducedMotionQuery.matches &&
      document.documentElement.dataset.motion !== "off";

    const loop = (now: number) => {
      animationId = 0;

      if (!canAnimate()) {
        return;
      }

      const delta = Math.min((now - previousTime) / 1000, 0.04);
      previousTime = now;
      const settling = tick(delta);
      draw();
      if (settling) animationId = requestAnimationFrame(loop);
    };

    const startAnimation = () => {
      if (canAnimate() && !animationId) {
        previousTime = performance.now();
        animationId = requestAnimationFrame(loop);
      }
    };

    const syncAnimation = () => {
      if (disposed) {
        return;
      }

      if (canAnimate()) {
        startAnimation();
        return;
      }

      cancelAnimationFrame(animationId);
      animationId = 0;
      mouse.on = false;

      for (const dot of dots) {
        dot.x = dot.bx;
        dot.y = dot.by;
      }

      draw();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // The intro scales and translates the whole artwork. Its layout size is
      // stable; using the transformed rect here would scale the canvas twice.
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
      draw();
      syncAnimation();
    };

    const updateMouse = (clientX: number, clientY: number) => {
      if (!canAnimate()) {
        return;
      }

      const wasOn = mouse.on;
      const rect = wrap.getBoundingClientRect();
      // Map the pointer back into canvas coordinates while its parent scales.
      mouse.x = rect.width ? ((clientX - rect.left) / rect.width) * width : -9999;
      mouse.y = rect.height ? ((clientY - rect.top) / rect.height) * height : -9999;
      mouse.on =
        mouse.x >= 0 &&
        mouse.x <= width &&
        mouse.y >= 0 &&
        mouse.y <= height;
      if (mouse.on || wasOn) startAnimation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      updateMouse(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      mouse.on = false;
      startAnimation();
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        handlePointerLeave();
      }
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncAnimation();
    });
    intersectionObserver.observe(wrap);

    const motionObserver = new MutationObserver(syncAnimation);
    motionObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"]
    });

    reducedMotionQuery.addEventListener("change", syncAnimation);
    window.addEventListener("poppy-motion-change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerup", handlePointerEnd, { passive: true });
    window.addEventListener("pointercancel", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionObserver.disconnect();
      reducedMotionQuery.removeEventListener("change", syncAnimation);
      window.removeEventListener("poppy-motion-change", syncAnimation);
      document.removeEventListener("visibilitychange", syncAnimation);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, [fullWidth]);

  return (
    <div ref={wrapRef} className={`gravity-dot-grid ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
