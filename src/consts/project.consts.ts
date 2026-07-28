import type { Project } from "@/src/types/project-types";

const MOCK_APPLICATION_URL = "https://github.com/txjao";

type ProjectDefinition = Omit<Project, "title"> & {
    title?: string
};

const FEATURED_PROJECTS = [
    {
        applicationUrl: "https://tic-tac-toe-eight-brown-33.vercel.app/",
        id: "project-tic-tac",
        previewImageUrl: "/images/Cover.jpg",
        title: "Tic Tac Toe",
    },
    {
        applicationUrl: "https://talaria-woad.vercel.app/",
        id: "project-talaria",
        previewImageUrl: "/images/Talaria Logo.jpg",
        title: "Talaria",
    },
] satisfies readonly ProjectDefinition[];

const PROJECT_MOCKS: readonly ProjectDefinition[] = Array.from(
    { length: 3 },
    (_, index) => {
        const projectNumber = String(index + 1).padStart(2, "0");

        return {
            applicationUrl: MOCK_APPLICATION_URL,
            id: `project-${projectNumber}`,
        };
    },
);

export const PROJECT_DEFINITIONS: readonly ProjectDefinition[] = [
    ...FEATURED_PROJECTS,
    ...PROJECT_MOCKS,
];
