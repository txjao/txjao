const contentPositionClass = "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2";

const contentLayoutClass = "w-[min(360px,calc(100vw-32px))] p-6 shadow-xl outline-none";

const contentThemeClass = "bg-white-secondary text-black dark:bg-black-secondary dark:text-white";

export const dialogContentClass = [
  contentPositionClass,
  contentLayoutClass,
  contentThemeClass,
].join(" ");

export const dialogActionButtonClass = "font-sans text-base text-black dark:text-white hover-highlight focus-ring";
