import { notFound } from "next/navigation";
import { Info } from "@/src/components/info/info";
import { Projects } from "@/src/components/projects/projects";
import {
    enInfo,
    enLettering,
    enModalTexts,
    enProfileImageAlt,
    enProjectsTexts,
} from "@/src/lang/en-us.lang";
import {
    ptInfo,
    ptLettering,
    ptModalTexts,
    ptProfileImageAlt,
    ptProjectsTexts,
} from "@/src/lang/pt-br.lang";
import { handleLang } from "@/src/utils/handle-lang";
import { isLocale } from "@/src/utils/is-locale";
import { resolveLetteringTexts } from "@/src/utils/resolve-lettering-texts";

export const revalidate = 86400;

export default async function Home({
    params,
}: Readonly<{
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!isLocale(locale)) notFound();

    const isPortuguese = handleLang(locale);
    const letteringDictionary = isPortuguese ? ptLettering : enLettering;
    const imageAlt = isPortuguese ? ptProfileImageAlt : enProfileImageAlt;
    const bioText = isPortuguese ? ptInfo : enInfo;
    const modalTexts = isPortuguese ? ptModalTexts : enModalTexts;
    const projectsTexts = isPortuguese ? ptProjectsTexts : enProjectsTexts;
    const letteringTexts = resolveLetteringTexts(letteringDictionary);

    return (
        <div className="flex flex-col items-center">
            <Info
                bioText={bioText}
                imageAlt={imageAlt}
                letteringTexts={letteringTexts}
                modalTexts={modalTexts}
            />
            <Projects texts={projectsTexts} />
        </div>
    );
}
