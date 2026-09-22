import type { Metadata } from "next";
import { PoppyPodcastPage } from "@/components/PoppyPodcastPage";

export const metadata: Metadata = {
  title: "FemTech 101: Podcast FemTech po Polsku",
  description: "FemTech 101: Podcast FemTech po Polsku. Rozmowy o zdrowiu kobiet i innowacjach. Odkryj odcinki i słuchaj przez odtwarzacze Spotify bezpośrednio na stronie.",
  alternates: {
    canonical: "/podcast"
  }
};

export default function PodcastPage() {
  return <PoppyPodcastPage />;
}
