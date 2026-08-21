"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArcSystem } from "@/components/brand/ArcSystem";
import { SeedField } from "@/components/brand/SeedField";
import { Reveal } from "@/components/motion/Reveal";

const pillars = [
  {
    title: "Budujemy",
    text: "Budujemy ekosystem FemTech i innowacji w zdrowiu kobiet w Polsce oraz Europie Środkowo-Wschodniej.",
    device: "arcs"
  },
  {
    title: "Łączymy",
    text: "Łączymy founderki, medyków, naukowców, inwestorów i partnerów instytucjonalnych przy jednym stole.",
    device: "network"
  },
  {
    title: "Informujemy",
    text: "Udostępniamy raporty, trendy, granty, wydarzenia i rynkową wiedzę w czytelnej formie.",
    device: "seeds"
  },
  {
    title: "Wspieramy",
    text: "Wzmacniamy widoczność osób i organizacji tworzących innowacje poprawiające zdrowie kobiet.",
    device: "contour"
  }
] as const;

export function PillarsSection() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="section pillars" id="czym-sie-zajmujemy" aria-labelledby="pillars-title">
      <div className="container pillars__inner">
        <Reveal className="pillars__intro">
          <p className="section-kicker">Czym się zajmujemy?</p>
          <h2 className="section-title" id="pillars-title">
            Wiedza, relacje i działania, które porządkują rynek.
          </h2>
        </Reveal>

        <div className="pillars__grid">
          <div className="pillars__list" role="list">
            {pillars.map((pillar, index) => (
              <button
                key={pillar.title}
                className={`pillar-item ${active === index ? "is-active" : ""}`}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span className="pillar-item__index">0{index + 1}</span>
                <span>
                  <strong>{pillar.title}</strong>
                  <span>{pillar.text}</span>
                </span>
              </button>
            ))}
          </div>

          <div className={`pillars__visual pillars__visual--${pillars[active].device}`}>
            <motion.div
              key={pillars[active].device}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {pillars[active].device === "arcs" && <ArcSystem />}
              {pillars[active].device === "seeds" && <SeedField density="wide" accentIndex={33} />}
              {pillars[active].device === "network" && <NetworkVisual />}
              {pillars[active].device === "contour" && <ContourVisual />}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NetworkVisual() {
  return (
    <svg className="network-visual" viewBox="0 0 420 420" aria-hidden="true">
      <path d="M80 120C130 70 194 74 242 126C294 182 340 205 370 162" />
      <path d="M66 300C123 240 188 242 256 284C307 314 344 300 374 258" />
      <path d="M120 92L166 236L292 136L336 286" />
      {[
        [80, 120],
        [166, 236],
        [242, 126],
        [292, 136],
        [370, 162],
        [66, 300],
        [256, 284],
        [336, 286],
        [374, 258]
      ].map(([cx, cy], index) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 4 ? 8 : 5} />
      ))}
    </svg>
  );
}

function ContourVisual() {
  return (
    <svg className="contour-visual" viewBox="0 0 420 420" aria-hidden="true">
      <path d="M220 346C145 312 107 248 132 178c38-75 130-53 151 13 30-68 111-83 146-24 20 66-52 122-141 135 55 35 74 104 25 151-61 33-106-30-111-107Z" />
      <path d="M218 344C166 301 156 248 182 205c23-39 73-30 98 9" />
      <path d="M244 330C312 299 340 260 324 210c-16-39-63-39-93 5" />
    </svg>
  );
}
