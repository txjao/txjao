"use client";

import { useState, type CSSProperties } from "react";
import type { IProjectsTexts } from "@/src/types/language-types";
import type { Project } from "@/src/types/project-types";
import { ProjectDialog } from "../project-dialog/project-dialog";
import { DeckGrid } from "./components/deck-grid";
import { DeckNavigation } from "./components/deck-navigation";
import { ProjectDisplay } from "./components/project-display";
import styles from "./styles/project-deck.module.css";

const PROJECTS_PER_PAGE = 12;

interface ProjectDeckProps {
    projects: readonly Project[]
    texts: IProjectsTexts
}

type ProjectAccentStyle = CSSProperties & {
    "--project-accent": string
};

export function ProjectDeck({ projects, texts }: ProjectDeckProps) {
    const [activeProjectId, setActiveProjectId] = useState(
        projects[0]?.id ?? "",
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [dialogProjectId, setDialogProjectId] = useState<string | null>(null);
    const [isFrameLoading, setIsFrameLoading] = useState(true);

    const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
    const pageStart = currentPage * PROJECTS_PER_PAGE;
    const pageProjects = projects.slice(
        pageStart,
        pageStart + PROJECTS_PER_PAGE,
    );
    const activeProject = projects.find(
        (project) => project.id === activeProjectId,
    ) ?? pageProjects[0];
    const dialogProject = projects.find(
        (project) => project.id === dialogProjectId,
    ) ?? null;

    if (!activeProject) return null;

    const hasMultiplePages = totalPages > 1;
    const hasPreviousPage = currentPage > 0;
    const hasNextPage = currentPage < totalPages - 1;
    const emptySlotCount = hasMultiplePages
        ? PROJECTS_PER_PAGE - pageProjects.length
        : 0;
    const isDialogOpen = dialogProject !== null;
    const accentStyle: ProjectAccentStyle = {
        "--project-accent": activeProject.accent,
    };

    const handleProjectPreview = (projectId: string) => {
        setActiveProjectId(projectId);
    };

    const handleProjectOpen = (projectId: string) => {
        setActiveProjectId(projectId);
        setDialogProjectId(projectId);
        setIsFrameLoading(true);
    };

    const handlePageChange = (nextPage: number) => {
        const nextPageStart = nextPage * PROJECTS_PER_PAGE;
        const nextActiveProject = projects[nextPageStart];

        setCurrentPage(nextPage);
        if (nextActiveProject) setActiveProjectId(nextActiveProject.id);
    };

    const handlePreviousPage = () => {
        if (!hasPreviousPage) return;
        handlePageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (!hasNextPage) return;
        handlePageChange(currentPage + 1);
    };

    const handleDialogOpenChange = (isOpen: boolean) => {
        const shouldCloseDialog = !isOpen;
        if (shouldCloseDialog) setDialogProjectId(null);
    };

    const handleFrameLoad = () => {
        setIsFrameLoading(false);
    };

    return (
        <>
            <div className={styles.layout} style={accentStyle}>
                <div className={styles.deck}>
                    <header className={styles.deckHeader}>
                        <p className={styles.deckLabel}>{texts.deckLabel}</p>
                        <h2 className={styles.sectionTitle} id="projects-title">
                            {texts.sectionLabel}
                        </h2>
                    </header>

                    <DeckGrid
                        activeProjectId={activeProject.id}
                        emptySlotCount={emptySlotCount}
                        openProjectLabel={texts.openProjectLabel}
                        projects={pageProjects}
                        onOpen={handleProjectOpen}
                        onPreview={handleProjectPreview}
                    />

                    {hasMultiplePages && (
                        <DeckNavigation
                            currentPage={currentPage}
                            hasNextPage={hasNextPage}
                            hasPreviousPage={hasPreviousPage}
                            nextPageLabel={texts.nextPageLabel}
                            pageLabel={texts.pageLabel}
                            previousPageLabel={texts.previousPageLabel}
                            totalPages={totalPages}
                            onNext={handleNextPage}
                            onPrevious={handlePreviousPage}
                        />
                    )}
                </div>

                <ProjectDisplay
                    interactionHint={texts.projectInteractionHint}
                    project={activeProject}
                    selectedProjectLabel={texts.selectedProjectLabel}
                    technologiesLabel={texts.technologiesLabel}
                />
            </div>

            <ProjectDialog
                isFrameLoading={isFrameLoading}
                isOpen={isDialogOpen}
                project={dialogProject}
                texts={texts}
                onFrameLoad={handleFrameLoad}
                onOpenChange={handleDialogOpenChange}
            />
        </>
    );
}
