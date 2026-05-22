ARCHITECTURE
============

High-level overview

- Frontend: A Vite + React + TypeScript single-page app located in `src/`. Routing is implemented with TanStack Router. UI components live in `src/components` and `src/components/ui`.
- Backend/Server: `server.ts` contains server-side functions used during SSR or for light API endpoints. The app can also call out to external services such as MongoDB Data API for server-side user data.
- Real-time chat: An independent Node script `chat-socket-server.mjs` implements a Socket.IO based chat server. The client connects using `src/lib/chat-socket.ts`.
- Authentication & Data: Firebase is used for client-side auth and Firestore. Server-side token lookups and optional fallbacks use `FIREBASE_WEB_API_KEY` or `VITE_FIREBASE_API_KEY`.

Directory notes
- `src/routes/` — Route components (pages) used by the router.
- `src/components/` — Reusable UI components and composite views.
- `src/lib/` — App libraries for auth, API calls, socket helpers, and utilities.
- `backend/prisma/` — Prisma schema and backend helpers (present for optional backend work).

Env & secrets
- Client: `VITE_*` variables (visible in the browser)
- Server: `MONGODB_DATA_API_*`, `FIREBASE_WEB_API_KEY`, other secrets should never be committed.

Deployment
- The default build output is `docs/` (configured in `vite.config.ts`). You can deploy the built static site to GitHub Pages, Netlify, Cloudflare Pages, or serve the build from a worker.
