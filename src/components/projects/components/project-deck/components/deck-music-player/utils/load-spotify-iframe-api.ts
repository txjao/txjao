import {
  SPOTIFY_IFRAME_API_SCRIPT_ID,
  SPOTIFY_IFRAME_API_URL,
} from "../consts/music.consts";
import type { SpotifyIframeApi } from "../types/spotify-iframe.types";

let spotifyIframeApiPromise: Promise<SpotifyIframeApi> | null = null;

export function loadSpotifyIframeApi() {
  if (window.spotifyIframeApi) {
    return Promise.resolve(window.spotifyIframeApi);
  }

  if (spotifyIframeApiPromise) return spotifyIframeApiPromise;

  spotifyIframeApiPromise = new Promise<SpotifyIframeApi>((resolve, reject) => {
    const previousReadyHandler = window.onSpotifyIframeApiReady;

    window.onSpotifyIframeApiReady = (api) => {
      window.spotifyIframeApi = api;
      previousReadyHandler?.(api);
      resolve(api);
    };

    const existingScript = document.getElementById(
      SPOTIFY_IFRAME_API_SCRIPT_ID,
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = SPOTIFY_IFRAME_API_SCRIPT_ID;
    script.async = true;
    script.src = SPOTIFY_IFRAME_API_URL;
    script.addEventListener(
      "error",
      () => {
        script.remove();
        reject(new Error("Spotify iFrame API failed to load."));
      },
      { once: true },
    );
    document.body.appendChild(script);
  }).catch((error: unknown) => {
    spotifyIframeApiPromise = null;
    throw error;
  });

  return spotifyIframeApiPromise;
}
