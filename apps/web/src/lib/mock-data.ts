export const mockDashboard = {
  topArtist: {
    name: "Tame Impala",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=160&h=160&q=80"
  },
  topTrack: {
    name: "The Less I Know The Better",
    artist: "Tame Impala"
  },
  topGenre: "Indie Psychedelic",
  totalMinutes: 1820,
  streak: {
    current: 9,
    longest: 21
  },
  trend: [
    { label: "Mon", minutes: 210 },
    { label: "Tue", minutes: 180 },
    { label: "Wed", minutes: 220 },
    { label: "Thu", minutes: 260 },
    { label: "Fri", minutes: 300 },
    { label: "Sat", minutes: 320 },
    { label: "Sun", minutes: 330 }
  ]
};

export const mockListeningHistory = {
  ranges: ["4 weeks", "6 months", "Lifetime"],
  topTracks: [
    { title: "Lose Yourself to Dance", artist: "Daft Punk", delta: 2 },
    { title: "Instant Crush", artist: "Daft Punk", delta: -1 },
    { title: "Giorgio by Moroder", artist: "Daft Punk", delta: 4 }
  ],
  heatmap: Array.from({ length: 7 }).map((_, day) =>
    Array.from({ length: 6 }).map((__, block) => ({
      day,
      block,
      intensity: Math.random()
    }))
  ),
  skipRate: 0.14,
  completionRate: 0.72,
  averageSessionMinutes: 46
};

export const mockLibrary = {
  playlists: [
    { name: "Morning Commute", tempo: 108, energy: 0.62, valence: 0.41 },
    { name: "Late Night", tempo: 92, energy: 0.48, valence: 0.22 }
  ],
  decades: [
    { label: "2020s", value: 34 },
    { label: "2010s", value: 41 },
    { label: "2000s", value: 15 },
    { label: "1990s", value: 10 }
  ],
  explicitRatio: 0.37
};

export const mockDiscovery = {
  newArtists: [
    { name: "Yussef Dayes", firstPlayed: "2024-05-04", saves: 6 },
    { name: "Men I Trust", firstPlayed: "2024-05-02", saves: 3 }
  ],
  releaseRadar: { listened: 14, saved: 5, skipped: 4 },
  trendNarrative: "Your sound got 12% more energetic this quarter."
};

export const mockSocial = {
  benchmarks: [
    { label: "Energy", user: 0.71, community: 0.58 },
    { label: "Tempo", user: 118, community: 110 },
    { label: "Danceability", user: 0.64, community: 0.59 }
  ],
  stories: [
    { title: "Most Energetic Day", description: "You hit peak intensity last Friday." },
    { title: "Genre Explorer", description: "You explored 9 new genres this month." }
  ]
};

export const mockSettings = {
  scopes: [
    "user-read-recently-played",
    "user-top-read",
    "playlist-read-private",
    "user-library-read"
  ],
  lastRefresh: new Date().toISOString()
};
