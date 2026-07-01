import {
  enHeader,
  enMobileHeaderMenu,
  enModalTexts,
  ptHeader,
  ptMobileHeaderMenu,
  ptModalTexts,
  type IHeaderTexts,
  type IMobileHeaderMenuTexts,
  type IModalTexts,
} from "@/src/consts/Languange";
import { HeaderClient } from "./header-client";
import type { HeaderProps, Locale } from "./types/header.types";
import { isPortuguese } from "./utils/header.utils";

function getHeaderTexts(locale: Locale): IHeaderTexts {
  return isPortuguese(locale) ? ptHeader : enHeader;
}

function getMobileTexts(locale: Locale): IMobileHeaderMenuTexts {
  return isPortuguese(locale) ? ptMobileHeaderMenu : enMobileHeaderMenu;
}

function getModalTexts(locale: Locale): IModalTexts {
  return isPortuguese(locale) ? ptModalTexts : enModalTexts;
}

export function Header({ locale = "en-US" }: HeaderProps) {
  return (
    <HeaderClient
      headerTexts={getHeaderTexts(locale)}
      locale={locale}
      mobileTexts={getMobileTexts(locale)}
      modalTexts={getModalTexts(locale)}
    />
  );
}
