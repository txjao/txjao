export type Locale = "en-US" | "pt-BR";

export interface ILetteringTexts {
    title: string
    phrases: string[]
}

export interface IHeaderTexts {
    contactMe: string,
    me: string,
    meItens: {
        resume: string,
        certificates: string,
    }
}

export interface IMobileHeaderMenuTexts {
    resume: string,
    certificates: string,
}

export interface IHeaderControlTexts {
    closeMenuLabel: string
    languageToggleLabel: string
    logoAlt: string
    openMenuLabel: string
}

export interface IModalTexts {
    title: string
    text: string
    addButton: string
    closeButton: string
}

export interface IToastTexts {
    title: string
    description: string
    closeLabel: string
}

export interface IProjectContentTexts {
    description: string
    title: string
}

export interface IProjectsTexts {
    closeDialogLabel: string
    deckLabel: string
    dialogDescription: string
    iframeTitlePrefix: string
    loadingLabel: string
    nextPageLabel: string
    openInNewTabLabel: string
    openProjectLabel: string
    pageLabel: string
    previousPageLabel: string
    projectInteractionHint: string
    projects: {
        blockPill: IProjectContentTexts
        talariaPrimary: IProjectContentTexts
        talariaSecondary: IProjectContentTexts
        ticTacToe: IProjectContentTexts
    }
    sectionLabel: string
    selectedProjectLabel: string
    technologiesLabel: string
}
