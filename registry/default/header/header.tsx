import { IconMenu2 } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button';
import { cn } from '../cn';
import { Container } from '../container';
import { SignGradientIcon, SignIcon } from '../icons';
import { SmartLink, useSignSite } from '../site-provider';
import { DEFAULT_NAVIGATION_MENU } from './header-defaults';
import { MobileNavbar } from './header-mobile-navbar';
import { NavDropdownItem } from './header-nav-dropdown';
import type { HeaderProps } from './header-types';

export const Header: React.FC<HeaderProps> = ({
  className,
  variant = 'light',
  visible = true,
  showWhitePaperButton = true,
  actionSlot,
  navigationMenu = DEFAULT_NAVIGATION_MENU
}) => {
  const { resolveHref } = useSignSite();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);

  const effectiveVariant = isHovered && variant === 'transparent' ? 'light' : variant;
  const isTransparent = effectiveVariant === 'transparent';
  const isDark = effectiveVariant === 'dark';

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
                <SignIcon className="w-[68px] lg:w-[82px] transition-opacity group-hover/header:opacity-0" />
                <SignGradientIcon className="absolute inset-0 w-[68px] lg:w-[82px] opacity-0 transition-opacity group-hover/header:opacity-100" />
              </div>
            ) : isDark ? (
              <SignIcon className="w-[68px] lg:w-[82px]" />
            ) : (
              <SignGradientIcon className="w-[68px] lg:w-[82px]" />
            )}
          </Link>

          {!actionSlot && <div className="flex-1" />}

          {/* PC Nav */}
          <nav className="hidden items-center lg:flex">
            {navigationMenu.map((item, index) => (
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
              className={cn('p-2 lg:hidden', isDark || isTransparent ? 'text-white' : 'text-slate-900')}
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
        navigationMenu={navigationMenu}
        resolveHref={resolveHref}
      />
    </>
  );
};
