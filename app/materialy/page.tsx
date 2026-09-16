import type { Metadata } from "next";
import { PoppyContentPage } from "@/components/PoppyContentPage";
import { mapAssets } from "@/data/map-assets";

export const metadata: Metadata = {
  title: "Materiały",
  alternates: {
    canonical: "/materialy"
  }
};

export default function MaterialyPage() {
  return (
    <PoppyContentPage
      kicker="Materiały"
      title="Biblioteka Poppy dla zdrowia kobiet."
      lede="Miejsce na raporty, mapy, przewodniki i narzędzia, które pomagają zrozumieć rynek oraz projektować lepsze rozwiązania."
      cards={[
        {
          title: "Mapa Polskiego FemTechu 2025",
          text:
            "Pierwszy bezpłatny zasób projektu: wizualne zestawienie firm i inicjatyw działających w polskim FemTechu.",
          href: mapAssets.pl.pdf,
          action: "Pobierz"
        },
        {
          title: "Polish FemTech Map 2025",
          text: "Angielska wersja mapy polskiego ekosystemu FemTech.",
          href: mapAssets.en.pdf,
          action: "Download"
        },
        {
          title: "Poppy Brief: luka danych",
          text:
            "Krótki materiał wprowadzający o tym, dlaczego brak reprezentacji kobiet w danych medycznych zmienia jakość opieki.",
          action: "W przygotowaniu"
        },
        {
          title: "Radar grantów i programów",
          text:
            "Kuratowana lista finansowania, akceleratorów i programów dla projektów z obszaru HealthTech i women’s health.",
          action: "W przygotowaniu"
        }
      ]}
    />
  );
}
