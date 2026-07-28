import type { IHeaderControlTexts, IHeaderTexts, ILetteringTexts, IMobileHeaderMenuTexts, IModalTexts, IProjectsTexts, IToastTexts } from "../types/language-types"


export const ptInfo = "Sou desenvolvedor full-stack com ampla experiência em desenvolvimento front-end. Atualmente, estou trabalhando em alguns projetos de IA e mentorando alunos de ensino médio técnico em TI."

export const ptHeader: IHeaderTexts = {
    contactMe: "Entre em contato",
    me: "Sobre mim",
    meItens: {
        resume: "Currículo",
        certificates: "Certificações",
    }
}

export const ptMobileHeaderMenu: IMobileHeaderMenuTexts = {
    resume: "Currículo",
    certificates: "Certificações",
}

export const ptHeaderControlTexts: IHeaderControlTexts = {
    closeMenuLabel: "Fechar menu",
    languageToggleLabel: "EN",
    logoAlt: "Logo",
    openMenuLabel: "Abrir menu",
}

export const ptProfileImageAlt = "Retrato de João Teixeira"

export const ptLettering: ILetteringTexts = {
    title: "Eae!",
    phrases: [
        "Meu nome é João, tenho {{age}} anos.",
        "Meu nome é João, sou lutador de muay thai.",
        "Meu nome é João, sou lutador de jiu-jitsu brasileiro.",
        "Meu nome é João, sou guitarrista.",
        "Meu nome é João, sou uma pessoa que gosta de cachorros.",
        "Meu nome é João, sou um entusiasta de e-sports.",
    ],
}

export const ptModalTexts: IModalTexts = {
    title: "Me adicione!",
    text: "Clique para copiar meu usuário!",
    addButton: "Copiar",
    closeButton: "Fechar",
}

export const ptToastTexts: IToastTexts = {
    title: "Recurso indisponível",
    description: "Esta funcionalidade ainda não está disponível.",
    closeLabel: "Fechar aviso",
}

export const ptProjectsTexts: IProjectsTexts = {
    carouselLabel: "Projetos pessoais",
    closeDialogLabel: "Fechar projeto",
    dialogDescription: "Visualização interativa do projeto selecionado.",
    iframeTitlePrefix: "Aplicação do projeto",
    loadingLabel: "Carregando projeto",
    nextProjectLabel: "Próximo projeto",
    openInNewTabLabel: "Abrir em nova aba",
    openProjectLabel: "Abrir projeto",
    previousProjectLabel: "Projeto anterior",
    projectTitleLabel: "Projeto",
}
