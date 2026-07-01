const dropdownItemsLayoutClass = "flex flex-col items-center gap-2.5 opacity-0";

const dropdownItemsTransitionClass = "transition-opacity duration-100 ease-in-out";

const dropdownItemsStateClass = "group-data-[state=open]:opacity-100";

export const dropdownItemsClass = [
  dropdownItemsLayoutClass,
  dropdownItemsTransitionClass,
  dropdownItemsStateClass,
].join(" ");
