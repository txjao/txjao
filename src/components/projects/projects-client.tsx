"use client";

import { useState } from "react";
import type { IProjectsTexts } from "@/src/types/language-types";
import { ProjectDeck } from "./components/project-deck/project-deck";
import { ProjectDialog } from "./components/project-dialog/project-dialog";
import type { Project } from "./types/project.types";

const PROJECTS_PER_PAGE = 8;

interface ProjectsClientProps {
  projects: readonly Project[];
  texts: IProjectsTexts;
}

export function ProjectsClient({ projects, texts }: ProjectsClientProps) {
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
  const activeProject =
    projects.find((project) => project.id === activeProjectId) ??
    pageProjects[0];
  const dialogProject =
    projects.find((project) => project.id === dialogProjectId) ?? null;

  if (!activeProject) return null;

  const hasMultiplePages = totalPages > 1;
  const hasPreviousPage = currentPage > 0;
  const hasNextPage = currentPage < totalPages - 1;
  const emptySlotCount = PROJECTS_PER_PAGE - pageProjects.length;
  const isDialogOpen = dialogProject !== null;

  function handleProjectPreview(projectId: string) {
    setActiveProjectId(projectId);
  }

  function handleProjectOpen(projectId: string) {
    setActiveProjectId(projectId);
    setDialogProjectId(projectId);
    setIsFrameLoading(true);
  }

  function handlePageChange(nextPage: number) {
    const nextPageStart = nextPage * PROJECTS_PER_PAGE;
    const nextActiveProject = projects[nextPageStart];

    setCurrentPage(nextPage);
    if (nextActiveProject) setActiveProjectId(nextActiveProject.id);
  }

  function handlePreviousPage() {
    if (!hasPreviousPage) return;
    handlePageChange(currentPage - 1);
  }

  function handleNextPage() {
    if (!hasNextPage) return;
    handlePageChange(currentPage + 1);
  }

  function handleDialogOpenChange(isOpen: boolean) {
    const shouldCloseDialog = !isOpen;
    if (shouldCloseDialog) setDialogProjectId(null);
  }

  function handleFrameLoad() {
    setIsFrameLoading(false);
  }

  return (
    <section
      className="mt-20 w-[92%] pb-20 min-[768px]:mt-28 min-[768px]:w-[min(86%,1200px)] min-[768px]:pb-28"
      aria-labelledby="projects-title"
    >
      <h2 className="sr-only" id="projects-title">
        {texts.sectionLabel}
      </h2>

      <ProjectDeck
        activeProject={activeProject}
        currentPage={currentPage}
        emptySlotCount={emptySlotCount}
        hasMultiplePages={hasMultiplePages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        pageProjects={pageProjects}
        texts={texts}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onOpenProject={handleProjectOpen}
        onPreviousPage={handlePreviousPage}
        onPreviewProject={handleProjectPreview}
      />

      <ProjectDialog
        isFrameLoading={isFrameLoading}
        isOpen={isDialogOpen}
        project={dialogProject}
        texts={texts}
        onFrameLoad={handleFrameLoad}
        onOpenChange={handleDialogOpenChange}
      />
    </section>
  );
}
