import { poppyReplicaPaths, poppyReplicaTransform, type PoppyReplicaColor } from "@/components/brand/poppyReplica";

type PoppyMarkProps = {
  className?: string;
  animated?: boolean;
  monochrome?: boolean;
};

const colors: Record<PoppyReplicaColor, string> = {
  poppy: "currentColor",
  shade: "var(--poppy-shade, #6B0C0C)",
  center: "var(--poppy-center, #1A0A0A)",
  detail: "var(--poppy-cutout, #FDFBF7)",
};

// Each side keeps its shade, outer edge, and lower petal in step. Wrapping paths
// individually preserves the supplied vector's interleaved painting order.
const petalSides: Partial<Record<number, "left" | "right">> = {
  2: "right", 3: "left", 4: "left", 5: "right", 8: "left", 9: "right",
};

/** The supplied vector, with its exact paths and resting silhouette preserved. */
export function PoppyMark({
  className = "",
  animated = false,
  monochrome = false,
}: PoppyMarkProps) {
  return (
    <svg
      className={`poppy-mark${animated ? " poppy-mark--animated" : ""}${monochrome ? " poppy-mark--monochrome" : ""} ${className}`.trim()}
      viewBox="0 0 440 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g className="poppy-mark__reveal">
        <g className="poppy-mark__plant">
          <g className="poppy-mark__artwork" transform={poppyReplicaTransform}>
            {poppyReplicaPaths.map(path => {
              const artwork = <path
                key={path.sourceIndex}
                data-source-path={path.sourceIndex}
                d={path.d}
                transform={path.transform}
                fill={monochrome && path.color !== "detail" ? "currentColor" : colors[path.color]}
              />;
              const side = animated ? petalSides[path.sourceIndex] : undefined;
              return side ? (
                <g key={path.sourceIndex} className="poppy-mark__petal" data-petal-side={side}>
                  {artwork}
                </g>
              ) : artwork;
            })}
          </g>
        </g>
      </g>
    </svg>
  );
}
