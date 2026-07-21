"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type TypedInstance from "typed.js";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const TYPING_INTERVAL = 50;
const DELETING_INTERVAL = 25;
const PHRASE_PAUSE = 1000;

function subscribeToReducedMotion(callback: () => void) {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    mediaQuery.addEventListener("change", callback);

    return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionPreference() {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerReducedMotionPreference() {
    return false;
}

function useReducedMotionEnabled() {
    return useSyncExternalStore(
        subscribeToReducedMotion,
        getReducedMotionPreference,
        getServerReducedMotionPreference,
    );
}

export function useTypedText(phrases: string[]) {
    const elementRef = useRef<HTMLSpanElement>(null);
    const reducedMotionEnabled = useReducedMotionEnabled();

    useEffect(() => {
        const hasNoPhrases = phrases.length === 0;
        const shouldSkipAnimation = hasNoPhrases || reducedMotionEnabled;

        if (shouldSkipAnimation) return;

        let animation: TypedInstance | undefined;
        let wasCancelled = false;

        async function startAnimation() {
            const { default: Typed } = await import("typed.js");
            const shouldCancelAnimation = wasCancelled || !elementRef.current;

            if (shouldCancelAnimation) return;

            animation = new Typed(elementRef.current, {
                strings: phrases,
                typeSpeed: TYPING_INTERVAL,
                backSpeed: DELETING_INTERVAL,
                backDelay: PHRASE_PAUSE,
                smartBackspace: true,
                loop: true,
                contentType: "null",
                showCursor: false,
                autoInsertCss: false,
            });
        }

        void startAnimation();

        return () => {
            wasCancelled = true;
            animation?.destroy();
        };
    }, [phrases, reducedMotionEnabled]);

    return {
        elementRef,
        reducedMotionEnabled,
    };
}
