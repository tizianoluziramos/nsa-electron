# AGENTS.md

## Project

Single-page Vite 8 + React 19 app in TypeScript, routed with `react-router-dom`. Use React APIs: `createRoot` from `react-dom/client` and hooks from `react`.

## Commands

Package manager is pnpm (`pnpm-lock.yaml`); do not add an npm or yarn lockfile.

- `pnpm dev` — Vite dev server with React Fast Refresh
- `pnpm build` — `tsc -b && vite build`; run this as the full verification step
- `pnpm preview` — serve the built `dist/`
- `pnpm exec tsc -b` — types only; it does not catch unresolved Vite asset/CSS imports
- No test, lint, or format tooling is configured; the only scripts are `dev`, `build`, and `preview`.

## Entrypoints

- `index.html` mounts at `#app` (not `#root`) and loads `/src/main.tsx`
- `src/main.tsx` renders `<App />` and imports `src/index.css`
- `src/App.tsx` wraps `AuthProvider` around the `react-router-dom` route table: `/` -> `HomePage`, `/login` -> `LoginPage`
- `src/context/AuthContext.tsx` exposes `AuthProvider`, `AuthContext`, and `useAuth`; authentication only (`POST ${VITE_API_URL}/auth/login` with `{ username, password }`), persists only `token` in `localStorage`, no user/role payload
- `src/pages/LoginPage.tsx` renders `src/components/BackgroundImageComponent.tsx`, styled by `src/styles/components/BackgroundImageComponent.module.css`
- Component styles live in `src/styles/` as CSS Modules
- `VITE_API_URL` is read through `src/constants/env.ts`; set it in `.env` (see `.env.example`)
- `vite.config.ts` registers `@vitejs/plugin-react`

## TypeScript constraints

`tsconfig.app.json` enables `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, and `erasableSyntaxOnly`. Unused variables fail the build, type-only imports must use `import type`, and enums, namespaces, and parameter properties are rejected. JSX uses `jsx: "react-jsx"`.
