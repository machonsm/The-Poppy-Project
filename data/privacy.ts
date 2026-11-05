/** Keep the public policy, notices and browser consent record on the same version. */
export const PRIVACY_VERSION = "2026-11-05";
export const PRIVACY_CONTROLLER = "Sandra Machoń";
export const PRIVACY_EMAIL = "joinpoppypl@gmail.com";
export const CONSENT_STORAGE_KEY = "poppy-cookie-consent-v3";
export const CONSENT_MAX_AGE_DAYS = 180;

export const privacyRoutes = {
  pl: "/polityka-prywatnosci/",
  en: "/en/privacy-policy/"
} as const;

export const privacyProviders = [
  { name: "Google / Gmail / Google Analytics", url: "https://policies.google.com/privacy", pl: "Poczta elektroniczna i, za zgodą, statystyki odwiedzin.", en: "Email services and, with consent, visitor analytics." },
  { name: "GitHub Pages", url: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement", pl: "Hosting strony, dostarczanie plików i obsługa techniczna połączeń.", en: "Website hosting, file delivery and technical handling of connections." },
  { name: "FormSubmit", url: "https://formsubmit.co/", pl: "Przekazywanie zgłoszeń z formularza firmy na nasz adres e-mail.", en: "Delivery of company submissions from the form to our email address." },
  { name: "Substack", url: "https://substack.com/privacy", pl: "Obsługa subskrypcji, wysyłka newslettera i udostępnianie artykułów oraz ich okładek.", en: "Subscriptions, newsletter delivery and hosting of articles and their cover images." },
  { name: "Supascribe", url: "https://supascribe.com/resources/privacy-policy", pl: "Osadzony formularz zapisu do newslettera na Substacku, po jego włączeniu.", en: "The embedded signup form for our Substack newsletter, after activation." },
  { name: "Spotify", url: "https://www.spotify.com/pl/legal/privacy-policy/", pl: "Osadzone odtwarzacze podcastu, po ich włączeniu.", en: "Embedded podcast players, after activation." },
  { name: "GoatCounter", url: "https://www.goatcounter.com/help/privacy", pl: "Statystyki odwiedzin uruchamiane za zgodą na analitykę.", en: "Visitor statistics activated with analytics consent." }
];
