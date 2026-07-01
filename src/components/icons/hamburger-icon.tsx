export function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span aria-hidden="true" className="relative block size-5">
      <span
        className={`absolute left-0 top-[4px] h-0.5 w-5 bg-current transition-transform ${
          isOpen ? "translate-y-[6px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[10px] h-0.5 w-5 bg-current transition-opacity ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 top-[16px] h-0.5 w-5 bg-current transition-transform ${
          isOpen ? "-translate-y-[6px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}
