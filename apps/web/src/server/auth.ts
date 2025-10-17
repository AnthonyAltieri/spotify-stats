import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { betterAuth } from "better-auth";
import { spotify } from "better-auth/providers/spotify";
import type { Session } from "better-auth";
import { createRouteHandler } from "@better-auth/next/route-handler";
import { env } from "@/src/env";

const config = env();

export const auth = betterAuth({
  secret: config.BETTER_AUTH_SECRET,
  providers: [
    spotify({
      clientId: config.SPOTIFY_CLIENT_ID,
      clientSecret: config.SPOTIFY_CLIENT_SECRET,
      scopes: [
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "user-library-read",
        "user-read-email"
      ]
    })
  ],
  session: {
    cookieName: "sonic-insights-session"
  }
});

export const { GET, POST } = createRouteHandler(auth);

export async function getSession(): Promise<Session | null> {
  const cookieStore = cookies();
  const headerStore = headers();
  return auth.api.getSession({ cookies: cookieStore, headers: headerStore });
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }
  return session;
}
