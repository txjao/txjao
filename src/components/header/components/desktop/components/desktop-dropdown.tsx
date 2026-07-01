"use client";

import { NavigationMenu } from "radix-ui";
import type { ReactNode } from "react";
import { ChevronIcon } from "../../../../icons";
import { dropdownContentClass } from "../../../styles/dropdown-content.styles";
import { dropdownItemsClass } from "../../../styles/dropdown-items.styles";

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
          <NavigationMenu.Trigger className="group inline-flex cursor-pointer items-center gap-1 bg-transparent font-sans text-base text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue dark:text-white">
            {label}
            <ChevronIcon />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content forceMount className={dropdownContentClass}>
            <div className={dropdownItemsClass}>{children}</div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
