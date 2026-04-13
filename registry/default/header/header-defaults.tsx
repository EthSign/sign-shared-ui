import { IconArrowsTransferUpDown, IconBrandTelegram, IconBrandX, IconDownload } from '@tabler/icons-react';
import React from 'react';
import { cn } from '../cn';
import { SmartLink } from '../shared-ui-provider';
import { socialLinks } from '../social-links';
import { IconMenuLink, PixelIcon, SignTokenPanel } from './header-sign-token-panel';
import type { NavItem } from './header-types';

// --- ProductCard（仅桌面端导航面板使用）---

const ProductCard: React.FC<{
  title: string;
  href: string;
  showRightBorder?: boolean;
  isDarkTheme: boolean;
  img: string;
}> = ({ title, href, showRightBorder, isDarkTheme, img }) => (
  <SmartLink
    href={href}
    className={cn(
      'group/card flex flex-col transition-all duration-300',
      isDarkTheme ? 'hover:bg-neutral-800' : 'hover:bg-white/50',
      showRightBorder && (isDarkTheme ? 'v-dashed-r border-neutral-700' : 'v-dashed-r border-slate-300')
    )}
  >
    <div className="flex flex-1 items-center justify-center">
      <img className="aspect-[479/125] size-full object-contain object-bottom" src={img} alt="" />
    </div>
    <div
      className={cn(
        'flex items-center gap-3 px-10 py-4 v-dashed-t',
        isDarkTheme ? 'border-neutral-700' : 'border-slate-300'
      )}
    >
      <div className={cn('h-4 w-1', isDarkTheme ? 'bg-[#FF7801]' : 'bg-black')} />
      <span
        className={cn(
          'text-[16px] font-medium transition-colors whitespace-nowrap text-ellipsis overflow-hidden',
          isDarkTheme
            ? 'text-white/80 group-hover/card:text-[#FF7801]'
            : 'text-slate-800 group-hover/card:text-orange-600'
        )}
      >
        {title}
      </span>
      <div className="ml-auto opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
        <PixelIcon />
      </div>
    </div>
  </SmartLink>
);

// --- 默认导航菜单 ---

export function createDefaultNavigationMenu(enableStakeSubMenu: boolean): NavItem[] {
  return [
  {
    label: 'Product',
    mobileItems: [
      { label: 'Programmable Money: CBDC & Stablecoins', href: 'https://sign.global/use-cases/programmable-money' },
      { label: 'Digital ID System: Verifiable Credentials', href: 'https://sign.global/use-cases/digital-id-system' },
      { label: 'Sovereign Capital Markets: RWA', href: 'https://sign.global/use-cases/rwa' },
      { label: 'TokenTable', href: 'https://sign.global/tokentable' },
      { label: 'EthSign', href: 'https://sign.global/ethsign' },
      { label: 'Sign Protocol', href: 'https://app.sign.global' }
    ],
    children: (isDark, resolveHref) => (
      <div className="grid w-full grid-cols-3">
        <ProductCard
          isDarkTheme={isDark}
          title="Programmable Money: CBDC & Stablecoins"
          href={resolveHref('https://sign.global/use-cases/programmable-money')}
          img="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-image-product-money_260108065401.webp"
          showRightBorder
        />
        <ProductCard
          isDarkTheme={isDark}
          title="Digital ID System: Verifiable Credentials"
          href={resolveHref('https://sign.global/use-cases/digital-id-system')}
          img="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-image-product-id_260108065402.webp"
          showRightBorder
        />
        <ProductCard
          isDarkTheme={isDark}
          title="Sovereign Capital Markets: RWA"
          href={resolveHref('https://sign.global/use-cases/rwa')}
          img="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-image-product-capital_260108065402.webp"
        />
        <div
          className={cn('col-span-3 v-dashed-t grid grid-cols-3', isDark ? 'border-neutral-700' : 'border-slate-300')}
        >
          <ProductCard
            isDarkTheme={isDark}
            title="TokenTable"
            href={resolveHref('https://sign.global/tokentable')}
            img="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-image-product-tokentable_260108065401.webp"
            showRightBorder
          />
          <ProductCard
            isDarkTheme={isDark}
            title="EthSign"
            href={resolveHref('https://sign.global/ethsign')}
            img="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-image-product-ethsign_260108065402.webp"
            showRightBorder
          />
          <ProductCard
            isDarkTheme={isDark}
            title="Sign Protocol"
            href={resolveHref('https://app.sign.global')}
            img="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-image-product-sign-protocol_260108065403.webp"
          />
        </div>
      </div>
    )
  },
  {
    label: 'Community',
    mobileItems: [
      {
        label: 'Orange Dynasty App',
        href: 'https://orange.sign.global',
        icon: (
          <img
            className="size-6"
            src="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-icon-orange-app_260108065402.webp"
          />
        )
      },
      {
        label: 'Orange Dynasty',
        href: 'https://sign.global/orange-dynasty',
        icon: (
          <img
            className="size-6"
            src="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-icon-orange-dynasty_260109074049.svg"
            alt=""
          />
        )
      },
      {
        label: 'X (Orange Dynasty)',
        href: socialLinks?.orangeDynastyX || '#',
        icon: <IconBrandX className="size-6 opacity-70" />
      },
      {
        label: 'Telegram',
        href: socialLinks?.telegram || '#',
        icon: <IconBrandTelegram className="size-6 opacity-70" />
      }
    ],
    children: (isDark, resolveHref) => (
      <div className="grid w-full grid-cols-4">
        <IconMenuLink
          isDarkTheme={isDark}
          icon={
            <img
              className="size-6"
              src="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-icon-orange-app_260108065402.webp"
            />
          }
          label="Orange Dynasty App"
          href={resolveHref('https://orange.sign.global')}
        />
        <IconMenuLink
          isDarkTheme={isDark}
          icon={
            <img
              className="size-6"
              src="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-icon-orange-dynasty_260109074049.svg"
            />
          }
          label="Orange Dynasty"
          href={resolveHref('https://sign.global/orange-dynasty')}
        />
        <IconMenuLink
          isDarkTheme={isDark}
          icon={<IconBrandX className={isDark ? 'text-white/60' : 'text-[#787B7E]'} />}
          label="X (Orange Dynasty)"
          href={socialLinks?.orangeDynastyX || '#'}
          showBorder
        />
        <IconMenuLink
          isDarkTheme={isDark}
          icon={<IconBrandTelegram className={isDark ? 'text-white/60' : 'text-[#787B7E]'} />}
          label="Telegram"
          href={socialLinks?.telegram || '#'}
          showBorder
        />
      </div>
    )
  },
  {
    label: '$SIGN Token',
    mobileItems: [
      {
        label: 'Official Token Site',
        href: 'https://sign.global/sign',
        icon: (
          <img
            className="size-6"
            src="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-icon-sign_260108065402.webp"
          />
        )
      },
      enableStakeSubMenu
        ? {
            label: 'Stake',
            href: '#',
            icon: <IconDownload className="size-6 opacity-70" />,
            subItems: [
              { label: 'Staker', href: 'https://stake.sign.global/' },
              { label: 'Orange Dynasty Yield', href: 'https://stake.sign.global/orange-dynasty-yield' }
            ]
          }
        : { label: 'Stake', href: 'https://stake.sign.global/', icon: <IconDownload className="size-6 opacity-70" /> },
      {
        label: 'Bridge',
        href: 'https://bridge.sign.global/',
        icon: <IconArrowsTransferUpDown className="size-6 rotate-90 opacity-70" />
      },
      {
        label: 'Orange Pill Claiming',
        href: 'https://airdrop.sign.global/orange-pill',
        icon: (
          <img
            className="size-6"
            src="https://public-cdn.sign.global/Attestation-Frontend/global/v3/images/nav-icon-sign-token_260108065401.webp"
          />
        )
      }
    ],
    children: (isDark, resolveHref) => <SignTokenPanel isDarkTheme={isDark} resolveHref={resolveHref} />
  }
  ];
}
