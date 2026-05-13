# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sign Shared UI — a [shadcn Registry](https://ui.shadcn.com/docs/registry) repo that distributes shared Header, Footer, and base UI components to Sign's frontend projects. Components are pulled into consuming projects via `shadcn add`, where they become editable local source code.

## Commands

```bash
pnpm registry:build    # Build registry JSON to public/r/
pnpm registry:serve    # Build + start local HTTP server on :4000
```

No test runner or linter is configured. Validation happens in consuming projects.

## Repository Structure

```
sign-shared-ui/
├── registry.json              # Component registry manifest
├── registry/default/          # Source components
│   ├── cn/                    # cn() utility (clsx + tailwind-merge)
│   ├── site-provider/         # SignSiteProvider context + SmartLink
│   ├── icons/                 # SignIcon, SignGradientIcon
│   ├── container/             # Container, Section layout
│   ├── button/                # Button with variants
│   ├── sign-logo/             # SignLogo + AnimatedSignLogo
│   ├── nav-config/            # social-links + nav-config (footer config, types)
│   ├── v-dashed/              # Tailwind dashed-border plugin
│   ├── footer/                # Footer component
│   └── header/                # Header (7 files: main, types, defaults, dropdown, token panel, mobile navbar, index)
├── public/r/                  # Build output (gitignored)
└── package.json
```

## Consuming Projects

| Project | Path | siteOrigin | Branch |
|---------|------|------------|--------|
| **Attestation-Frontend** (官网) | `/Users/lsbbd/Developer/EthSign/Attestation-Frontend` | `https://sign.global` | `extract-page-frame` |
| **Sign-Bridge-Frontend** | `/Users/lsbbd/Developer/EthSign/Sign-Bridge-Frontend` | `https://bridge.sign.global` | `migrate-images` |
| **Sign-Staking-FrontEnd** | `/Users/lsbbd/Developer/EthSign/Sign-Staking-FrontEnd` | `https://stake.sign.global` | worktree: `.claude/worktrees/sign-app-clan` |

All three projects have `pnpm sync:shared` to pull updates from this registry (requires `pnpm registry:serve` running).

## Key Architecture Decisions

### SignSiteProvider (site-provider)

React Context that holds `siteOrigin`. Header and Footer use `useSignSite()` to get `resolveHref()`, which converts same-origin URLs to relative paths. This ensures navigation links work correctly across local/staging/production environments.

### SmartLink

Renders `<Link>` (react-router) for internal paths, `<a target="_blank">` for external URLs. Used throughout Header and Footer instead of raw `<Link>`.

### resolveHref Prop Drilling

`NavItem.children` is a render function `(isDark, resolveHref) => ReactNode`, not a React component, so it cannot call hooks. `resolveHref` is obtained via `useSignSite()` in Header and passed down as a parameter through render functions.

### Tailwind Config Injection

- `v-dashed` injects plugin + font-archivo theme + Google Fonts @import
- Only works with **Tailwind v3** — v4 uses CSS directives, shadcn skips config file modification
- Staking uses ESM tailwind config — `require()` injection is incompatible, consuming projects revert via `git checkout`

## Editing Guidelines

- Changes here affect all consuming projects. Always consider cross-project compatibility.
- After editing, run `pnpm registry:build` to verify.
- Components use relative imports within `src/shared/` (e.g., `../cn`, `../site-provider`). Keep this convention.
- `react-router-dom` is a shared prerequisite across all consuming projects.
- `motion` (framer-motion) is required by Footer and SignLogo.
