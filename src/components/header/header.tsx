import { enHeader, enHeaderControlTexts, enMobileHeaderMenu, enModalTexts, enToastTexts } from "@/src/lang/en-us.lang";
import { ptHeader, ptHeaderControlTexts, ptMobileHeaderMenu, ptModalTexts, ptToastTexts } from "@/src/lang/pt-br.lang";
import type {
  IHeaderControlTexts,
  IHeaderTexts,
  IMobileHeaderMenuTexts,
  IModalTexts,
  IToastTexts,
  Locale,
} from "@/src/types/language-types";
import { HeaderClient } from "./header-client";
import type { HeaderProps } from "./types/header.types";
import { handleLang } from "../../utils/handle-lang";

function getHeaderTexts(locale: Locale): IHeaderTexts {
  return handleLang(locale) ? ptHeader : enHeader;
}

function getHeaderControlTexts(locale: Locale): IHeaderControlTexts {
  return handleLang(locale) ? ptHeaderControlTexts : enHeaderControlTexts;
}

function getMobileTexts(locale: Locale): IMobileHeaderMenuTexts {
  return handleLang(locale) ? ptMobileHeaderMenu : enMobileHeaderMenu;
}

function getModalTexts(locale: Locale): IModalTexts {
  return handleLang(locale) ? ptModalTexts : enModalTexts;
}

function getToastTexts(locale: Locale): IToastTexts {
  return handleLang(locale) ? ptToastTexts : enToastTexts;
}

export function Header({ locale = "en-US" }: HeaderProps) {
  return (
    <HeaderClient
      headerControlTexts={getHeaderControlTexts(locale)}
      headerTexts={getHeaderTexts(locale)}
      locale={locale}
      mobileTexts={getMobileTexts(locale)}
      modalTexts={getModalTexts(locale)}
      toastTexts={getToastTexts(locale)}
    />
  );
}
