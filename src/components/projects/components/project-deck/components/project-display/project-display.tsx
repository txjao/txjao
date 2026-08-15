import type { Project } from "@/src/components/projects/types/project.types";
import styles from "./styles/project-display.module.css";

interface ProjectDisplayProps {
  interactionHint: string;
  openProjectLabel: string;
  project: Project;
  selectedProjectLabel: string;
  technologiesLabel: string;
}

export function ProjectDisplay({
  interactionHint,
  openProjectLabel,
  project,
  selectedProjectLabel,
  technologiesLabel,
}: ProjectDisplayProps) {
  const hasTechnologies = project.technologies.length > 0;

  return (
    <article className={styles.display}>
      <p className={styles.displayLabel}>{selectedProjectLabel}</p>
      <div aria-atomic="true" aria-live="polite">
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
      </div>

      <div className={styles.interactionCard}>
        <span className={styles.interactionAccent} aria-hidden="true" />
        <div>
          <p className={styles.interactionTitle}>{openProjectLabel}</p>
          <p className={styles.interactionHint}>{interactionHint}</p>
        </div>
      </div>

      {hasTechnologies && (
        <div className="mt-6">
          <p className={styles.technologiesLabel}>{technologiesLabel}</p>
          <ul className="mt-3 flex list-none flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li className={styles.technology} key={technology}>
                {technology}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
