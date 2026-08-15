import type { IconProps } from "./types";

export function PlayIcon({ className, ...props }: IconProps) {
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
      <path d="M7.5 5.4a1 1 0 0 1 1.53-.85l10 6.6a1 1 0 0 1 0 1.7l-10 6.6a1 1 0 0 1-1.53-.85V5.4Z" />
    </svg>
  );
}
