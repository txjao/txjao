import type { Project } from "@/src/types/project-types";

type ProjectDefinition = Omit<Project, "title"> & {
    title?: string
};

export const PROJECT_DEFINITIONS = [
    {
        applicationUrl: "https://tic-tac-toe-eight-brown-33.vercel.app/",
        id: "project-tic-tac",
        previewImageUrl: "/images/logos/Cover.jpg",
        title: "Tic Tac Toe",
    },
    {
        applicationUrl: "https://talaria-woad.vercel.app/",
        id: "project-truco-rato",
        previewImageUrl: "/images/logos/Talaria Logo.png",
        title: "Talaria",
    },
    {
        applicationUrl: "https://talaria-woad.vercel.app/",
        id: "project-block-pill",
        previewImageUrl: "/images/logos/Block Pill Logo.png",
        title: "Talaria",
    },
    {
        applicationUrl: "https://talaria-woad.vercel.app/",
        id: "project-talaria",
        previewImageUrl: "/images/logos/Talaria Logo.png",
        title: "Talaria",
    },
] satisfies readonly ProjectDefinition[];