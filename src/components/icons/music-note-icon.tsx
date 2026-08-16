import type { IconProps } from "./types";

export function MusicNoteIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M14.5 17V6L19 5V7.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle cx="11.25" cy="17.25" r="3.25" fill="currentColor" />
    </svg>
  );
}
