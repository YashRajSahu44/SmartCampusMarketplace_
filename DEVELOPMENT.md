DEVELOPMENT
===========

Local development guide

1. Install dependencies

```bash
npm install
```

2. Copy environment example

```bash
cp .env.example .env
# on Windows PowerShell:
# copy .env.example .env
```

Fill the `.env` file with real values (Firebase web config, OpenRouter key if used, MongoDB Data API settings). The project includes an `.env.example` with the common keys the app reads.

3. Run the app

```bash
npm run dev
# optional: run the standalone chat socket server
npm run chat:server
```

Build & preview

```bash
npm run build
npm run preview
```

Scripts
- `dev`: `vite dev`
- `build`: `vite build`
- `build:dev`: `vite build --mode development`
- `preview`: `vite preview`
- `chat:server`: `node chat-socket-server.mjs`
- `test`: `vitest run --environment jsdom`
- `lint`: `eslint .`
- `typecheck`: `tsc -p tsconfig.json --noEmit`
- `format`: `prettier --write .`

Notes
- Client environment variables must use the `VITE_` prefix to be exposed to the browser.
- The repo can be deployed to static hosts (output in `docs/`) or to Cloudflare Workers using `wrangler.jsonc` — see `vite.config.ts` for the build `outDir`.
