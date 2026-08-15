import type { IconProps } from "./types";

export function PreviousTrackIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      focusable="false"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <rect height="14" rx="1" width="2.5" x="4.5" y="5" />
      <path d="M18.8 5.85a1 1 0 0 1 1.2.98v10.34a1 1 0 0 1-1.55.83l-7.75-5.17a1 1 0 0 1 0-1.66L18.45 6a1 1 0 0 1 .35-.15Z" />
    </svg>
  );
}
