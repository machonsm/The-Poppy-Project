"use client";

import { ArrowUp, Instagram, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PoppyMark } from "@/components/brand/PoppyMark";
import { links } from "@/data/links";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { PoppyBloomBorder } from "@/components/brand/PoppyBloomBorder";
import { PoppyNewsletterSignup } from "@/components/PoppyNewsletterSignup";
import { isSiteHome, sitePath } from "@/lib/site-path";

export type PoppyLanguage = "pl" | "en";

const navigation = {
  pl: [
    { label: "Materiały", href: "/materialy/" },
    { label: "Wydarzenia", href: "/#wydarzenia" },
    { label: "Artykuły", href: "/blog/" },
    { label: "Podcast", href: "/podcast/" },
    { label: "O nas", href: "/o-nas/" },
    { label: "Kontakt", href: "/#kontakt" }
  ],
  en: [
    { label: "Resources", href: "/materialy/" },
    { label: "Events", href: "/#wydarzenia" },
    { label: "Articles", href: "/blog/" },
    { label: "Podcast", href: "/podcast/" },
    { label: "About", href: "/o-nas/" },
    { label: "Contact", href: "/#kontakt" }
  ]
};

function SubstackIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" /></svg>;
}

export function PoppyHeader({ language = "pl", onLanguageChange }: {
  language?: PoppyLanguage;
  onLanguageChange?: (language: PoppyLanguage) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [open]);

  return (
    <>
      <a className="pp-skip" href="#main-content">{language === "pl" ? "Przejdź do treści" : "Skip to content"}</a>
      <header className="pp-header" ref={header}>
        <div className="pp-container pp-header__inner">
          <a className="pp-brand" href={sitePath("/")} aria-label={language === "pl" ? "Poppy Project — strona główna" : "Poppy Project — home"}>
            <PoppyMark />
            <span>Poppy Project</span>
          </a>
          <div className="pp-header__controls">
            {onLanguageChange && <LanguageToggle language={language} onChange={onLanguageChange} />}
            <div className="pp-header__socials">
              <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} strokeWidth={1.7} aria-hidden="true" /></a>
              <a href={links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} strokeWidth={1.7} aria-hidden="true" /></a>
              <a href={links.substack} target="_blank" rel="noopener noreferrer" aria-label="Substack"><SubstackIcon size={16} /></a>
            </div>
            <button type="button" className="pp-menu-toggle" ref={menuButton} aria-controls="poppy-navigation" aria-expanded={open} aria-label={open ? (language === "pl" ? "Zamknij menu" : "Close menu") : (language === "pl" ? "Otwórz menu" : "Open menu")} onClick={() => setOpen(!open)}>{open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}</button>
          </div>
        </div>
        <nav className={`pp-nav ${open ? "is-open" : ""}`} id="poppy-navigation" aria-label={language === "pl" ? "Nawigacja główna" : "Main navigation"}>
          {navigation[language].map(({ label, href }) => (
            <a href={sitePath(href)} key={href} onClick={event => {
              setOpen(false);
              if (href.startsWith("/#") && isSiteHome(window.location.pathname)) {
                const target = document.getElementById(href.slice(2));
                if (target) {
                  event.preventDefault();
                  event.stopPropagation();
                  event.nativeEvent.stopImmediatePropagation();
                  window.history.pushState(null, "", sitePath(href));
                  window.dispatchEvent(new CustomEvent("poppy-scroll-to", { detail: target }));
                }
              }
            }}>
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}

export function PoppyFooter({ language = "pl", showNewsletter = false, decorativeBlooms = false }: {
  language?: PoppyLanguage;
  showNewsletter?: boolean;
  decorativeBlooms?: boolean;
}) {
  return (
    <footer id="site-footer" className={`pp-footer${decorativeBlooms ? " pp-footer--with-blooms" : ""}`}>
      <div className="pp-container">
        {showNewsletter && <div className="pp-footer__newsletter"><PoppyNewsletterSignup language={language} variant="footer" /></div>}
        <div className="pp-footer__links">
          <div>
            <h3>{language === "pl" ? "Porozmawiajmy" : "Get in touch"}</h3>
            <a href={`mailto:${links.email}`}>{language === "pl" ? "Napisz do nas" : "Email us"}</a>
            <a href={sitePath("/#zglos-firme")}>{language === "pl" ? "Zgłoś firmę do mapy" : "Submit your company"}</a>
          </div>
          <div><h3>{language === "pl" ? "Obserwuj Poppy Project" : "Follow Poppy Project"}</h3>
            <a href={links.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} strokeWidth={1.8} aria-hidden="true" /><span>Instagram</span></a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} strokeWidth={1.8} aria-hidden="true" /><span>LinkedIn</span></a>
            <a href={links.substack} target="_blank" rel="noopener noreferrer"><SubstackIcon /><span>Substack</span></a>
          </div>
          <div><h3>{language === "pl" ? "Posłuchaj" : "Listen"}</h3><a href={links.spotify} target="_blank" rel="noopener noreferrer">Spotify</a></div>
        </div>
        <div className="pp-footer__wordmark" aria-label="Poppy Project">
          {decorativeBlooms ? <PoppyBloomBorder /> : <PoppyMark monochrome />}
          <span>Poppy Project</span>
        </div>
        <div className="pp-footer__bottom">
          <span>© {new Date().getFullYear()} Poppy Project</span>
          <span className="pp-footer__note">{language === "pl" ? "Polska platforma innowacji w zdrowiu kobiet" : "Polish platform for innovation in women’s health"}</span>
          <a href="#main-content" aria-label={language === "pl" ? "Wróć na górę" : "Back to top"}><ArrowUp size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
