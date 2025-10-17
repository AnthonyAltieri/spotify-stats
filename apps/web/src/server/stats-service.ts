import type { Session } from "better-auth";
import { cacheKey, cached } from "@/src/lib/cache";
import { mockDashboard, mockDiscovery, mockLibrary, mockListeningHistory, mockSettings, mockSocial } from "@/src/lib/mock-data";
import { spotifyFetch } from "@/src/server/spotify-client";

const FIVE_MINUTES = 1000 * 60 * 5;

export type DashboardSummary = typeof mockDashboard;
export type ListeningHistory = typeof mockListeningHistory;
export type LibraryOverview = typeof mockLibrary;
export type DiscoveryInsights = typeof mockDiscovery;
export type SocialInsights = typeof mockSocial;
export type SettingsSnapshot = typeof mockSettings;

type SpotifyTopResponse<T> = {
  items: T[];
};

type SpotifyArtist = {
  name: string;
  genres: string[];
  images: { url: string }[];
};

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
};

export async function getDashboardSummary(session: Session): Promise<DashboardSummary> {
  return cached(cacheKey(session.user.id, "dashboard"), FIVE_MINUTES, async () => {
    try {
      const [artists, tracks] = await Promise.all([
        spotifyFetch<SpotifyTopResponse<SpotifyArtist>>({ session, path: "/me/top/artists", query: { limit: 1, time_range: "short_term" } }),
        spotifyFetch<SpotifyTopResponse<SpotifyTrack>>({ session, path: "/me/top/tracks", query: { limit: 1, time_range: "short_term" } })
      ]);

      const topArtist = artists.items[0];
      const topTrack = tracks.items[0];
      return {
        ...mockDashboard,
        topArtist: topArtist
          ? {
              name: topArtist.name,
              image: topArtist.images?.[0]?.url ?? mockDashboard.topArtist.image
            }
          : mockDashboard.topArtist,
        topTrack: topTrack
          ? {
              name: topTrack.name,
              artist: topTrack.artists.map((a) => a.name).join(", ")
            }
          : mockDashboard.topTrack,
        topGenre: topArtist?.genres?.[0] ?? mockDashboard.topGenre
      } satisfies DashboardSummary;
    } catch (error) {
      console.error("Failed to resolve dashboard summary from Spotify", error);
      return mockDashboard;
    }
  });
}

export async function getListeningHistory(session: Session): Promise<ListeningHistory> {
  return cached(cacheKey(session.user.id, "listening-history"), FIVE_MINUTES, async () => {
    try {
      void session;
      return mockListeningHistory;
    } catch (error) {
      console.error("Failed to resolve listening history", error);
      return mockListeningHistory;
    }
  });
}

export async function getLibraryOverview(session: Session): Promise<LibraryOverview> {
  return cached(cacheKey(session.user.id, "library"), FIVE_MINUTES, async () => {
    try {
      void session;
      return mockLibrary;
    } catch (error) {
      console.error("Failed to resolve library overview", error);
      return mockLibrary;
    }
  });
}

export async function getDiscoveryInsights(session: Session): Promise<DiscoveryInsights> {
  return cached(cacheKey(session.user.id, "discovery"), FIVE_MINUTES, async () => {
    try {
      void session;
      return mockDiscovery;
    } catch (error) {
      console.error("Failed to resolve discovery insights", error);
      return mockDiscovery;
    }
  });
}

export async function getSocialInsights(session: Session): Promise<SocialInsights> {
  return cached(cacheKey(session.user.id, "social"), FIVE_MINUTES, async () => {
    try {
      void session;
      return mockSocial;
    } catch (error) {
      console.error("Failed to resolve social insights", error);
      return mockSocial;
    }
  });
}

export async function getSettingsSnapshot(session: Session): Promise<SettingsSnapshot> {
  return cached(cacheKey(session.user.id, "settings"), FIVE_MINUTES, async () => {
    try {
      return {
        ...mockSettings,
        scopes: session.user.scopes ?? mockSettings.scopes
      };
    } catch (error) {
      console.error("Failed to resolve settings snapshot", error);
      return mockSettings;
    }
  });
}
