import { PROJECT_DEFINITIONS as projects } from "@/src/consts/project.consts";
import type { IProjectsTexts } from "@/src/types/language-types";
import { ProjectsCarousel } from "./components/projects-carousel/projects-carousel";
import styles from "./styles/projects.module.css";

interface ProjectsProps {
    texts: IProjectsTexts
}

export function Projects({ texts }: ProjectsProps) {
    return (
        <section className={styles.section} aria-labelledby="projects-title">
            <h2 className="sr-only" id="projects-title">
                {texts.carouselLabel}
            </h2>
            <ProjectsCarousel projects={projects} texts={texts} />
        </section>
    );
}
