import Link from "next/link";

import { getSession } from "@/src/server/auth";

const features = [
  {
    title: "Personal dashboard",
    description: "Track your top artists, tracks, and listening streak in one glance."
  },
  {
    title: "Listening history deep dives",
    description: "Heatmaps, skip rates, and session lengths reveal when and how you listen."
  },
  {
    title: "Playlist intelligence",
    description: "See energy, tempo, and mood analytics for every playlist you build."
  }
];

export default async function MarketingPage() {
  const session = await getSession();

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Spotify listening analytics for curious fans</h1>
          <p className="text-lg text-white/70">
            Connect your account and unlock a living portrait of your listening habits, new discoveries, and playlist DNA.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/api/auth/signin?provider=spotify"
              className="rounded-full bg-brand px-8 py-3 text-base font-semibold text-black shadow-lg shadow-brand/30"
            >
              {session ? "View your dashboard" : "Sign in with Spotify"}
            </Link>
            <Link href="#features" className="rounded-full border border-white/20 px-8 py-3 text-base text-white/80">
              Explore features
            </Link>
          </div>
        </div>
      </section>
      <section id="features" className="border-t border-white/10 bg-black/40 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-lg">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-white/10 bg-black py-20">
        <div className="mx-auto max-w-4xl space-y-6 px-6 text-center">
          <h2 className="text-3xl font-semibold">Built with privacy-first architecture</h2>
          <p className="text-base text-white/70">
            Better Auth keeps your session secure while Turbo orchestrates background jobs that cache summaries in memory for quick retrieval.
            You stay in control with export and deletion options in settings.
          </p>
          <Link href="/settings" className="text-sm text-brand-light underline">
            Review data controls
          </Link>
        </div>
      </section>
    </div>
  );
}
