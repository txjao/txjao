import type { ILetteringTexts } from "@/src/types/language-types";
import { AnimatedText } from "./components/animated-text";
import styles from "./styles/lettering.module.css";

interface LetteringProps {
    texts: ILetteringTexts
}

export function Lettering({ texts }: LetteringProps) {

    return (
        <div>
            <div className={styles.greeting}>
                <h1 className={styles.gradientText}>{texts.title}</h1>
                <span className={styles.emoji} aria-hidden="true">👋</span>
            </div>

            <div className={styles.animatedTextWrapper}>
                <AnimatedText phrases={texts.phrases} />
            </div>
        </div>
    );
}
