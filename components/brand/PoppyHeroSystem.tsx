"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SeedField } from "./SeedField";

export function PoppyHeroSystem() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="poppy-hero-system" aria-hidden="true">
      <SeedField density="wide" accentIndex={27} className="poppy-hero-system__seeds" />
      <motion.svg
        className="poppy-hero-system__flower"
        viewBox="0 0 640 720"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <linearGradient id="poppyPetal" x1="15%" x2="92%" y1="12%" y2="88%">
            <stop offset="0%" stopColor="var(--poppy)" />
            <stop offset="52%" stopColor="var(--poppy-book)" />
            <stop offset="100%" stopColor="var(--deep-poppy)" />
          </linearGradient>
        </defs>

        <motion.path
          d="M329 336C230 298 182 217 222 137c62-58 154-18 171 69 29-83 134-106 188-38 31 83-56 157-171 179 82 39 122 128 64 193-83 48-152-35-161-145-30 104-117 158-188 102-46-79 20-158 204-161Z"
          fill="url(#poppyPetal)"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.25, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <path
          d="M325 350C257 330 221 274 238 222c33-52 111-32 133 29"
          fill="none"
          stroke="var(--bone)"
          strokeLinecap="round"
          strokeWidth="16"
        />
        <path
          d="M345 351C428 333 482 280 474 223c-24-55-100-49-136 24"
          fill="none"
          stroke="var(--bone)"
          strokeLinecap="round"
          strokeWidth="16"
        />
        <ellipse cx="340" cy="380" fill="var(--pitch)" rx="58" ry="33" />
        {Array.from({ length: 22 }, (_, index) => {
          const angle = 198 + index * 6.6;
          const inner = 42;
          const outer = 118;
          const rad = (angle * Math.PI) / 180;
          const point = (value: number) => value.toFixed(3);
          return (
            <line
              key={angle}
              x1={point(340 + Math.cos(rad) * inner)}
              y1={point(380 + Math.sin(rad) * inner)}
              x2={point(340 + Math.cos(rad) * outer)}
              y2={point(380 + Math.sin(rad) * outer)}
              stroke="var(--bone)"
              strokeLinecap="round"
              strokeWidth="8"
            />
          );
        })}
        <path d="M340 405V720" stroke="var(--deep-poppy)" strokeLinecap="round" strokeWidth="14" />
        <motion.path
          d="M115 620C180 475 283 419 454 443"
          fill="none"
          stroke="var(--ochre)"
          strokeLinecap="round"
          strokeWidth="1.6"
          strokeDasharray="8 14"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1 }}
          transition={{ duration: 1.4, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>
    </div>
  );
}
