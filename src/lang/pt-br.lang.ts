import type { IHeaderControlTexts, IHeaderTexts, ILetteringTexts, IMobileHeaderMenuTexts, IModalTexts, IProjectsTexts, IToastTexts } from "../types/language-types"


export const ptInfo = "Sou Desenvolvedor Web full-stack com ampla experiência em desenvolvimento front-end. Atualmente estou criando e colaborando em projetos de código aberto."

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
    closeDialogLabel: "Fechar projeto",
    deckLabel: "Project Deck",
    dialogDescription: "Visualização interativa do projeto selecionado.",
    iframeTitlePrefix: "Aplicação do projeto",
    loadingLabel: "Carregando projeto",
    musicPlayer: {
        bufferingLabel: "Carregando música",
        collapsePlayerLabel: "Minimizar player",
        expandPlayerLabel: "Expandir player",
        floatingPlayerLabel: "Player de música flutuante",
        loadingLabel: "Conectando ao Spotify",
        nextTrackLabel: "Próxima música",
        openOnSpotifyLabel: "Abrir playlist no Spotify",
        pauseLabel: "Pausar música",
        playbackUnavailableLabel: "Player do Spotify indisponível",
        playLabel: "Reproduzir música",
        playerLabel: "Player da playlist do João no Spotify",
        previousTrackLabel: "Música anterior",
    },
    nextPageLabel: "Próxima página de projetos",
    openInNewTabLabel: "Abrir em nova aba",
    openProjectLabel: "Abrir projeto",
    pageLabel: "Página",
    previousPageLabel: "Página anterior de projetos",
    projectInteractionHint: "Navegue pelas teclas para conhecer os projetos. Ative uma delas para explorar.",
    projects: {
        blockPill: {
            description: "Extensão de navegador privada e filantrópica que reduz distrações com bloqueios locais e persistentes.",
            title: "Block Pill",
        },
        talariaPrimary: {
            description: "Plataforma comunitária e competitiva de Age of Mythology: Retold para analisar partidas profissionais e criar build orders.",
            title: "Talaria",
        },
        talariaSecondary: {
            description: "Outro projeto do universo Talaria, preparado para exploração dentro do portfólio.",
            title: "Talaria",
        },
        ticTacToe: {
            description: "Jogo da velha multiplayer em tempo real para partidas rápidas pela web.",
            title: "Tic Tac Toe",
        },
    },
    sectionLabel: "Projetos pessoais",
    selectedProjectLabel: "Projeto em destaque",
    technologiesLabel: "Tecnologias",
}
