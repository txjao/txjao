"use client";

import { NavigationMenu } from "radix-ui";
import type { ReactNode } from "react";
import { ChevronIcon } from "../../../../icons";
import styles from "./styles/desktop-dropdown.module.css";

interface DesktopDropdownProps {
  label: string;
  children: ReactNode;
  widthClassName: string;
}

export function DesktopDropdown({
  label,
  children,
  widthClassName,
}: DesktopDropdownProps) {
  return (
    <NavigationMenu.Root
      className={`relative flex ${widthClassName} justify-center`}
      delayDuration={0}
      skipDelayDuration={0}
    >
      <NavigationMenu.List>
        <NavigationMenu.Item className="relative flex justify-center">
          <NavigationMenu.Trigger className="focus-ring group inline-flex cursor-pointer items-center gap-1 bg-transparent font-sans text-base text-black dark:text-white">
            {label}
            <ChevronIcon className="nav-chevron size-5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content forceMount className={styles.content}>
            <div className={styles.items}>{children}</div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
