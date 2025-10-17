# Spotify Stats Product Documentation

This repository hosts the Sonic Insights monorepo, a Next.js application that visualizes Spotify listening analytics using the plan captured in the accompanying documentation.

## Documentation Index
- [Site Structure](docs/site-structure.md): Navigation map and per-page content breakdown.
- [Product Requirement Documents](docs/prds.md): Detailed PRDs for each page and cross-cutting features.
- [Web App PRDs](apps/web/app/docs/prds/page.tsx): Rendered view inside the Next.js app.

## Project Goals
- Deliver a Next.js application (App Router, TypeScript) orchestrated through Turbo.
- Leverage Better Auth with the Spotify provider for authentication.
- Use Turbo for monorepo orchestration and Biome for formatting/linting.
- Provide rich statistics on listening history, library composition, discovery trends, and social sharing.

## Getting Started
1. Install dependencies with `pnpm install` (Turbo orchestrates workspace installs).
2. Populate the following environment variables in `apps/web/.env.local`:
   - `BETTER_AUTH_SECRET`
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `NEXT_PUBLIC_APP_URL`
3. Run the dev server with `pnpm dev` and open `http://localhost:3000`.
4. Visit `/dashboard` after authenticating with Spotify to see personalized statistics. Mock data renders when live data is unavailable.

## Contributing
1. Fork the repository and create a new branch for your changes.
2. Use `pnpm lint` and `pnpm typecheck` to validate updates locally.
3. Update relevant documentation in `docs/` when workflows change.
4. Open a pull request summarizing the adjustments and reference any related tickets or discussions.

## License
MIT
