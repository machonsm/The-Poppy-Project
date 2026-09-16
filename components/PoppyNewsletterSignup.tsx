"use client";

import { useId } from "react";
import type { PoppyLanguage } from "@/components/PoppyChrome";
import { links } from "@/data/links";
import "./newsletter-signup.css";

const copy = {
  pl: {
    title: "Zapisz się do naszego Substacka",
    cardTitle: <>Dobre treści.<br /><em>Prosto na maila.</em></>,
    form: "Zapisz się do FemTech po Polsku na Substacku",
    fallback: "Otwórz zapis na Substacku",
    terms: "Warunki", privacy: "Prywatność",
    note: "Bezpłatnie. Zrezygnujesz, kiedy zechcesz.",
  },
  en: {
    title: "Subscribe to our Substack",
    cardTitle: <>Good reads.<br /><em>In your inbox.</em></>,
    form: "Subscribe to FemTech po Polsku on Substack",
    fallback: "Subscribe on Substack",
    terms: "Terms", privacy: "Privacy",
    note: "Free to read. Unsubscribe whenever you like.",
  },
};

export function PoppyNewsletterSignup({ language, variant = "hero" }: { language: PoppyLanguage; variant?: "hero" | "card" }) {
  const id = useId();
  const c = copy[language];
  return <section className={`pp-substack-signup pp-substack-signup--${variant}`} data-newsletter-inline aria-labelledby={`${id}-title`}>
    <div className="pp-newsletter__heading">
      <h2 id={`${id}-title`}>{variant === "card" ? c.cardTitle : c.title}</h2>
      <svg className="pp-newsletter__stamp" width="26" height="30" viewBox="0 0 24 28" fill="currentColor" aria-hidden="true"><path d="M2 1h20v3H2zm0 6h20v3H2zm0 6h20v14l-10-6-10 6z" /></svg>
    </div>
    <div className="pp-newsletter__embed">
      <iframe src={`${links.substack}embed?transparent=true`} title={c.form} className="pp-newsletter__frame" referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-forms" />
    </div>
    <div className="pp-newsletter__footer">
      <p>{c.note}</p>
      <div><a href={`${links.substack}subscribe`}>{c.fallback}</a><span aria-hidden="true">·</span><a href={`${links.substack}tos`} target="_blank" rel="noopener noreferrer">{c.terms}</a><a href={`${links.substack}privacy`} target="_blank" rel="noopener noreferrer">{c.privacy}</a></div>
    </div>
  </section>;
}
