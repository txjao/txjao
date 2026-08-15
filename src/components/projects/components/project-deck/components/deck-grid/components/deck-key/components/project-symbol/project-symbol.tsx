import type { CSSProperties } from "react";
import type { ProjectVisual } from "@/src/components/projects/types/project.types";
import styles from "./styles/project-symbol.module.css";

interface ProjectSymbolProps {
  visual: ProjectVisual;
}

export function ProjectSymbol({ visual }: ProjectSymbolProps) {
  const hasFavicon = visual.kind === "favicon";

  if (hasFavicon) {
    const imageStyle: CSSProperties = {
      backgroundImage: `url("${visual.src}")`,
    };

    return (
      <span
        aria-hidden="true"
        className={`${styles.symbolFrame} ${styles.symbolImage}`}
        style={imageStyle}
      />
    );
  }

  return (
    <span className={styles.symbolFrame} aria-hidden="true">
      <span className={styles.monogram}>{visual.value}</span>
    </span>
  );
}
