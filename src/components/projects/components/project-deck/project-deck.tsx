import type { CSSProperties } from "react";
import { ElgatoIcon } from "@/src/components/icons";
import { DeckGrid } from "./components/deck-grid/deck-grid";
import { DeckMusicPlayer } from "./components/deck-music-player/deck-music-player";
import { DeckNavigation } from "./components/deck-navigation/deck-navigation";
import { ProjectDisplay } from "./components/project-display/project-display";
import styles from "./styles/project-deck.module.css";
import type { ProjectDeckProps } from "./types/project-deck.types";

type ProjectAccentStyle = CSSProperties & {
  "--project-accent": string;
};

export function ProjectDeck({
  activeProject,
  currentPage,
  emptySlotCount,
  hasMultiplePages,
  hasNextPage,
  hasPreviousPage,
  pageProjects,
  texts,
  totalPages,
  onNextPage,
  onOpenProject,
  onPreviousPage,
  onPreviewProject,
}: ProjectDeckProps) {
  const accentStyle: ProjectAccentStyle = {
    "--project-accent": activeProject.accent,
  };

  return (
    <div className={styles.layout} style={accentStyle}>
      <div className={styles.deckStage}>
        <div className={styles.deckBody}>
          <div
            aria-label={texts.deckLabel}
            className={styles.deck}
            role="group"
          >
            <div className={styles.deckBevel} aria-hidden="true" />

            <div aria-hidden="true" className={styles.deckBrandTop}>
              <ElgatoIcon className={styles.deckBrandTopIcon} />
              <span>PROJECT DESK</span>
            </div>

            <DeckGrid
              activeProjectId={activeProject.id}
              emptySlotCount={emptySlotCount}
              openProjectLabel={texts.openProjectLabel}
              projects={pageProjects}
              onOpen={onOpenProject}
              onPreview={onPreviewProject}
            />

            <div className={styles.musicDisplayFrame}>
              <DeckMusicPlayer texts={texts.musicPlayer} />
            </div>

            {hasMultiplePages && (
              <DeckNavigation
                currentPage={currentPage}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                nextPageLabel={texts.nextPageLabel}
                pageLabel={texts.pageLabel}
                previousPageLabel={texts.previousPageLabel}
                totalPages={totalPages}
                onNext={onNextPage}
                onPrevious={onPreviousPage}
              />
            )}
          </div>

          <div aria-hidden="true" className={styles.deckBrandBottom}>
            <ElgatoIcon className={styles.deckBrandBottomIcon} />
            <span>elgato</span>
          </div>
        </div>
      </div>

      <ProjectDisplay
        interactionHint={texts.projectInteractionHint}
        openProjectLabel={texts.openProjectLabel}
        project={activeProject}
        selectedProjectLabel={texts.selectedProjectLabel}
        technologiesLabel={texts.technologiesLabel}
      />
    </div>
  );
}
