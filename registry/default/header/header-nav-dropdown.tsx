import { safePolygon, useFloating, useHover, useInteractions } from '@floating-ui/react';
import { IconChevronDown } from '@tabler/icons-react';
import React, { useCallback, useState } from 'react';
import { cn } from '../cn';
import { Container } from '../container';
import type { NavItem } from './header-types';

/** safe-triangle hook：返回 trigger 和 submenu 的 ref + props */
export function useExpandableMenu(options?: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delay?: { open?: number; close?: number };
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = options?.open ?? internalOpen;
  const setIsOpen = options?.onOpenChange ?? setInternalOpen;

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  });

  const hover = useHover(context, {
    handleClose: safePolygon({ blockPointerEvents: true }),
    delay: options?.delay ?? { open: 0, close: 100 }
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return {
    isExpanded: isOpen,
    triggerRef: refs.setReference,
    triggerProps: getReferenceProps(),
    submenuRef: refs.setFloating,
    submenuProps: getFloatingProps()
  };
}

export const NavDropdownItem: React.FC<{
  item: NavItem;
  index: number;
  isActive: boolean;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isDark: boolean;
  isTransparent: boolean;
  resolveHref: (href: string) => string;
}> = ({ item, index, isActive, setActiveIndex, isDark, isTransparent, resolveHref }) => {
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setActiveIndex(index);
      } else {
        setActiveIndex((prev) => (prev === index ? null : prev));
      }
    },
    [index, setActiveIndex]
  );

  const { triggerRef, triggerProps, submenuRef, submenuProps } = useExpandableMenu({
    open: isActive,
    onOpenChange: handleOpenChange,
    delay: { open: 75, close: 100 }
  });

  return (
    <>
      <div
        ref={triggerRef}
        {...triggerProps}
        className={cn(
          'flex cursor-pointer items-center gap-1.5 px-5 py-[26px] text-[16px] font-medium transition-all duration-300',
          isActive
            ? 'text-[#FF7801]'
            : isDark
            ? 'text-white/80 hover:text-[#FF7801]'
            : isTransparent
            ? 'text-white group-hover/header:text-[#4B4E53] group-hover/header:hover:text-[#FF7801]'
            : 'text-[#4B4E53] hover:text-[#FF7801]'
        )}
      >
        <span className="text-nowrap">{item.label}</span>
        <IconChevronDown
          className={cn('size-4 opacity-50 transition-transform duration-300', isActive && 'rotate-180')}
        />
      </div>
      <div
        ref={submenuRef}
        {...submenuProps}
        className={cn(
          'absolute inset-x-0 top-[76px] z-50 w-full transition-all duration-200',
          isActive ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <div
          className={cn(
            'border-t shadow-2xl',
            isDark ? 'bg-black border-neutral-800' : 'bg-[#F8F8F8] border-[#D2D3D4]'
          )}
        >
          <Container className="!px-0">{item.children(isDark, resolveHref)}</Container>
        </div>
      </div>
    </>
  );
};
