"use client";

import Script from "next/script";
import { useId } from "react";
import type { PoppyLanguage } from "@/components/PoppyChrome";
import { PRIVACY_CONTROLLER, privacyRoutes } from "@/data/privacy";
import { sitePath } from "@/lib/site-path";
import { openCookieSettings, useCookieConsent } from "@/lib/cookie-consent";
import { links } from "@/data/links";
import "./newsletter-signup.css";

const supascribeLoader = "https://js.supascribe.com/v1/loader/5eetup2arwSgelazRSHABdOC9KC3.js";

export function PoppyNewsletterSignup({ language, variant = "hero" }: { language: PoppyLanguage; variant?: "hero" | "card" | "footer" }) {
  const id = useId();
  const { external } = useCookieConsent();
  const title = language === "pl" ? "Zapisz się do naszego Substacka" : "Subscribe to our Substack";

  return <section className={`pp-substack-signup pp-substack-signup--${variant}`} data-newsletter-inline aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`} className="pp-substack-signup__title">{title}</h2>
    {external ? <><div className="pp-substack-signup__embed" data-supascribe-embed-id="175153234302" data-supascribe-subscribe /><Script src={supascribeLoader} strategy="afterInteractive" /></> : <div className="pp-substack-signup__fallback"><a href={links.substack} target="_blank" rel="noopener noreferrer">{language === "pl" ? "Zapisz się na Substacku ↗" : "Subscribe on Substack ↗"}</a><button type="button" onClick={openCookieSettings}>{language === "pl" ? "Formularz na stronie? Ustawienia cookies" : "Prefer the form here? Cookie settings"}</button></div>}
    <p className="pp-substack-signup__privacy">{language === "pl" ? <>Zapisując się, zamawiasz newsletter Poppy Project o FemTech i zdrowiu kobiet. Wypiszesz się linkiem w wiadomości. Administrator: {PRIVACY_CONTROLLER}. </> : <>By subscribing, you request our FemTech and women’s health newsletter. Unsubscribe using the link in any email. Controller: {PRIVACY_CONTROLLER}. </>}<a href={sitePath(`${privacyRoutes[language]}#newsletter`)}>{language === "pl" ? "Prywatność" : "Privacy"}</a>.</p>
  </section>;
}
