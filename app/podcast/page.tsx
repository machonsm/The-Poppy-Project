import type { Metadata } from "next";
import { PoppyPodcastPage } from "@/components/PoppyPodcastPage";

export const metadata: Metadata = {
  title: "FemTech po Polsku by Poppy Project — Podcast",
  description: "FemTech po Polsku by Poppy Project — podcast o zdrowiu kobiet i innowacjach. Wybierz jeden z pięciu odcinków i posłuchaj bezpośrednio na stronie przez Spotify.",
  alternates: {
    canonical: "/podcast"
  }
};

export default function PodcastPage() {
  return <PoppyPodcastPage />;
}
