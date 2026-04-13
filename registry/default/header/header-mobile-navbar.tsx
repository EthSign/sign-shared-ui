import { IconChevronDown, IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { cn } from '../cn';
import { Container } from '../container';
import { SignGradientIcon, SignIcon } from '../icons';
import { SmartLink } from '../site-provider';
import type { NavItem } from './header-types';

/** 移动端二级列表：支持带 subItems 的项展开三级 */
const MobileSubItemList: React.FC<{
  items: NonNullable<NavItem['mobileItems']>;
  isDark: boolean;
  onClose: () => void;
  resolveHref: (href: string) => string;
}> = ({ items, isDark, onClose, resolveHref }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((subItem, i) => {
        const hasChildren = subItem.subItems && subItem.subItems.length > 0;
        const isExpanded = expandedIndex === i;

        if (hasChildren) {
          return (
            <div key={subItem.label}>
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className={cn(
                  'w-full border-b transition-colors active:bg-black/10',
                  isDark ? 'border-neutral-800' : 'border-slate-100'
                )}
              >
                <Container className="flex items-center gap-4 py-5">
                  {subItem.icon && (
                    <div className="flex size-6 shrink-0 items-center justify-center">{subItem.icon}</div>
                  )}
                  <span className="text-[16px] font-medium leading-tight">{subItem.label}</span>
                  <IconChevronDown
                    className={cn('ml-auto size-4 opacity-40 transition-transform', isExpanded && 'rotate-180')}
                  />
                </Container>
              </button>
              <div
                className={cn(
                  'grid transition-all duration-200 overflow-hidden',
                  isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
              >
                <div className="min-h-0">
                  {subItem.subItems!.map((child) => (
                    <SmartLink
                      key={child.href}
                      href={resolveHref(child.href)}
                      className={cn(
                        'block w-full border-b transition-colors active:bg-black/10',
                        isDark ? 'border-neutral-800 bg-neutral-900/40' : 'border-slate-100 bg-slate-50/60'
                      )}
                      onClick={onClose}
                    >
                      <Container className="flex items-center gap-3 py-4 pl-14">
                        <div className={cn('h-4 w-[1.7px] shrink-0', isDark ? 'bg-white/40' : 'bg-[#4B4E53]')} />
                        <span className="text-[15px] font-normal leading-tight">{child.label}</span>
                      </Container>
                    </SmartLink>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <SmartLink
            key={subItem.label}
            href={resolveHref(subItem.href)}
            className={cn(
              'w-full border-b transition-colors active:bg-black/10',
              isDark ? 'border-neutral-800' : 'border-slate-100'
            )}
            onClick={onClose}
          >
            <Container className="flex items-center gap-4 py-5">
              {subItem.icon ? (
                <div className="flex size-6 shrink-0 items-center justify-center">{subItem.icon}</div>
              ) : (
                <div className={cn('h-4 w-1 shrink-0', isDark ? 'bg-[#FF7801]' : 'bg-black')} />
              )}
              <span className="text-[16px] font-medium leading-tight">{subItem.label}</span>
            </Container>
          </SmartLink>
        );
      })}
    </div>
  );
};

export const MobileNavbar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  navigationMenu: NavItem[];
  resolveHref: (href: string) => string;
}> = ({ isOpen, onClose, isDark, navigationMenu, resolveHref }) => {
  const [activeTab, setActiveTab] = useState<NavItem | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleTabChange = (tab: NavItem | null) => {
    setIsChanging(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsChanging(false);
    }, 150);
  };

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setActiveTab(null), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col transition-all duration-500 ease-in-out lg:hidden',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
        isDark ? 'bg-neutral-950 text-white' : 'bg-white text-slate-900'
      )}
    >
      <div className={cn('border-b shrink-0', isDark ? 'border-neutral-800' : 'border-slate-100')}>
        <Container className="flex h-[76px] items-center justify-between">
          {activeTab ? (
            <button onClick={() => handleTabChange(null)} className="flex items-center gap-2">
              <IconChevronLeft className="size-6" />
              <span className="text-[18px] font-bold">{activeTab.label}</span>
            </button>
          ) : (
            <div className="flex items-center">{isDark ? <SignIcon className="w-[68px]" /> : <SignGradientIcon className="w-[68px]" />}</div>
          )}
          <button onClick={onClose} className="-mr-2 p-2">
            <IconX className="size-6" />
          </button>
        </Container>
      </div>

      <div
        className={cn(
          'flex-1 overflow-y-auto transition-opacity duration-200',
          isChanging ? 'opacity-0' : 'opacity-100'
        )}
      >
        {!activeTab ? (
          <div className="flex flex-col">
            {navigationMenu.map((item) => (
              <button
                key={item.label}
                onClick={() => handleTabChange(item)}
                className={cn(
                  'w-full border-b transition-colors active:bg-black/10',
                  isDark ? 'border-neutral-800' : 'border-slate-100'
                )}
              >
                <Container className="flex items-center justify-between py-6">
                  <span className="text-[18px] font-medium">{item.label}</span>
                  <IconChevronRight className="size-5 opacity-40" />
                </Container>
              </button>
            ))}
          </div>
        ) : (
          <MobileSubItemList items={activeTab.mobileItems ?? []} isDark={isDark} onClose={onClose} resolveHref={resolveHref} />
        )}
      </div>
    </div>
  );
};
