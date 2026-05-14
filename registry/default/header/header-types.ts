import React from 'react';

export interface SubMenuItem {
  label: string;
  href: string;
}

export interface NavMobileItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  subItems?: SubMenuItem[];
}

export interface NavItem {
  label: string;
  children: (isDark: boolean, resolveHref: (href: string) => string) => React.ReactNode;
  mobileItems?: NavMobileItem[];
}

export interface HeaderProps {
  className?: string;
  variant?: 'transparent' | 'light' | 'dark';
  visible?: boolean;
  showWhitePaperButton?: boolean;
  actionSlot?: React.ReactNode;
  navigationMenu?: NavItem[];
}

export type DesktopBreakpoint = 'lg' | 'xl';

export const desktopBreakpointClasses = {
  lg: { flex: 'lg:flex', hidden: 'lg:hidden', logoW: 'lg:w-[82px]' },
  xl: { flex: 'xl:flex', hidden: 'xl:hidden', logoW: 'xl:w-[82px]' }
} as const satisfies Record<DesktopBreakpoint, Record<string, string>>;
