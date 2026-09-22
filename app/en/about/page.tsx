import type { Metadata } from "next";
import { PoppyAboutPage } from "@/components/PoppyAboutPage";
import { jsonLd, localizedPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = localizedPageMetadata({
  title: "About Poppy Project",
  description: "Meet Karolina Frątczak and Sandra Machoń. We are building Poland’s FemTech ecosystem and supporting innovation in women’s health.",
  canonical: "/en/about/",
  pl: "/o-nas/",
  en: "/en/about/",
  locale: "en_GB"
});

const peopleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", name: "Karolina Frątczak", jobTitle: "Research and investment", worksFor: { "@id": `${SITE_URL}/#organization` } },
    { "@type": "Person", name: "Sandra Machoń", jobTitle: "Data and technology", worksFor: { "@id": `${SITE_URL}/#organization` } }
  ]
};

export default function EnglishAboutPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(peopleSchema) }} />
    <PoppyAboutPage initialLanguage="en" />
  </>;
}
