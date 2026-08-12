import { ChevronIcon } from "@/src/components/icons";
import styles from "../styles/project-deck.module.css";

interface DeckNavigationProps {
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    nextPageLabel: string
    pageLabel: string
    previousPageLabel: string
    totalPages: number
    onNext: () => void
    onPrevious: () => void
}

export function DeckNavigation({
    currentPage,
    hasNextPage,
    hasPreviousPage,
    nextPageLabel,
    pageLabel,
    previousPageLabel,
    totalPages,
    onNext,
    onPrevious,
}: DeckNavigationProps) {
    const visiblePage = currentPage + 1;

    return (
        <div className={styles.navigation}>
            <button
                aria-label={previousPageLabel}
                className={`${styles.navigationButton} focus-ring`}
                disabled={!hasPreviousPage}
                type="button"
                onClick={onPrevious}
            >
                <ChevronIcon className={`${styles.previousIcon} size-5`} />
            </button>

            <p
                aria-atomic="true"
                aria-live="polite"
                className={styles.pageIndicator}
            >
                {pageLabel} {visiblePage} / {totalPages}
            </p>

            <button
                aria-label={nextPageLabel}
                className={`${styles.navigationButton} focus-ring`}
                disabled={!hasNextPage}
                type="button"
                onClick={onNext}
            >
                <ChevronIcon className="size-5" />
            </button>
        </div>
    );
}
