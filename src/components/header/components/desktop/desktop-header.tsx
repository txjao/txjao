"use client";

import Image from "next/image";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOGO_IMAGE_URL, RESUME_URL } from "@/src/consts/url.consts";
import type { IHeaderControlTexts, IHeaderTexts, Locale } from "@/src/types/language-types";

import navLinkStyles from "../../styles/nav-link.module.css";
import { LanguageToggle } from "../language-toggle";
import { ThemeToggle } from "../theme-toggle";
import { DesktopDropdown } from "./components/desktop-dropdown";

const navLinkClassName = `${navLinkStyles.link} focus-ring`;
const dropdownItemClassName = `${navLinkClassName} text-center`;

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
        <ThemeToggle />
        <div className="w-[200px] text-center">
          <a
            className={navLinkClassName}
            href={LINKEDIN_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Linkedin
          </a>
        </div>
        <div className="w-[200px] text-center">
          <a
            className={navLinkClassName}
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
        height={64}
        width={64}
        src={LOGO_IMAGE_URL}
        preload
      />

      <div className="flex items-center justify-between pl-0 lg:pl-20">
        <DesktopDropdown label={headerTexts.contactMe} widthClassName="w-[200px]">
          <a className={dropdownItemClassName} href={EMAIL}>
            E-mail
          </a>
          <button
            className={dropdownItemClassName}
            type="button"
            onClick={onDiscordOpen}
          >
            Discord
          </button>
        </DesktopDropdown>
        <DesktopDropdown label={headerTexts.me} widthClassName="w-[200px]">
          <a
            className={dropdownItemClassName}
            href={RESUME_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            {headerTexts.meItens.resume}
          </a>
          <button
            className={dropdownItemClassName}
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
