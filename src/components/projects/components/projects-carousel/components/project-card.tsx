import Image from "next/image";
import type { Project } from "@/src/types/project-types";

interface ProjectCardProps {
    openProjectLabel: string
    project: Project
    onSelect: (project: Project) => void
}

export function ProjectCard({
    openProjectLabel,
    project,
    onSelect,
}: ProjectCardProps) {
    function handleClick() {
        onSelect(project);
    }

    return (
        <button
            aria-label={`${openProjectLabel}: ${project.title}`}
            className="focus-ring relative block aspect-[5/4] w-full cursor-pointer overflow-hidden rounded-[0.625rem] border-0 bg-[#D9D9D9] p-0"
            type="button"
            onClick={handleClick}
        >
            {project.previewImageUrl && (
                <Image
                    fill
                    alt=""
                    className="object-cover"
                    draggable={false}
                    sizes="(max-width: 767px) 80vw, (max-width: 1440px) 25vw, 320px"
                    src={project.previewImageUrl}
                />
            )}
        </button>
    );
}
