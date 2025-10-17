# Product Requirement Documents

This document details the PRDs for each major page and cross-cutting feature of the Spotify Insights application.

## Landing / Home Page
**Objective:** Convert visitors into authenticated users by communicating value and privacy practices clearly.

**Target Users:** Spotify listeners curious about their listening patterns.

**KPIs:** Sign-in conversion rate, bounce rate, FAQ engagement.

**Functional Requirements**
- Responsive hero section with CTA button that initiates Better Auth Spotify login.
- Feature highlight cards linking to key internal pages.
- FAQ accordion stored in CMS-friendly format (MD/JSON) for quick iteration.
- Footer with privacy policy, terms, and contact links.

**User Stories**
1. As a new visitor, I want to understand what insights I get so I can decide to sign in.
2. As a privacy-conscious user, I want clarity about data usage before connecting my Spotify account.

**Acceptance Criteria**
- Page loads under 2s on a 3G connection.
- Sign-in CTA triggers OAuth flow reliably across devices.
- FAQ items expand/collapse with keyboard navigation support.

---

## Authentication Callback Page
**Objective:** Complete Spotify OAuth via Better Auth and communicate status clearly.

**Target Users:** Newly authenticating or returning users.

**KPIs:** Successful authentication rate, average time-to-dashboard, error resolution rate.

**Functional Requirements**
- Display loading state during token exchange.
- Automatically redirect to dashboard or intended page when successful.
- Render error banner with retry instructions and support link on failure.
- Support `returnTo` query parameter for post-auth navigation.

**User Stories**
1. As a user, I want reassurance that the authentication flow is working so I trust the app.
2. As a returning user, I want to land back where I intended after logging in.

**Acceptance Criteria**
- Successful authentication redirects within 3 seconds.
- Errors provide actionable messaging and logging identifiers.

---

## Dashboard Overview Page
**Objective:** Offer a fast snapshot of the user’s listening profile and drive exploration.

**Target Users:** Authenticated users seeking a quick overview.

**KPIs:** Dashboard load time, navigation to detail pages, daily active users.

**Functional Requirements**
- KPI tiles for listening minutes, top artist, top track, top genre, all respecting selected range.
- Trend line chart for listening minutes leveraging cached aggregates.
- Streak summary card showing current and longest streak plus average session length.
- Quick navigation cards with teaser stats linking to Listening History, Library, Discovery pages.

**User Stories**
1. As a listener, I want a quick summary of my stats so I can gauge recent changes.
2. As a power user, I want to jump to deeper analyses quickly.

**Acceptance Criteria**
- Charts meet WCAG AA accessibility standards.
- Cached data keeps repeat visits under 1s load time.

---

## Listening History Page
**Objective:** Provide detailed insights into recent listening behavior across time ranges.

**Target Users:** Users interested in trends and habits.

**KPIs:** Time-on-page, range selector interactions, insights shared.

**Functional Requirements**
- Time-range selector with presets (4 weeks, 6 months, lifetime) and custom range.
- Top tracks/artists/genres lists showing ranking changes versus prior period.
- Time-of-day and day-of-week heatmap with tooltips and keyboard accessibility.
- Skip vs completion ratio visualization and session length distribution chart.
- Recently played timeline with optional playback links where permitted.

**User Stories**
1. As a user, I want to know when I listen most so I can identify habits.
2. As a playlist curator, I want to see which songs I consistently skip.

**Acceptance Criteria**
- Lists display at least top 10 results per category.
- Heatmap and charts respond within 200ms to range changes.
- Data refresh triggered automatically when the range updates.

---

## Library Composition Page
**Objective:** Reveal the makeup of saved tracks and playlists for better curation.

**Target Users:** Users with large libraries and playlist curators.

**KPIs:** Playlist analyzer usage, export count, share rate.

**Functional Requirements**
- Playlist selector with analyzer summary (tempo, energy, valence, loudness) and outlier detection.
- Genre constellation visualization with interactive tooltips.
- Release decade histogram and popularity percentile distribution.
- Explicit vs clean track ratio with filters.
- Export options (PNG/CSV) for playlist reports.

**User Stories**
1. As a playlist curator, I want to understand the “feel” of my playlists to adjust sequencing.
2. As a collector, I want insight into the eras and popularity of my saved music.

**Acceptance Criteria**
- Analyzer loads within 2 seconds for playlists up to 300 tracks (paging beyond that).
- Charts support download/export interactions.

---

## Discovery & Evolution Page
**Objective:** Highlight new discoveries and longitudinal taste shifts to sustain engagement.

**Target Users:** Exploratory listeners and returning users monitoring taste changes.

**KPIs:** Visits per user, new artist saves/follows, session duration.

**Functional Requirements**
- Newly discovered artists list with first-play date and engagement metrics.
- Release Radar engagement widget summarizing listened, saved, skipped counts.
- Quarter-over-quarter comparison charts for genre share and energy/valence distributions.
- Narrative summary describing taste shifts with significance thresholds.
- Optional related-artist recommendations.

**User Stories**
1. As a music explorer, I want to celebrate new artists I found recently.
2. As a trend watcher, I want to track how my taste evolves over time.

**Acceptance Criteria**
- Historical data stored for at least 12 months.
- Narrative updates automatically when new quarter data is available.

---

## Social & Sharing Page
**Objective:** Encourage community interaction and social virality.

**Target Users:** Users interested in benchmarks and sharing.

**KPIs:** Story card downloads, social referrals, benchmark view count.

**Functional Requirements**
- Benchmark cards comparing user stats to anonymized community medians.
- Story card generator with templates, previews, and export to PNG (1080x1920 <1MB).
- Share links/buttons for supported social platforms.
- Privacy explanation modal describing aggregation and opt-outs.

**User Stories**
1. As a user, I want to compare myself to others to understand my uniqueness.
2. As a social sharer, I want appealing graphics to post online.

**Acceptance Criteria**
- Benchmark data refreshes weekly from aggregated datasets.
- Story card exports complete within 2 seconds.

---

## Settings & Data Management Page
**Objective:** Provide transparency and control over permissions, caching, and data retention.

**Target Users:** Privacy-focused users and power users managing their data.

**KPIs:** Data refresh actions, disconnect rate, support ticket volume.

**Functional Requirements**
- Display granted Spotify scopes with revoke/request controls.
- Manual refresh trigger with timestamp and real-time feedback.
- Options to purge cached data, disconnect Spotify, and delete stored data.
- Notification preferences and support resources.

**User Stories**
1. As a privacy-minded user, I want to revoke access easily.
2. As a returning user, I want to refresh my stats on demand.

**Acceptance Criteria**
- Destructive actions require confirmation dialogs.
- Data purge completes within 60 seconds system-wide.

---

## Cross-Feature PRD: Shareable Story Cards
**Objective:** Generate polished visual summaries of key stats for social sharing.

**KPIs:** Downloads per user, social referral traffic, template usage distribution.

**Functional Requirements**
- Template engine with JSON-defined layouts and stat placeholders.
- Export to PNG (and optional GIF) consistent with brand guidelines.
- Integration hooks for Dashboard highlights and Social page generator.
- Optional background job to pre-render popular templates.

**User Stories**
1. As a fan, I want to share my music story visually with friends.
2. As a marketer, I want consistent branding across all shared assets.

**Acceptance Criteria**
- Template updates deployable without code via JSON config in storage.
- Export service responds within 2 seconds and handles concurrent requests gracefully.

---

## Cross-Feature PRD: Data Aggregation & Caching Pipeline
**Objective:** Efficiently compute Spotify statistics while respecting API rate limits.

**KPIs:** API error rate, cache hit percentage, aggregation latency.

**Functional Requirements**
- Turbo-powered background jobs triggered on demand and via schedule.
- Upstash Redis (or similar) cache with per-stat TTL and invalidation hooks.
- Fallback to on-demand Spotify fetch when cache expired, with optimistic UI updates.
- Error handling with exponential backoff (3 retries) and alerting.

**User Stories**
1. As a user, I want fresh stats without long waits.
2. As an engineer, I want to avoid hitting Spotify rate limits while maintaining accuracy.

**Acceptance Criteria**
- Cache TTL configurable per stat type (default 5 minutes).
- Aggregation jobs log metrics for observability dashboards.

