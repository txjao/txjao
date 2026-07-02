export type Locale = "en-US" | "pt-BR";

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
    switchToDarkThemeLabel: string
    switchToLightThemeLabel: string
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
