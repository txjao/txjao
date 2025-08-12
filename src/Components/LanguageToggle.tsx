
interface LanguageToggleProps{
  language: string,
  toggleLanguage: () => void
}

export function LanguageToggle(props: LanguageToggleProps) {

  return (
    <a onClick={props.toggleLanguage} className="lang-toggle">{props.language === "EN" ? "PT" : "EN"}</a>
  )
}
