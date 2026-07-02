import type { Locale } from "@/src/types/language-types";

export function handleLang(locale: Locale) {
  return locale === "pt-BR";
}
