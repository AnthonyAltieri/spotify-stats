"use client";

import { clsx } from "clsx";

export function TrendChart({ data }: { data: { label: string; minutes: number }[] }) {
  const max = Math.max(1, ...data.map((item) => item.minutes));

  return (
    <div className="mt-6 grid grid-cols-7 gap-4">
      {data.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-2">
          <div
            aria-hidden
            className={clsx("w-full rounded-full bg-gradient-to-t from-brand/20 to-brand", "transition-all duration-500")}
            style={{ height: `${Math.max(20, (item.minutes / max) * 180)}px` }}
          />
          <div className="text-center text-xs text-white/60">
            <div className="font-semibold text-white/80">{item.minutes}</div>
            <div>{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
