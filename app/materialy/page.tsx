import type { Metadata } from "next";
import { PoppyResourcesPage } from "@/components/PoppyResourcesPage";

export const metadata: Metadata = {
  title: "Materiały",
  description: "Biblioteka wiedzy: starannie wybrane źródła o zdrowiu kobiet i rynku FemTech w Polsce i globalnie.",
  alternates: {
    canonical: "/materialy"
  }
};

export default function MaterialyPage() {
  return <PoppyResourcesPage />;
}
