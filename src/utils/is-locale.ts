import { SUPPORTED_LOCALES } from "@/src/consts/language.consts";
import type { Locale } from "@/src/types/language-types";

export function isLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}
