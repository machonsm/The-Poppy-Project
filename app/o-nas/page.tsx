import type { Metadata } from "next";
import { PoppyAboutPage } from "@/components/PoppyAboutPage";
import { jsonLd, localizedPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = localizedPageMetadata({
  title: "O nas — Poppy Project",
  description: "Poznaj Karolinę Frątczak i Sandrę Machoń. Budujemy ekosystem FemTech i wspieramy innowacje w zdrowiu kobiet w Polsce.",
  canonical: "/o-nas/",
  pl: "/o-nas/",
  en: "/en/about/"
});

const peopleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", name: "Karolina Frątczak", jobTitle: "Analizy i inwestycje", worksFor: { "@id": `${SITE_URL}/#organization` } },
    { "@type": "Person", name: "Sandra Machoń", jobTitle: "Dane i technologie", worksFor: { "@id": `${SITE_URL}/#organization` } }
  ]
};

export default function AboutPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(peopleSchema) }} />
    <PoppyAboutPage initialLanguage="pl" />
  </>;
}
