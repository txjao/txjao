const toastRootLayoutClass = "relative px-4 py-3 pr-12 text-sm shadow-lg";

const toastRootThemeClass = "border border-black bg-white-secondary text-black dark:border-white dark:bg-black-secondary dark:text-white";

const toastRootAnimationClass = "motion-safe:data-[state=open]:animate-[toast-slide-in_180ms_ease-out]";

export const toastRootClass = [
  toastRootLayoutClass,
  toastRootThemeClass,
  toastRootAnimationClass,
].join(" ");

export const toastCloseButtonClass = "focus-ring hover-highlight absolute right-4 top-1/2 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center";
