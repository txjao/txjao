import { PROJECT_DEFINITIONS } from "@/src/consts/project.consts";
import type { IProjectsTexts } from "@/src/types/language-types";
import { ProjectsCarousel } from "./components/projects-carousel/projects-carousel";
import styles from "./styles/projects.module.css";

interface ProjectsProps {
    texts: IProjectsTexts
}

export function Projects({ texts }: ProjectsProps) {
    const projects = PROJECT_DEFINITIONS.map((project, index) => {
        const projectNumber = String(index + 1).padStart(2, "0");
        const fallbackTitle = `${texts.projectTitleLabel} ${projectNumber}`;

        return {
            ...project,
            title: project.title ?? fallbackTitle,
        };
    });

    return (
        <section className={styles.section} aria-labelledby="projects-title">
            <h2 className="sr-only" id="projects-title">
                {texts.carouselLabel}
            </h2>
            <ProjectsCarousel projects={projects} texts={texts} />
        </section>
    );
}
