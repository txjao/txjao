const menuPanelLayoutClass = "absolute right-0 top-full z-50 flex w-36 flex-col gap-2 p-3 text-right";

const menuPanelThemeClass = "border border-t-0 border-black bg-white-secondary dark:border-white dark:bg-black-secondary";

const menuPanelTransitionClass = "origin-top-right transition-[opacity,translate] duration-150 ease-out motion-reduce:transition-none";

const menuPanelClosedStateClass = "data-[menu-open=false]:pointer-events-none data-[menu-open=false]:-translate-y-2 data-[menu-open=false]:opacity-0";

const menuPanelOpenStateClass = "data-[menu-open=true]:pointer-events-auto data-[menu-open=true]:translate-y-0 data-[menu-open=true]:opacity-100";

export const menuPanelClass = [
  menuPanelLayoutClass,
  menuPanelThemeClass,
  menuPanelTransitionClass,
  menuPanelClosedStateClass,
  menuPanelOpenStateClass,
].join(" ");
