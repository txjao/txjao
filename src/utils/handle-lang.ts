import { PT_BR_LOCALE } from "@/src/consts/language.consts";
import type { Locale } from "@/src/types/language-types";

export function handleLang(locale: Locale) {
  return locale === PT_BR_LOCALE;
}
