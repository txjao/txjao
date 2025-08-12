import { PropsWithChildren, useState } from "react";
import { ILanguageContext, Language, LanguageContext } from "./LanguageContext";


export function LanguageProvider({ children }: PropsWithChildren) {
  const [lang, setLang] = useState<Language>("EN")

  function handleLang() {
    setLang(prevLang => prevLang === "EN" ? "PT" : "EN")
  }

  const LangContextValue: ILanguageContext = {
    language: lang,
    toggleLanguage: handleLang
  }

  return (
    <LanguageContext.Provider value={LangContextValue}>
      {children}
    </LanguageContext.Provider>
  )
}
