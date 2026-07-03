import { IHeaderControlTexts, IHeaderTexts, IMobileHeaderMenuTexts, IModalTexts, IToastTexts } from "../types/language-types"
import { handleAge } from "../utils/handle-age"


export const ptInfo = "Sou um engenheiro de software full-stack e, atualmente, trabalho como programador front-end com React no "

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

export const ptLetteringTitle = "Eae!"

export const ptLettering = [
    `Meu nome é João, tenho ${handleAge()} anos.`,
    1000,
    "Meu nome é João, sou lutador de muay thai.",
    1000,
    "Meu nome é João, sou lutador de jiu-jitsu brasileiro.",
    1000,
    "Meu nome é João, sou guitarrista.",
    1000,
    "Meu nome é João, sou uma pessoa que gosta de cachorros.",
    1000,
    "Meu nome é João, sou um entusiasta de e-sports.",
    1000,
]

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
