import { IconArrowsTransferUpDown, IconDownload } from '@tabler/icons-react';
import React from 'react';
import { cn } from '../cn';
import { SmartLink } from '../site-provider';
import type { SubMenuItem } from './header-types';
import { useExpandableMenu } from './header-nav-dropdown';

const PixelIcon: React.FC = () => (
  <svg width="23" height="16" viewBox="0 0 23 16" fill="none" className="fill-[#FF7801]">
    <rect y="6" width="15" height="4" />
    <path d="M19 6H23V10H19V6Z" />
    <path d="M13 0H17V4H13V0Z" />
    <path d="M13 12H17V16H13V12Z" />
  </svg>
);

const IconMenuLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  href: string;
  showBorder?: boolean;
  isDarkTheme: boolean;
}> = ({ icon, label, href, showBorder, isDarkTheme }) => (
  <SmartLink
    href={href}
    className={cn(
      'flex items-center gap-4 px-10 py-12 transition-all duration-300 group/item',
      isDarkTheme ? 'hover:bg-neutral-800' : 'hover:bg-white',
      showBorder && 'v-dashed-l'
    )}
  >
    <div className="shrink-0 transition-transform duration-300 group-hover/item:scale-110 [&>svg]:stroke-1">{icon}</div>
    <span
      className={cn(
        'text-[16px] font-medium transition-colors overflow-hidden',
        isDarkTheme ? 'text-white/70 group-hover/item:text-white' : 'text-[#4B4E53] group-hover/item:text-slate-900'
      )}
    >
      {label}
    </span>
    <div className="ml-auto opacity-0 transition-opacity duration-300 group-hover/item:opacity-100">
      <PixelIcon />
    </div>
  </SmartLink>
);

/** 三级子行：展开后渲染在二级菜单行下方 */
const SubMenuRow: React.FC<{
  items: SubMenuItem[];
  isDarkTheme: boolean;
  resolveHref: (href: string) => string;
}> = ({ items, isDarkTheme, resolveHref }) => (
  <div className="flex w-full">
    {items.map((item, i) => (
      <SmartLink
        key={item.href}
        href={resolveHref(item.href)}
        className={cn(
          'flex flex-1 items-center gap-2 px-12 py-10 transition-all duration-300 group/sub',
          isDarkTheme ? 'bg-neutral-900/60 hover:bg-neutral-800' : 'bg-white/40 hover:bg-white',
          i > 0 && (isDarkTheme ? 'v-dashed-l border-neutral-700' : 'v-dashed-l')
        )}
      >
        <div className={cn('h-5 w-[1.7px] shrink-0', isDarkTheme ? 'bg-white/40' : 'bg-[#4B4E53]')} />
        <span
          className={cn(
            'text-[16px] font-normal transition-colors',
            isDarkTheme ? 'text-white/70 group-hover/sub:text-white' : 'text-[#4B4E53] group-hover/sub:text-slate-900'
          )}
        >
          {item.label}
        </span>
        <div className="ml-auto opacity-0 transition-opacity duration-300 group-hover/sub:opacity-100">
          <PixelIcon />
        </div>
      </SmartLink>
    ))}
  </div>
);

// 默认 Stake 子菜单项
const STAKE_SUB_ITEMS: SubMenuItem[] = [
  { label: 'Staker', href: 'https://stake.sign.global/' },
  { label: 'Orange Dynasty Yield', href: 'https://stake.sign.global/orange-dynasty-yield' }
];

/** $SIGN Token 面板：内部管理 Stake 的三级展开 + safe-triangle */
export const SignTokenPanel: React.FC<{
  isDarkTheme: boolean;
  stakeSubItems?: SubMenuItem[];
  resolveHref: (href: string) => string;
}> = ({ isDarkTheme, stakeSubItems = STAKE_SUB_ITEMS, resolveHref }) => {
  const { isExpanded, triggerRef, triggerProps, submenuRef, submenuProps } = useExpandableMenu();

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-4">
        <IconMenuLink
          isDarkTheme={isDarkTheme}
          icon={
            <img
              className="size-6 object-contain object-center"
              src="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-icon-sign_260108065402.webp"
            />
          }
          label="Official Token Site"
          href={resolveHref('/sign')}
        />
        <div
          ref={triggerRef}
          {...triggerProps}
          className={cn(
            'flex cursor-pointer items-center gap-4 px-10 py-12 transition-all duration-300 group/item v-dashed-l',
            isExpanded
              ? isDarkTheme
                ? 'bg-neutral-800'
                : 'bg-white'
              : isDarkTheme
              ? 'hover:bg-neutral-800 bg-white/[0.02]'
              : 'hover:bg-white bg-white/40'
          )}
        >
          <div className="shrink-0 transition-transform duration-300 group-hover/item:scale-110 [&>svg]:stroke-1">
            <IconDownload className={isDarkTheme ? 'text-white/60' : 'text-[#787B7E]'} />
          </div>
          <span
            className={cn(
              'text-[16px] font-medium transition-colors overflow-hidden',
              isExpanded
                ? isDarkTheme
                  ? 'text-white'
                  : 'text-slate-900'
                : isDarkTheme
                ? 'text-white/70 group-hover/item:text-white'
                : 'text-[#4B4E53] group-hover/item:text-slate-900'
            )}
          >
            Stake
          </span>
          <div
            className={cn(
              'ml-auto transition-opacity duration-300',
              isExpanded ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'
            )}
          >
            <PixelIcon />
          </div>
        </div>
        <IconMenuLink
          isDarkTheme={isDarkTheme}
          icon={
            <IconArrowsTransferUpDown className={cn('rotate-90', isDarkTheme ? 'text-white/60' : 'text-[#787B7E]')} />
          }
          label="Bridge"
          href={resolveHref('https://bridge.sign.global/')}
          showBorder
        />
        <IconMenuLink
          isDarkTheme={isDarkTheme}
          icon={
            <img
              className="size-6"
              src="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-icon-sign-token_260108065401.webp"
            />
          }
          label="Orange Pill Claiming"
          href={resolveHref('https://airdrop.sign.global/orange-pill')}
          showBorder
        />
      </div>
      <div
        ref={submenuRef}
        {...submenuProps}
        className={cn(
          'grid transition-all duration-200 overflow-hidden',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0">
          <div className={cn('v-dashed-t', isDarkTheme ? 'border-neutral-700' : 'border-[#D2D3D4]')}>
            <SubMenuRow items={stakeSubItems} isDarkTheme={isDarkTheme} resolveHref={resolveHref} />
          </div>
        </div>
      </div>
    </div>
  );
};

// 导出供默认导航菜单使用
export { IconMenuLink, PixelIcon };
export type { SubMenuItem };
