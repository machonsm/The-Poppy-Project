import type { Metadata } from "next";
import { PoppyAboutPage } from "@/components/PoppyAboutPage";

export const metadata: Metadata = {
  title: "O nas",
  description: "Poznaj Poppy Project, Karolinę Frątczak i Sandrę Machoń. Budujemy otwarty ekosystem FemTech i wspieramy innowacje w zdrowiu kobiet.",
  alternates: {
    canonical: "/o-nas/"
  }
};

export default function AboutPage() {
  return <PoppyAboutPage />;
}
