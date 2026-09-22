"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { languageFromPath, localizedPath, type PoppyLanguage } from "@/lib/language-routes";

const languageStorageKey = "poppy-language";
export function usePoppyLanguage(initialLanguage: PoppyLanguage = "pl") {
  const router = useRouter();
  const language = useSyncExternalStore<PoppyLanguage>(
    callback => {
      window.addEventListener("popstate", callback);
      return () => window.removeEventListener("popstate", callback);
    },
    (): PoppyLanguage => languageFromPath(window.location.pathname),
    (): PoppyLanguage => initialLanguage
  );

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      const savedLanguage = window.localStorage.getItem(languageStorageKey);
      if ((savedLanguage === "pl" || savedLanguage === "en") && savedLanguage !== language) {
        const targetPath = localizedPath(window.location.pathname, savedLanguage);
        router.replace(`${targetPath}${window.location.search}${window.location.hash}`);
      }
    } catch {
      // The language encoded in the URL remains authoritative when storage is unavailable.
    }
  }, [language, router]);

  const setLanguage = useCallback((nextLanguage: PoppyLanguage) => {
    document.documentElement.lang = nextLanguage;
    try {
      window.localStorage.setItem(languageStorageKey, nextLanguage);
    } catch {
      // The selection still applies to the current document without persistence.
    }
    const targetPath = localizedPath(window.location.pathname, nextLanguage);
    const target = `${targetPath}${window.location.search}${window.location.hash}`;
    router.push(target);
  }, [router]);

  return [language, setLanguage] as const;
}
