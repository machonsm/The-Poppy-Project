import type { Metadata } from "next";
import { PoppyBlogPage } from "@/components/PoppyBlogPage";
import { localizedPageMetadata } from "@/lib/seo";

export const metadata: Metadata = localizedPageMetadata({
  title: "FemTech: artykuły i analizy",
  description: "Analizy, obserwacje i najważniejsze tematy dotyczące zdrowia kobiet, technologii i rynku. Czytaj Poppy Project na Substacku.",
  canonical: "/artykuly/",
  pl: "/artykuly/",
  en: "/en/articles/"
});

export default function ArticlesPage() {
  return <PoppyBlogPage initialLanguage="pl" />;
}
