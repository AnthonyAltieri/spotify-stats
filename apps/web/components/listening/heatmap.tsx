"use client";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const blocks = ["0-4", "4-8", "8-12", "12-16", "16-20", "20-24"];

type HeatmapProps = {
  matrix: { day: number; block: number; intensity: number }[][];
};

export function Heatmap({ matrix }: HeatmapProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full border-collapse text-xs text-white/60">
        <thead className="bg-white/5 uppercase tracking-[0.2em] text-white/50">
          <tr>
            <th className="px-4 py-3 text-left">Block</th>
            {days.map((day) => (
              <th key={day} className="px-3 py-3 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {blocks.map((blockLabel, blockIndex) => (
            <tr key={blockLabel} className="odd:bg-white/5">
              <th className="px-4 py-3 text-left text-white/70">{blockLabel}</th>
              {days.map((_, dayIndex) => {
                const cell = matrix[dayIndex]?.[blockIndex];
                const intensity = cell ? Math.min(1, Math.max(0, cell.intensity)) : 0;
                const background = `rgba(29, 185, 84, ${0.12 + intensity * 0.88})`;
                return <td key={`${dayIndex}-${blockIndex}`} className="px-3 py-3" style={{ background }} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
