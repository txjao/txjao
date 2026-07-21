"use client";

import { useState } from "react";
import { DiscordDialog } from "@/src/components/discord-dialog/discord-dialog";
import { DiscordIcon } from "@/src/components/icons";
import type { IModalTexts } from "@/src/types/language-types";

interface DiscordDialogIconProps {
    modalTexts: IModalTexts
}

export function DiscordDialogIcon({ modalTexts }: DiscordDialogIconProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                aria-label="Discord"
                className="focus-ring hover-highlight relative top-0 block h-6 w-8 cursor-pointer rounded-sm border-0 bg-transparent p-0 text-black transition-[top] duration-100 hover:-top-0.5 dark:text-white"
                type="button"
                onClick={() => setIsOpen(true)}
            >
                <DiscordIcon className="h-7 w-full md:h-10" />
            </button>
            <DiscordDialog
                isOpen={isOpen}
                modalTexts={modalTexts}
                onOpenChange={setIsOpen}
            />
        </>
    );
}
