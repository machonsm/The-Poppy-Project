"use client";

import { ArrowDown, ArrowUpRight, Headphones } from "lucide-react";
import Image from "next/image";
import { PoppyFooter, PoppyHeader } from "@/components/PoppyChrome";
import { podcastEpisodes, spotifyEmbedUrl, spotifyEpisodeUrl } from "@/data/podcasts";
import { links } from "@/data/links";
import { FluidLink } from "@/components/ui/FluidButton";
import { sitePath } from "@/lib/site-path";
import { usePoppyLanguage } from "@/lib/use-poppy-language";
import type { PoppyLanguage } from "@/lib/language-routes";
import "./podcast-page.css";

const copy = {
  pl: {
    title: <>FemTech 101: <em>Podcast FemTech po Polsku</em></>,
    intro: "Zdrowie kobiet, innowacje i pytania, od których zaczyna się zmiana. Rozmawiamy o FemTechu po polsku — przystępnie i bez tabu!",
    language: "Rozmowy po polsku", browse: "Wybierz odcinek", spotify: "Słuchaj na Spotify",
    episode: "Odcinek", episodesLabel: "Odcinki podcastu", direct: "Otwórz w Spotify",
    artwork: "FemTech po Polsku — ilustracja podcastu o zdrowiu kobiet",
    invite: "Masz temat, który warto usłyszeć?", inviteIntro: "Dobre rozmowy zaczynają się od dobrych pytań. Podziel się swoim.", contact: "Napisz do nas",
  },
  en: {
    title: <>FemTech 101: <em>the FemTech po Polsku podcast</em></>,
    intro: "Women’s health, innovation and the questions that spark change. Exploring FemTech in Polish — with curiosity, clarity and no taboos.",
    language: "Conversations in Polish", browse: "Choose an episode", spotify: "Listen on Spotify",
    episode: "Episode", episodesLabel: "Podcast episodes", direct: "Open in Spotify",
    artwork: "FemTech po Polsku — women’s health podcast artwork",
    invite: "Have a topic we should talk about?", inviteIntro: "Good conversations start with good questions. Share yours with us.", contact: "Email us",
  }
};

export function PoppyPodcastPage({ initialLanguage = "pl" }: { initialLanguage?: PoppyLanguage }) {
  const [language, setLanguage] = usePoppyLanguage(initialLanguage);
  const c = copy[language];

  return <div className="pp-site pp-podcast-page">
    <PoppyHeader language={language} onLanguageChange={setLanguage} />
    <main id="main-content">
      <div className="pp-container pp-podcast-stage">
        <section className="pp-podcast-hero" aria-labelledby="podcast-title">
          <div className="pp-podcast-intro">
            <p className="pp-podcast-language"><Headphones size={18} aria-hidden="true" />{c.language}</p>
            <h1 id="podcast-title">{c.title}</h1>
            <p className="pp-podcast-intro__text">{c.intro}</p>
            <div className="pp-podcast-intro__actions">
              <FluidLink href="#odcinki">{c.browse}<ArrowDown size={18} aria-hidden="true" /></FluidLink>
              <a className="pp-podcast-text-link" href={links.spotify} target="_blank" rel="noopener noreferrer">{c.spotify}<ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className="pp-podcast-artwork">
            <div className="pp-podcast-artwork__image">
              <Image src={sitePath("/femtech-po-polsku.webp")} alt={c.artwork} width={2048} height={2048} sizes="(max-width: 760px) 84vw, (max-width: 1100px) 38vw, 430px" priority />
            </div>
            <figcaption><span>FemTech po Polsku</span><span>by Poppy Project</span></figcaption>
          </figure>
        </section>

        <section className="pp-podcast-episodes" id="odcinki" aria-label={c.episodesLabel}>
          <div className="pp-podcast-list">
            {podcastEpisodes.map((episode, index) => (
              <article className="pp-episode" key={episode.id} aria-labelledby={"episode-" + episode.id}>
                <div className="pp-episode__copy">
                  <div className="pp-episode__meta"><span>{c.episode} {String(episode.number).padStart(2, "0")}</span></div>
                  <h3 id={"episode-" + episode.id}>{episode.title}</h3>
                  <p>{episode.description[language]}</p>
                  <a className="pp-podcast-text-link" href={spotifyEpisodeUrl(episode.id)} target="_blank" rel="noopener noreferrer" aria-label={c.direct + ": " + episode.title}>{c.direct}<ArrowUpRight size={17} aria-hidden="true" /></a>
                </div>
                <div className="pp-episode__player">
                  <iframe
                    src={spotifyEmbedUrl(episode.id)}
                    title={"Spotify — " + c.episode + " " + episode.number + ": " + episode.title}
                    width="100%"
                    height="352"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading={index === 0 ? "eager" : "lazy"}
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="pp-podcast-invite">
          <div><h2>{c.invite}</h2><p>{c.inviteIntro}</p></div>
          <FluidLink href={"mailto:" + links.email}>{c.contact}<ArrowUpRight size={18} aria-hidden="true" /></FluidLink>
        </div>
      </div>
    </main>
    <PoppyFooter language={language} />
  </div>;
}
