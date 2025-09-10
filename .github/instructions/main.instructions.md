---
applyTo: '**/*'
---
# Copilot AI Coding Agent Instructions

## Overview
- Bun + Vite-based desktop simulation with per-app windows, themes, and embedded apps.
- Entry point: `src/App.tsx`; window instances managed by `src/apps/base/AppManager.tsx` and state in `src/stores/useAppStore.ts`.

## Core Concepts
- App registry (`src/config/appRegistry.ts`): defines `BaseApp` entries and `windowConfig`.
- Launching apps: use `useLaunchApp()` (`src/hooks/useLaunchApp.ts`) or dispatch `new CustomEvent("launchApp", { detail: { appId, initialData } })`.
- Window framing: wrap app UIs in `WindowFrame` (`src/components/layout/WindowFrame.tsx`) for drag/resize/stack support.

## Themes
- Defined under `src/themes/*`; active theme managed by `src/stores/useThemeStore.ts`.
- Built-in themes: `macosx`, `system7`, `win98`, `xp`.

## Key Patterns & Integrations
- Embed-like apps (IE, Embed, Videos): use sandboxed `<iframe>` + `initialData.url` and reactive updates; see `src/apps/internet-explorer` and `src/apps/embed`.
- Media handling: hooks in `src/hooks`—e.g., `useSound`, `useAudioRecorder`, `useSoundboard`.
- URL routing: `AppManager` parses `window.location.pathname` for share codes (`/internet-explorer/:code`, `/videos/:id`).
- State persistence: Zustand `persist` in `useAppStore` and `useThemeStore` ensures window and theme state across reloads.

## Developer Workflow
```bash
bun install                   # install dependencies
PORT=5173 bun run dev         # frontend dev server
bun run dev:api               # backend API server
bun run dev:all               # both concurrently
bunx tsc -b                   # typechecking
bun run build                 # production build
```
- Static assets: `public/`; manifest generation via `scripts/generate-*-manifest.ts`.

## Conventions
- Languages: TypeScript + React.
- Apps in `src/apps`; shared UI in `src/components`; hooks in `src/hooks`; stores in `src/stores`.
- API routes in top-level `api/`.
- Config and IDs under `src/config`.

## Scaffolding New Apps
1. Create `src/apps/yourApp/`:
   - `index.tsx` exporting `BaseApp<TInitialData>`.
   - `components/YourAppComponent.tsx` using `WindowFrame` and accepting `AppProps`.
2. Register in `src/config/appRegistry.ts` & `src/config/appIds.ts`.
3. (Optional) Pin in Dock: add to `src/components/layout/Dock.tsx`.
4. Launch via `useLaunchApp("yourApp", { initialData })` or CustomEvent.

---
*Feedback? Let me know any gaps or unclear patterns to refine!*
