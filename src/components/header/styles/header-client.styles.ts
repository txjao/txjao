export const headerFrameClass = "group/header pointer-events-none fixed inset-x-0 top-0 z-50 h-24 md:pointer-events-auto";

export const headerHoverHitboxClass = "pointer-events-auto absolute inset-x-0 top-0 hidden h-24 bg-transparent md:block";

export const headerShellClass = [
  "pointer-events-auto relative z-10 h-24 translate-y-0 opacity-100",
  "border-b-[0.5px] bg-white-secondary text-black dark:bg-black-secondary dark:text-white",
  "transition-[background-color,color,translate,opacity] duration-200 ease-in-out",
  "data-[header-visibility=hidden]:pointer-events-none data-[header-visibility=hidden]:-translate-y-full data-[header-visibility=hidden]:opacity-0",
  "data-[header-visibility=pinned]:translate-y-0 data-[header-visibility=pinned]:opacity-100",
  "data-[header-visibility=visible]:translate-y-0 data-[header-visibility=visible]:opacity-100",
  "md:group-hover/header:data-[header-visibility=hidden]:pointer-events-auto md:group-hover/header:data-[header-visibility=hidden]:translate-y-0 md:group-hover/header:data-[header-visibility=hidden]:opacity-100",
  "data-[header-visibility=hidden]:has-[:focus-visible]:pointer-events-auto data-[header-visibility=hidden]:has-[:focus-visible]:translate-y-0 data-[header-visibility=hidden]:has-[:focus-visible]:opacity-100",
  "motion-reduce:transition-none",
].join(" ");
