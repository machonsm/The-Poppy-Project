import type { Metadata } from "next";
import { PoppyResourcesPage } from "@/components/PoppyResourcesPage";

export const metadata: Metadata = {
  title: "Materiały",
  description: "Biblioteka raportów o zdrowiu kobiet i rynku FemTech. Polska i globalna perspektywa, badania, inwestycje oraz mapa polskiego FemTechu.",
  alternates: {
    canonical: "/materialy"
  }
};

export default function MaterialyPage() {
  return <PoppyResourcesPage />;
}
