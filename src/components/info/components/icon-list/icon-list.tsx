import {
    FigmaIcon,
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
    SpotifyIcon,
} from "@/src/components/icons";
import {
    FIGMA_URL,
    GITHUB_URL,
    INSTAGRAM_URL,
    LINKEDIN_URL,
    SPOTIFY_URL,
} from "@/src/consts/url.consts";
import type { IModalTexts } from "@/src/types/language-types";
import { DiscordDialogIcon } from "./components/discord-dialog-icon";

const ICON_ITEMS = [
    { type: "link", href: LINKEDIN_URL, label: "LinkedIn", Icon: LinkedinIcon },
    { type: "link", href: GITHUB_URL, label: "GitHub", Icon: GithubIcon },
    { type: "link", href: INSTAGRAM_URL, label: "Instagram", Icon: InstagramIcon },
    { type: "link", href: SPOTIFY_URL, label: "Spotify", Icon: SpotifyIcon },
    { type: "link", href: FIGMA_URL, label: "Figma", Icon: FigmaIcon },
    { type: "discord", label: "Discord" },
] as const;

interface IconListProps {
    modalTexts: IModalTexts
}

export function IconList({ modalTexts }: IconListProps) {
    return (
        <ul className="flex flex-wrap gap-2 md:gap-6">
            {ICON_ITEMS.map((item) => item.type === "discord" ? (
                <li key={item.label}>
                    <DiscordDialogIcon modalTexts={modalTexts} />
                </li>
            ) : (
                <li key={item.href}>
                    <a
                        aria-label={item.label}
                        className="focus-ring hover-highlight relative top-0 block h-6 w-8 rounded-sm transition-[top] duration-100 hover:-top-0.5"
                        href={item.href}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <item.Icon className="h-7 w-full md:h-10" />
                    </a>
                </li>
            ))}
        </ul>
    );
}
