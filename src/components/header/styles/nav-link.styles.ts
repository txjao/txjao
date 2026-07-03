const navLinkLayoutClass = "relative cursor-pointer font-sans text-base text-black transition-colors";

const navLinkAfterClass = "focus-ring after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-black after:transition-all after:duration-200 hover:after:w-full dark:text-white dark:after:bg-white";

export const navLinkClass = [
    navLinkLayoutClass,
    navLinkAfterClass
].join(" ");
