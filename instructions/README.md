# Portfolio Website Instruction Pack

Date: 2026-05-19

## Chosen stack

Frontend:

- Astro
- Svelte
- TypeScript
- Tailwind CSS v4
- Sass/SCSS
- daisyUI
- Bun
- GitHub Pages
- Motion
- Lucide
- Devicon
- unDraw

CMS:

- Strapi
- Strapi admin panel
- Strapi API consumed by Astro at build time

## Important architecture decision

GitHub Pages can host only the static portfolio output. It cannot run Strapi.

So the correct architecture is:

```txt
Browser
  |
  v
GitHub Pages
  |
  v
Static Astro site: HTML/CSS/JS generated during build

Build-time only:
GitHub Actions -> Astro build -> fetch content from Strapi API -> deploy static files

Separate service:
Strapi CMS + admin panel + database
```

This gives you:

- Fast static portfolio.
- Admin panel for blog/project editing.
- No backend needed on GitHub Pages.
- Safe content publishing flow.
- Portfolio still works even if Strapi sleeps later, because GitHub Pages serves the last deployed static build.

## Recommended project shape

Use a monorepo:

```txt
portfolio/
├── frontend/              # Astro + Svelte + Tailwind + daisyUI
├── cms/                   # Strapi CMS and admin panel
├── docs/                  # optional project documentation
├── .github/workflows/     # GitHub Pages deployment
└── README.md
```

## MVP goal

First version should include:

- Homepage
- About section
- Featured projects
- Project case study pages
- Skills grouped by category
- Blog list
- Blog detail pages
- Contact section
- CV download link
- Strapi-powered blog/project content
- GitHub Pages deployment
- Basic accessibility/performance checks

Do not start with:

- Authentication in the portfolio frontend
- Comments system
- Newsletter
- Complex search
- Analytics dashboard
- Multi-language support
- Custom backend
- 3D portfolio effects

## Main warning

Using Strapi means you now have two deployable things:

1. Static Astro frontend on GitHub Pages.
2. Strapi backend somewhere else.

For a free/beginner-friendly version:

- Start with Strapi locally.
- Build Astro from local Strapi.
- Deploy static result to GitHub Pages.
- Later deploy Strapi to Render, Railway, Strapi Cloud, VPS, or another backend host.

If you want the admin panel available online all the time, GitHub Pages is not enough.
