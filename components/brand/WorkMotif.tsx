/** Quiet geometric illustrations that echo the brand's dots and orbits. */
export function WorkMotif({ variant }: { variant: number }) {
  return (
    <svg className="pp-work-motif" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" focusable="false">
      {variant === 0 && <>
        {Array.from({ length: 9 }, (_, index) => <circle key={index} cx={16 + index % 3 * 16} cy={16 + Math.floor(index / 3) * 16} r={index === 4 ? 5 : 2} fill="currentColor" stroke="none" className={index === 4 ? "pp-work-motif__accent" : undefined} />)}
        <path d="M16 16H48V48H16Z" opacity=".35" />
      </>}
      {variant === 1 && <>
        <circle cx="23" cy="32" r="18" />
        <circle cx="41" cy="32" r="18" />
        <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" className="pp-work-motif__accent" />
      </>}
      {variant === 2 && <>
        <path d="M18 12H52V48H18Z" opacity=".4" />
        <path d="M12 18H46V54H12Z M20 28H38 M20 36H38 M20 44H30" />
        <circle cx="49" cy="15" r="4" fill="currentColor" stroke="none" className="pp-work-motif__accent" />
      </>}
      {variant === 3 && <>
        <path d="M6 47V32A26 26 0 0 1 58 32V47 M16 47V32A16 16 0 0 1 48 32V47 M26 47V32A6 6 0 0 1 38 32V47" />
        <circle cx="32" cy="52" r="3" fill="currentColor" stroke="none" className="pp-work-motif__accent" />
      </>}
    </svg>
  );
}
