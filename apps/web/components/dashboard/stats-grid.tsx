import Image from "next/image";

import type { DashboardSummary } from "@/src/server/stats-service";

export function StatsGrid({ summary }: { summary: DashboardSummary }) {
  return (
    <section className="grid gap-4 md:grid-cols-4">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:col-span-2">
        <p className="text-sm text-white/60">Top artist</p>
        <div className="mt-4 flex items-center gap-4">
          <Image
            src={summary.topArtist.image}
            alt={summary.topArtist.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">{summary.topArtist.name}</p>
            <p className="text-sm text-white/60">Your most played this month</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/60">Top track</p>
        <p className="mt-4 text-lg font-semibold">{summary.topTrack.name}</p>
        <p className="text-sm text-white/60">{summary.topTrack.artist}</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/60">Top genre</p>
        <p className="mt-4 text-lg font-semibold">{summary.topGenre}</p>
        <p className="text-sm text-white/60">Based on your last 4 weeks</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/60">Listening minutes</p>
        <p className="mt-4 text-3xl font-semibold">{summary.totalMinutes.toLocaleString()}</p>
        <p className="text-sm text-white/60">Total over selected range</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/60">Current streak</p>
        <p className="mt-4 text-3xl font-semibold">{summary.streak.current} days</p>
        <p className="text-sm text-white/60">Longest streak {summary.streak.longest} days</p>
      </div>
    </section>
  );
}
