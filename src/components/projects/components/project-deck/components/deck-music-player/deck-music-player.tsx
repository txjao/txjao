"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  MinimizeIcon,
  MusicNoteIcon,
  NextTrackIcon,
  PauseIcon,
  PlayIcon,
  PreviousTrackIcon,
  SpotifyIcon,
} from "@/src/components/icons";
import type { IMusicPlayerTexts } from "@/src/types/language-types";
import {
  getSpotifyTrackUri,
  SPOTIFY_PLAYLIST_URL,
  SPOTIFY_TRACKS,
} from "./consts/music.consts";
import styles from "./styles/deck-music-player.module.css";
import type { MusicTrack } from "./types/music.types";
import type { SpotifyIframeController } from "./types/spotify-iframe.types";
import { loadSpotifyIframeApi } from "./utils/load-spotify-iframe-api";

interface DeckMusicPlayerProps {
  texts: IMusicPlayerTexts;
}

interface PlayerControlsProps {
  disabled: boolean;
  isPlaybackPending: boolean;
  isPlaying: boolean;
  previousDisabled: boolean;
  texts: IMusicPlayerTexts;
  onNext: () => void;
  onPrevious: () => void;
  onTogglePlayback: () => void;
}

interface TrackMetadataProps {
  direction: TrackChangeDirection;
  durationSeconds: number;
  hasPlayerError: boolean;
  positionSeconds: number;
  texts: IMusicPlayerTexts;
  track: MusicTrack;
  transitionId: number;
}

type MusicOverflowStyle = CSSProperties & {
  "--overflow-distance": string;
  "--overflow-duration": string;
};

type PlaybackPendingReason = "buffering" | "play" | "track-change";

type PlayerStatus = "error" | "loading" | "ready";

type TrackChangeDirection = "next" | "none" | "previous";

const DECK_VISIBILITY_THRESHOLD = 0.35;
const PLAYBACK_PENDING_TIMEOUT_MS = 10_000;
const SPOTIFY_HIDDEN_EMBED_SIZE = 1;

function getOverflowDuration(distance: number) {
  return Math.min(4.25, Math.max(1.35, distance / 52));
}

function formatPlaybackTime(totalSeconds: number) {
  const safeSeconds = Number.isFinite(totalSeconds)
    ? Math.max(0, totalSeconds)
    : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = Math.floor(safeSeconds % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function useOverflowDistance(content: string) {
  const textRef = useRef<HTMLSpanElement>(null);
  const viewportRef = useRef<HTMLSpanElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const text = textRef.current;
    const viewport = viewportRef.current;
    if (!text || !viewport) return;

    const measureOverflow = () => {
      const nextDistance = Math.max(0, text.scrollWidth - viewport.clientWidth);
      setDistance((currentDistance) =>
        currentDistance === nextDistance ? currentDistance : nextDistance,
      );
    };

    measureOverflow();
    if (!("ResizeObserver" in window)) return;

    const resizeObserver = new ResizeObserver(measureOverflow);
    resizeObserver.observe(text);
    resizeObserver.observe(viewport);

    return () => resizeObserver.disconnect();
  }, [content]);

  return { distance, textRef, viewportRef };
}

function MusicVisualizer() {
  return (
    <div className={styles.musicVisualizer} aria-hidden="true">
      <span className={styles.musicWave} />
      <span className={styles.musicWave} />
      <span className={styles.musicWave} />
    </div>
  );
}

function TrackMetadata({
  direction,
  durationSeconds,
  hasPlayerError,
  positionSeconds,
  texts,
  track,
  transitionId,
}: TrackMetadataProps) {
  const artistText = hasPlayerError
    ? texts.playbackUnavailableLabel
    : track.artist;
  const artistOverflow = useOverflowDistance(artistText);
  const titleOverflow = useOverflowDistance(track.title);
  const hasArtistOverflow = artistOverflow.distance > 0;
  const hasPlaybackTime = durationSeconds > 0 && !hasPlayerError;
  const hasTitleOverflow = titleOverflow.distance > 0;
  const artistStyle: MusicOverflowStyle = {
    "--overflow-distance": `${artistOverflow.distance}px`,
    "--overflow-duration": `${getOverflowDuration(artistOverflow.distance)}s`,
  };
  const titleStyle: MusicOverflowStyle = {
    "--overflow-distance": `${titleOverflow.distance}px`,
    "--overflow-duration": `${getOverflowDuration(titleOverflow.distance)}s`,
  };

  return (
    <div
      key={`${track.spotifyId}-${transitionId}`}
      className={styles.musicMetadata}
      data-direction={direction}
    >
      <a
        aria-label={`${texts.openOnSpotifyLabel}: ${track.title}`}
        className={styles.musicTitleLink}
        href={SPOTIFY_PLAYLIST_URL}
        rel="noopener noreferrer"
        target="_blank"
        title={track.title}
      >
        <span
          ref={titleOverflow.viewportRef}
          className={styles.musicTitleViewport}
          data-overflow={hasTitleOverflow}
        >
          <span
            ref={titleOverflow.textRef}
            className={styles.musicTitleText}
            style={titleStyle}
          >
            {track.title}
          </span>
        </span>
        <SpotifyIcon className="size-4 shrink-0 text-[var(--music-accent)]" />
      </a>

      <div className={styles.musicSecondaryRow}>
        <p
          aria-live="polite"
          className={
            hasPlayerError ? styles.musicError : styles.musicArtistContainer
          }
          role={hasPlayerError ? "status" : undefined}
          tabIndex={hasArtistOverflow && !hasPlayerError ? 0 : undefined}
          title={artistText}
        >
          {hasPlayerError ? (
            artistText
          ) : (
            <span
              ref={artistOverflow.viewportRef}
              className={styles.musicArtistViewport}
              data-overflow={hasArtistOverflow}
            >
              <span
                ref={artistOverflow.textRef}
                className={styles.musicArtist}
                style={artistStyle}
              >
                {artistText}
              </span>
            </span>
          )}
        </p>

        {hasPlaybackTime && (
          <span aria-hidden="true" className={styles.playbackTime}>
            {formatPlaybackTime(positionSeconds)} /{" "}
            {formatPlaybackTime(durationSeconds)}
          </span>
        )}
      </div>
    </div>
  );
}

function PlayerControls({
  disabled,
  isPlaybackPending,
  isPlaying,
  previousDisabled,
  texts,
  onNext,
  onPrevious,
  onTogglePlayback,
}: PlayerControlsProps) {
  const playbackLabel = isPlaybackPending
    ? texts.bufferingLabel
    : isPlaying
      ? texts.pauseLabel
      : texts.playLabel;

  return (
    <div className={styles.musicControls}>
      <button
        aria-label={texts.previousTrackLabel}
        className={styles.musicControl}
        disabled={disabled || previousDisabled}
        type="button"
        onClick={onPrevious}
      >
        <PreviousTrackIcon className={styles.musicControlIcon} />
      </button>

      <button
        aria-busy={isPlaybackPending}
        aria-label={playbackLabel}
        className={`${styles.musicControl} ${styles.musicControlPrimary}`}
        disabled={disabled}
        type="button"
        onClick={onTogglePlayback}
      >
        {isPlaybackPending ? (
          <span className={styles.controlSpinner} aria-hidden="true" />
        ) : isPlaying ? (
          <PauseIcon className={styles.musicControlIcon} />
        ) : (
          <PlayIcon className={styles.musicControlIcon} />
        )}
      </button>

      <button
        aria-label={texts.nextTrackLabel}
        className={styles.musicControl}
        disabled={disabled}
        type="button"
        onClick={onNext}
      >
        <NextTrackIcon className={styles.musicControlIcon} />
      </button>
    </div>
  );
}

function LoadingOverlay({
  children,
  isVisible,
}: {
  children: ReactNode;
  isVisible: boolean;
}) {
  if (!isVisible) return null;

  return (
    <div aria-live="polite" className={styles.loadingOverlay} role="status">
      <span className={styles.loadingSpinner} aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export function DeckMusicPlayer({ texts }: DeckMusicPlayerProps) {
  const controllerRef = useRef<SpotifyIframeController | null>(null);
  const deckPlayerRef = useRef<HTMLElement>(null);
  const iframeMountRef = useRef<HTMLDivElement>(null);
  const isPlaybackPendingRef = useRef(false);
  const currentTrackIndexRef = useRef(0);
  const displayedTrackUriRef = useRef<string | null>(null);
  const pendingDirectionRef = useRef<TrackChangeDirection>("none");
  const pendingReasonRef = useRef<PlaybackPendingReason | null>(null);
  const pendingTimeoutRef = useRef<number | null>(null);
  const pendingTrackIndexRef = useRef<number | null>(null);
  const pendingTrackUriRef = useRef<string | null>(null);
  const trackHistoryRef = useRef<number[]>([]);
  const [canGoToPreviousTrack, setCanGoToPreviousTrack] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasDeckPlayerBeenVisible, setHasDeckPlayerBeenVisible] =
    useState(false);
  const [initialTrackIndex, setInitialTrackIndex] = useState<number | null>(
    null,
  );
  const [isDeckPlayerVisible, setIsDeckPlayerVisible] = useState(true);
  const [isFloatingExpanded, setIsFloatingExpanded] = useState(false);
  const [isPlaybackPending, setIsPlaybackPending] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPortalReady, setIsPortalReady] = useState(false);
  const [metadataDirection, setMetadataDirection] =
    useState<TrackChangeDirection>("none");
  const [metadataTransitionId, setMetadataTransitionId] = useState(0);
  const [playbackPositionSeconds, setPlaybackPositionSeconds] = useState(0);
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>("loading");
  const [trackDurationSeconds, setTrackDurationSeconds] = useState(0);

  const currentTrack = SPOTIFY_TRACKS[currentTrackIndex];
  const hasPlayerError = playerStatus === "error";
  const isPlayerLoading = playerStatus === "loading";
  const isPlayerReady = playerStatus === "ready";
  const shouldDisableControls = !isPlayerReady || isPlaybackPending;
  const shouldShowFloatingPlayer =
    hasDeckPlayerBeenVisible && !isDeckPlayerVisible;

  const clearPlaybackPending = useCallback(() => {
    isPlaybackPendingRef.current = false;
    pendingDirectionRef.current = "none";
    pendingReasonRef.current = null;
    pendingTrackIndexRef.current = null;
    pendingTrackUriRef.current = null;
    setIsPlaybackPending(false);

    if (pendingTimeoutRef.current === null) return;
    window.clearTimeout(pendingTimeoutRef.current);
    pendingTimeoutRef.current = null;
  }, []);

  const startPlaybackPending = useCallback(
    (trackUri: string, reason: PlaybackPendingReason) => {
      isPlaybackPendingRef.current = true;
      pendingReasonRef.current = reason;
      pendingTrackUriRef.current = trackUri;
      setIsPlaybackPending(true);

      if (pendingTimeoutRef.current !== null) {
        window.clearTimeout(pendingTimeoutRef.current);
      }

      pendingTimeoutRef.current = window.setTimeout(
        clearPlaybackPending,
        PLAYBACK_PENDING_TIMEOUT_MS,
      );
    },
    [clearPlaybackPending],
  );

  const commitPendingTrack = useCallback(
    (playingUri: string, position = 0, duration = 0) => {
      const pendingDirection = pendingDirectionRef.current;
      const pendingTrackIndex = pendingTrackIndexRef.current;
      const isExpectedTrack = pendingTrackUriRef.current === playingUri;
      const hasPendingTrack = pendingTrackIndex !== null;
      const shouldCommitTrack = isExpectedTrack && hasPendingTrack;
      if (!shouldCommitTrack) return false;

      const isPreviousNavigation = pendingDirection === "previous";
      if (isPreviousNavigation) {
        trackHistoryRef.current = trackHistoryRef.current.slice(0, -1);
      } else {
        trackHistoryRef.current = [
          ...trackHistoryRef.current,
          pendingTrackIndex,
        ];
      }

      currentTrackIndexRef.current = pendingTrackIndex;
      displayedTrackUriRef.current = playingUri;
      setCanGoToPreviousTrack(trackHistoryRef.current.length > 1);
      setCurrentTrackIndex(pendingTrackIndex);
      setMetadataDirection(pendingDirection);
      setMetadataTransitionId((currentId) => currentId + 1);
      setPlaybackPositionSeconds(Math.floor(position / 1000));
      setTrackDurationSeconds(Math.floor(duration / 1000));
      clearPlaybackPending();

      return true;
    },
    [clearPlaybackPending],
  );

  useEffect(() => {
    const randomTrackIndex = Math.floor(Math.random() * SPOTIFY_TRACKS.length);

    currentTrackIndexRef.current = randomTrackIndex;
    displayedTrackUriRef.current = getSpotifyTrackUri(
      SPOTIFY_TRACKS[randomTrackIndex].spotifyId,
    );
    trackHistoryRef.current = [randomTrackIndex];
    setCurrentTrackIndex(randomTrackIndex);
    setInitialTrackIndex(randomTrackIndex);
    setIsPortalReady(true);
  }, []);

  useEffect(
    () => () => {
      if (pendingTimeoutRef.current !== null) {
        window.clearTimeout(pendingTimeoutRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const deckPlayer = deckPlayerRef.current;
    if (!deckPlayer || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hasMeaningfulVisibility =
          entry.isIntersecting &&
          entry.intersectionRatio >= DECK_VISIBILITY_THRESHOLD;

        setIsDeckPlayerVisible(hasMeaningfulVisibility);
        if (hasMeaningfulVisibility) setHasDeckPlayerBeenVisible(true);
      },
      { threshold: [0, DECK_VISIBILITY_THRESHOLD] },
    );

    observer.observe(deckPlayer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldShowFloatingPlayer) return;
    setIsFloatingExpanded(false);
  }, [shouldShowFloatingPlayer]);

  useEffect(() => {
    const iframeMount = iframeMountRef.current;
    const hasInitialTrack = initialTrackIndex !== null;
    if (!iframeMount || !hasInitialTrack) return;

    let isEffectActive = true;

    const configureIframe = () => {
      const iframe = iframeMount.querySelector("iframe");
      iframe?.setAttribute("aria-hidden", "true");
      iframe?.setAttribute("tabindex", "-1");
      iframe?.setAttribute("title", texts.playerLabel);
    };

    const isDisplayedTrack = (playingUri: string) =>
      displayedTrackUriRef.current === playingUri;

    const syncPlaybackTime = (position: number, duration: number) => {
      const nextPositionSeconds = Math.floor(position / 1000);
      const nextDurationSeconds = Math.floor(duration / 1000);

      setPlaybackPositionSeconds((currentPosition) =>
        currentPosition === nextPositionSeconds
          ? currentPosition
          : nextPositionSeconds,
      );
      setTrackDurationSeconds((currentDuration) =>
        currentDuration === nextDurationSeconds
          ? currentDuration
          : nextDurationSeconds,
      );
    };

    const handleControllerCreated = (controller: SpotifyIframeController) => {
      if (!isEffectActive) {
        controller.destroy();
        return;
      }

      controllerRef.current = controller;
      configureIframe();

      controller.addListener("ready", () => {
        if (!isEffectActive) return;
        configureIframe();
        setPlayerStatus("ready");
      });
      controller.addListener("playback_started", ({ data }) => {
        if (!isEffectActive) return;

        const pendingReason = pendingReasonRef.current;
        const isExpectedTrack =
          pendingTrackUriRef.current === data.playingURI;
        const didCommitTrack = commitPendingTrack(data.playingURI);
        const shouldResolveCurrentPlayback =
          isExpectedTrack &&
          pendingReason !== "track-change" &&
          isDisplayedTrack(data.playingURI);

        if (shouldResolveCurrentPlayback) clearPlaybackPending();
        if (didCommitTrack || isDisplayedTrack(data.playingURI)) {
          setIsPlaying(true);
        }
      });
      controller.addListener("playback_update", ({ data }) => {
        if (!isEffectActive) return;

        const pendingReason = pendingReasonRef.current;
        const isExpectedTrack =
          pendingTrackUriRef.current === data.playingURI;
        const hasPendingTrackChange =
          pendingTrackIndexRef.current !== null;
        const hasResolvedPendingPlayback =
          pendingReason === "play"
            ? !data.isBuffering && !data.isPaused
            : !data.isBuffering;
        const shouldCommitTrack =
          hasPendingTrackChange &&
          isExpectedTrack &&
          hasResolvedPendingPlayback;

        if (hasPendingTrackChange) {
          if (!shouldCommitTrack) return;

          commitPendingTrack(
            data.playingURI,
            data.position,
            data.duration,
          );
          setIsPlaying(!data.isPaused);
          return;
        }

        const shouldIgnoreStaleUpdate = !isDisplayedTrack(data.playingURI);
        if (shouldIgnoreStaleUpdate) return;

        const shouldStartBufferingState =
          data.isBuffering && !isPlaybackPendingRef.current;
        const shouldClearBufferingState =
          isPlaybackPendingRef.current &&
          isExpectedTrack &&
          hasResolvedPendingPlayback;

        syncPlaybackTime(data.position, data.duration);
        setIsPlaying(!data.isPaused);

        if (shouldStartBufferingState) {
          startPlaybackPending(data.playingURI, "buffering");
        }
        if (shouldClearBufferingState) clearPlaybackPending();
      });
    };

    const initialTrack = SPOTIFY_TRACKS[initialTrackIndex];

    void loadSpotifyIframeApi()
      .then((api) => {
        if (!isEffectActive) return;

        api.createController(
          iframeMount,
          {
            height: SPOTIFY_HIDDEN_EMBED_SIZE,
            uri: getSpotifyTrackUri(initialTrack.spotifyId),
            width: SPOTIFY_HIDDEN_EMBED_SIZE,
          },
          handleControllerCreated,
        );
      })
      .catch(() => {
        if (!isEffectActive) return;
        setPlayerStatus("error");
      });

    return () => {
      isEffectActive = false;
      isPlaybackPendingRef.current = false;
      pendingDirectionRef.current = "none";
      pendingReasonRef.current = null;
      pendingTrackIndexRef.current = null;
      pendingTrackUriRef.current = null;
      controllerRef.current?.destroy();
      controllerRef.current = null;
      iframeMount.replaceChildren();
    };
  }, [
    clearPlaybackPending,
    commitPendingTrack,
    initialTrackIndex,
    startPlaybackPending,
    texts.playerLabel,
  ]);

  function handlePlaybackToggle() {
    const controller = controllerRef.current;
    const shouldSkipPlayback =
      !isPlayerReady || !controller || isPlaybackPendingRef.current;
    if (shouldSkipPlayback) return;

    const shouldWaitForPlayback = !isPlaying;
    if (shouldWaitForPlayback) {
      startPlaybackPending(
        getSpotifyTrackUri(currentTrack.spotifyId),
        "play",
      );
    }

    controller.togglePlay();
  }

  function loadTrack(
    trackIndex: number,
    direction: Exclude<TrackChangeDirection, "none">,
  ) {
    const controller = controllerRef.current;
    const shouldSkipTrackChange =
      !isPlayerReady || !controller || isPlaybackPendingRef.current;
    if (shouldSkipTrackChange) return;

    const track = SPOTIFY_TRACKS[trackIndex];
    const trackUri = getSpotifyTrackUri(track.spotifyId);

    pendingDirectionRef.current = direction;
    pendingTrackIndexRef.current = trackIndex;
    startPlaybackPending(trackUri, "track-change");
    controller.loadEntity(trackUri);
    if (isPlaying) controller.play();
  }

  function handleNextTrack() {
    const selectableTrackCount = SPOTIFY_TRACKS.length - 1;
    const randomCandidate = Math.floor(Math.random() * selectableTrackCount);
    const currentIndex = currentTrackIndexRef.current;
    const nextTrackIndex =
      randomCandidate >= currentIndex ? randomCandidate + 1 : randomCandidate;

    loadTrack(nextTrackIndex, "next");
  }

  function handlePreviousTrack() {
    const previousTrackIndex = trackHistoryRef.current.at(-2);
    const hasPreviousTrack = previousTrackIndex !== undefined;
    if (!hasPreviousTrack) return;

    loadTrack(previousTrackIndex, "previous");
  }

  const controls = (
    <PlayerControls
      disabled={shouldDisableControls}
      isPlaybackPending={isPlaybackPending}
      isPlaying={isPlaying}
      previousDisabled={!canGoToPreviousTrack}
      texts={texts}
      onNext={handleNextTrack}
      onPrevious={handlePreviousTrack}
      onTogglePlayback={handlePlaybackToggle}
    />
  );

  const metadata = (
    <TrackMetadata
      direction={metadataDirection}
      durationSeconds={trackDurationSeconds}
      hasPlayerError={hasPlayerError}
      positionSeconds={playbackPositionSeconds}
      texts={texts}
      track={currentTrack}
      transitionId={metadataTransitionId}
    />
  );

  return (
    <section
      ref={deckPlayerRef}
      aria-label={texts.playerLabel}
      className={styles.deckPlayerAnchor}
    >
      <div
        className={styles.musicPlayer}
        data-loading={isPlayerLoading}
        data-playing={isPlaying}
      >
        <MusicVisualizer />
        <div className={styles.musicContent}>
          {metadata}
          {controls}
        </div>
        <LoadingOverlay isVisible={isPlayerLoading}>
          {texts.loadingLabel}
        </LoadingOverlay>
      </div>

      <div
        ref={iframeMountRef}
        aria-hidden="true"
        className={styles.spotifyIframeMount}
      />

      {isPortalReady &&
        createPortal(
          <aside
            aria-hidden={!shouldShowFloatingPlayer}
            aria-label={texts.floatingPlayerLabel}
            className={styles.floatingPlayer}
            data-expanded={isFloatingExpanded}
            data-visible={shouldShowFloatingPlayer}
          >
            <button
              aria-expanded={isFloatingExpanded}
              aria-label={texts.expandPlayerLabel}
              className={`${styles.floatingLauncher} focus-ring hover-highlight`}
              type="button"
              onClick={() => setIsFloatingExpanded(true)}
            >
              <MusicNoteIcon className={styles.floatingLauncherIcon} />
            </button>

            <div
              aria-hidden={!isFloatingExpanded}
              className={styles.floatingPlayerSurface}
              data-loading={isPlayerLoading}
              inert={!isFloatingExpanded}
              data-playing={isPlaying}
            >
              <MusicVisualizer />

              <div className={styles.floatingPanelContent}>
                <div className={styles.floatingHeader}>
                  {metadata}
                  <button
                    aria-label={texts.collapsePlayerLabel}
                    className={`${styles.minimizeControl} focus-ring hover-highlight`}
                    type="button"
                    onClick={() => setIsFloatingExpanded(false)}
                  >
                    <MinimizeIcon className={styles.minimizeControlIcon} />
                  </button>
                </div>

                <div className={styles.floatingControls}>{controls}</div>
              </div>

              <LoadingOverlay isVisible={isPlayerLoading}>
                {texts.loadingLabel}
              </LoadingOverlay>
            </div>
          </aside>,
          document.body,
        )}
    </section>
  );
}
