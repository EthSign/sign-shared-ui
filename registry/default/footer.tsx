import { SignLogo } from './sign-logo';
import clsx from 'clsx';
import { motion } from 'motion/react';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { DEFAULT_FOOTER_CONFIG, type FooterConfig } from './nav-config';
import { SmartLink, useSignSharedUI } from './shared-ui-provider';

// --- 动画 variants（仅 animated=true 时使用）---

const fadeContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const fadeItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// --- 子组件 ---

const SocialIcons: React.FC<{
  className?: string;
  iconClassName?: string;
  socials: FooterConfig['socials'];
  animated?: boolean;
}> = ({ className, iconClassName = 'size-[35px]', socials, animated }) => {
  const Wrapper = animated ? motion.div : 'div';
  const wrapperProps = animated ? { variants: fadeItemVariants } : {};

  return (
    <Wrapper {...wrapperProps} className={clsx('flex gap-6 md:gap-8', className)}>
      {socials.map((social, i) => (
        <a
          key={i}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          className="opacity-50 transition-opacity hover:opacity-100"
        >
          <img src={social.logo} alt="social" className={clsx(iconClassName, 'object-contain')} />
        </a>
      ))}
    </Wrapper>
  );
};

const Slogan: React.FC<{ className?: string; animated?: boolean }> = ({ className, animated }) => {
  const Wrapper = animated ? motion.h2 : 'h2';
  const wrapperProps = animated ? { variants: fadeItemVariants } : {};

  return (
    <Wrapper {...wrapperProps} className={clsx('font-bold leading-[1.05] tracking-tight text-white', className)}>
      Blockchain for nations. <br />
      <span className="text-orange-gradient">Crypto for all.</span>
    </Wrapper>
  );
};

// --- Footer 主组件 ---

export interface FooterProps {
  className?: string;
  /** 是否启用入场动画（默认 true） */
  animated?: boolean;
  /** Footer 配置（导航、社交链接、法律文本等） */
  config?: FooterConfig;
}

export const Footer: React.FC<FooterProps> = ({ className, animated = true, config = DEFAULT_FOOTER_CONFIG }) => {
  const { resolveHref } = useSignSharedUI();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isImmersive, setIsImmersive] = useState(false);

  useLayoutEffect(() => {
    const checkFit = () => {
      if (!contentRef.current) return;
      const contentHeight = contentRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const isLandscape = window.innerWidth > window.innerHeight;
      const totalGap = viewportHeight - contentHeight;
      const triggerImmersion = isLandscape && totalGap > 80 && totalGap < 300;
      setIsImmersive(triggerImmersion);
    };

    checkFit();
    window.addEventListener('resize', checkFit);
    return () => window.removeEventListener('resize', checkFit);
  }, []);

  const FooterTag = animated ? motion.footer : 'footer';
  const footerProps = animated
    ? {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.05 },
        variants: fadeContainerVariants
      }
    : {};

  const ItemWrapper = animated ? motion.div : 'div';
  const itemProps = animated ? { variants: fadeItemVariants } : {};

  return (
    <FooterTag
      {...footerProps}
      className={clsx(
        'relative flex w-full overflow-hidden bg-[#020202] font-archivo text-white transition-all duration-500',
        isImmersive ? 'h-screen flex-col justify-center' : 'h-auto py-12 md:py-20',
        className
      )}
    >
      <div ref={contentRef} className="mx-auto flex w-full max-w-[1440px] flex-col px-10">
        {/* 顶部结构 */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="flex flex-col md:flex-row md:justify-between lg:h-full lg:flex-col lg:justify-between">
            <ItemWrapper {...itemProps}>
              <SignLogo className="h-[86px] object-contain" />
            </ItemWrapper>

            {/* Tablet */}
            <div className="hidden flex-col items-start gap-8 md:flex lg:hidden">
              <SocialIcons socials={config.socials} animated={animated} />
              <Slogan className="text-[40px]" animated={animated} />
            </div>

            {/* Desktop */}
            <div className="hidden flex-col gap-10 lg:flex">
              <SocialIcons socials={config.socials} animated={animated} />
              <Slogan className="text-[64px]" animated={animated} />
            </div>
          </div>

          <div className="mt-12 flex flex-col md:mt-16 lg:mt-0">
            <div className="mb-16 flex flex-col gap-8 md:hidden">
              <SocialIcons iconClassName="size-5" socials={config.socials} animated={animated} />
              <Slogan className="text-[40px]" animated={animated} />
            </div>

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:grid-cols-3 md:gap-x-12">
              {config.navigation.map((group, groupIdx) => (
                <div key={groupIdx} className="col-span-full flex flex-col">
                  <ItemWrapper {...itemProps} className="mb-4">
                    <div className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.15em] text-[#FF7801] md:text-base">
                      {group.label}
                    </div>
                  </ItemWrapper>

                  <div className="col-span-full columns-1 gap-x-6 pb-8 sm:columns-2 md:columns-3 md:gap-x-12">
                    {group.items.map((item, itemIdx) => (
                      <ItemWrapper key={itemIdx} {...itemProps} className="mb-3 break-inside-avoid">
                        <SmartLink
                          href={resolveHref(item.url)}
                          className="flex items-center gap-2 text-[14px] leading-snug text-[#EAECF0] transition-colors hover:text-[#B4B4B4] md:text-[16px]"
                        >
                          <span className="truncate">{item.name}</span>
                          {item.isNew && (
                            <span className="inline-flex h-[18px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(109deg,#FE7B02_28.24%,#F90_81.77%)] px-1.5 text-[9px] font-bold text-white">
                              NEW
                            </span>
                          )}
                        </SmartLink>
                      </ItemWrapper>
                    ))}
                  </div>
                  <div className="mb-8 h-px w-full bg-[#1b1b1b]" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <ItemWrapper
                {...itemProps}
                className="flex flex-wrap items-center justify-between text-[14px] text-[#D0D5DD] md:text-[15px]"
              >
                <span>{config.legal.copyright}</span>
              </ItemWrapper>

              <ul className="list-outside list-disc space-y-2 pl-3.5 text-[12px]/[16px] text-[#9a9a9a]">
                {config.disclaimers.map((text, dIdx) => {
                  if (animated) {
                    return (
                      <motion.li key={dIdx} variants={fadeItemVariants}>
                        {text}
                      </motion.li>
                    );
                  }
                  return <li key={dIdx}>{text}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FooterTag>
  );
};
