import type { IconProps } from "./types";

export function PauseIcon({ className, ...props }: IconProps) {
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
      <rect height="14" rx="1.25" width="4" x="5" y="5" />
      <rect height="14" rx="1.25" width="4" x="15" y="5" />
    </svg>
  );
}
