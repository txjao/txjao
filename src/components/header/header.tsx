import { DEFAULT_LOCALE } from "@/src/consts/language.consts";
import type { Locale } from "@/src/types/language-types";
import { HeaderClient } from "./header-client";
import {
  getHeaderControlTexts,
  getHeaderTexts,
  getMobileTexts,
  getModalTexts,
  getToastTexts,
} from "./utils/get-texts";

export interface HeaderProps {
  locale?: Locale;
}

export function Header({ locale = DEFAULT_LOCALE }: HeaderProps) {
  return (
    <HeaderClient
      locale={locale}
      headerControlTexts={getHeaderControlTexts(locale)}
      headerTexts={getHeaderTexts(locale)}
      mobileTexts={getMobileTexts(locale)}
      modalTexts={getModalTexts(locale)}
      toastTexts={getToastTexts(locale)}
    />
  );
}
