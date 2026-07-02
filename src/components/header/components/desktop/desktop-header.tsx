"use client";

import Image from "next/image";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOGO_IMAGE_URL, RESUME_URL } from "@/src/consts/url.consts";
import type { IHeaderControlTexts, IHeaderTexts, Locale } from "@/src/types/language-types";

import { dropdownItemClass } from "../../styles/dropdown-item.styles";
import { navLinkClass } from "../../styles/nav-link.styles";
import { LanguageToggle } from "../language-toggle";
import { ThemeToggle } from "../theme-toggle";
import { DesktopDropdown } from "./components/desktop-dropdown";

interface DesktopHeaderProps {
  headerControlTexts: IHeaderControlTexts;
  headerTexts: IHeaderTexts;
  locale: Locale;
  onCertificatesClick: () => void;
  onDiscordOpen: () => void;
}

export function DesktopHeader({
  headerControlTexts,
  headerTexts,
  locale,
  onCertificatesClick,
  onDiscordOpen,
}: DesktopHeaderProps) {
  return (
    <nav className="hidden h-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-8 md:grid lg:px-16">
      <div className="flex items-center justify-between pr-0 lg:pr-20">
        <ThemeToggle
          switchToDarkLabel={headerControlTexts.switchToDarkThemeLabel}
          switchToLightLabel={headerControlTexts.switchToLightThemeLabel}
        />
        <div className="w-[200px] text-center">
          <a
            className={navLinkClass}
            href={LINKEDIN_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Linkedin
          </a>
        </div>
        <div className="w-[200px] text-center">

          <a
            className={navLinkClass}
            href={GITHUB_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Github
          </a>
        </div>
      </div>

      <Image
        alt={headerControlTexts.logoAlt}
        height={48}
        src={LOGO_IMAGE_URL}
        width={48}
      />

      <div className="flex items-center justify-between pl-0 lg:pl-20">
        <DesktopDropdown label={headerTexts.contactMe} widthClassName="w-[200px]">
          <a className={dropdownItemClass} href={EMAIL}>
            E-mail
          </a>
          <button
            className={dropdownItemClass}
            type="button"
            onClick={onDiscordOpen}
          >
            Discord
          </button>
        </DesktopDropdown>
        <DesktopDropdown label={headerTexts.me} widthClassName="w-[200px]">
          <a
            className={dropdownItemClass}
            href={RESUME_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            {headerTexts.meItens.resume}
          </a>
          <button
            className={dropdownItemClass}
            type="button"
            onClick={onCertificatesClick}
          >
            {headerTexts.meItens.certificates}
          </button>
        </DesktopDropdown>
        <LanguageToggle
          label={headerControlTexts.languageToggleLabel}
          locale={locale}
        />
      </div>
    </nav>
  );
}
