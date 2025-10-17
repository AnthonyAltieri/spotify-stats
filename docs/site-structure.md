# Spotify Insights Web App Structure

## High-Level Navigation
| Page | Route | Purpose | Primary Content |
| --- | --- | --- | --- |
| Landing / Home | `/` | Introduce the product and drive sign-ins | Hero messaging, feature highlights, Spotify sign-in CTA, FAQs |
| Authentication Callback | `/auth/callback` | Complete Spotify OAuth and route users | Loading state, success/error messaging |
| Dashboard Overview | `/dashboard` | Snapshot of listening profile | KPI tiles, listening trend chart, streak summary, quick links |
| Listening History | `/listening-history` | Deep dive on recent plays and habits | Range selector, top lists, heatmap, skip/completion metrics |
| Library Composition | `/library` | Analyze saved tracks and playlists | Playlist analyzer, genre constellation, release decade chart |
| Discovery & Evolution | `/discovery` | Highlight new finds and taste shifts | New artists, Release Radar stats, quarter-over-quarter comparisons |
| Social & Sharing | `/social` | Enable benchmarking and shareable assets | Community comparisons, story card generator |
| Settings & Data Management | `/settings` | Manage permissions and preferences | Scope list, refresh controls, data management |

## Page-by-Page Content Details
### Landing / Home (`/`)
- Hero headline, subheading, and product imagery.
- Spotify sign-in button powered by Better Auth.
- Feature highlight cards summarizing Dashboard, Listening History, Library, and Social pages.
- FAQ accordion covering data usage, privacy, and pricing (if any).
- Footer with links to privacy policy, terms, and contact.

### Authentication Callback (`/auth/callback`)
- Spinner indicating "Connecting to Spotify…" while exchanging tokens.
- Automatic redirect to the user's intended destination on success.
- Error banner with retry button and support link when auth fails.

### Dashboard Overview (`/dashboard`)
- Time-range selector (4 weeks, 6 months, lifetime) applied to all metrics.
- KPI tiles for listening minutes, top artist, top track, and top genre.
- Trend line chart showing listening minutes over the selected period.
- Streak summary card (current streak, longest streak, average session length).
- Quick navigation cards summarizing deeper pages (Listening History, Library, Discovery) with mini-stats.

### Listening History (`/listening-history`)
- Range selector with quick presets and custom date picker.
- Top tracks/artists/genres lists showing ranking changes vs prior period.
- Listening heatmap (day-of-week vs hour) with tooltips and keyboard accessibility.
- Skip vs completion ratio for top tracks plus session length distribution chart.
- Recently played timeline with playback controls for relistening (if permitted).

### Library Composition (`/library`)
- Playlist selector with analyzer summary (tempo, energy, valence, loudness) and outlier alerts.
- Genre constellation visualization showing counts per genre cluster with hover details.
- Release decade histogram and popularity percentile distribution for saved tracks.
- Explicit vs clean track ratio and toggles to filter views.
- Export button to download playlist analysis as PNG/CSV.

### Discovery & Evolution (`/discovery`)
- Newly discovered artists list including first-play date and follow/save status.
- Release Radar engagement widget (listened, saved, skipped counts).
- Quarter-over-quarter comparison charts for genre share and energy/valence.
- Narrative summary describing key taste shifts with confidence indicators.
- Optional "Suggested next listens" section leveraging related artists.

### Social & Sharing (`/social`)
- Benchmark cards comparing user metrics to community medians for tempo, energy, and genre diversity.
- Story card generator with template selector, stat inputs, preview, and download/share buttons.
- Copyable share links and optional integration to post directly to platforms (subject to API availability).
- Privacy explanation modal outlining anonymized data handling.

### Settings & Data Management (`/settings`)
- List of granted Spotify scopes with ability to revoke or request additional scopes.
- Manual "Refresh my stats" trigger showing last updated timestamp and status toasts.
- Options to clear cached data, disconnect Spotify, and delete account data.
- Notification preferences and email export toggle.
- Support resources (FAQ link, contact form, changelog link).
