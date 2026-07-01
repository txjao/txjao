"use client";

import { Toast } from "radix-ui";
import { useState } from "react";
import type {
  IHeaderTexts,
  IMobileHeaderMenuTexts,
  IModalTexts,
} from "@/src/consts/Languange";
import { DesktopHeader } from "./components/desktop/desktop-header";
import { DiscordDialog } from "./components/discord-dialog";
import { MobileHeader } from "./components/mobile/mobile-header";
import { UnavailableToast } from "./components/unavailable-toast";
import { useUnavailableToast } from "./hooks/use-unavailable-toast";
import { Locale } from "./types/header.types";


interface HeaderClientProps {
  headerTexts: IHeaderTexts;
  locale: Locale;
  mobileTexts: IMobileHeaderMenuTexts;
  modalTexts: IModalTexts;
}

export function HeaderClient({
  headerTexts,
  locale,
  mobileTexts,
  modalTexts,
}: HeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDiscordOpen, setIsDiscordOpen] = useState(false);
  const {
    isToastOpen,
    setIsToastOpen,
    showUnavailableToast,
  } = useUnavailableToast();

  function handleMobileMenuToggle() {
    setIsMobileMenuOpen((current) => !current);
  }

  function handleDiscordOpen() {
    setIsDiscordOpen(true);
  }

  return (
    <Toast.Provider duration={3000} swipeDirection="right">
      <header className="relative h-24 bg-white-secondary text-black transition-colors dark:bg-black-secondary dark:text-white">
        <DesktopHeader
          headerTexts={headerTexts}
          locale={locale}
          onCertificatesClick={showUnavailableToast}
          onDiscordOpen={handleDiscordOpen}
        />

        <MobileHeader
          isMenuOpen={isMobileMenuOpen}
          locale={locale}
          mobileTexts={mobileTexts}
          onCertificatesClick={showUnavailableToast}
          onMenuToggle={handleMobileMenuToggle}
        />
      </header>

      <DiscordDialog
        isOpen={isDiscordOpen}
        modalTexts={modalTexts}
        onOpenChange={setIsDiscordOpen}
      />
      <UnavailableToast
        isOpen={isToastOpen}
        locale={locale}
        onOpenChange={setIsToastOpen}
      />
      <Toast.Viewport className="fixed right-6 top-32 z-[100] flex w-[min(360px,calc(100vw-32px))] flex-col gap-2 outline-none" />
    </Toast.Provider>
  );
}
