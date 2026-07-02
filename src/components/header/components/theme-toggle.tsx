"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../../icons";

interface ThemeToggleProps {
  switchToDarkLabel: string;
  switchToLightLabel: string;
}

export function ThemeToggle({
  switchToDarkLabel,
  switchToLightLabel,
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? switchToLightLabel : switchToDarkLabel}
      className="flex size-10 items-center justify-center border-0 bg-transparent text-black transition-transform hover:[animation:theme-toggle-wiggle_0.8s_alternate] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue dark:text-white"
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <SunIcon className="size-8" />
      ) : (
        <MoonIcon className="size-8" />
      )}
    </button>
  );
}
