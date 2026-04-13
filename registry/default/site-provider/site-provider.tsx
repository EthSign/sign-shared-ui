import React, { createContext, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface SignSiteContextValue {
  siteOrigin?: string;
}

const SignSiteContext = createContext<SignSiteContextValue>({});

export function resolveHref(href: string, siteOrigin?: string): string {
  if (!siteOrigin || !href) return href;
  try {
    const url = new URL(href);
    if (url.origin === siteOrigin) {
      return url.pathname + url.search + url.hash;
    }
  } catch {
    // not a full URL, return as-is (already relative)
  }
  return href;
}

export function useSignSite() {
  const ctx = useContext(SignSiteContext);
  const resolve = useMemo(
    () => (href: string) => resolveHref(href, ctx.siteOrigin),
    [ctx.siteOrigin]
  );
  return useMemo(() => ({ siteOrigin: ctx.siteOrigin, resolveHref: resolve }), [ctx.siteOrigin, resolve]);
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/** Renders <Link> for internal paths, <a> for external URLs */
export const SmartLink: React.FC<
  { href: string } & Omit<React.ComponentProps<typeof Link>, 'to'>
> = ({ href, children, ...props }) => {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
};

export const SignSiteProvider: React.FC<{
  siteOrigin?: string;
  children: React.ReactNode;
}> = ({ siteOrigin, children }) => {
  const value = useMemo(() => ({ siteOrigin }), [siteOrigin]);
  return <SignSiteContext.Provider value={value}>{children}</SignSiteContext.Provider>;
};
