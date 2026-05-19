# Portfolio

Personal portfolio built with Astro, Svelte, Tailwind CSS, daisyUI, Sass, Bun, GitHub Pages, and Strapi CMS.

## Architecture

```
GitHub Pages (static frontend)
  ↑
GitHub Actions: bun run build → Astro fetches Strapi content → deploys dist/

Strapi CMS (separate service)
  ↑
localhost:1337/admin  (local dev)
```

## Apps

- `frontend/` — static Astro portfolio site
- `cms/` — Strapi CMS and admin panel

---

## Local development

### Prerequisites

- [Bun](https://bun.sh) — frontend package manager
- Node.js LTS — required by Strapi
- Git

### Start the frontend

```bash
cd frontend
bun install
bun run dev
```

Astro dev server: `http://localhost:4321`

If Strapi is not running, the frontend uses static fallback data from `src/data/`.

### Start the CMS

```bash
cd cms
npm install
npm run develop
```

Strapi admin panel: `http://localhost:1337/admin`

Create an admin user on first run.

### Environment variables

Copy the example file before running locally:

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env` to point at your Strapi instance if needed:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-optional-token
```

---

## Build and preview

```bash
cd frontend
bun run build      # generates dist/
bun run preview    # serve dist/ locally
```

The build fetches content from the URL in `STRAPI_URL`. If Strapi is unreachable, fallback data is used and the build still succeeds.

---

## Deployment

The frontend is deployed automatically to GitHub Pages on every push to `main`.

Workflow: `.github/workflows/deploy.yml`

**Required GitHub repository settings:**

- Settings → Pages → Build and deployment → Source: **GitHub Actions**

**Secrets (only needed for hosted Strapi):**

- `STRAPI_URL` — full URL of your hosted Strapi instance
- `STRAPI_API_TOKEN` — read-only API token from Strapi admin

---

## Content management

1. Start Strapi locally (`npm run develop` in `cms/`).
2. Open `http://localhost:1337/admin`.
3. Create or edit content in Projects, Blog Posts, Skills, or Experience.
4. Publish the entries.
5. Run `bun run build` in `frontend/` to pull the content.
6. Push to `main` — GitHub Actions deploys the updated static site.

---

## Project structure

```
frontend/src/
├── components/
│   ├── layout/      Header, Footer, Section
│   ├── home/        Hero, FeaturedProjects, SkillsOverview, ExperienceTimeline, BlogPreview, ContactCta
│   ├── projects/    ProjectCard, ProjectFilter (Svelte)
│   ├── blog/        BlogCard
│   └── ui/          shared small components
├── layouts/         BaseLayout
├── pages/           index, about, projects/[slug], blog/[slug]
├── lib/cms/         strapi.ts, projects.ts, posts.ts
├── data/            fallback-projects.ts, fallback-posts.ts, skills.ts
└── styles/          global.css (Tailwind + daisyUI), custom.scss
```
