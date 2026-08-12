import { PROJECT_DEFINITIONS } from "@/src/consts/project.consts";
import type { IProjectsTexts } from "@/src/types/language-types";
import type { Project } from "@/src/types/project-types";
import { ProjectDeck } from "./components/project-deck/project-deck";
import styles from "./styles/projects.module.css";

interface ProjectsProps {
    texts: IProjectsTexts
}

export function Projects({ texts }: ProjectsProps) {
    const projects: readonly Project[] = PROJECT_DEFINITIONS.map((project) => {
        const content = texts.projects[project.contentKey];

        return {
            accent: project.accent,
            applicationUrl: project.applicationUrl,
            description: content.description,
            id: project.id,
            technologies: project.technologies,
            title: content.title,
            visual: project.visual,
        };
    });

    return (
        <section className={styles.section} aria-labelledby="projects-title">
            <ProjectDeck projects={projects} texts={texts} />
        </section>
    );
}
