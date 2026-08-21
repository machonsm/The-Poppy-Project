"use client";

import { useEffect, useRef } from "react";

type GravityDotGridProps = {
  className?: string;
};

type Dot = {
  bx: number;
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  col: number;
  row: number;
};

type Drop = {
  col: number;
  time: number;
  amp: number;
};

const COLS = 9;
const ROWS = 9;
const BASE_R = 7.5;
const SPRING_K = 0.09;
const DAMP = 0.78;
const GRAVITY_R = 180;
const GRAVITY_MAX = 18;
const ROW_DELAY = 0.055;
const BOUNCE_AMP = 11;
const DECAY = 4.2;
const FREQ = 13;
const COL_SPREAD = 0.65;

export function GravityDotGrid({ className = "" }: GravityDotGridProps) {
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
    let drops: Drop[] = [];
    let nextDropAt = 0.6;
    let animationId = 0;
    let previousTime = performance.now();
    let t = 0;
    const mouse = { x: -9999, y: -9999, on: false };

    const buildGrid = () => {
      spacing = Math.min(width / (COLS + 1), height / (ROWS + 1));
      const ox = (width - (COLS - 1) * spacing) / 2;
      const oy = (height - (ROWS - 1) * spacing) / 2;

      dots = [];

      for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
          const bx = ox + col * spacing;
          const by = oy + row * spacing;
          dots.push({ bx, by, x: bx, y: by, vx: 0, vy: 0, r: BASE_R, col, row });
        }
      }
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };

    const spawnDrop = () => {
      drops.push({
        col: Math.floor(Math.random() * COLS),
        time: t,
        amp: BOUNCE_AMP * (0.7 + Math.random() * 0.55)
      });
      nextDropAt = t + 1.8 + Math.random() * 2.4;
    };

    const tick = (delta: number) => {
      t += delta;

      if (t >= nextDropAt) {
        spawnDrop();
      }

      drops = drops.filter((drop) => t - drop.time < 2.5);

      for (const dot of dots) {
        let tx = dot.bx;
        let ty = dot.by;
        let tr = BASE_R;

        for (const drop of drops) {
          const localT = t - drop.time - dot.row * ROW_DELAY;

          if (localT <= 0) {
            continue;
          }

          const colDist = Math.abs(dot.col - drop.col);
          const lateral = Math.exp(-(colDist ** 2) * COL_SPREAD);

          if (lateral < 0.01) {
            continue;
          }

          ty += drop.amp * Math.exp(-DECAY * localT) * Math.sin(FREQ * localT) * lateral;
        }

        if (mouse.on) {
          const dx = mouse.x - dot.bx;
          const dy = mouse.y - dot.by;
          const dist = Math.hypot(dx, dy);

          if (dist < GRAVITY_R && dist > 1) {
            const pull = (1 - dist / GRAVITY_R) ** 2;
            const off = pull * GRAVITY_MAX;
            tx += (dx / dist) * off;
            ty += (dy / dist) * off;
            tr = BASE_R * (1 + pull * 0.22);
          }
        }

        dot.vx += (tx - dot.x) * SPRING_K;
        dot.vy += (ty - dot.y) * SPRING_K;
        dot.vx *= DAMP;
        dot.vy *= DAMP;
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.r += (tr - dot.r) * 0.1;
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0a3b34";

      for (const dot of dots) {
        context.beginPath();
        context.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        context.fill();
      }
    };

    const loop = (now: number) => {
      const delta = Math.min((now - previousTime) / 1000, 0.04);
      previousTime = now;
      tick(delta);
      draw();
      animationId = requestAnimationFrame(loop);
    };

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.on =
        mouse.x >= 0 &&
        mouse.x <= rect.width &&
        mouse.y >= 0 &&
        mouse.y <= rect.height;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updateMouse(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      mouse.on = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (touch) {
        updateMouse(touch.clientX, touch.clientY);
      }
    };

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    if (!reducedMotionQuery.matches) {
      animationId = requestAnimationFrame(loop);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("blur", handlePointerLeave);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handlePointerLeave);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`gravity-dot-grid ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
