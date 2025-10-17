import { Suspense } from "react";

import { StatsGrid } from "@/components/dashboard/stats-grid";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { requireSession } from "@/src/server/auth";
import { getDashboardSummary } from "@/src/server/stats-service";

export default async function DashboardPage() {
  const session = await requireSession();
  const summary = await getDashboardSummary(session);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-light">Overview</p>
        <h1 className="text-3xl font-semibold">Hi {session.user.name ?? "there"}, here's your week in sound</h1>
      </header>
      <StatsGrid summary={summary} />
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Listening minutes</h2>
          <p className="text-sm text-white/60">Past 7 days</p>
        </div>
        <Suspense fallback={<div className="mt-6 h-40 animate-pulse rounded-2xl bg-white/10" /> }>
          <TrendChart data={summary.trend} />
        </Suspense>
      </section>
    </div>
  );
}
