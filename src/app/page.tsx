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
      <Header locale="en-US" />
      <div className="mt-24 flex justify-center text-black dark:text-white">
        <div className="grid grid-cols-4 gap-6">
          <ArrowIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
          <ChevronIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
          <CloseIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
          <DiscordIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
          <FigmaIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
          <GithubIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
          <HamburgerIcon className="size-8 hover:text-blue dark:hover:text-yellow" isOpen={false} />
          <InstagramIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
          <LinkedinIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
          <MoonIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
          <SpotifyIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
          <SunIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
          <TwitterIcon className="size-8 hover:text-blue dark:hover:text-yellow" />
        </div>
      </div>
    </>
  );
}
