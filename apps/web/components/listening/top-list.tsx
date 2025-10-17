import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import type { ListeningHistory } from "@/src/server/stats-service";

export function TopList({ tracks }: { tracks: ListeningHistory["topTracks"] }) {
  return (
    <ul className="space-y-3">
      {tracks.map((track) => (
        <li key={track.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div>
            <p className="text-sm font-semibold">{track.title}</p>
            <p className="text-xs text-white/60">{track.artist}</p>
          </div>
          <span className="flex items-center gap-1 text-xs text-white/60">
            {track.delta >= 0 ? <ArrowUpRight className="h-4 w-4 text-brand-light" /> : <ArrowDownRight className="h-4 w-4 text-red-400" />}
            {Math.abs(track.delta)}
          </span>
        </li>
      ))}
    </ul>
  );
}
