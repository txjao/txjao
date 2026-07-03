import Link from "next/link";
import { EN_US_LOCALE, PT_BR_LOCALE } from "@/src/consts/language.consts";
import type { Locale } from "@/src/types/language-types";
import { handleLang } from "@/src/utils/handle-lang";
import { navLinkClass } from "../styles/nav-link.styles";

interface LanguageToggleProps {
  label: string;
  locale: Locale;
}

export function LanguageToggle({ label, locale }: LanguageToggleProps) {
  const nextLocale = handleLang(locale) ? EN_US_LOCALE : PT_BR_LOCALE;

  return (
    <Link className={`${navLinkClass} w-5 text-center`} href={`/${nextLocale}`}>
      {label}
    </Link>
  );
}
