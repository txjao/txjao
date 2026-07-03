"use client";

import { Toast } from "radix-ui";
import type { IToastTexts } from "@/src/types/language-types";
import { CloseIcon } from "../icons";
import { toastCloseButtonClass, toastRootClass } from "./unavailable-toast.styles";

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
      className={toastRootClass}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Toast.Title className="font-medium">{title}</Toast.Title>
      <Toast.Description className="mt-1">{description}</Toast.Description>
      <Toast.Close
        aria-label={closeLabel}
        className={toastCloseButtonClass}
      >
        <CloseIcon className="size-4" />
      </Toast.Close>
    </Toast.Root>
  );
}
