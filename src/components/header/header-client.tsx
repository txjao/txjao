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

  const { isToastOpen, setIsToastOpen, showUnavailableToast, } = useUnavailableToast();

  function handleMobileMenuToggle() {
    setIsMobileMenuOpen((current) => !current);
  }

  function handleDiscordOpen() {
    setIsDiscordOpen(true);
  }

  return (
    <Toast.Provider duration={3000} swipeDirection="right">
      <header className="relative h-24 bg-white-secondary text-black transition-colors border-b-[0.5px] dark:bg-black-secondary dark:text-white">
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
