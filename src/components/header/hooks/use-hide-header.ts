"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseHideHeaderOptions {
  scrollDelta?: number;
}

type HeaderVisibility = "hidden" | "initial" | "pinned" | "visible";
type HeaderVisibilityUpdate = Exclude<HeaderVisibility, "initial">;

// Minimum sensitivity for intentional scroll movement.
const DEFAULT_SCROLL_DELTA = 6;

const TOP_SCROLL_POSITION = 0;

export function useHideHeader({
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

  const hideHeader = useCallback(() => {
    updateHeaderVisibility("hidden");
  }, [updateHeaderVisibility]);

  const pinHeader = useCallback(() => {
    updateHeaderVisibility("pinned");
  }, [updateHeaderVisibility]);

  const unpinHeader = useCallback(() => {
    updateHeaderVisibility("visible");
  }, [updateHeaderVisibility]);

  const showHeader = useCallback(() => {
    updateHeaderVisibility("visible");
  }, [updateHeaderVisibility]);

  const handleScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) return;

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDistance = currentScrollY - lastScrollYRef.current;

      const hasReachedTop = currentScrollY <= TOP_SCROLL_POSITION;

      const hasScrolledUp = scrollDistance < -scrollDelta;
      const hasScrolledDown = scrollDistance > scrollDelta;
      const isHeaderPinned = headerVisibilityRef.current === "pinned";

      const shouldShowHeader = !isHeaderPinned && (hasReachedTop || hasScrolledUp);
      const shouldHideHeader = !isHeaderPinned && hasScrolledDown;

      if (shouldShowHeader) showHeader();
      else if (shouldHideHeader) hideHeader();

      lastScrollYRef.current = currentScrollY;
      scrollFrameRef.current = null;
    });
  }, [hideHeader, scrollDelta, showHeader]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [handleScroll]);

  return {
    headerVisibility,
    hideHeader,
    pinHeader,
    unpinHeader,
  };
}
