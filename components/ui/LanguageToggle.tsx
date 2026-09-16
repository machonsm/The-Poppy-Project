"use client";

import { Globe2 } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { PoppyLanguage } from "@/components/PoppyChrome";
import "./language-toggle.css";

export function LanguageToggle({ language, onChange }: { language: PoppyLanguage; onChange: (language: PoppyLanguage) => void }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const choices = useRef<(HTMLButtonElement | null)[]>([]);
  const languages = ["pl", "en"] as const;

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  return <div className="pp-language-toggle" ref={root} data-open={open} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  }} onKeyDown={event => {
    if (event.key === "Escape" && open) {
      event.preventDefault(); event.stopPropagation(); setOpen(false); trigger.current?.focus();
    }
  }}>
    <button ref={trigger} className="pp-language-toggle__trigger" type="button" aria-expanded={open} aria-controls={id}
      aria-label={language === "pl" ? "Wybierz język — obecnie polski" : "Choose language — currently English"}
      title={language === "pl" ? "Zmień język" : "Change language"}
      onClick={() => setOpen(!open)} onKeyDown={event => {
        if (event.key === "ArrowDown") {
          event.preventDefault(); setOpen(true);
          requestAnimationFrame(() => choices.current[language === "pl" ? 0 : 1]?.focus());
        }
      }}><Globe2 size={19} strokeWidth={1.6} aria-hidden="true" /></button>
    <div className="pp-language-toggle__panel" id={id} inert={!open} aria-hidden={!open}>
      <div className="pp-language-toggle__choices" role="radiogroup" aria-label={language === "pl" ? "Język strony" : "Website language"} data-language={language}>
        <span className="pp-language-toggle__indicator" aria-hidden="true" />
        {languages.map((value, index) => <button key={value} ref={element => { choices.current[index] = element; }} type="button" role="radio"
          aria-checked={language === value} aria-label={value === "pl" ? "Polski" : "English"} lang={value} tabIndex={language === value ? 0 : -1}
          onClick={() => onChange(value)} onKeyDown={event => {
            if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - index;
            onChange(languages[next]); choices.current[next]?.focus();
          }}>{value.toUpperCase()}</button>)}
      </div>
    </div>
  </div>;
}
