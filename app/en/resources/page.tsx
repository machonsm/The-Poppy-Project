import type { Metadata } from "next";
import { PoppyResourcesPage } from "@/components/PoppyResourcesPage";
import { localizedPageMetadata } from "@/lib/seo";

export const metadata: Metadata = localizedPageMetadata({
  title: "FemTech resources and reports",
  description: "A curated library of reports and resources on women’s health and the FemTech market in Poland and globally.",
  canonical: "/en/resources/",
  pl: "/materialy/",
  en: "/en/resources/",
  locale: "en_GB"
});

export default function EnglishResourcesPage() {
  return <PoppyResourcesPage initialLanguage="en" />;
}
