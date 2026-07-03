"use client";

import Image from "next/image";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOGO_IMAGE_URL, RESUME_URL } from "@/src/consts/url.consts";
import type { IHeaderControlTexts, IMobileHeaderMenuTexts, Locale } from "@/src/types/language-types";
import { HamburgerIcon } from "../../../icons";
import { navLinkClass } from "../../styles/nav-link.styles";
import { LanguageToggle } from "../language-toggle";
import { ThemeToggle } from "../theme-toggle";
import { menuPanelClass } from "./mobile-header.styles";

interface MobileHeaderProps {
  headerControlTexts: IHeaderControlTexts;
  isMenuOpen: boolean;
  locale: Locale;
  mobileTexts: IMobileHeaderMenuTexts;
  onCertificatesClick: () => void;
  onMenuToggle: () => void;
}

export function MobileHeader({
  headerControlTexts,
  isMenuOpen,
  locale,
  mobileTexts,
  onCertificatesClick,
  onMenuToggle,
}: MobileHeaderProps) {
  return (
    <nav className="flex h-full items-center justify-between px-8 md:hidden">
      <Image
        alt={headerControlTexts.logoAlt}
        height={48}
        width={48}
        src={LOGO_IMAGE_URL}
        preload
      />
      <div className="relative flex flex-col items-end">
        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? headerControlTexts.closeMenuLabel : headerControlTexts.openMenuLabel}
          className="focus-ring flex size-10 items-center justify-center text-black dark:text-white"
          type="button"
          onClick={onMenuToggle}
        >
          <HamburgerIcon isOpen={isMenuOpen} />
        </button>
        {isMenuOpen ? (
          <div className={menuPanelClass}>
            <div className="mb-1 flex w-full items-center justify-between">
              <ThemeToggle />
              <LanguageToggle
                label={headerControlTexts.languageToggleLabel}
                locale={locale}
              />
            </div>
            <a className={navLinkClass} href={EMAIL}>
              E-mail
            </a>
            <a
              className={navLinkClass}
              href={GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Github
            </a>
            <a
              className={navLinkClass}
              href={LINKEDIN_URL}
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
