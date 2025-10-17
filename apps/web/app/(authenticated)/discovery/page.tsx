import { requireSession } from "@/src/server/auth";
import { getDiscoveryInsights } from "@/src/server/stats-service";

export default async function DiscoveryPage() {
  const session = await requireSession();
  const discovery = await getDiscoveryInsights(session);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-light">Discovery</p>
        <h1 className="text-3xl font-semibold">Celebrate your latest finds</h1>
      </header>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">New artists this month</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            {discovery.newArtists.map((artist) => (
              <li key={artist.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                <div>
                  <p className="font-semibold text-white">{artist.name}</p>
                  <p className="text-xs">First played {new Date(artist.firstPlayed).toLocaleDateString()}</p>
                </div>
                <span className="text-xs text-brand-light">{artist.saves} saves</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-lg font-semibold">Release Radar engagement</h2>
          <dl className="space-y-2 text-sm text-white/70">
            <div className="flex justify-between">
              <dt>Listened</dt>
              <dd>{discovery.releaseRadar.listened}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Saved</dt>
              <dd>{discovery.releaseRadar.saved}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Skipped</dt>
              <dd>{discovery.releaseRadar.skipped}</dd>
            </div>
          </dl>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
            <h3 className="text-base font-semibold text-white">Taste shift</h3>
            <p className="mt-2 leading-relaxed">{discovery.trendNarrative}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
