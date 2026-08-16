export interface SpotifyIframeControllerOptions {
  height: number;
  uri: string;
  width: number;
}

interface SpotifyPlaybackStartedEvent {
  data: {
    playingURI: string;
  };
}

interface SpotifyPlaybackUpdateEvent {
  data: {
    duration: number;
    isBuffering: boolean;
    isPaused: boolean;
    playingURI: string;
    position: number;
  };
}

export interface SpotifyIframeController {
  addListener(event: "ready", listener: () => void): void;
  addListener(
    event: "playback_started",
    listener: (event: SpotifyPlaybackStartedEvent) => void,
  ): void;
  addListener(
    event: "playback_update",
    listener: (event: SpotifyPlaybackUpdateEvent) => void,
  ): void;
  destroy(): void;
  loadEntity(spotifyUriOrUrl: string): void;
  play(): void;
  togglePlay(): void;
}

export interface SpotifyIframeApi {
  createController(
    element: HTMLElement,
    options: SpotifyIframeControllerOptions,
    callback: (controller: SpotifyIframeController) => void,
  ): void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
    spotifyIframeApi?: SpotifyIframeApi;
  }
}
