# Project T (Next.js + TypeScript + Redux Toolkit + RTK Query + Persist + Tailwind + shadcn/ui + Zod)

A modern Next.js 14 (App Router) starter scaffolded with TypeScript, Tailwind CSS, Redux Toolkit, RTK Query, Redux Persist, shadcn-style UI primitives, and Zod. Includes example Login and Sign-up pages with Zod validation.

## Quick Start

1) Install dependencies
```bash
npm install
```

2) Start the dev server
```bash
npm run dev
```
- App will run at http://localhost:3000
- Entry page: `app/page.tsx` (Login)
- Sign-up page: `app/signup/page.tsx`

3) Build and run production
```bash
npm run build
npm start
```

## Scripts
- `npm run dev` – Start Next.js dev server
- `npm run build` – Build for production
- `npm start` – Start production server on port 3000
- `npm run lint` – Run Next.js/ESLint

## Tech Stack
- Next.js 14 (App Router) – `next`
- React 18 – `react`, `react-dom`
- TypeScript – `typescript`
- Tailwind CSS – `tailwindcss`, `postcss`, `autoprefixer`
- shadcn-style utilities – `class-variance-authority`, `@radix-ui/react-slot`, `tailwind-merge`, `tailwindcss-animate`
- State management – `@reduxjs/toolkit`, `react-redux`
- Data fetching – RTK Query (bundled in `@reduxjs/toolkit`)
- Persistence – `redux-persist`
- Validation – `zod`

## Documentation Links
- Next.js: https://nextjs.org/docs
- App Router: https://nextjs.org/docs/app
- TypeScript in Next: https://nextjs.org/docs/app/building-your-application/configuring/typescript
- Tailwind CSS: https://tailwindcss.com/docs
- Redux Toolkit: https://redux-toolkit.js.org/
- RTK Query: https://redux-toolkit.js.org/rtk-query/overview
- Redux Persist: https://github.com/rt2zz/redux-persist
- shadcn/ui (concepts/components): https://ui.shadcn.com/
- Zod: https://zod.dev

## Project Structure
```
project-root/
├─ app/
│  ├─ layout.tsx            # Root layout, wraps app with ReduxProvider
│  ├─ globals.css           # Tailwind + theme tokens
│  ├─ page.tsx              # Login page (entry)
│  └─ signup/
│     └─ page.tsx           # Sign-up page
├─ components/
│  └─ ui/                   # shadcn-style primitives (button, input, label)
├─ lib/
│  ├─ redux/
│  │  ├─ ReduxProvider.tsx  # Provider + PersistGate
│  │  ├─ store.ts           # Store with Persist + RTK Query middleware
│  │  ├─ hooks.ts           # Typed hooks
│  │  └─ slices/
│  │     └─ counterSlice.ts # Example slice
│  ├─ services/
│  │  └─ baseApi.ts         # RTK Query base API (jsonplaceholder demo)
│  └─ utils.ts              # cn() helper
├─ tailwind.config.ts       # Tailwind + tokens + animate plugin
├─ postcss.config.mjs
├─ next.config.mjs
├─ tsconfig.json
├─ package.json
└─ .gitignore
```

## Styling (Tailwind + shadcn-style)
- Global theme tokens (CSS variables) are defined in `app/globals.css` and mapped in `tailwind.config.ts` (e.g., `bg-background`, `text-foreground`, `primary`, etc.).
- UI primitives under `components/ui/*` use `class-variance-authority`, `@radix-ui/react-slot`, and `tailwind-merge` to create flexible composable components.

## State Management (Redux Toolkit + Persist)
- Store setup in `lib/redux/store.ts` with `redux-persist` and a basic `counterSlice` example.
- Persist storage uses `localStorage` on the client and a no-op storage on the server to avoid SSR errors.
- Add slices to `rootReducer` and to the `whitelist` if they should be persisted.

## Data Fetching (RTK Query)
- `lib/services/baseApi.ts` defines a `baseApi` with `fetchBaseQuery` and a demo `getPosts` endpoint (jsonplaceholder).
- Add new endpoints via `baseApi.injectEndpoints` and use generated hooks (e.g., `useLoginMutation`, `useSignupMutation`).

## Validation (Zod)
- Both `app/page.tsx` (Login) and `app/signup/page.tsx` (Sign-up) showcase Zod schemas with client-side error mapping.
- Replace `alert(...)` with your real auth flow (e.g., RTK Query mutations) when ready.

## Environment Variables
- Create `.env.local` for environment-specific values (not committed by default).
- Example (if you add a custom API):
```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```
- Then use in `fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL })`.

## Troubleshooting
- SWC Binary Errors on macOS arm64 (Apple Silicon):
  - If you see errors like: "Failed to load SWC binary for darwin/arm64"
  - Steps:
    1. Clean install and pin Next to the exact version:
       ```bash
       rm -rf node_modules package-lock.json
       npm cache verify
       npm pkg set dependencies.next=<your-version>
       npm install
       ```
    2. If still failing, rebuild native package:
       ```bash
       npm rebuild @next/swc-darwin-arm64
       ```
    3. Temporary WASM fallback (slower, dev only):
       ```bash
       npm i -D @next/swc-wasm-nodejs
       NEXT_DISABLE_SWC_NATIVE=1 npm run dev
       ```
- Invalid next.config options:
  - We removed `experimental.turbo` as it is not a valid boolean flag in this version. Keep `next.config.mjs` minimal unless you need specific features.

## Conventions & Notes
- This template uses the App Router; components that use React state or hooks must be marked with `"use client"` at the top of the file.
- Keep imports at the top of files and avoid adding imports in the middle of modules.
- Tailwind content paths are set in `tailwind.config.ts` to cover `app/`, `components/`, and `lib/`.

## Next Steps (Ideas)
- Replace alert-based auth with real API calls using RTK Query mutations.
- Add more shadcn/ui components (Card, Dialog, Tabs) or install the official CLI.
- Add testing setup (Vitest/Jest + React Testing Library).
- Configure CI (lint, typecheck, build).
