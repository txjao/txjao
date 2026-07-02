"use client";

import { Dialog } from "radix-ui";
import { DISCORD_URL, DISCORD_USER } from "@/src/consts/url.consts";
import type { IModalTexts } from "@/src/types/language-types";

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
  const user = "jao5626";

  async function handleCopy() {
    await navigator.clipboard.writeText(user);
    onOpenChange(false);
    window.open(DISCORD_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/35" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(360px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 bg-white-secondary p-6 text-black shadow-xl outline-none dark:bg-black-secondary dark:text-white">
          <Dialog.Title className="font-sans text-xl font-medium">
            {modalTexts.title}
          </Dialog.Title>
          <Dialog.Description className="mt-3 font-sans text-base">
            {modalTexts.text}
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-4">
            <Dialog.Close asChild>
              <button
                className="font-sans text-base text-black transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue dark:text-white dark:hover:text-yellow"
                type="button"
              >
                {modalTexts.closeButton}
              </button>
            </Dialog.Close>
            <button
              className="font-sans text-base text-black transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue dark:text-white dark:hover:text-yellow"
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
