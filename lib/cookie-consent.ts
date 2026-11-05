"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CONSENT_MAX_AGE_DAYS, CONSENT_STORAGE_KEY, PRIVACY_VERSION } from "@/data/privacy";

export const COOKIE_SETTINGS_EVENT = "poppy-open-cookie-settings";
const CHANGE_EVENT = "poppy-consent-change";
export const CONSENT_MAX_AGE = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

export type CookiePreferences = { analytics: boolean; external: boolean };
type ConsentRecord = CookiePreferences & { version: string; at: number };
let sessionRecord: string | null = null;

function parseRecord(raw: string | null): ConsentRecord | null {
  try {
    const saved = JSON.parse(raw || "null");
    if (saved?.version === PRIVACY_VERSION && typeof saved.analytics === "boolean" && typeof saved.external === "boolean" &&
      typeof saved.at === "number" && saved.at <= Date.now() && Date.now() - saved.at < CONSENT_MAX_AGE) return saved;
  } catch { /* Invalid or inaccessible storage must never activate a service. */ }
  return null;
}

function snapshot() {
  let raw = sessionRecord;
  if (!raw) {
    try { raw = window.localStorage.getItem(CONSENT_STORAGE_KEY); } catch { /* Session-only fallback. */ }
  }
  return parseRecord(raw) ? raw : null;
}

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY || event.key === null) { sessionRecord = null; callback(); }
  };
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => { window.removeEventListener(CHANGE_EVENT, callback); window.removeEventListener("storage", onStorage); };
}

export function useCookieConsent() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  return useMemo(() => {
    const record = parseRecord(raw);
    return { analytics: record?.analytics ?? false, external: record?.external ?? false, hasChoice: !!record };
  }, [raw]);
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}

export function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (!/^_ga(?:_|$)/.test(name)) continue;
    const root = location.hostname.startsWith("www.") ? location.hostname.slice(4) : location.hostname;
    for (const domain of ["", `; domain=${location.hostname}`, `; domain=.${root}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
    }
  }
}

export function saveCookiePreferences(next: CookiePreferences) {
  const previous = parseRecord(snapshot());
  if (!next.analytics || !previous?.analytics) clearAnalyticsCookies();
  const raw = JSON.stringify({ ...next, at: Date.now(), version: PRIVACY_VERSION });
  try { window.localStorage.setItem(CONSENT_STORAGE_KEY, raw); sessionRecord = null; }
  catch { sessionRecord = raw; }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  // Removing a script tag cannot stop third-party code already running.
  if ((previous?.analytics && !next.analytics) || (previous?.external && !next.external)) location.reload();
}
