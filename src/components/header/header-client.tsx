"use client";

import { Toast } from "radix-ui";
import { useState } from "react";
import type {
  IHeaderControlTexts,
  IHeaderTexts,
  IMobileHeaderMenuTexts,
  Locale,
  IModalTexts,
  IToastTexts,
} from "@/src/types/language-types";
import { DesktopHeader } from "./components/desktop/desktop-header";
import { DiscordDialog } from "../discord-dialog/discord-dialog";
import { MobileHeader } from "./components/mobile/mobile-header";
import { UnavailableToast } from "../toast/unavailable-toast";
import { useUnavailableToast } from "../toast/hooks/use-toast";
import { useHideHeader } from "./hooks/use-hide-header";

interface HeaderClientProps {
  headerControlTexts: IHeaderControlTexts;
  headerTexts: IHeaderTexts;
  locale: Locale;
  mobileTexts: IMobileHeaderMenuTexts;
  modalTexts: IModalTexts;
  toastTexts: IToastTexts;
}

export function HeaderClient({
  headerControlTexts,
  headerTexts,
  locale,
  mobileTexts,
  modalTexts,
  toastTexts,
}: HeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDiscordOpen, setIsDiscordOpen] = useState(false);

  const { isToastOpen, setIsToastOpen, showUnavailableToast } = useUnavailableToast();

  const { hasHeaderVisibilityChanged, isHeaderHidden } = useHideHeader({
    isPinned: isMobileMenuOpen,
  });

  function handleMobileMenuToggle() {
    setIsMobileMenuOpen((currentIsMobileMenuOpen) => !currentIsMobileMenuOpen);
  }

  function handleDiscordOpen() {
    setIsDiscordOpen(true);
  }

  return (
    <Toast.Provider duration={3000} swipeDirection="right">
      {isHeaderHidden && (
        <div
          aria-hidden="true"
          className="header-hover-trigger fixed inset-x-0 top-0 z-40 h-24"
        />
      )}
      <header
        className="site-header fixed inset-x-0 top-0 z-50 h-24 border-b-[0.5px] bg-white-secondary text-black transition-colors duration-200 dark:bg-black-secondary dark:text-white"
        data-header-animated={hasHeaderVisibilityChanged}
        data-header-hidden={isHeaderHidden}
      >
        <DesktopHeader
          locale={locale}
          headerTexts={headerTexts}
          headerControlTexts={headerControlTexts}
          onCertificatesClick={showUnavailableToast}
          onDiscordOpen={handleDiscordOpen}
        />

        <MobileHeader
          isMenuOpen={isMobileMenuOpen}
          locale={locale}
          mobileTexts={mobileTexts}
          headerControlTexts={headerControlTexts}
          onCertificatesClick={showUnavailableToast}
          onMenuToggle={handleMobileMenuToggle}
        />
      </header>
      <div className="h-24" aria-hidden="true" />

      <DiscordDialog
        isOpen={isDiscordOpen}
        modalTexts={modalTexts}
        onOpenChange={setIsDiscordOpen}
      />
      <UnavailableToast
        isOpen={isToastOpen}
        onOpenChange={setIsToastOpen}
        toastTexts={toastTexts}
      />
      <Toast.Viewport className="fixed right-6 top-8 z-[100] flex w-[min(360px,calc(100vw-32px))] flex-col gap-2 outline-none" />
    </Toast.Provider>
  );
}
