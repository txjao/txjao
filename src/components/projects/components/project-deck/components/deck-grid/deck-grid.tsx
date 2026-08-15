import type { Project } from "@/src/components/projects/types/project.types";
import { DeckKey } from "./components/deck-key/deck-key";
import styles from "./styles/deck-grid.module.css";

interface DeckGridProps {
  activeProjectId: string;
  emptySlotCount: number;
  openProjectLabel: string;
  projects: readonly Project[];
  onOpen: (projectId: string) => void;
  onPreview: (projectId: string) => void;
}

export function DeckGrid({
  activeProjectId,
  emptySlotCount,
  openProjectLabel,
  projects,
  onOpen,
  onPreview,
}: DeckGridProps) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => {
        const isActive = project.id === activeProjectId;

        return (
          <DeckKey
            isActive={isActive}
            key={project.id}
            openProjectLabel={openProjectLabel}
            project={project}
            onOpen={onOpen}
            onPreview={onPreview}
          />
        );
      })}

      {Array.from({ length: emptySlotCount }, (_, index) => (
        <span
          aria-hidden="true"
          className={styles.emptyKey}
          key={`empty-deck-slot-${index}`}
        >
          <span className={styles.emptyDisplay} />
        </span>
      ))}
    </div>
  );
}
