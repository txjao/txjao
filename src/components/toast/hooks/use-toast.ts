"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useUnavailableToast() {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  const showUnavailableToast = useCallback(() => {
    setIsToastOpen(false);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setIsToastOpen(true);
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  return {
    isToastOpen,
    setIsToastOpen,
    showUnavailableToast,
  };
}
