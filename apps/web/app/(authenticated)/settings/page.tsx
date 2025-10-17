import Link from "next/link";

import { requireSession } from "@/src/server/auth";
import { getSettingsSnapshot } from "@/src/server/stats-service";

export default async function SettingsPage() {
  const session = await requireSession();
  const settings = await getSettingsSnapshot(session);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-light">Settings</p>
        <h1 className="text-3xl font-semibold">Control your data footprint</h1>
      </header>
      <section className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Granted Spotify scopes</h2>
          <ul className="mt-4 grid gap-2 text-sm text-white/70">
            {settings.scopes.map((scope) => (
              <li key={scope} className="rounded-full border border-white/10 bg-black/40 px-4 py-2">
                {scope}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Data freshness</h2>
          <p className="mt-2 text-sm text-white/70">Last refreshed {new Date(settings.lastRefresh).toLocaleString()}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-black">Refresh now</button>
            <button className="rounded-full border border-red-400/30 px-5 py-2 text-sm text-red-300">Purge cached data</button>
            <button className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/70">Disconnect Spotify</button>
          </div>
          <p className="mt-4 text-xs text-white/50">
            Manual refresh triggers a Turbo background job to recompute aggregates and update the cache within 60 seconds.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          <h2 className="text-lg font-semibold text-white">Need help?</h2>
          <p className="mt-2">
            View our <Link href="/docs/prds" className="text-brand-light underline">product requirements</Link> to understand how your data powers each insight.
          </p>
        </div>
      </section>
    </div>
  );
}
