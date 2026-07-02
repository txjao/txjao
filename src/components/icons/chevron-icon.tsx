import type { IconProps } from "./types";

export function ChevronIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      height="1em"
      viewBox="0 0 21 21"
      width="1em"
      {...props}
    >
      <path
        d="M7.2 4.8L12.2 9.8L7.2 14.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
