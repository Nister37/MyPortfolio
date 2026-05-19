# Portfolio

Personal portfolio built with Astro, Svelte, Tailwind CSS, daisyUI, Sass, Bun, GitHub Pages, and Strapi CMS.

## Apps

- `frontend/` — static Astro portfolio
- `cms/` — Strapi CMS and admin panel

## Local development

### Frontend

```bash
cd frontend
bun install
bun run dev
```

### CMS

```bash
cd cms
npm install
npm run develop
```

The Strapi admin panel is available at `http://localhost:1337/admin`.

## Build

```bash
cd frontend
bun run build
bun run preview
```

## Deployment

The frontend is deployed to GitHub Pages via GitHub Actions on every push to `main`.
Strapi runs separately and is not deployed to GitHub Pages.

