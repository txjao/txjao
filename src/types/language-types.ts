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

export interface IProjectsTexts {
    carouselLabel: string
    closeDialogLabel: string
    dialogDescription: string
    iframeTitlePrefix: string
    loadingLabel: string
    nextProjectLabel: string
    openInNewTabLabel: string
    openProjectLabel: string
    previousProjectLabel: string
    projectTitleLabel: string
}
