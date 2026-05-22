# SmartCampus

SmartCampus is a lightweight marketplace and campus community web app with real-time chat, listings, and profile features. It uses a modern React + Vite + TypeScript stack with Firebase for auth/firestore, optional MongoDB Data API for server-side data, and a small Socket.IO chat server for peer messaging.

Features
- Marketplace listings and product pages
- User profiles and public profile sync
- Real-time chat (Socket.IO) and AI-assisted chat routes
- Authentication with Firebase (Google + email)

Documentation
- Development guide: [DEVELOPMENT.md](DEVELOPMENT.md)
- Architecture summary: [ARCHITECTURE.md](ARCHITECTURE.md)
- Contribution guidelines: [CONTRIBUTING.md](CONTRIBUTING.md)

Quick start

Prerequisites
- Node.js 18+ and a package manager (`npm`, `yarn`, or `pnpm`).

Install

```bash
# install dependencies
npm install
```

Environment
- Copy `.env.example` to `.env` and fill required keys before running in production. The project reads client-side variables prefixed with `VITE_` and server-side keys like `MONGODB_DATA_API_*` and `FIREBASE_WEB_API_KEY` where applicable. See [DEVELOPMENT.md](DEVELOPMENT.md) for details.

Development

```bash
# Start the Vite dev server
npm run dev

# (Optional) Start the independent chat socket server (used for some chat features)
npm run chat:server
```

Build & preview

```bash
npm run build
npm run preview
```

Useful scripts
- `npm run dev` — Run Vite development server
- `npm run build` — Build production assets (output: `docs/` by default)
- `npm run build:dev` — Build using development mode
- `npm run preview` — Preview the built site locally
- `npm run chat:server` — Run the standalone Socket.IO chat server (`chat-socket-server.mjs`)
- `npm run test` — Run unit tests (`vitest`)
- `npm run lint` — Run `eslint`
- `npm run typecheck` — Run TypeScript `tsc` type checks
- `npm run format` — Run `prettier` to format files

Testing

Unit and component tests are powered by `vitest` and `@testing-library/react`. Run `npm run test` to execute the test suite.

Where to look in the codebase
- Frontend entry: `src/` (routes, components, hooks, lib)
- Server entry for SSR/API: `server.ts`
- Independent chat server: `chat-socket-server.mjs`
- Cloud / build config: `vite.config.ts`, `wrangler.jsonc` (if deploying to Cloudflare)

Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines, branch strategy, and testing expectations.

License
This repository does not include a license file. If you plan to publish this project, add a `LICENSE` file to indicate how it may be used.

