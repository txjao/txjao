import type { IconProps } from "./types";

export function ArrowIcon({ className, ...props }: IconProps) {
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
        d="M5.91553 8.19769L10.9155 13.1977L15.9155 8.19769"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
