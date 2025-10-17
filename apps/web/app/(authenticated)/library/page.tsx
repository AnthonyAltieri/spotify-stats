import { requireSession } from "@/src/server/auth";
import { getLibraryOverview } from "@/src/server/stats-service";

export default async function LibraryPage() {
  const session = await requireSession();
  const library = await getLibraryOverview(session);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-light">Library makeup</p>
        <h1 className="text-3xl font-semibold">Playlist energy, eras, and explicit ratio</h1>
      </header>
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Playlist analyzer</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {library.playlists.map((playlist) => (
              <div key={playlist.name} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <h3 className="text-base font-semibold">{playlist.name}</h3>
                <dl className="mt-4 space-y-2 text-sm text-white/70">
                  <div className="flex justify-between">
                    <dt>Tempo</dt>
                    <dd>{playlist.tempo} bpm</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Energy</dt>
                    <dd>{Math.round(playlist.energy * 100)}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Valence</dt>
                    <dd>{Math.round(playlist.valence * 100)}%</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Release decades</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {library.decades.map((decade) => (
                <li key={decade.label} className="flex justify-between">
                  <span>{decade.label}</span>
                  <span>{decade.value}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Explicit ratio</h2>
            <div className="mt-4">
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-brand" style={{ width: `${Math.round(library.explicitRatio * 100)}%` }} />
              </div>
              <p className="mt-3 text-sm text-white/70">{Math.round(library.explicitRatio * 100)}% explicit tracks</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
