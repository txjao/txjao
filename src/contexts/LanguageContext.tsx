import { createContext, useContext } from "react"

export type Language = "EN" | "PT"

export interface ILanguageContext {
  language: Language,
  toggleLanguage: () => void
}

export const LanguageContext = createContext<ILanguageContext>({
  language: "EN",
  toggleLanguage: () => {
    throw new Error('toggleLanguage deve ser usado dentro de um LanguageProvider')
  }
})

export function useLanguage() {
  return useContext(LanguageContext)
}
