import type { Metadata } from "next";

export const SITE_URL = "https://joinpoppy.pl";
export const SITE_NAME = "Poppy Project";
export const HOME_TITLE = "FemTech w Polsce i innowacje w zdrowiu kobiet | Poppy Project";
export const HOME_DESCRIPTION = "Poppy Project to polska platforma FemTech i innowacji w zdrowiu kobiet. Odkrywaj firmy, wydarzenia, raporty, artykuły i podcasty z Polski i ze świata.";
export const SOCIAL_IMAGE = "/og/poppy-project-og.png";

export function languageAlternates(pl: string, en: string): Metadata["alternates"] {
  return {
    languages: {
      "pl-PL": pl,
      en,
      "x-default": pl
    }
  };
}

export function localizedPageMetadata({
  title,
  description,
  canonical,
  pl,
  en,
  locale = "pl_PL"
}: {
  title: string;
  description: string;
  canonical: string;
  pl: string;
  en: string;
  locale?: "pl_PL" | "en_GB";
}): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical,
      ...languageAlternates(pl, en)
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale,
      alternateLocale: [locale === "pl_PL" ? "en_GB" : "pl_PL"],
      images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — FemTech and women's health innovation` }],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SOCIAL_IMAGE]
    }
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
