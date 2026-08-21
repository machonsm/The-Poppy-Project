"use client";

import { useMemo, useState } from "react";

type SeedFieldProps = {
  density?: "compact" | "wide";
  accentIndex?: number;
  className?: string;
};

export function SeedField({ density = "compact", accentIndex = 14, className = "" }: SeedFieldProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const columns = density === "wide" ? 10 : 7;
  const count = density === "wide" ? 70 : 42;

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        index,
        x: index % columns,
        y: Math.floor(index / columns)
      })),
    [columns, count]
  );

  return (
    <div
      className={`seed-field seed-field--${density} ${className}`}
      aria-hidden="true"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 10,
          y: ((event.clientY - rect.top) / rect.height - 0.5) * 10
        });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      style={{
        "--seed-x": `${pointer.x}px`,
        "--seed-y": `${pointer.y}px`
      } as React.CSSProperties}
    >
      {seeds.map((seed) => (
        <span
          key={seed.index}
          className={seed.index === accentIndex ? "is-accent" : ""}
          style={
            {
              "--seed-delay": `${(seed.x + seed.y) * 22}ms`
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
