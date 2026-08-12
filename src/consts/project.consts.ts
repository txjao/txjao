import type { ProjectDefinition } from "@/src/types/project-types";

export const PROJECT_DEFINITIONS = [
    {
        accent: "#32a8ff",
        applicationUrl: "https://tic-tac-toe-eight-brown-33.vercel.app/",
        contentKey: "ticTacToe",
        id: "project-tic-tac",
        technologies: ["React", "TypeScript", "WebSocket"],
        visual: {
            kind: "favicon",
            src: "/images/logos/tic-tac-toe.png",
        },
    },
    {
        accent: "#e6bc3a",
        applicationUrl: "https://talaria-woad.vercel.app/",
        contentKey: "talariaPrimary",
        id: "project-truco-rato",
        technologies: [],
        visual: {
            kind: "favicon",
            src: "/images/logos/talaria-shield.svg",
        },
    },
    {
        accent: "#ff4b4b",
        applicationUrl: "https://talaria-woad.vercel.app/",
        contentKey: "blockPill",
        id: "project-block-pill",
        technologies: [],
        visual: {
            kind: "favicon",
            src: "/images/logos/bloco-pill-128.svg",
        },
    },
] satisfies readonly ProjectDefinition[];
