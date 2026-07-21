import type { IHeaderControlTexts, IHeaderTexts, ILetteringTexts, IMobileHeaderMenuTexts, IModalTexts, IToastTexts } from "../types/language-types"


export const enInfo = "I am a full-stack software engineer with extensive experience in front-end development. I am currently working on some AI projects and mentoring IT technical high school students."

export const enHeader: IHeaderTexts = {
    contactMe: "Contact Me",
    me: "About Me",
    meItens: {
        resume: "Resume",
        certificates: "Certificates",
    }
}

export const enMobileHeaderMenu: IMobileHeaderMenuTexts = {
    resume: "Resume",
    certificates: "Certificates",
}

export const enHeaderControlTexts: IHeaderControlTexts = {
    closeMenuLabel: "Close menu",
    languageToggleLabel: "PT",
    logoAlt: "Logo",
    openMenuLabel: "Open menu",
}

export const enProfileImageAlt = "Portrait of João Teixeira"

export const enLettering: ILetteringTexts = {
    title: "Hi There!",
    phrases: [
        "My name is João, I'm {{age}} years old.",
        "My name is João, I'm a muay thai fighter.",
        "My name is João, I'm a brazilian jiu jitsu fighter.",
        "My name is João, I'm a guitarist.",
        "My name is João, I'm a dog person.",
        "My name is João, I'm an e-sports enthusiast.",
    ],
}

export const enModalTexts: IModalTexts = {
    title: "Add me!",
    text: "Click to copy my user!",
    addButton: "Copy",
    closeButton: "Close",
}

export const enToastTexts: IToastTexts = {
    title: "Feature unavailable",
    description: "This feature is not available yet.",
    closeLabel: "Close notification",
}
