import { IHeaderControlTexts, IHeaderTexts, IMobileHeaderMenuTexts, IModalTexts, IToastTexts } from "../types/language-types"
import { handleAge } from "../utils/handle-age"


export const enInfo = "I am a full-stack software engineer, currently working as a front-end developer with React at"

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

export const enLetteringTitle = "Hi There!"

export const enLettering = [
    `My name is João, I'm ${handleAge()} years old.`,
    1000,
    "My name is João, I'm a muay thai fighter.",
    1000,
    "My name is João, I'm a brazilian jiu jitsu fighter.",
    1000,
    "My name is João, I'm a guitarist.",
    1000,
    "My name is João, I'm a dog person.",
    1000,
    "My name is João, I'm an e-sports enthusiast.",
    1000,
]

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
