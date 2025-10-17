import { Suspense } from "react";

import { Heatmap } from "@/components/listening/heatmap";
import { TopList } from "@/components/listening/top-list";
import { requireSession } from "@/src/server/auth";
import { getListeningHistory } from "@/src/server/stats-service";

export default async function ListeningHistoryPage() {
  const session = await requireSession();
  const history = await getListeningHistory(session);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-light">Listening history</p>
        <h1 className="text-3xl font-semibold">When and what you played</h1>
      </header>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <h2 className="text-lg font-semibold">Top tracks</h2>
          <TopList tracks={history.topTracks} />
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-base font-semibold">Session overview</h3>
            <dl className="mt-4 space-y-2 text-sm text-white/70">
              <div className="flex justify-between">
                <dt>Avg. session length</dt>
                <dd>{history.averageSessionMinutes} min</dd>
              </div>
              <div className="flex justify-between">
                <dt>Completion rate</dt>
                <dd>{Math.round(history.completionRate * 100)}%</dd>
              </div>
              <div className="flex justify-between">
                <dt>Skip rate</dt>
                <dd>{Math.round(history.skipRate * 100)}%</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Weekly rhythm heatmap</h2>
            <p className="text-xs text-white/60">Brighter means more minutes listened</p>
          </div>
          <Suspense fallback={<div className="mt-6 h-64 animate-pulse rounded-3xl bg-white/10" /> }>
            <Heatmap matrix={history.heatmap} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
