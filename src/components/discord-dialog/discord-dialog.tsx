"use client";

import { Dialog } from "radix-ui";
import { DISCORD_URL, DISCORD_USER } from "@/src/consts/url.consts";
import type { IModalTexts } from "@/src/types/language-types";
import { dialogActionButtonClass, dialogContentClass } from "./discord-dialog.styles";

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
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/35" />
        <Dialog.Content className={dialogContentClass}>
          <Dialog.Title className="font-sans text-xl font-medium">
            {modalTexts.title}
          </Dialog.Title>
          <Dialog.Description className="mt-3 font-sans text-base">
            {modalTexts.text}
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-4">
            <Dialog.Close asChild>
              <button
                className={dialogActionButtonClass}
                type="button"
              >
                {modalTexts.closeButton}
              </button>
            </Dialog.Close>
            <button
              className={dialogActionButtonClass}
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
