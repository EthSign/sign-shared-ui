import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SignSharedUIProvider } from '@shared/shared-ui-provider';
import { Header } from '@shared/header';
import { Footer } from '@shared/footer';

type Variant = 'light' | 'dark' | 'transparent';
type ActionSlotMode = 'none' | 'connect' | 'connected';

const SITES = [
  { label: 'sign.global (Attestation)', origin: 'https://sign.global' },
  { label: 'bridge.sign.global (Bridge)', origin: 'https://bridge.sign.global' },
  { label: 'stake.sign.global (Staking)', origin: 'https://stake.sign.global' }
];

function MockWalletButton({ mode }: { mode: ActionSlotMode }) {
  if (mode === 'none') return null;
  if (mode === 'connect') {
    return (
      <button className="rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600">
        Connect Wallet
      </button>
    );
  }
  return (
    <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-800 shadow-sm">
      <div className="size-6 rounded-full bg-gradient-to-br from-orange-400 to-amber-600" />
      <span className="font-mono">0x1f4e…8a3c</span>
    </div>
  );
}

function useViewportWidth() {
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 0 : window.innerWidth));
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return w;
}

function breakpointLabel(w: number) {
  if (w >= 1536) return '2xl';
  if (w >= 1280) return 'xl';
  if (w >= 1024) return 'lg';
  if (w >= 768) return 'md';
  if (w >= 640) return 'sm';
  return 'base';
}

export default function App() {
  const [siteIndex, setSiteIndex] = useState(2); // 默认 Staking，最容易触发问题
  const [variant, setVariant] = useState<Variant>('light');
  const [actionMode, setActionMode] = useState<ActionSlotMode>('connected');
  const [showWhitepaper, setShowWhitepaper] = useState(true);
  const [animated, setAnimated] = useState(false);
  const vw = useViewportWidth();
  const bp = breakpointLabel(vw);

  const headerOnDark = variant === 'dark' || variant === 'transparent';

  return (
    <BrowserRouter>
      <SignSharedUIProvider siteOrigin={SITES[siteIndex].origin}>
        {/* Control Panel */}
        <div className="sticky top-0 z-[100] flex flex-wrap items-center gap-3 border-b border-amber-200 bg-amber-50 px-4 py-2 font-archivo text-xs">
          <span className="font-bold text-amber-800">Playground</span>

          <label className="flex items-center gap-1.5">
            <span className="text-amber-900">Site</span>
            <select
              value={siteIndex}
              onChange={(e) => setSiteIndex(Number(e.target.value))}
              className="rounded border border-amber-300 px-2 py-1"
            >
              {SITES.map((s, i) => (
                <option key={s.origin} value={i}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-1.5">
            <span className="text-amber-900">Variant</span>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as Variant)}
              className="rounded border border-amber-300 px-2 py-1"
            >
              <option value="light">light</option>
              <option value="dark">dark</option>
              <option value="transparent">transparent</option>
            </select>
          </label>

          <label className="flex items-center gap-1.5">
            <span className="text-amber-900">actionSlot</span>
            <select
              value={actionMode}
              onChange={(e) => setActionMode(e.target.value as ActionSlotMode)}
              className="rounded border border-amber-300 px-2 py-1"
            >
              <option value="none">none (Attestation 风格)</option>
              <option value="connect">Connect Wallet</option>
              <option value="connected">Connected (0x1f…8a3c)</option>
            </select>
          </label>

          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={showWhitepaper}
              onChange={(e) => setShowWhitepaper(e.target.checked)}
            />
            <span>Whitepaper</span>
          </label>

          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={animated} onChange={(e) => setAnimated(e.target.checked)} />
            <span>Footer animated</span>
          </label>

          <div className="ml-auto flex items-center gap-2 rounded bg-amber-100 px-2 py-1 font-mono">
            <span>{vw}px</span>
            <span className="rounded bg-amber-700 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
              {bp}
            </span>
          </div>
        </div>

        {/* Page */}
        <div className={`flex min-h-screen flex-col ${headerOnDark ? 'bg-neutral-950' : 'bg-white'}`}>
          {/* Header — variant=transparent 要求 header 浮在内容上方 */}
          {variant === 'transparent' ? (
            <div className="relative">
              <div className="absolute inset-x-0 top-0 z-50">
                <Header
                  variant={variant}
                  actionSlot={actionMode === 'none' ? undefined : <MockWalletButton mode={actionMode} />}
                  showWhitePaperButton={showWhitepaper}
                />
              </div>
              <div className="relative h-[480px] overflow-hidden bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="space-y-2 text-center">
                    <div className="text-sm uppercase tracking-widest opacity-80">transparent hero</div>
                    <h1 className="font-archivo text-4xl font-bold">Sovereign Infrastructure</h1>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Header
              variant={variant}
              actionSlot={actionMode === 'none' ? undefined : <MockWalletButton mode={actionMode} />}
              showWhitePaperButton={showWhitepaper}
            />
          )}

          <main
            className={`flex flex-1 flex-col items-center justify-center gap-6 p-8 ${
              headerOnDark ? 'text-white' : 'text-neutral-900'
            }`}
          >
            <div className="space-y-2 text-center">
              <h1 className="font-archivo text-3xl font-bold">Sign Shared UI Playground</h1>
              <p className={headerOnDark ? 'text-white/60' : 'text-gray-500'}>
                Site:{' '}
                <code className={`rounded px-2 py-0.5 ${headerOnDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                  {SITES[siteIndex].origin}
                </code>
              </p>
            </div>

            <div
              className={`max-w-xl rounded-lg border p-4 text-sm leading-6 ${
                headerOnDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="mb-2 font-bold">断点检查指南</div>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  无 actionSlot：桌面 nav 在 <code>lg</code>（≥1024px）出现
                </li>
                <li>
                  有 actionSlot：桌面 nav 在 <code>xl</code>（≥1280px）出现，避免与钱包按钮挤压
                </li>
                <li>缩窗到 1024-1280px 之间，应看到带 actionSlot 场景下汉堡按钮仍在</li>
              </ul>
            </div>
          </main>

          <Footer animated={animated} />
        </div>
      </SignSharedUIProvider>
    </BrowserRouter>
  );
}
