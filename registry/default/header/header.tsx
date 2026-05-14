import { IconMenu2 } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button';
import { cn } from '../cn';
import { Container } from '../container';
import { SignGradientIcon, SignIcon } from '../icons';
import { SmartLink, useSignSharedUI } from '../shared-ui-provider';
import { createDefaultNavigationMenu } from './header-defaults';
import { MobileNavbar } from './header-mobile-navbar';
import { NavDropdownItem } from './header-nav-dropdown';
import { desktopBreakpointClasses, type DesktopBreakpoint, type HeaderProps } from './header-types';

export const Header: React.FC<HeaderProps> = ({
  className,
  variant = 'light',
  visible = true,
  showWhitePaperButton = true,
  actionSlot,
  navigationMenu
}) => {
  const { resolveHref } = useSignSharedUI();
  const effectiveNavigationMenu = navigationMenu ?? createDefaultNavigationMenu();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);

  const effectiveVariant = isHovered && variant === 'transparent' ? 'light' : variant;
  const isTransparent = effectiveVariant === 'transparent';
  const isDark = effectiveVariant === 'dark';

  // 有 actionSlot 时把桌面态断点抬到 xl（≥1280px），避免 lg-xl 区间挤压
  const desktopBreakpoint: DesktopBreakpoint = actionSlot ? 'xl' : 'lg';
  const desktop = desktopBreakpointClasses[desktopBreakpoint];

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'group/header relative z-50 w-full transition-all duration-300 font-archivo border-b border-transparent',
          effectiveVariant === 'light' && 'bg-white !border-slate-100',
          isDark && 'bg-neutral-950 border-b !border-neutral-800',
          isTransparent && 'bg-transparent',
          className
        )}
        style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        <Container className="flex h-[76px] items-center gap-4">
          <Link to="/" className="inline-block shrink-0 transition-transform hover:scale-105 active:scale-95">
            {isTransparent ? (
              <div className="relative">
                <SignIcon className={cn('w-[68px] transition-opacity group-hover/header:opacity-0', desktop.logoW)} />
                <SignGradientIcon
                  className={cn(
                    'absolute inset-0 w-[68px] opacity-0 transition-opacity group-hover/header:opacity-100',
                    desktop.logoW
                  )}
                />
              </div>
            ) : isDark ? (
              <SignIcon className={cn('w-[68px]', desktop.logoW)} />
            ) : (
              <SignGradientIcon className={cn('w-[68px]', desktop.logoW)} />
            )}
          </Link>

          {!actionSlot && <div className="flex-1" />}

          {/* PC Nav */}
          <nav className={cn('hidden items-center', desktop.flex)}>
            {effectiveNavigationMenu.map((item, index) => (
              <NavDropdownItem
                key={item.label}
                item={item}
                index={index}
                isActive={activeNavIndex === index}
                setActiveIndex={setActiveNavIndex}
                isDark={isDark}
                isTransparent={isTransparent}
                resolveHref={resolveHref}
              />
            ))}

            {showWhitePaperButton && (
              <SmartLink href="https://docs.sign.global/" className="hidden md:block">
                <Button
                  size="sm"
                  variant={isTransparent ? 'transparent' : 'secondary'}
                  isDark={isDark}
                  className="text-nowrap"
                >
                  S.I.G.N. Whitepaper
                </Button>
              </SmartLink>
            )}
          </nav>

          {actionSlot && <div className="flex-1" />}

          {/* Action Area */}
          <div className="flex shrink-0 items-center gap-2">
            {actionSlot}

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn('p-2', desktop.hidden, isDark || isTransparent ? 'text-white' : 'text-slate-900')}
            >
              <IconMenu2 className="size-6" />
            </button>
          </div>
        </Container>
      </header>

      <MobileNavbar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDark={isDark}
        navigationMenu={effectiveNavigationMenu}
        resolveHref={resolveHref}
        desktopBreakpoint={desktopBreakpoint}
      />
    </>
  );
};
