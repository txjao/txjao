"use client";

import { Dialog } from "radix-ui";
import { CloseIcon } from "@/src/components/icons";
import type { IProjectsTexts } from "@/src/types/language-types";
import type { Project } from "../../types/project.types";
import styles from "./styles/project-dialog.module.css";

interface ProjectDialogProps {
  isFrameLoading: boolean;
  isOpen: boolean;
  project: Project | null;
  texts: IProjectsTexts;
  onFrameLoad: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

export function ProjectDialog({
  isFrameLoading,
  isOpen,
  project,
  texts,
  onFrameLoad,
  onOpenChange,
}: ProjectDialogProps) {
  const shouldRenderProject = isOpen && project !== null;
  const dialogTitle = project?.title ?? texts.sectionLabel;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <header className={styles.header}>
            <Dialog.Title className={styles.title}>
              {dialogTitle}
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              {texts.dialogDescription}
            </Dialog.Description>

            <div className={styles.actions}>
              {project && (
                <a
                  className={`${styles.externalLink} focus-ring hover-highlight`}
                  href={project.applicationUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {texts.openInNewTabLabel}
                </a>
              )}
              <Dialog.Close asChild>
                <button
                  aria-label={texts.closeDialogLabel}
                  className={`${styles.closeButton} focus-ring hover-highlight`}
                  type="button"
                >
                  <CloseIcon className="size-5" />
                </button>
              </Dialog.Close>
            </div>
          </header>

          <div className={styles.frameContainer}>
            {isFrameLoading && shouldRenderProject && (
              <div
                aria-live="polite"
                className={styles.loading}
                role="status"
              >
                <span className={styles.spinner} aria-hidden="true" />
                {texts.loadingLabel}
              </div>
            )}

            {shouldRenderProject && (
              <iframe
                allowFullScreen
                className={styles.frame}
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
                src={project.applicationUrl}
                title={`${texts.iframeTitlePrefix}: ${project.title}`}
                onLoad={onFrameLoad}
              />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
