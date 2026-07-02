const navLinkLayoutClass = "relative cursor-pointer font-sans text-base text-black transition-colors";

const navLinkAfterClass = "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-black after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue dark:text-white dark:after:bg-white"

export const navLinkClass = [
    navLinkLayoutClass,
    navLinkAfterClass
].join(" ")