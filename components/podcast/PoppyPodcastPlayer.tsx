"use client";

import { ArrowUpRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PoppyLanguage } from "@/components/PoppyChrome";
import { spotifyEmbedUrl, spotifyEpisodeUrl, type PodcastEpisode } from "@/data/podcasts";
import { loadSpotifyIframeAPI, type SpotifyController } from "./spotify-embed";

export function PoppyPodcastPlayer({ episode, language }: { episode: PodcastEpisode; language: PoppyLanguage }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<SpotifyController | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [playback, setPlayback] = useState({ paused: true, buffering: false });
  const pl = language === "pl";
  const spinning = !playback.paused && !playback.buffering;

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let finished = false;
    let instance: SpotifyController | undefined;
    let readyTimeout: number | undefined;
    const mount = document.createElement("div");
    container.replaceChildren(mount);

    const fallback = () => {
      if (disposed || finished) return;
      finished = true;
      window.clearTimeout(readyTimeout);
      controller.current = null;
      instance?.destroy();
      instance = undefined;
      const frame = document.createElement("iframe");
      frame.src = spotifyEmbedUrl(episode.id);
      frame.title = `Spotify — ${episode.title}`;
      frame.width = "100%";
      frame.height = "152";
      frame.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      container.replaceChildren(frame);
      setStatus("fallback");
    };

    loadSpotifyIframeAPI().then(api => {
      if (disposed) return;
      readyTimeout = window.setTimeout(fallback, 12000);
      api.createController(mount, { uri: `spotify:episode:${episode.id}`, width: "100%", height: 152 }, created => {
        if (disposed || finished) { created.destroy(); return; }
        instance = created;
        controller.current = created;
        const frame = container.querySelector("iframe");
        if (frame) frame.title = `Spotify — ${episode.title}`;
        created.addListener("ready", () => {
          if (disposed || finished) return;
          window.clearTimeout(readyTimeout);
          setStatus("ready");
        });
        created.addListener("playback_update", event => {
          if (disposed || finished || typeof event.data?.isPaused !== "boolean" || typeof event.data?.isBuffering !== "boolean") return;
          const { isPaused: paused, isBuffering: buffering } = event.data;
          // The visual follows real playback, never a pretend progress timer.
          setPlayback(previous => previous.paused === paused && previous.buffering === buffering ? previous : { paused, buffering });
        });
      });
    }).catch(fallback);

    return () => {
      disposed = true;
      window.clearTimeout(readyTimeout);
      controller.current = null;
      instance?.destroy();
      container.replaceChildren();
    };
  }, [episode.id, episode.title]);

  return <div className={`pp-podcast-player${spinning ? " is-playing" : ""}`} data-episode-id={episode.id}>
    <div className="pp-record-scene">
      <div className="pp-record-machine" aria-hidden="true">
        <div className="pp-record-machine__top"><span className="pp-record-speaker" /><span>Poppy Project</span><i className="pp-record-light" /></div>
        <div className="pp-record-well">
          <div className="pp-record-disc"><div className="pp-record-label"><Image src="/femtech-po-polsku.webp" alt="" width={2048} height={2048} sizes="180px" priority /></div></div>
          <span className="pp-record-spindle" />
        </div>
        <div className="pp-record-machine__bottom"><span>{pl ? "Wiedza. Głos. Zmiana." : "Knowledge. Voice. Change."}</span><span>● ● ●</span></div>
      </div>
      <button className="pp-record-cord" type="button" disabled={status !== "ready"} aria-label={playback.paused ? (pl ? "Odtwórz odcinek" : "Play episode") : (pl ? "Wstrzymaj odcinek" : "Pause episode")} aria-controls="podcast-spotify-player" onClick={() => controller.current?.togglePlay()}>
        <span className="pp-record-cord__line" aria-hidden="true" />
        <span className="pp-record-cord__handle" aria-hidden="true">{playback.paused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}</span>
      </button>
      <p className="pp-record-hint">{status === "loading" ? (pl ? "Ładowanie Spotify…" : "Loading Spotify…") : status === "fallback" ? (pl ? "Użyj odtwarzacza Spotify poniżej" : "Use the Spotify player below") : (pl ? "Kliknij sznurek. Daj się wciągnąć." : "Pull up a conversation. Click the cord.")}</p>
    </div>
    <div className="pp-podcast-playing">
      <div className="pp-podcast-playing__meta"><span>{pl ? "Odcinek" : "Episode"} {episode.number}</span><span role="status">{playback.buffering ? (pl ? "Buforowanie…" : "Buffering…") : spinning ? (pl ? "Teraz słuchasz" : "Now playing") : (pl ? "W odtwarzaczu" : "Selected episode")}</span></div>
      <h2 id="podcast-player-title">{episode.title}</h2>
    </div>
    <div id="podcast-spotify-player" className="pp-podcast-embed" ref={host} />
    <noscript><iframe src={spotifyEmbedUrl(episode.id)} title={`Spotify — ${episode.title}`} width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" /></noscript>
    <div className="pp-podcast-player__help">
      <a href={spotifyEpisodeUrl(episode.id)} target="_blank" rel="noopener noreferrer">{pl ? "Otwórz odcinek w Spotify" : "Open episode on Spotify"}<ArrowUpRight size={14} aria-hidden="true" /></a>
      <p>{pl ? "Jeśli słyszysz tylko fragment, otwórz odcinek bezpośrednio w Spotify. Odtwarzacz wymaga internetu." : "Only hearing a preview? Open the episode directly on Spotify. The player needs an internet connection."}</p>
    </div>
  </div>;
}
