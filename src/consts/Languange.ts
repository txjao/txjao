import React from "react";

function handleAge() {
  const date = new Date();

  return date.getDate() >= 9 && date.getUTCMonth() + 1 >= 10 ?
    date.getFullYear() - 2002 :
    date.getFullYear() - 2003
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

export interface IModalTexts {
  title: string
  text: string
  addButton: string
  closeButton: string
}

// EN Transalation

export const enInfo = "I am a full-stack software engineer, currently working as a front-end developer with React at"

export const enHeader: IHeaderTexts = {
  contactMe: "Contact Me",
  me: "Me",
  meItens: {
    resume: "Resume",
    certificates: "Certificates",
  }
}

export const enMobileHeaderMenu: IMobileHeaderMenuTexts = {
  resume: "Resume",
  certificates: "Certificates",
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

// PT Translation

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
