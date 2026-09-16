import type { Metadata } from "next";
import { PoppyBlogPage } from "@/components/PoppyBlogPage";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artykuły FemTech po Polsku z Substacka: analizy, wiadomości i perspektywy ze świata zdrowia kobiet. Zapisz się na newsletter Poppy Project.",
  alternates: {
    canonical: "/blog"
  }
};

export default function BlogPage() {
  return <PoppyBlogPage />;
}
