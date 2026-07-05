"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseHideHeaderOptions {
  isPinned?: boolean;
  scrollDelta?: number;
}

type HeaderVisibility = "hidden" | "initial" | "visible";
type HeaderVisibilityUpdate = Exclude<HeaderVisibility, "initial">;

// Minimum sensitivity for intentional scroll movement.
const DEFAULT_SCROLL_DELTA = 6;

const TOP_SCROLL_POSITION = 0;

export function useHideHeader({
  isPinned = false,
  scrollDelta = DEFAULT_SCROLL_DELTA,
}: UseHideHeaderOptions = {}) {
  const [headerVisibility, setHeaderVisibility] = useState<HeaderVisibility>("initial");

  const headerVisibilityRef = useRef<HeaderVisibility>("initial");
  const lastScrollYRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);

  const updateHeaderVisibility = useCallback((nextHeaderVisibility: HeaderVisibilityUpdate) => {
    const isSameHeaderVisibility = headerVisibilityRef.current === nextHeaderVisibility;
    const isInitialVisibleState = headerVisibilityRef.current === "initial" && nextHeaderVisibility === "visible";

    const shouldSkipVisibilityUpdate = isSameHeaderVisibility || isInitialVisibleState;

    if (shouldSkipVisibilityUpdate) return;

    headerVisibilityRef.current = nextHeaderVisibility;

    setHeaderVisibility(nextHeaderVisibility);
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) return;

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDistance = currentScrollY - lastScrollYRef.current;

      const hasReachedTop = currentScrollY <= TOP_SCROLL_POSITION;

      const hasScrolledUp = scrollDistance < -scrollDelta;
      const hasScrolledDown = scrollDistance > scrollDelta;

      const shouldShowHeader = hasReachedTop || hasScrolledUp;
      const shouldHideHeader = !isPinned && hasScrolledDown;

      if (shouldShowHeader) updateHeaderVisibility("visible");
      else if (shouldHideHeader) updateHeaderVisibility("hidden");

      lastScrollYRef.current = currentScrollY;
      scrollFrameRef.current = null;
    });
  }, [isPinned, scrollDelta, updateHeaderVisibility]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    if (isPinned) updateHeaderVisibility("visible");

    //TODO: Debbug and understand why the header state is desincronyzed with hook state
    //the console.log show the desyncronizing
    console.log("hook-state: ", {
      isPinned,
      headerVisibility
    })

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [handleScroll, isPinned, updateHeaderVisibility, headerVisibility]);

  return {
    hasHeaderVisibilityChanged: headerVisibility !== "initial",
    isHeaderHidden: headerVisibility === "hidden"
  };
}
