// Episode IDs and subjects from https://www.femtechpo.pl/pl/podcast,
// checked against Spotify's public oEmbed metadata on 16 September 2026.
// Descriptions are short editorial summaries, not new medical advice.
export const podcastEpisodes = [
  {
    id: "2Kg9UgRvbX6Y2gdGcWdjkp", number: 1,
    title: "Co to jest ten FemTech?",
    topic: { pl: "Od podstaw", en: "The essentials" },
    description: {
      pl: "Czym jest FemTech? Rozmawiamy o luce danych, diagnozach i technologiach tworzonych z myślą o kobietach.",
      en: "What is FemTech? A conversation about data gaps, diagnosis and technology designed for women."
    }
  },
  {
    id: "5DxkVGA2dM8h456So5KCLK", number: 2,
    title: "Jaki jest stan zdrowia Polek?",
    topic: { pl: "Zdrowie w Polsce", en: "Health in Poland" },
    description: {
      pl: "Profilaktyka, dostęp do opieki i wyzwania zdrowotne Polek. Gdzie jest miejsce na innowacje?",
      en: "Prevention, access to care and the health challenges facing Polish women. Where can innovation help?"
    }
  },
  {
    id: "1qxSfXeG5HZVYkCDveX93c", number: 3,
    title: "Menopauza w Polsce",
    topic: { pl: "Bez tabu", en: "Beyond taboos" },
    description: {
      pl: "Menopauza bez niedomówień: objawy, codzienność, praca i technologie wspierające kobiety na tym etapie życia.",
      en: "Menopause, openly discussed: symptoms, everyday life, work and technology supporting women through this stage."
    }
  },
  {
    id: "6VrMva8Sfy6Fu0LjnF601Z", number: 4,
    title: "Dlaczego FemTech, a nie MenTech?",
    topic: { pl: "Równość i dane", en: "Equality and data" },
    description: {
      pl: "Jak płeć wpływa na badania i projektowanie? O luce danych oraz innowacjach dla kobiet i mężczyzn.",
      en: "How does gender shape research and design? Exploring data gaps and innovation for women and men."
    }
  },
  {
    id: "2WtaAbe6e9c4QnPEcykT2T", number: 5,
    title: "Zdrowie finansowe kobiet w Polsce",
    topic: { pl: "Sprawczość", en: "Agency" },
    description: {
      pl: "Pieniądze jako część dobrostanu. O oszczędzaniu, inwestowaniu i różnicach w sytuacji finansowej kobiet i mężczyzn.",
      en: "Money as part of wellbeing: saving, investing and differences in women’s and men’s financial circumstances."
    }
  }
] as const;

export type PodcastEpisode = (typeof podcastEpisodes)[number];
export const spotifyEpisodeUrl = (id: string) => `https://open.spotify.com/episode/${id}`;
export const spotifyEmbedUrl = (id: string) => `https://open.spotify.com/embed/episode/${id}?utm_source=generator&theme=0`;
