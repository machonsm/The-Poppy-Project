type ArcSystemProps = {
  tone?: "light" | "dark";
  className?: string;
};

export function ArcSystem({ tone = "light", className = "" }: ArcSystemProps) {
  return (
    <svg
      className={`arc-system arc-system--${tone} ${className}`}
      viewBox="0 0 420 420"
      aria-hidden="true"
    >
      <path d="M38 382A344 344 0 0 1 382 38" />
      <path d="M84 382A298 298 0 0 1 382 84" strokeDasharray="8 12" />
      <path d="M130 382A252 252 0 0 1 382 130" />
      <path d="M176 382A206 206 0 0 1 382 176" strokeDasharray="3 10" />
      <circle cx="91" cy="306" r="6" />
      <circle cx="240" cy="177" r="5" />
      <circle cx="348" cy="92" r="7" />
    </svg>
  );
}
