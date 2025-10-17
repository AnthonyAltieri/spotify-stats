import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-10 text-sm text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-white/80">© {new Date().getFullYear()} Sonic Insights</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/settings" className="hover:text-white">
            Privacy & Data
          </Link>
          <Link href="https://developer.spotify.com/documentation/web-api/" className="hover:text-white">
            Spotify API
          </Link>
          <Link href="https://github.com" className="hover:text-white">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
