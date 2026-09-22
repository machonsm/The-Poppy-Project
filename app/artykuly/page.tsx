import type { Metadata } from "next";
import { PoppyBlogPage } from "@/components/PoppyBlogPage";

export const metadata: Metadata = {
  title: "Artykuły",
  description: "Analizy, obserwacje i najważniejsze tematy dotyczące zdrowia kobiet, technologii i rynku. Czytaj nas na Substacku.",
  alternates: {
    canonical: "/artykuly"
  }
};

export default function ArticlesPage() {
  return <PoppyBlogPage />;
}
