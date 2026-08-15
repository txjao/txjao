import {
  enHeader,
  enHeaderControlTexts,
  enMobileHeaderMenu,
  enModalTexts,
  enToastTexts,
} from "@/src/lang/en-us.lang";
import {
  ptHeader,
  ptHeaderControlTexts,
  ptMobileHeaderMenu,
  ptModalTexts,
  ptToastTexts,
} from "@/src/lang/pt-br.lang";
import type {
  IHeaderControlTexts,
  IHeaderTexts,
  IMobileHeaderMenuTexts,
  IModalTexts,
  IToastTexts,
  Locale,
} from "@/src/types/language-types";
import { handleLang } from "@/src/utils/handle-lang";

export function getHeaderTexts(locale: Locale): IHeaderTexts {
  return handleLang(locale) ? ptHeader : enHeader;
}

export function getHeaderControlTexts(locale: Locale): IHeaderControlTexts {
  return handleLang(locale) ? ptHeaderControlTexts : enHeaderControlTexts;
}

export function getMobileTexts(locale: Locale): IMobileHeaderMenuTexts {
  return handleLang(locale) ? ptMobileHeaderMenu : enMobileHeaderMenu;
}

export function getModalTexts(locale: Locale): IModalTexts {
  return handleLang(locale) ? ptModalTexts : enModalTexts;
}

export function getToastTexts(locale: Locale): IToastTexts {
  return handleLang(locale) ? ptToastTexts : enToastTexts;
}
