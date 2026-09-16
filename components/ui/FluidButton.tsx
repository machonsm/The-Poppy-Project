import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ReactNode } from "react";

type Appearance = {
  children: ReactNode;
  tone?: "poppy" | "light" | "olive";
  size?: "regular" | "small" | "icon" | "micro";
};

// A single accessible label; the second copy is purely decorative. Native
// links/buttons keep their navigation, download, form, keyboard and ref behavior.
function FluidLabel({ children }: { children: ReactNode }) {
  return <span className="pp-fluid__window">
    <span className="pp-fluid__label">{children}</span>
    <span className="pp-fluid__label pp-fluid__label--copy" aria-hidden="true">{children}</span>
  </span>;
}

export function FluidButton({ children, className = "", tone = "poppy", size = "regular", type = "button", ...props }: Appearance & ComponentPropsWithRef<"button">) {
  return <button {...props} type={type} className={`pp-fluid ${className}`} data-tone={tone} data-size={size}><FluidLabel>{children}</FluidLabel></button>;
}

export function FluidLink({ children, className = "", tone = "poppy", size = "regular", ...props }: Appearance & ComponentPropsWithRef<"a">) {
  return <a {...props} className={`pp-fluid ${className}`} data-tone={tone} data-size={size}><FluidLabel>{children}</FluidLabel></a>;
}

// For a button-shaped affordance inside an already-clickable card or row.
// The parent gets data-fluid-trigger: no nested buttons or extra tab stops.
export function FluidSurface({ children, className = "", tone = "poppy", size = "icon", ...props }: Appearance & ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={`pp-fluid ${className}`} data-tone={tone} data-size={size}><FluidLabel>{children}</FluidLabel></span>;
}
