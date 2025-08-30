This file provides concise, repo-specific guidance for an AI coding agent to be immediately productive.

High-level summary
- Framework: Vite + React + TypeScript. Project uses Bun as the package manager (see `package.json`.`packageManager`).
- Runtime: client-heavy single-page app with serverless edge/api endpoints under `api/` (many endpoints implemented as .ts/.js files).
- State: Zustand stores live in `src/stores/` and are consumed via `use*Store.ts` hooks.

Essential developer workflows
- Install: `bun install` (project expects Bun; `package.json` scripts assume `$PORT` env var).
- Dev: set PORT then run the dev script. Common: `PORT=5173 bun dev` (same as `PORT=5173 bun run dev`).
- Build: `bun run build` (runs `tsc -b && vite build`).
- Lint: `bun run lint`.
- Troubleshooting: esbuild binary/host mismatch is a known issue — `devDependencies` pins `esbuild` to `0.25.9`. If you see "Host version X does not match binary Y", reinstall matching esbuild and rerun `bun install`.

Architecture & important locations
- Client apps: `src/apps/*` — each app is self-contained with `components/`, `hooks/`, and an `index.(ts|tsx)` entry (e.g. `src/apps/ipod/index.tsx`).
- Shared UI: `src/components/` (dialogs, layout, shared UI elements).
- Global context & wiring: `src/contexts/AppContext.tsx`, `src/main.tsx` (app bootstrap, theme and context providers).
- Stores & state: `src/stores/` contains low-level helpers and `use*Store.ts` hooks (Zustand). Example: `src/stores/useAppStore.ts` controls app/window management.
- Lib & infra: `src/lib/` has helpers such as `pusherClient.ts`, `audioContext.ts`, and WebGL filter runner.
- Server/API: `api/*.ts` (edge/serverless functions) — chat, transcription, speech, link-preview, etc. These are integration points for AI services and real-time messaging.
- Static assets & data: `public/` (fonts, assets, wallpapers, patterns, data/*.json). The virtual filesystem and default data live under `public/data/`.

Patterns & conventions the agent must follow
- App structure: Add new feature code inside the relevant `src/apps/<app>/` directory. Prefer `components/` + `hooks/` + `utils/` subfolders.
- State updates: Use the existing `use*Store` hooks and the `stores/helpers.ts` helpers rather than introducing a new global store unless required.
- API usage: Client-side AI calls usually go through `api/` endpoints. Check `src/lib/pusherClient.ts` and `api/chat.ts` before adding direct external API calls.
- Types: Project uses TypeScript aggressively — update `src/types/` when adding cross-app data shapes and import those types into app code.
- Build artifacts: TypeScript build is driven by `tsc -b` (composite builds) — keep tsconfig project references intact when adding packages.

Quick examples (where to look)
- Start here: `package.json` (scripts + deps), `README.md` (dev notes), `vite.config.ts`.
- Real-time chat: `src/lib/pusherClient.ts`, `api/chat.ts`, `src/apps/chats/`.
- State shape example: `src/stores/useAppStore.ts` and `src/stores/helpers.ts`.
- AI integrations: check `api/ie-generate.ts`, `api/translate-lyrics.ts`, and `src/utils/aiPrompts.ts` for prompt templates and service usage.

Safety & edges
- No tests in the repo by default — be conservative with large refactors. Prefer safe, incremental changes and small feature branches.
- Follow existing UI patterns (shadcn, Radix primitives) — avoid introducing new UI libraries unless necessary.

When you open a PR
- Describe: files changed, why state/store changes were necessary, and what API endpoints (if any) were added/modified.
- Include manual smoke steps: how to reproduce the feature in the running dev server (exact route or UI steps).

If anything here is unclear or you'd like the agent to include additional examples (e.g., a short list of top components to inspect first), say so and I will iterate.
