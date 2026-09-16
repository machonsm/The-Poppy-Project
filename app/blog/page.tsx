import type { Metadata } from "next";
import { EditorialExploreSection } from "@/components/EditorialExploreSection";
import { PoppyContentPage } from "@/components/PoppyContentPage";

export const metadata: Metadata = {
  title: "Blog",
  alternates: {
    canonical: "/blog"
  }
};

export default function BlogPage() {
  return (
    <PoppyContentPage
      kicker="Blog"
      title="Poppy Notes: obserwacje z rynku zdrowia kobiet."
      lede="Blog będzie miejscem na krótkie analizy, rozmowy i teksty, które porządkują najważniejsze pytania wokół innowacji w zdrowiu kobiet."
      afterCollection={<EditorialExploreSection />}
      cards={[
        {
          title: "Jak czytać rynek FemTechu w Polsce?",
          text:
            "Esej otwierający o języku, kategoriach i danych potrzebnych do rozmowy o polskim ekosystemie.",
          action: "W przygotowaniu"
        },
        {
          title: "Założycielki, które przesuwają standard opieki",
          text:
            "Seria krótkich rozmów z osobami budującymi produkty, usługi i badania w zdrowiu kobiet.",
          action: "W przygotowaniu"
        },
        {
          title: "Trendy bez hałasu",
          text:
            "Komentarze do tematów, które wracają w rozmowach o diagnostyce, profilaktyce, menopauzie, płodności i danych.",
          action: "W przygotowaniu"
        }
      ]}
    />
  );
}
