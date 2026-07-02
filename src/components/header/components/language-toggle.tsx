import Link from "next/link";
import type { Locale } from "@/src/types/language-types";
import { handleLang } from "@/src/utils/handle-lang";
import { navLinkClass } from "../styles/nav-link.styles";

interface LanguageToggleProps {
  label: string;
  locale: Locale;
}

export function LanguageToggle({ label, locale }: LanguageToggleProps) {
  const nextLocale = handleLang(locale) ? "en-US" : "pt-BR";

  return (
    <Link className={`${navLinkClass} w-5 text-center`} href={`/${nextLocale}`}>
      {label}
    </Link>
  );
}
