import { useId, type CSSProperties } from "react";
import { poppyReplicaPaths, poppyReplicaTransform } from "./poppyReplica";

// The original logo petals, paired with curved stems inspired by the supplied reference.
const flowerForms = [
  { left: 7, size: 94, delay: .12, lean: -13, stem: "M 80 272 C 52 209 113 163 73 106" },
  { left: 21, size: 121, delay: .02, lean: 9, stem: "M 80 272 C 114 209 49 153 86 92" },
  { left: 35, size: 87, delay: .24, lean: -9, stem: "M 80 272 C 52 214 105 166 73 110" },
  { left: 49, size: 131, delay: .1, lean: -7, stem: "M 80 272 C 61 203 96 158 78 90" },
  { left: 64, size: 98, delay: .19, lean: 15, stem: "M 80 272 C 102 214 45 163 91 103" },
  { left: 79, size: 120, delay: .06, lean: -10, stem: "M 80 272 C 117 217 62 144 80 91" },
  { left: 93, size: 86, delay: .28, lean: 13, stem: "M 80 272 C 49 209 106 170 80 109" },
];
// Six evenly spaced flowers keep this footer easter egg quiet and discoverable.
const flowers = flowerForms.filter((_, index) => index !== 3).map((flower, index) => ({
  ...flower,
  left: 8 + index * (84 / 5),
}));
const colors = { poppy: "var(--poppy)", shade: "var(--burgundy)", center: "var(--pitch)", detail: "var(--linen)" };

export function PoppyBloomBorder() {
  const symbol = `poppy-border-${useId().replace(/:/g, "")}`;
  return <div className="pp-bloom-border" aria-hidden="true">
    <svg className="pp-bloom-border__source" width="0" height="0" focusable="false">
      <defs><symbol id={symbol} viewBox="0 0 440 345">
        <g transform={poppyReplicaTransform}>
          {poppyReplicaPaths.filter(path => path.part === "head").map(path => <path key={path.sourceIndex} d={path.d} transform={path.transform} fill={colors[path.color]} />)}
        </g>
      </symbol></defs>
    </svg>
    {flowers.map((flower, index) => <svg key={index} className={`pp-bloom-border__plant${index % 2 ? " pp-bloom-border__plant--desktop" : ""}`} viewBox="0 0 160 272" focusable="false" data-bloom-delay={flower.delay} data-bloom-lean={flower.lean} style={{ "--plant-left": `${flower.left}%`, "--plant-width": `${flower.size}px` } as CSSProperties}>
      <g className="pp-bloom-border__sway">
        <path className="pp-bloom-border__stem" d={flower.stem} pathLength="1" />
        <g className="pp-bloom-border__head" opacity="0">
          <use href={`#${symbol}`} x="-51" y="-78" width="102" height="80" />
        </g>
      </g>
    </svg>)}
  </div>;
}
