import type { IconProps } from "./types";

export function NextTrackIcon({ className, ...props }: IconProps) {
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
      <path d="M5.2 5.85A1 1 0 0 0 4 6.83v10.34a1 1 0 0 0 1.55.83l7.75-5.17a1 1 0 0 0 0-1.66L5.55 6a1 1 0 0 0-.35-.15Z" />
      <rect height="14" rx="1" width="2.5" x="17" y="5" />
    </svg>
  );
}
