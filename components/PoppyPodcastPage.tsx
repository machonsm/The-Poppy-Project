"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation supports the static export. */

import { ArrowUpRight, Check, Headphones } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PoppyFooter, PoppyHeader, type PoppyLanguage } from "@/components/PoppyChrome";
import { PoppyPodcastPlayer } from "@/components/podcast/PoppyPodcastPlayer";
import { podcastEpisodes, spotifyEpisodeUrl, type PodcastEpisode } from "@/data/podcasts";
import { links } from "@/data/links";
import { FluidLink } from "@/components/ui/FluidButton";
import "./podcast-page.css";

const copy = {
  pl: {
    title: <>Włącz głos.<br />Otwórz <em>perspektywę.</em></>,
    intro: "FemTech po Polsku by Poppy Project — podcast o zdrowiu kobiet i innowacjach. W Polsce i poza jej granicami. Posłuchaj, co warto wiedzieć.",
    language: "Rozmowy po polsku", browse: "Wybierz odcinek", spotify: "Słuchaj na Spotify",
    episodes: "Do usłyszenia.", episodesIntro: "Od pierwszego pytania o FemTech po tematy, o których wciąż mówimy za mało.",
    episode: "Odcinek", select: "Załaduj w odtwarzaczu", selected: "W odtwarzaczu", direct: "Spotify",
    invite: "Masz temat, który warto usłyszeć?", contact: "Napisz do nas", breadcrumb: "Ścieżka nawigacji",
  },
  en: {
    title: <>Press play.<br />Open your <em>perspective.</em></>,
    intro: "FemTech po Polsku by Poppy Project — a podcast about women’s health and innovation. In Poland and beyond. Find your next conversation.",
    language: "Conversations in Polish", browse: "Choose an episode", spotify: "Listen on Spotify",
    episodes: "Worth a listen.", episodesIntro: "From a first introduction to FemTech to the conversations we need to have more often.",
    episode: "Episode", select: "Load in player", selected: "Selected episode", direct: "Spotify",
    invite: "Have a topic we should talk about?", contact: "Email us", breadcrumb: "Breadcrumb",
  }
};

export function PoppyPodcastPage() {
  const [language, setLanguage] = useState<PoppyLanguage>("pl");
  const [selected, setSelected] = useState<PodcastEpisode>(podcastEpisodes[0]);
  const player = useRef<HTMLElement>(null);
  const c = copy[language];

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  const selectEpisode = (episode: PodcastEpisode) => {
    setSelected(episode);
    // On stacked layouts, bring the selected episode back into view. Selecting
    // never starts audio; the listener chooses play in the cord or Spotify.
    if (!matchMedia("(min-width: 1001px) and (min-height: 850px)").matches) {
      player.current?.focus({ preventScroll: true });
      player.current?.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off" ? "instant" : "smooth" });
    }
  };

  return <div className="pp-site pp-podcast-page">
    <PoppyHeader language={language} onLanguageChange={setLanguage} />
    <main id="main-content">
      <div className="pp-container pp-podcast-stage">
        <nav className="pp-podcast-breadcrumb" aria-label={c.breadcrumb}><a href="/">Poppy Project</a><span aria-hidden="true">/</span><span aria-current="page">Podcast</span></nav>
        <div className="pp-podcast-layout">
          <section className="pp-podcast-intro" aria-labelledby="podcast-title">
            <p className="pp-eyebrow">FemTech po Polsku <span>by Poppy Project</span></p>
            <h1 id="podcast-title">{c.title}</h1>
            <p className="pp-podcast-intro__text">{c.intro}</p>
            <div className="pp-podcast-intro__actions"><FluidLink href="#odcinki">{c.browse}</FluidLink><FluidLink href={links.spotify} target="_blank" rel="noopener noreferrer">{c.spotify}<ArrowUpRight size={17} aria-hidden="true" /></FluidLink></div>
            <span className="pp-podcast-language"><Headphones size={16} aria-hidden="true" />{c.language}</span>
          </section>

          <aside className="pp-podcast-console" ref={player} tabIndex={-1} aria-labelledby="podcast-player-title">
            <PoppyPodcastPlayer key={selected.id} episode={selected} language={language} />
          </aside>

          <section className="pp-podcast-episodes" id="odcinki" aria-labelledby="episodes-title">
            <div className="pp-podcast-episodes__heading"><h2 id="episodes-title">{c.episodes}</h2><span>{podcastEpisodes.length} {language === "pl" ? "odcinków" : "episodes"}</span></div>
            <p className="pp-podcast-episodes__intro">{c.episodesIntro}</p>
            <div className="pp-podcast-list">
              {podcastEpisodes.map(episode => {
                const active = selected.id === episode.id;
                return <article className={`pp-episode${active ? " is-selected" : ""}`} key={episode.id}>
                  <div className="pp-episode__meta"><span>{c.episode} {String(episode.number).padStart(2, "0")}</span><span>{episode.topic[language]}</span></div>
                  <h3>{episode.title}</h3>
                  <p>{episode.description[language]}</p>
                  <div className="pp-episode__actions">
                    <button type="button" aria-pressed={active} aria-label={`${active ? c.selected : c.select}: ${episode.title}`} onClick={() => selectEpisode(episode)}>
                      {active ? <Check size={16} aria-hidden="true" /> : <Headphones size={16} aria-hidden="true" />}<span>{active ? c.selected : c.select}</span>
                    </button>
                    <a href={spotifyEpisodeUrl(episode.id)} target="_blank" rel="noopener noreferrer" aria-label={`${c.spotify}: ${episode.title}`}>{c.direct}<ArrowUpRight size={15} aria-hidden="true" /></a>
                  </div>
                </article>;
              })}
            </div>
          </section>
        </div>
        <div className="pp-podcast-invite"><p>{c.invite}</p><FluidLink href={`mailto:${links.email}`}>{c.contact}<ArrowUpRight size={18} aria-hidden="true" /></FluidLink></div>
      </div>
    </main>
    <PoppyFooter language={language} />
  </div>;
}
