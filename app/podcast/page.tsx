import type { Metadata } from "next";
import { PoppyContentPage } from "@/components/PoppyContentPage";
import { links } from "@/data/links";

export const metadata: Metadata = {
  title: "Podcast",
  alternates: {
    canonical: "/podcast"
  }
};

export default function PodcastPage() {
  return (
    <PoppyContentPage
      kicker="Podcast"
      title="Poppy Talks: rozmowy o tym, co zmienia opiekę."
      lede="Podcast będzie spokojnym formatem rozmów z founderkami, ekspertkami, inwestorami i osobami pracującymi blisko systemu zdrowia."
      cards={[
        {
          title: "Sezon pilotażowy",
          text:
            "Pierwsze odcinki zbiorą najważniejsze pojęcia i historie stojące za innowacjami w zdrowiu kobiet.",
          action: "W przygotowaniu"
        },
        {
          title: "Głos ekspertek",
          text:
            "Rozmowy o danych, diagnostyce, projektowaniu produktów i realnych barierach w opiece zdrowotnej.",
          action: "W przygotowaniu"
        },
        {
          title: "Zaproponuj gościnię",
          text:
            "Znasz osobę, której perspektywa powinna wybrzmieć w Poppy Talks? Napisz do nas.",
          href: `mailto:${links.email}`,
          action: "Napisz"
        }
      ]}
    />
  );
}
