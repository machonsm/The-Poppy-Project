export type SpotifyPlaybackEvent = {
  data: { isPaused: boolean; isBuffering: boolean; playingURI?: string };
};

export type SpotifyController = {
  togglePlay: () => void;
  destroy: () => void;
  addListener: {
    (event: "ready", callback: () => void): void;
    (event: "playback_update", callback: (event: SpotifyPlaybackEvent) => void): void;
  };
};

type SpotifyIframeAPI = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width: string; height: number },
    callback: (controller: SpotifyController) => void
  ) => void;
};

declare global {
  interface Window { onSpotifyIframeApiReady?: (api: SpotifyIframeAPI) => void; }
}

let apiPromise: Promise<SpotifyIframeAPI> | undefined;

// One official API script per page. No tokens, account login or audio copies.
export function loadSpotifyIframeAPI() {
  if (!apiPromise) apiPromise = new Promise<SpotifyIframeAPI>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Spotify API unavailable")), 12000);
    window.onSpotifyIframeApiReady = api => { window.clearTimeout(timeout); resolve(api); };
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    script.onerror = () => { window.clearTimeout(timeout); reject(new Error("Spotify API blocked")); };
    document.body.appendChild(script);
  });
  return apiPromise;
}
