const dropdownContentLayoutClass = "group pointer-events-none absolute left-1/2 top-9 z-50 flex h-20 w-[140px] -translate-x-1/2 flex-col items-center justify-center overflow-hidden px-4 pt-3 pb-6 text-center opacity-0";

const dropdownContentThemeClass = "border border-t-0 border-black bg-white-secondary text-black dark:border-white dark:bg-black-secondary dark:text-white";

const dropdownContentTransitionClass = "[transition:clip-path_160ms_ease-in-out,transform_160ms_ease-in-out,opacity_100ms_ease-in-out]";

const dropdownContentClosedStateClass = "data-[state=closed]:-translate-y-2 data-[state=closed]:opacity-0 data-[state=closed]:[clip-path:inset(0_0_100%_0)]";

const dropdownContentOpenStateClass = "data-[state=open]:pointer-events-auto data-[state=open]:translate-y-0 data-[state=open]:opacity-100 data-[state=open]:[clip-path:inset(0_0_0_0)]";

export const dropdownContentClass = [
  dropdownContentLayoutClass,
  dropdownContentThemeClass,
  dropdownContentTransitionClass,
  dropdownContentClosedStateClass,
  dropdownContentOpenStateClass,
].join(" ");
