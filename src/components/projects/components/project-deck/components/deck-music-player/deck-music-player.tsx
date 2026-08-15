"use client";

import { useRef, useState } from "react";
import {
  NextTrackIcon,
  PauseIcon,
  PlayIcon,
  PreviousTrackIcon,
  SpotifyIcon,
} from "@/src/components/icons";
import { SPOTIFY_URL } from "@/src/consts/url.consts";
import type { IMusicPlayerTexts } from "@/src/types/language-types";
import { MUSIC_TRACKS } from "./consts/music.consts";
import styles from "./styles/deck-music-player.module.css";

interface DeckMusicPlayerProps {
  texts: IMusicPlayerTexts;
}

type TrackDirection = -1 | 1;

function getWrappedTrackIndex(
  currentIndex: number,
  direction: TrackDirection,
  totalTracks: number,
) {
  return (currentIndex + direction + totalTracks) % totalTracks;
}

export function DeckMusicPlayer({ texts }: DeckMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasPlaybackError, setHasPlaybackError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = MUSIC_TRACKS[currentTrackIndex] ?? null;
  const hasAudioPreview = Boolean(currentTrack?.audioUrl);
  const hasMultipleTracks = MUSIC_TRACKS.length > 1;
  const spotifyUrl = currentTrack?.spotifyUrl ?? SPOTIFY_URL;
  const visibleTitle = currentTrack?.title ?? texts.emptyTitle;
  const isPlaybackUnavailable = !hasAudioPreview || hasPlaybackError;

  function handleTrackChange(direction: TrackDirection) {
    if (!hasMultipleTracks) return;

    const nextTrackIndex = getWrappedTrackIndex(
      currentTrackIndex,
      direction,
      MUSIC_TRACKS.length,
    );

    audioRef.current?.pause();
    setCurrentTrackIndex(nextTrackIndex);
    setHasPlaybackError(false);
    setIsPlaying(false);
  }

  function handlePreviousTrack() {
    handleTrackChange(-1);
  }

  function handleNextTrack() {
    handleTrackChange(1);
  }

  async function handlePlaybackToggle() {
    const audio = audioRef.current;
    const shouldSkipPlayback = !audio || !hasAudioPreview;
    if (shouldSkipPlayback) return;

    const shouldPausePlayback = !audio.paused;
    if (shouldPausePlayback) {
      audio.pause();
      return;
    }

    setHasPlaybackError(false);

    try {
      await audio.play();
    } catch {
      setHasPlaybackError(true);
      setIsPlaying(false);
    }
  }

  return (
    <section
      aria-label={texts.playerLabel}
      className={styles.musicPlayer}
      data-playing={isPlaying}
    >
      <div className={styles.musicVisualizer} aria-hidden="true">
        <span className={styles.musicWave} />
        <span className={styles.musicWave} />
        <span className={styles.musicWave} />
      </div>

      <div className={styles.musicContent}>
        <div className="min-w-0">
          <a
            aria-label={`${texts.openOnSpotifyLabel}: ${visibleTitle}`}
            className={styles.musicTitleLink}
            href={spotifyUrl}
            rel="noreferrer"
            target="_blank"
          >
            <span>{visibleTitle}</span>
            <SpotifyIcon className="size-4 shrink-0 text-[var(--music-accent)]" />
          </a>

          {currentTrack?.artist && (
            <p className={styles.musicArtist}>{currentTrack.artist}</p>
          )}

          {hasPlaybackError && (
            <p className={styles.musicError} role="status">
              {texts.playbackUnavailableLabel}
            </p>
          )}
        </div>

        <div className={styles.musicControls}>
          <button
            aria-label={texts.previousTrackLabel}
            className={styles.musicControl}
            disabled={!hasMultipleTracks}
            type="button"
            onClick={handlePreviousTrack}
          >
            <PreviousTrackIcon className={styles.musicControlIcon} />
          </button>

          <button
            aria-label={isPlaying ? texts.pauseLabel : texts.playLabel}
            className={`${styles.musicControl} ${styles.musicControlPrimary}`}
            disabled={isPlaybackUnavailable}
            type="button"
            onClick={handlePlaybackToggle}
          >
            {isPlaying ? (
              <PauseIcon className={styles.musicControlIcon} />
            ) : (
              <PlayIcon className={styles.musicControlIcon} />
            )}
          </button>

          <button
            aria-label={texts.nextTrackLabel}
            className={styles.musicControl}
            disabled={!hasMultipleTracks}
            type="button"
            onClick={handleNextTrack}
          >
            <NextTrackIcon className={styles.musicControlIcon} />
          </button>
        </div>
      </div>

      {currentTrack?.audioUrl && (
        <audio
          className="hidden"
          key={currentTrack.id}
          ref={audioRef}
          preload="metadata"
          src={currentTrack.audioUrl}
          onEnded={() => setIsPlaying(false)}
          onError={() => setHasPlaybackError(true)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
      )}
    </section>
  );
}
