import type { IHeaderControlTexts, IHeaderTexts, ILetteringTexts, IMobileHeaderMenuTexts, IModalTexts, IProjectsTexts, IToastTexts } from "../types/language-types"


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

export const enProjectsTexts: IProjectsTexts = {
    closeDialogLabel: "Close project",
    deckLabel: "Project Deck",
    dialogDescription: "Interactive preview of the selected project.",
    iframeTitlePrefix: "Project application",
    loadingLabel: "Loading project",
    nextPageLabel: "Next projects page",
    openInNewTabLabel: "Open in new tab",
    openProjectLabel: "Open project",
    pageLabel: "Page",
    previousPageLabel: "Previous projects page",
    projectInteractionHint: "Navigate through the keys to learn about each project. Activate one to explore.",
    projects: {
        blockPill: {
            description: "A web application with its own recognizable visual identity.",
            title: "Block Pill",
        },
        talariaPrimary: {
            description: "A web experience built around Talaria's visual identity.",
            title: "Talaria",
        },
        talariaSecondary: {
            description: "Another project from the Talaria universe, ready to explore inside the portfolio.",
            title: "Talaria",
        },
        ticTacToe: {
            description: "A realtime multiplayer Tic-Tac-Toe game for quick matches on the web.",
            title: "Tic Tac Toe",
        },
    },
    sectionLabel: "Personal projects",
    selectedProjectLabel: "Featured project",
    technologiesLabel: "Technologies",
}
