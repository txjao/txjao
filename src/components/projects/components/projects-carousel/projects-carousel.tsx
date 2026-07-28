"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronIcon } from "@/src/components/icons";
import type { IProjectsTexts } from "@/src/types/language-types";
import type { Project } from "@/src/types/project-types";
import { ProjectDialog } from "../project-dialog/project-dialog";
import { ProjectCard } from "./components/project-card";
import styles from "./styles/projects-carousel.module.css";

const VISIBLE_PROJECTS = 3;

interface ProjectsCarouselProps {
    projects: readonly Project[]
    texts: IProjectsTexts
}

export function ProjectsCarousel({ projects, texts }: ProjectsCarouselProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isFrameLoading, setIsFrameLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const hasEnoughProjectsToLoop = projects.length > VISIBLE_PROJECTS;
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        duration: 30,
        loop: hasEnoughProjectsToLoop,
        slidesToScroll: 1,
    });


    const handlePreviousProject = () => {
        emblaApi?.scrollPrev();
    }

    const handleNextProject = () => {
        emblaApi?.scrollNext();
    }

    const handleProjectSelect = (project: Project) => {
        setSelectedProject(project);
        setIsFrameLoading(true);
        setIsDialogOpen(true);
    }

    const handleFrameLoad = () => {
        setIsFrameLoading(false);
    }

    return (
        <>
            <div className={styles.carousel}>
                <button
                    aria-label={texts.previousProjectLabel}
                    className={`${styles.navigationButton} focus-ring hover-highlight`}
                    type="button"
                    onClick={handlePreviousProject}
                >
                    <ChevronIcon className={`${styles.previousIcon} size-8`} />
                </button>

                <div className={styles.viewport} ref={emblaRef}>
                    <div className={styles.container}>
                        {projects.map((project, index) => (
                            <div
                                aria-label={`${index + 1} / ${projects.length}`}
                                className={styles.slide}
                                key={project.id}
                                role="group"
                            >
                                <ProjectCard
                                    openProjectLabel={texts.openProjectLabel}
                                    project={project}
                                    onSelect={handleProjectSelect}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    aria-label={texts.nextProjectLabel}
                    className={`${styles.navigationButton} focus-ring hover-highlight`}
                    type="button"
                    onClick={handleNextProject}
                >
                    <ChevronIcon className="size-8" />
                </button>
            </div>

            <ProjectDialog
                isFrameLoading={isFrameLoading}
                isOpen={isDialogOpen}
                project={selectedProject}
                texts={texts}
                onFrameLoad={handleFrameLoad}
                onOpenChange={setIsDialogOpen}
            />
        </>
    );
}
