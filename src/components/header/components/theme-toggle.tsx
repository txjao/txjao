"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = isMounted && resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex size-10 items-center justify-center border-0 bg-transparent text-black transition-transform hover:[animation:theme-toggle-wiggle_0.8s_alternate] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue dark:text-white"
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <img
        alt=""
        className="size-8"
        src={isDark ? "/icons/sun.svg" : "/icons/Moon.svg"}
      />
    </button>
  );
}
