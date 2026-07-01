import Link from "next/link";
import { navLinkClass } from "../styles/nav-link.styles";
import type { Locale } from "../types/header.types";
import { isPortuguese } from "../utils/header.utils";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const nextLocale = isPortuguese(locale) ? "en-US" : "pt-BR";
  const label = isPortuguese(locale) ? "EN" : "PT";

  return (
    <Link className={`${navLinkClass} w-5 text-center`} href={`/${nextLocale}`}>
      {label}
    </Link>
  );
}
