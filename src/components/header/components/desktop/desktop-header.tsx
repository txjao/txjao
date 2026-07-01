"use client";

import Image from "next/image";
import { IHeaderTexts } from "@/src/consts/Languange";
import { HEADER_LINKS, LOGO_IMAGE, RESUME_URL } from "../../consts/header.constants";
import { dropdownItemClass } from "../../styles/dropdown-item.styles";
import { navLinkClass } from "../../styles/nav-link.styles";
import { Locale } from "../../types/header.types";
import { LanguageToggle } from "../language-toggle";
import { ThemeToggle } from "../theme-toggle";
import { DesktopDropdown } from "./components/desktop-dropdown";


interface DesktopHeaderProps {
  headerTexts: IHeaderTexts;
  locale: Locale;
  onCertificatesClick: () => void;
  onDiscordOpen: () => void;
}

export function DesktopHeader({
  headerTexts,
  locale,
  onCertificatesClick,
  onDiscordOpen,
}: DesktopHeaderProps) {
  return (
    <nav className="hidden h-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-[60px] md:grid">
      <div className="flex items-center justify-between pr-20">
        <ThemeToggle />
        <div className="w-[200px] text-center">
          <a
            className={navLinkClass}
            href={HEADER_LINKS.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Linkedin
          </a>
        </div>
        <div className="w-[200px] text-center">

          <a
            className={navLinkClass}
            href={HEADER_LINKS.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            Github
          </a>
        </div>
      </div>

      <Image
        alt="Logo"
        height={48}
        src={LOGO_IMAGE}
        width={48}
      />

      <div className="flex items-center justify-between pl-20">
        <DesktopDropdown label={headerTexts.contactMe} widthClassName="w-[200px]">
          <a className={dropdownItemClass} href={HEADER_LINKS.email}>
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
        <LanguageToggle locale={locale} />
      </div>
    </nav>
  );
}
