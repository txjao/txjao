"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../../../icons";
import styles from "./styles/theme-toggle.module.css";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Switch theme toggle"
      className={`${styles.toggle} focus-ring flex size-10 items-center justify-center border-0 bg-transparent text-black transition-transform dark:text-white`}
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <MoonIcon className="size-8 dark:hidden" />
      <SunIcon className="hidden size-8 dark:block" />
    </button>
  );
}
