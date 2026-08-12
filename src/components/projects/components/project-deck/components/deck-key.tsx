import type { CSSProperties } from "react";
import type { Project } from "@/src/types/project-types";
import { ProjectSymbol } from "./project-symbol";
import styles from "../styles/project-deck.module.css";

interface DeckKeyProps {
    isActive: boolean
    openProjectLabel: string
    project: Project
    onOpen: (projectId: string) => void
    onPreview: (projectId: string) => void
}

type ProjectAccentStyle = CSSProperties & {
    "--key-accent": string
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

    const handlePreview = () => {
        onPreview(project.id);
    };

    const handleOpen = () => {
        onOpen(project.id);
    };

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
            <ProjectSymbol visual={project.visual} />
        </button>
    );
}
