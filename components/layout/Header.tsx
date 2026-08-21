"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <a className="site-header__logo" href="#page" aria-label="The Poppy Project">
          <BrandLogo />
        </a>

        <nav className="site-header__nav" aria-label="Główna nawigacja">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="button button-primary site-header__cta" href="#kontakt">
          Dołącz
          <ArrowRight size={16} aria-hidden="true" />
        </a>

        <button
          className="icon-button site-header__menu-button"
          type="button"
          aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      <div className={`mobile-menu ${isOpen ? "is-open" : ""}`} id="mobile-menu">
        <nav aria-label="Nawigacja mobilna">
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button-primary" href="#kontakt" onClick={closeMenu}>
          Dodaj firmę
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
