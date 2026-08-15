import type { CSSProperties } from "react";
import type { Project } from "@/src/components/projects/types/project.types";
import { ProjectSymbol } from "./components/project-symbol/project-symbol";
import styles from "./styles/deck-key.module.css";

interface DeckKeyProps {
  isActive: boolean;
  openProjectLabel: string;
  project: Project;
  onOpen: (projectId: string) => void;
  onPreview: (projectId: string) => void;
}

type ProjectAccentStyle = CSSProperties & {
  "--key-accent": string;
};

export function DeckKey({
  isActive,
  openProjectLabel,
  project,
  onOpen,
  onPreview,
}: DeckKeyProps) {
  const accentStyle: ProjectAccentStyle = {
    "--key-accent": project.accent,
  };

  function handlePreview() {
    onPreview(project.id);
  }

  function handleOpen() {
    onOpen(project.id);
  }

  return (
    <button
      aria-haspopup="dialog"
      aria-label={`${openProjectLabel}: ${project.title}`}
      className={`${styles.key} focus-ring`}
      data-active={isActive}
      style={accentStyle}
      type="button"
      onClick={handleOpen}
      onFocus={handlePreview}
      onPointerEnter={handlePreview}
    >
      <span className={styles.keySocket} aria-hidden="true" />
      <span className={styles.keyAcrylic} aria-hidden="true" />
      <span className={styles.keyDisplay}>
        <ProjectSymbol visual={project.visual} />
      </span>
      <span className={styles.keyReflection} aria-hidden="true" />
    </button>
  );
}
