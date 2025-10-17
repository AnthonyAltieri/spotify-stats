import { requireSession } from "@/src/server/auth";
import { getSocialInsights } from "@/src/server/stats-service";

export default async function SharingPage() {
  const session = await requireSession();
  const social = await getSocialInsights(session);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-light">Social</p>
        <h1 className="text-3xl font-semibold">See how you stack up</h1>
      </header>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Community benchmarks</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            {social.benchmarks.map((benchmark) => (
              <li key={benchmark.label} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{benchmark.label}</span>
                  <span className="text-xs text-white/50">Community {benchmark.community}</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round(
                          benchmark.community ? (benchmark.user / benchmark.community) * 100 : 100
                        )
                      )}%`
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-brand-light">You: {benchmark.user}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Shareable story cards</h2>
          <div className="mt-4 space-y-4">
            {social.stories.map((story) => (
              <div key={story.title} className="rounded-2xl border border-white/10 bg-gradient-to-r from-brand/10 to-brand/5 p-4">
                <h3 className="text-base font-semibold text-white">{story.title}</h3>
                <p className="mt-2 text-sm text-white/70">{story.description}</p>
                <button className="mt-4 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
                  Prepare download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
