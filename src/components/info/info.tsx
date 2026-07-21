import Image from "next/image";
import type { ILetteringTexts, IModalTexts } from "@/src/types/language-types";
import { Bio } from "./components/bio/bio";
import { IconList } from "./components/icon-list/icon-list";
import { Lettering } from "./components/lettering/lettering";

interface InfoProps {
    bioText: string
    imageAlt: string
    letteringTexts: ILetteringTexts
    modalTexts: IModalTexts
}

export function Info({ bioText, imageAlt, letteringTexts, modalTexts }: InfoProps) {
    return (
        <section className="mt-20 flex w-full max-w-[80%] flex-col gap-6">
            <div className="flex w-full items-center gap-4 md:flex-wrap">
                <Image
                    className="h-36 w-[8.375rem] shrink-0 rounded-full object-cover 
                    max-[1024px]:h-24 max-[1024px]:w-20 
                    max-[450px]:h-36 max-[450px]:w-[7.5rem] max-[450px]:rounded-[5%] 
                    max-[375px]:w-[6.5rem]"
                    src="/images/eu-2.jpg"
                    alt={imageAlt}
                    width={1200}
                    height={1600}
                    sizes="(max-width: 375px) 104px, (max-width: 450px) 120px, (max-width: 1024px) 80px, 134px"
                    preload
                />
                <div className="min-w-0 flex-1 basis-[13.75rem]">
                    <Lettering texts={letteringTexts} />
                </div>
            </div>
            <div className="flex flex-col  gap-4 md:gap-2">
                <Bio text={bioText} />
                <IconList modalTexts={modalTexts} />
            </div>
        </section>
    );
}
