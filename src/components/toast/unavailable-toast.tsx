"use client";

import { Toast } from "radix-ui";
import type { IToastTexts } from "@/src/types/language-types";
import { CloseIcon } from "../icons";

interface UnavailableToastProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  toastTexts: IToastTexts;
}

export function UnavailableToast({
  isOpen,
  onOpenChange,
  toastTexts,
}: UnavailableToastProps) {
  const { closeLabel, description, title } = toastTexts;

  return (
    <Toast.Root
      className="relative border border-black bg-white-secondary px-4 py-3 pr-12 text-sm text-black shadow-lg motion-safe:data-[state=open]:animate-[toast-slide-in_180ms_ease-out] dark:border-white dark:bg-black-secondary dark:text-white"
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Toast.Title className="font-medium">{title}</Toast.Title>
      <Toast.Description className="mt-1">{description}</Toast.Description>
      <Toast.Close
        aria-label={closeLabel}
        className="absolute right-4 top-1/2 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue dark:hover:text-yellow"
      >
        <CloseIcon className="size-4" />
      </Toast.Close>
    </Toast.Root>
  );
}
