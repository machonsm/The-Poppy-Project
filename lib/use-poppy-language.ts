"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { PoppyLanguage } from "@/components/PoppyChrome";

const languageStorageKey = "poppy-language";
const languageChangeEvent = "poppy-language-change";

function isPoppyLanguage(value: string | null): value is PoppyLanguage {
  return value === "pl" || value === "en";
}

export function usePoppyLanguage() {
  const language = useSyncExternalStore<PoppyLanguage>(
    callback => {
      window.addEventListener("storage", callback);
      window.addEventListener(languageChangeEvent, callback);
      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(languageChangeEvent, callback);
      };
    },
    (): PoppyLanguage => {
      try {
        const savedLanguage = window.localStorage.getItem(languageStorageKey);
        return isPoppyLanguage(savedLanguage) ? savedLanguage : "pl";
      } catch {
        return "pl";
      }
    },
    (): PoppyLanguage => "pl"
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage: PoppyLanguage) => {
    document.documentElement.lang = nextLanguage;
    try {
      window.localStorage.setItem(languageStorageKey, nextLanguage);
    } catch {
      // The selection still applies to the current document without persistence.
    }
    window.dispatchEvent(new Event(languageChangeEvent));
  }, []);

  return [language, setLanguage] as const;
}
