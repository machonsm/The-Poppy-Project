"use client";

import Script from "next/script";
import { useId } from "react";
import type { PoppyLanguage } from "@/components/PoppyChrome";
import "./newsletter-signup.css";

const supascribeLoader = "https://js.supascribe.com/v1/loader/5eetup2arwSgelazRSHABdOC9KC3.js";

export function PoppyNewsletterSignup({ language, variant = "hero" }: { language: PoppyLanguage; variant?: "hero" | "card" | "footer" }) {
  const id = useId();
  const title = language === "pl" ? "Zapisz się do naszego Substacka" : "Subscribe to our Substack";

  return <section className={`pp-substack-signup pp-substack-signup--${variant}`} data-newsletter-inline aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`} className="pp-substack-signup__title">{title}</h2>
    <div className="pp-substack-signup__embed" data-supascribe-embed-id="175153234302" data-supascribe-subscribe />
    <Script src={supascribeLoader} strategy="afterInteractive" />
  </section>;
}
