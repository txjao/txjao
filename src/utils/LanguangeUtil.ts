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

// EN Transalation

export const enInfo = "I am a software engineer learning full-stack development, currently working as a full-stack developer with Angular and Java."

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

// PT Translation

export const ptInfo = "Sou um engenheiro de software aprendendo desenvolvimento full-stack e, atualmente, trabalho como programador full-stack com Angular e Java."

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
  `Me chamo João, tenho ${handleAge()} anos.`,
  1000,
  "Me chamo João, luto muay thai.",
  1000,
  "Me chamo João, luto jiu jitsu.",
  1000,
  "Me chamo João, toco guitarra.",
  1000,
  "Me chamo João, sou uma dog person.",
  1000,
  "Me chamo João, sou um entusiasta de e-sports.",
  1000,
]

