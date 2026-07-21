"use client";

import { useTypedText } from "../hooks/use-typed-text";
import styles from "../styles/lettering.module.css";

interface AnimatedTextProps {
    phrases: string[]
}

export function AnimatedText({ phrases }: AnimatedTextProps) {
    const { elementRef, reducedMotionEnabled } = useTypedText(phrases);
    const firstPhrase = phrases[0] ?? "";

    return (
        <>
            {reducedMotionEnabled ? (
                <span key="static-text" className={`${styles.animatedText} ${styles.reducedMotionText}`} aria-hidden="true">
                    {firstPhrase}
                </span>
            ) : (
                <span key="animated-text" ref={elementRef} className={styles.animatedText} aria-hidden="true" />
            )}
            <span className="sr-only">{phrases.join(" ")}</span>
        </>
    );
}
