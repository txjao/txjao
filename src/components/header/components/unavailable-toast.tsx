"use client";

import { Toast } from "radix-ui";
import { Locale } from "../types/header.types";
import { isPortuguese } from "../utils/header.utils";


interface UnavailableToastProps {
  isOpen: boolean;
  locale: Locale;
  onOpenChange: (isOpen: boolean) => void;
}

export function UnavailableToast({
  isOpen,
  locale,
  onOpenChange,
}: UnavailableToastProps) {
  const title = isPortuguese(locale) ? "Recurso indisponível" : "Feature unavailable";

  const description = isPortuguese(locale) ? "Esta página ainda não está disponível." : "This page is not available yet.";

  return (
    <Toast.Root
      className="relative border border-black bg-white-secondary px-4 py-3 pr-12 text-black shadow-lg dark:border-white dark:bg-black-secondary dark:text-white"
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="grid gap-1">
        <Toast.Title className="font-sans text-sm font-medium">{title}</Toast.Title>
        <Toast.Description className="font-sans text-sm">
          {description}
        </Toast.Description>
      </div>
      <Toast.Close
        aria-label={isPortuguese(locale) ? "Fechar aviso" : "Close notification"}
        className="absolute right-4 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center font-sans text-sm leading-none text-black transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue dark:text-white"
      >
        X
      </Toast.Close>
    </Toast.Root>
  );
}
