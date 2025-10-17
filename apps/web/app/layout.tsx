import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AuthProvider } from "@/components/auth-state";
import { PrimaryNav } from "@/components/primary-nav";
import { SiteFooter } from "@/components/site-footer";
import { getSession } from "@/src/server/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sonic Insights",
  description: "Personalized Spotify analytics powered by Better Auth and tRPC."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const authenticated = Boolean(session);

  return (
    <html lang="en" className="bg-black text-white">
      <body className={`${inter.className} flex min-h-screen flex-col`}> 
        <AuthProvider value={{ status: authenticated ? "authenticated" : "anonymous", displayName: session?.user.name }}>
          <header className="border-b border-white/10">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold">Sonic Insights</p>
                <p className="text-sm text-white/60">Your music DNA, decoded.</p>
              </div>
              <PrimaryNav authenticated={authenticated} />
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
