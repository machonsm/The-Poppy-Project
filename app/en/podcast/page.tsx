import type { Metadata } from "next";
import { PoppyPodcastPage } from "@/components/PoppyPodcastPage";
import { podcastEpisodes, spotifyEpisodeUrl } from "@/data/podcasts";
import { jsonLd, localizedPageMetadata, SITE_URL } from "@/lib/seo";

const description = "FemTech 101 is a Polish-language podcast about women’s health, technology and innovation — accessible and without taboos.";

export const metadata: Metadata = localizedPageMetadata({
  title: "FemTech 101: the FemTech po Polsku podcast",
  description,
  canonical: "/en/podcast/",
  pl: "/podcast/",
  en: "/en/podcast/",
  locale: "en_GB"
});

const podcastSchema = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: "FemTech 101: Podcast FemTech po Polsku",
  url: `${SITE_URL}/podcast/`,
  description,
  inLanguage: "pl-PL",
  publisher: { "@id": `${SITE_URL}/#organization` },
  hasPart: podcastEpisodes.map(episode => ({
    "@type": "PodcastEpisode",
    position: episode.number,
    name: episode.title,
    description: episode.description.en,
    url: spotifyEpisodeUrl(episode.id),
    partOfSeries: { "@type": "PodcastSeries", name: "FemTech 101: Podcast FemTech po Polsku" }
  }))
};

export default function EnglishPodcastPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(podcastSchema) }} />
    <PoppyPodcastPage initialLanguage="en" />
  </>;
}
