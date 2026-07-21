"use client";

import { Dialog } from "radix-ui";
import { DISCORD_URL, DISCORD_USER } from "@/src/consts/url.consts";
import type { IModalTexts } from "@/src/types/language-types";
import styles from "./styles/discord-dialog.module.css";

interface DiscordDialogProps {
  isOpen: boolean;
  modalTexts: IModalTexts;
  onOpenChange: (isOpen: boolean) => void;
}

export function DiscordDialog({
  isOpen,
  modalTexts,
  onOpenChange,
}: DiscordDialogProps) {
  async function handleCopy() {
    await navigator.clipboard.writeText(DISCORD_USER);
    onOpenChange(false);
    window.open(DISCORD_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className="font-sans text-xl font-medium">
            {modalTexts.title}
          </Dialog.Title>
          <Dialog.Description className="mt-3 font-sans text-base">
            {modalTexts.text}
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-4">
            <Dialog.Close asChild>
              <button
                className={`${styles.actionButton} focus-ring hover-highlight`}
                type="button"
              >
                {modalTexts.closeButton}
              </button>
            </Dialog.Close>
            <button
              className={`${styles.actionButton} focus-ring hover-highlight`}
              type="button"
              onClick={handleCopy}
            >
              {modalTexts.addButton}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
