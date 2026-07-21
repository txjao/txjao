"use client";

import { Toast } from "radix-ui";
import type { IToastTexts } from "@/src/types/language-types";
import { CloseIcon } from "../icons";
import styles from "./styles/unavailable-toast.module.css";

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
      className={styles.root}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Toast.Title className="font-medium">{title}</Toast.Title>
      <Toast.Description className="mt-1">{description}</Toast.Description>
      <Toast.Close
        aria-label={closeLabel}
        className={`${styles.closeButton} focus-ring hover-highlight`}
      >
        <CloseIcon className="size-4" />
      </Toast.Close>
    </Toast.Root>
  );
}
