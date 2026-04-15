import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { SignSharedUIProvider } from "@shared/shared-ui-provider";
import { Header } from "@shared/header";
import { Footer } from "@shared/footer";

const SITES = [
  { label: "sign.global (官网)", origin: "https://sign.global" },
  { label: "stake.sign.global (Staking)", origin: "https://stake.sign.global" },
];

export default function App() {
  const [siteIndex, setSiteIndex] = useState(0);
  const [enableStakeSubMenu, setEnableStakeSubMenu] = useState(false);
  const [animated, setAnimated] = useState(true);

  return (
    <BrowserRouter>
      <SignSharedUIProvider
        siteOrigin={SITES[siteIndex].origin}
        enableStakeSubMenu={enableStakeSubMenu}
      >
        {/* Control Panel */}
        <div className="sticky top-0 z-[100] bg-amber-50 border-b border-amber-200 px-4 py-2 flex flex-wrap items-center gap-4 text-sm font-archivo">
          <span className="font-bold text-amber-800">Playground</span>
          <select
            value={siteIndex}
            onChange={(e) => setSiteIndex(Number(e.target.value))}
            className="border border-amber-300 rounded px-2 py-1 text-xs"
          >
            {SITES.map((s, i) => (
              <option key={s.origin} value={i}>
                {s.label}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={enableStakeSubMenu}
              onChange={(e) => setEnableStakeSubMenu(e.target.checked)}
            />
            <span>enableStakeSubMenu</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={animated}
              onChange={(e) => setAnimated(e.target.checked)}
            />
            <span>Footer animated</span>
          </label>
        </div>

        <div className="flex min-h-screen flex-col bg-white">
          <Header />
          <main className="flex flex-1 items-center justify-center p-8">
            <div className="space-y-4 text-center">
              <h1 className="font-archivo text-3xl font-bold">
                Sign Shared UI Playground
              </h1>
              <p className="text-gray-500">
                当前站点:{" "}
                <code className="rounded bg-gray-100 px-2 py-0.5">
                  {SITES[siteIndex].origin}
                </code>
              </p>
            </div>
          </main>
          <Footer animated={animated} />
        </div>
      </SignSharedUIProvider>
    </BrowserRouter>
  );
}
