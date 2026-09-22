import type { Metadata } from "next";
import { PoppyBlogPage } from "@/components/PoppyBlogPage";
import { localizedPageMetadata } from "@/lib/seo";

export const metadata: Metadata = localizedPageMetadata({
  title: "FemTech articles and analysis",
  description: "Analysis, observations and important topics in women’s health, technology and the FemTech market from Poppy Project.",
  canonical: "/en/articles/",
  pl: "/artykuly/",
  en: "/en/articles/",
  locale: "en_GB"
});

export default function EnglishArticlesPage() {
  return <PoppyBlogPage initialLanguage="en" />;
}
