"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_STORAGE_KEY, PRIVACY_CONTROLLER, privacyRoutes } from "@/data/privacy";
import { languageFromPath } from "@/lib/language-routes";
import { sitePath } from "@/lib/site-path";
import { COOKIE_SETTINGS_EVENT, CONSENT_MAX_AGE, clearAnalyticsCookies, saveCookiePreferences, useCookieConsent, type CookiePreferences } from "@/lib/cookie-consent";
import "./cookie-consent.css";

export function CookieConsent() {
  const pathname = usePathname();
  const language = languageFromPath(pathname);
  const en = language === "en";
  const consent = useCookieConsent();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<CookiePreferences>({ analytics: false, external: false });
  const ready = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    if (!consent.analytics) return;
    const w = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
    if (!w.gtag) {
      w.dataLayer = w.dataLayer || [];
      // eslint-disable-next-line prefer-rest-params
      w.gtag = function () { w.dataLayer!.push(arguments); };
      w.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      w.gtag("consent", "update", { analytics_storage: "granted" });
      w.gtag("js", new Date());
      w.gtag("config", "G-ECRT7MG1R3", { send_page_view: false, cookie_expires: CONSENT_MAX_AGE / 1000, cookie_update: false, allow_google_signals: false, allow_ad_personalization_signals: false });
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-ECRT7MG1R3";
      document.head.appendChild(script);
      const goat = document.createElement("script");
      goat.async = true;
      goat.src = "https://gc.zgo.at/count.js";
      goat.dataset.goatcounter = "https://poppyproject.goatcounter.com/count";
      document.body.appendChild(goat);
    }
    w.gtag("event", "page_view", { page_path: pathname, page_location: `${location.origin}${pathname}`, page_title: document.title });
  }, [consent.analytics, pathname]);

  useEffect(() => {
    const open = () => { setDraft({ analytics: consent.analytics, external: consent.external }); setSettingsOpen(true); };
    const disableExternal = () => saveCookiePreferences({ analytics: consent.analytics, external: false });
    const storage = (event: StorageEvent) => {
      if (event.key !== CONSENT_STORAGE_KEY && event.key !== null) return;
      clearAnalyticsCookies();
      location.reload();
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    window.addEventListener("poppy-disable-external-content", disableExternal);
    window.addEventListener("storage", storage);
    return () => {
      window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
      window.removeEventListener("poppy-disable-external-content", disableExternal);
      window.removeEventListener("storage", storage);
    };
  }, [consent.analytics, consent.external]);

  function save(next: CookiePreferences) { setSettingsOpen(false); saveCookiePreferences(next); }
  if (!ready || (consent.hasChoice && !settingsOpen)) return null;

  return <section className="poppy-cookie" role="region" aria-label={en ? "Privacy settings" : "Ustawienia prywatności"}>
    <div className="poppy-cookie__content">
      <h2>{en ? "Your privacy, your choice" : "Twoja prywatność, Twój wybór"}</h2>
      <p>{en ? "We use optional analytics (Google Analytics and GoatCounter) and external content (the Spotify player and Supascribe signup form for our Substack newsletter). These providers may receive visit data and use cookies. Accept all or choose each category in settings. Essential storage remembers your language and choices." : "Korzystamy z opcjonalnej analityki (Google Analytics i GoatCounter) oraz treści zewnętrznych (odtwarzacz Spotify i formularz Supascribe do newslettera na Substacku). Dostawcy mogą otrzymywać dane o wizycie i używać cookies. Zaakceptuj wszystko lub wybierz kategorie w ustawieniach. Niezbędna pamięć zapamiętuje język i Twoją decyzję."}</p>
      <p>{en ? "Controller: " : "Administrator: "}{PRIVACY_CONTROLLER} (Poppy Project). {en ? "We remember your choice for 180 days. You can change it in the footer. " : "Wybór pamiętamy przez 180 dni. Zmienisz go w stopce. "}<a href={sitePath(privacyRoutes[language])}>{en ? "Privacy and cookie policy" : "Polityka prywatności i cookies"}</a>.</p>
      {settingsOpen && <fieldset className="poppy-cookie__categories"><legend>{en ? "Choose optional categories" : "Wybierz opcjonalne kategorie"}</legend>
        <label><input type="checkbox" name="cookie-analytics" checked={draft.analytics} onChange={event => setDraft(previous => ({ ...previous, analytics: event.target.checked }))} /><span><strong>{en ? "Analytics" : "Analityka"}</strong><small>Google Analytics · GoatCounter</small></span></label>
        <label><input type="checkbox" name="cookie-external" checked={draft.external} onChange={event => setDraft(previous => ({ ...previous, external: event.target.checked }))} /><span><strong>{en ? "External content" : "Treści zewnętrzne"}</strong><small>Spotify · Supascribe / Substack</small></span></label>
      </fieldset>}
    </div>
    <div className="poppy-cookie__actions">
      <button type="button" onClick={() => save({ analytics: false, external: false })}>{en ? "Reject optional" : "Odrzuć opcjonalne"}</button>
      <button type="button" onClick={() => save({ analytics: true, external: true })}>{en ? "Accept all" : "Akceptuj wszystko"}</button>
      {settingsOpen ? <button type="button" onClick={() => save(draft)}>{en ? "Save preferences" : "Zapisz wybór"}</button> : <button className="poppy-cookie__settings" type="button" onClick={() => { setDraft({ analytics: consent.analytics, external: consent.external }); setSettingsOpen(true); }}>{en ? "Settings" : "Ustawienia"}</button>}
    </div>
  </section>;
}
