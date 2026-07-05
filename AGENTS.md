# AGENTS.md

Bilingual (EN/PL) personal portfolio — static Astro frontend on GitHub Pages, headless Strapi v5 CMS on Railway.

## Architecture in one paragraph

The site is **fully static**. At build time, Astro fetches all content from the Strapi REST API (`src/lib/cms/`) and generates HTML. If Strapi is unreachable, every fetcher silently returns data from `src/data/fallback-*.ts` — the build never fails. Visitors receive pre-rendered HTML; there is no client-side CMS fetching. Svelte 5 is used only for interactive islands (filter, particles, cursor, theme toggle); they receive data as props from Astro and do not fetch anything themselves.

## Repository layout

```
frontend/   Astro 6 + Svelte 5 static site (bun)
cms/        Strapi v5 headless CMS (npm)
.github/workflows/deploy.yml  4-job CI: type-check → build → deploy → Lighthouse
```

## Developer commands

```bash
# Frontend (from frontend/)
bun install
bun run dev        # http://localhost:4321
bun run build      # production build to dist/
bun run check      # astro check — TypeScript type checking (runs in CI)
bun run preview    # serve dist/ locally

# CMS (from cms/)
npm install
npm run develop    # http://localhost:1337/admin  (hot-reload, SQLite)
npm run build      # production admin panel build
npm run start      # production start (used by Railway)
```

## Key conventions

### URL construction
Always import `base` from `src/lib/url.ts` for internal links — never hardcode a path prefix.
```ts
import { base } from "../../lib/url";
const href = `${base}projects/${slug}`;
```

### CMS data layer pattern (`src/lib/cms/`)
Each fetcher file exports typed domain objects, not raw Strapi shapes. The Strapi response type (`StrapiProjectItem`) is private to the file; only the clean domain type (`Project`) crosses the boundary. Every `getPosts()` / `getProjects()` call wraps `fetchFromStrapi` in try/catch and returns the matching fallback array on any error.

### Bilingual i18n
- EN is the default locale (no URL prefix); Polish lives under `/pl/`.
- Polish pages in `src/pages/pl/` mirror EN pages and pass `lang="pl"` down to all components.
- Components that need translated strings accept a `lang: "en" | "pl"` prop and resolve labels inline (no external i18n library). See `src/pages/projects/[slug].astro` for the `labels` pattern.

### Svelte islands
Interactive components use `client:load`. They accept serializable props from Astro; they do not call `fetchFromStrapi` directly. Pass `projectBase` (from `base`) when the component builds URLs.

### XSS — CMS HTML
Any field rendered with `set:html` **must** be sanitized with `isomorphic-dompurify` before use. Unsanitized raw HTML from Strapi must never reach `set:html`.

### Styling
Tailwind CSS v4 + daisyUI 5. Use daisyUI semantic classes (`btn`, `card`, `badge`, `base-content`, etc.). Theme names are `portfolio-dark` and `portfolio-light`; stored in `localStorage` under key `portfolio-theme`. Scroll-reveal animations: add `data-reveal` attribute — the observer in `BaseLayout.astro` handles the rest.

## Environment variables

```bash
# frontend/.env  (build-time only, never PUBLIC_*)
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=          # optional locally; required in CI via GitHub secret
```

CMS secrets (`APP_KEYS`, `ADMIN_JWT_SECRET`, etc.) live in `cms/.env`; Railway injects `DATABASE_URL` automatically in production.

## Adding a new content type

1. Define the content type in Strapi admin or `cms/src/api/<name>/`.
2. Add a domain type and `StrapiXxxItem` type in a new file under `frontend/src/lib/cms/`.
3. Wrap `fetchFromStrapi` with fallback, export clean domain functions.
4. Add a matching fallback array in `frontend/src/data/fallback-<name>.ts`.
5. If bilingual, add a `language` field and a `getXxxByLanguage(lang)` helper (see `posts.ts`).

## CI pipeline

`.github/workflows/deploy.yml` runs four sequential jobs on `master` push:
1. **check** — `bun run check` + `bun audit --audit-level=high`
2. **build** — `withastro/action` (builds with `STRAPI_URL` + `STRAPI_API_TOKEN` secrets)
3. **deploy** — `actions/deploy-pages` (master only, skipped on PRs)
4. **lighthouse** — thresholds in `.github/lighthouse-budget.json`

All Actions are pinned to commit SHAs, not mutable version tags. Do not change `cancel-in-progress: false` on the master concurrency group — it prevents a racing push from aborting a live deploy.

## Key files

| File | Purpose |
|---|---|
| `frontend/src/lib/url.ts` | Single source of truth for base URL |
| `frontend/src/lib/cms/strapi.ts` | Low-level fetch with Bearer auth |
| `frontend/src/lib/cms/posts.ts` | Blog post fetcher + fallback |
| `frontend/src/lib/cms/projects.ts` | Project fetcher + fallback |
| `frontend/src/data/fallback-*.ts` | Static fallback content |
| `frontend/src/layouts/BaseLayout.astro` | HTML shell, theme init, scroll-reveal, SEO |
| `cms/config/middlewares.ts` | CORS allowed origins |
| `cms/config/database.ts` | SQLite locally, PostgreSQL via `DATABASE_URL` |

