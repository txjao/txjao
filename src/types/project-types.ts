export type ProjectContentKey =
    | "ticTacToe"
    | "talariaPrimary"
    | "blockPill"
    | "talariaSecondary";

export type ProjectVisual =
    | {
        kind: "favicon"
        src: string
    }
    | {
        kind: "monogram"
        value: string
    };

export interface ProjectDefinition {
    accent: string
    applicationUrl: string
    contentKey: ProjectContentKey
    id: string
    technologies: readonly string[]
    visual: ProjectVisual
}

export interface Project extends Omit<ProjectDefinition, "contentKey"> {
    description: string
    title: string
}
