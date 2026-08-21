type BrandLogoProps = {
  tone?: "dark" | "light";
};

export function BrandLogo({ tone = "dark" }: BrandLogoProps) {
  return (
    <span className={`brand-logo brand-logo--${tone}`}>
      <span className="brand-logo__mark" aria-hidden="true">
        <span />
      </span>
      <span className="brand-logo__wordmark">
        <span>The</span>
        <strong>Poppy</strong>
        <span>Project</span>
      </span>
    </span>
  );
}
