import type { Session } from "better-auth";

const API_BASE = "https://api.spotify.com/v1";

type FetchArgs = {
  session: Session;
  path: string;
  query?: Record<string, string | number | undefined>;
};

function getAccessToken(session: Session): string | null {
  const provider = (session as unknown as { providers?: Record<string, { accessToken?: string }> }).providers?.spotify;
  if (provider?.accessToken) {
    return provider.accessToken;
  }

  const tokens = (session as unknown as { tokens?: Record<string, { accessToken?: string }> }).tokens?.spotify;
  return tokens?.accessToken ?? null;
}

export async function spotifyFetch<T>({ session, path, query }: FetchArgs): Promise<T> {
  const accessToken = getAccessToken(session);
  if (!accessToken) {
    throw new Error("Missing Spotify access token on session");
  }
  const url = new URL(`${API_BASE}${path}`);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}
