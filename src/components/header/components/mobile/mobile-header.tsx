"use client";

import { IMobileHeaderMenuTexts } from "@/src/consts/Languange";
import { LOGO_IMAGE, HEADER_LINKS, RESUME_URL } from "../../consts/header.constants";
import { HamburgerIcon } from "../../../icons";
import { menuPanelClass } from "../../styles/mobile-menu.styles";
import { navLinkClass } from "../../styles/nav-link.styles";
import { Locale } from "../../types/header.types";
import { LanguageToggle } from "../language-toggle";
import { ThemeToggle } from "../theme-toggle";

interface MobileHeaderProps {
  isMenuOpen: boolean;
  locale: Locale;
  mobileTexts: IMobileHeaderMenuTexts;
  onCertificatesClick: () => void;
  onMenuToggle: () => void;
}

export function MobileHeader({
  isMenuOpen,
  locale,
  mobileTexts,
  onCertificatesClick,
  onMenuToggle,
}: MobileHeaderProps) {
  return (
    <nav className="flex h-full items-center justify-between px-8 md:hidden">
      <img alt="Logo" className="h-12 w-auto" src={LOGO_IMAGE} />
      <div className="relative flex flex-col items-end">
        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="flex size-10 items-center justify-center text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue dark:text-white"
          type="button"
          onClick={onMenuToggle}
        >
          <HamburgerIcon isOpen={isMenuOpen} />
        </button>
        {isMenuOpen ? (
          <div className={menuPanelClass}>
            <div className="mb-1 flex w-full items-center justify-between">
              <ThemeToggle />
              <LanguageToggle locale={locale} />
            </div>
            <a className={navLinkClass} href={HEADER_LINKS.email}>
              E-mail
            </a>
            <a
              className={navLinkClass}
              href={HEADER_LINKS.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              Github
            </a>
            <a
              className={navLinkClass}
              href={HEADER_LINKS.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              Linkedin
            </a>
            <a
              className={navLinkClass}
              href={RESUME_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              {mobileTexts.resume}
            </a>
            <button
              className={`${navLinkClass} self-end text-right`}
              type="button"
              onClick={onCertificatesClick}
            >
              {mobileTexts.certificates}
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
