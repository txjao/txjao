import type { IProjectsTexts } from "@/src/types/language-types";
import { PROJECT_DEFINITIONS } from "./consts/project.consts";
import { ProjectsClient } from "./projects-client";
import type { Project } from "./types/project.types";

interface ProjectsProps {
  texts: IProjectsTexts;
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

  return <ProjectsClient projects={projects} texts={texts} />;
}
