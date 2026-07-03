import { Header } from "@/src/components/header/header";
import {
    ArrowIcon,
    ChevronIcon,
    CloseIcon,
    DiscordIcon,
    FigmaIcon,
    GithubIcon,
    HamburgerIcon,
    InstagramIcon,
    LinkedinIcon,
    MoonIcon,
    SpotifyIcon,
    SunIcon,
    TwitterIcon,
} from "@/src/components/icons";

export default function Home() {
    return (
        <>
            <Header locale="pt-BR" />
            <div className="mt-24 flex justify-center text-black dark:text-white">
                <div className="grid grid-cols-4 gap-6">
                    <ArrowIcon className="hover-highlight size-8" />
                    <ChevronIcon className="hover-highlight size-8" />
                    <CloseIcon className="hover-highlight size-8" />
                    <DiscordIcon className="hover-highlight size-8" />
                    <FigmaIcon className="hover-highlight size-8" />
                    <GithubIcon className="hover-highlight size-8" />
                    <HamburgerIcon className="hover-highlight size-8" isOpen={false} />
                    <InstagramIcon className="hover-highlight size-8" />
                    <LinkedinIcon className="hover-highlight size-8" />
                    <MoonIcon className="hover-highlight size-8" />
                    <SpotifyIcon className="hover-highlight size-8" />
                    <SunIcon className="hover-highlight size-8" />
                    <TwitterIcon className="hover-highlight size-8" />
                </div>
            </div>
        </>
    );
}
