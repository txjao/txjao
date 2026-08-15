import type { IProjectsTexts } from "@/src/types/language-types";
import type { Project } from "../../../types/project.types";

export interface ProjectDeckProps {
  activeProject: Project;
  currentPage: number;
  emptySlotCount: number;
  hasMultiplePages: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageProjects: readonly Project[];
  texts: IProjectsTexts;
  totalPages: number;
  onNextPage: () => void;
  onOpenProject: (projectId: string) => void;
  onPreviousPage: () => void;
  onPreviewProject: (projectId: string) => void;
}
