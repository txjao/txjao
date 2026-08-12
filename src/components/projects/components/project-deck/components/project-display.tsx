import type { Project } from "@/src/types/project-types";
import styles from "../styles/project-deck.module.css";

interface ProjectDisplayProps {
    interactionHint: string
    project: Project
    selectedProjectLabel: string
    technologiesLabel: string
}

export function ProjectDisplay({
    interactionHint,
    project,
    selectedProjectLabel,
    technologiesLabel,
}: ProjectDisplayProps) {
    const hasTechnologies = project.technologies.length > 0;

    return (
        <article className={styles.display}>
            <div className={styles.accentLine} aria-hidden="true" />
            <p className={styles.displayLabel}>{selectedProjectLabel}</p>
            <div aria-atomic="true" aria-live="polite">
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
            </div>

            {hasTechnologies && (
                <div className={styles.technologies}>
                    <p className={styles.technologiesLabel}>
                        {technologiesLabel}
                    </p>
                    <ul className={styles.technologyList}>
                        {project.technologies.map((technology) => (
                            <li className={styles.technology} key={technology}>
                                {technology}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <p className={styles.interactionHint}>{interactionHint}</p>
        </article>
    );
}
