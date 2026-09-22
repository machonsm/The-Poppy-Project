import type { Metadata } from "next";
import { PoppyResourcesPage } from "@/components/PoppyResourcesPage";
import { localizedPageMetadata } from "@/lib/seo";

export const metadata: Metadata = localizedPageMetadata({
  title: "Materiały i raporty FemTech",
  description: "Biblioteka wiedzy i raportów o zdrowiu kobiet oraz rynku FemTech w Polsce i na świecie.",
  canonical: "/materialy/",
  pl: "/materialy/",
  en: "/en/resources/"
});

export default function MaterialyPage() {
  return <PoppyResourcesPage initialLanguage="pl" />;
}
