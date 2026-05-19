# 00 - Architecture Decisions

## Target

Build a modern portfolio website that shows:

- Fast learning.
- Backend and DevOps maturity.
- Ability to work with CMS/API-based architecture.
- Good frontend taste without overengineering.
- Real projects, not only visual effects.

## Final architecture

```txt
portfolio repository
├── frontend: Astro static site
└── cms: Strapi headless CMS

GitHub Actions:
1. Checkout repository.
2. Install frontend dependencies with Bun.
3. Build Astro.
4. During build, fetch blog/project/skill data from Strapi.
5. Deploy generated `dist/` to GitHub Pages.

Strapi:
- Runs separately.
- Provides admin panel at `/admin`.
- Provides content API.
- Stores data in SQLite locally or PostgreSQL in production.
```

## Why Astro

Use Astro because the portfolio is mostly content:

- Homepage sections.
- Project pages.
- Blog posts.
- Static pages.
- Small interactive islands.

Astro is a better fit than a full SPA because it ships less JavaScript by default.

## Why Svelte

Use Svelte only for interactive islands:

- Project filter.
- Theme switcher.
- Command palette.
- Animated skill cards.
- Blog search/filter.

Do not rewrite the whole site as a Svelte app. That would remove one of Astro's strongest advantages.

## Why Tailwind + daisyUI + Sass

Use them with clear boundaries:

| Tool | Responsibility |
|---|---|
| Tailwind CSS | Layout, spacing, responsive design, utility classes |
| daisyUI | Buttons, cards, badges, navbar, drawer, timeline, modal |
| Sass/SCSS | Design tokens, small custom styling, blog prose styling, reusable non-utility CSS |
| Astro scoped styles | Component-specific CSS when Tailwind is not clean enough |

Avoid mixing everything everywhere.

Bad:

```astro
<div class="card my-custom-sass-class another-global-class p-5">
```

Better:

```astro
<article class="card bg-base-200 shadow-sm">
  <div class="card-body gap-4">
    ...
  </div>
</article>
```

Use Sass only when Tailwind/daisyUI becomes unreadable.

## Why Strapi

Use Strapi because it gives you:

- Admin panel.
- Content-type builder.
- API.
- Media library.
- Role/permission system.
- Real CMS experience for your portfolio.

This shows more than just static Markdown. It demonstrates API consumption, content modeling, deployment thinking, and admin workflows.

## Why GitHub Pages

Use GitHub Pages for the frontend because:

- It is free.
- It is enough for a static site.
- It gives you public deployment from GitHub Actions.
- It is easy for recruiters to open.

Do not try to run Strapi on GitHub Pages. It will not work.

## CMS hosting options

### Option A: Local Strapi only

Best for MVP.

```txt
Run Strapi locally -> add blog/project content -> build Astro -> deploy generated static site.
```

Pros:

- Simple.
- Free.
- No backend hosting.
- Good enough for first portfolio version.

Cons:

- Admin panel is not online.
- Updating blog requires local Strapi + rebuild.

### Option B: Hosted Strapi

Best after MVP.

```txt
Hosted Strapi -> GitHub Actions fetches content -> GitHub Pages deploys static site.
```

Pros:

- Admin panel online.
- More realistic production setup.
- Good portfolio story.

Cons:

- Requires hosting provider.
- Free tiers may sleep or have limits.
- Media storage must be planned.

### Option C: Hybrid fallback

Best practical setup.

```txt
Strapi is primary CMS.
Local JSON/MDX fallback exists for build safety.
```

If Strapi is down, the build can still use backup content. This is more work, so do it after the MVP.

## Main design direction

Use an engineering portfolio style:

- Clean dark/light theme.
- Technical cards.
- Architecture diagrams.
- Real screenshots.
- Short case studies.
- Measurable project outcomes.
- Few animations.

Avoid:

- Too many gradients.
- Fake skill percentages.
- 3D gimmicks.
- Generic "passionate developer" copy.
- Huge icons without project proof.

## Suggested public message

Your website should communicate this:

> I build backend systems, automation tools, and deployable web applications. I am strongest around Java/Spring, Docker, CI/CD, infrastructure debugging, and AI-assisted automation. I am now expanding my frontend stack with Astro, Svelte, Tailwind, and Strapi.
