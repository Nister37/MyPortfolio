# 02 - Frontend Implementation

## Frontend file structure

Use this structure:

```txt
frontend/src/
├── components/
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Section.astro
│   ├── home/
│   │   ├── Hero.astro
│   │   ├── FeaturedProjects.astro
│   │   ├── SkillsOverview.astro
│   │   ├── ExperienceTimeline.astro
│   │   └── ContactCta.astro
│   ├── projects/
│   │   ├── ProjectCard.astro
│   │   └── ProjectFilter.svelte
│   ├── blog/
│   │   └── BlogCard.astro
│   └── ui/
│       ├── Badge.astro
│       └── ExternalLink.astro
├── layouts/
│   ├── BaseLayout.astro
│   ├── ProjectLayout.astro
│   └── BlogLayout.astro
├── pages/
│   ├── index.astro
│   ├── projects/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── about.astro
├── lib/
│   ├── cms/
│   │   ├── strapi.ts
│   │   ├── projects.ts
│   │   └── posts.ts
│   └── site.ts
├── data/
│   ├── fallback-projects.ts
│   ├── fallback-posts.ts
│   └── skills.ts
└── styles/
    ├── global.css
    └── custom.scss
```

## Homepage sections

Use this order:

1. Header
2. Hero
3. Featured projects
4. Engineering strengths
5. Selected case study preview
6. Skills
7. Experience / education
8. Blog preview
9. Contact CTA
10. Footer

## Hero content

Use clear positioning:

```txt
Pawel Ryfiak
Junior Software Engineer focused on backend, automation, and practical DevOps.

I build Spring Boot systems, deployment pipelines, AI-assisted data extraction tools,
and infrastructure scripts. Currently learning Astro, Svelte, Strapi, and modern
frontend workflows by building this portfolio.

Open to: IT internship, junior backend, automation, DevOps-oriented roles
Location: Antwerp / remote / EU
```

Buttons:

```txt
View Projects
Read Blog
Download CV
GitHub
LinkedIn
```

## Project card content

Each card should include:

- Project name
- One-sentence problem
- Stack badges
- 2-3 technical highlights
- Links:
  - Case study
  - GitHub
  - Live demo, if available

Example card data:

```ts
export const featuredProjects = [
  {
    title: "Gazetkomania AI Flyer Extraction",
    slug: "gazetkomania-ai-flyer-extraction",
    category: ["AI", "Backend", "Automation"],
    summary:
      "AI-assisted pipeline for extracting grocery flyer offers from screenshots and storing structured offer data.",
    highlights: [
      "Multi-pass Gemini extraction",
      "Offer clustering by bounding boxes",
      "Price sanity checks and manual correction flow"
    ],
    stack: ["Java", "Spring Boot", "Gemini", "Docker", "PostgreSQL", "MinIO"],
    githubUrl: "",
    liveUrl: ""
  }
];
```

## Project page structure

Each project page should follow this:

```md
# Project name

## Summary

## Problem

## My role

## Tech stack

## Architecture

## Main features

## Hardest technical problem

## Screenshots

## What I learned

## Links
```

Good projects for you:

1. Gazetkomania AI Flyer Extraction
2. Integration 4 CI/CD on Google Cloud
3. ServicePulse Link Monitor
4. Roometrix IoT Air Quality System
5. WalkyBuddy AI Walking Routes, only if you have concrete prototype material

## Svelte interactive islands

Use Svelte for specific components only.

Good candidates:

```txt
ProjectFilter.svelte
ThemeToggle.svelte
CommandPalette.svelte
TechStackTabs.svelte
```

Example: `ProjectFilter.svelte`

```svelte
<script lang="ts">
  type Project = {
    title: string;
    slug: string;
    category: string[];
    summary: string;
    stack: string[];
  };

  export let projects: Project[] = [];

  let selected = "All";

  $: categories = ["All", ...new Set(projects.flatMap((project) => project.category))];

  $: visibleProjects =
    selected === "All"
      ? projects
      : projects.filter((project) => project.category.includes(selected));
</script>

<div class="space-y-6">
  <div class="flex flex-wrap gap-2">
    {#each categories as category}
      <button
        class:selected={selected === category}
        class="btn btn-sm"
        class:btn-primary={selected === category}
        class:btn-outline={selected !== category}
        on:click={() => (selected = category)}
      >
        {category}
      </button>
    {/each}
  </div>

  <div class="grid gap-4 md:grid-cols-2">
    {#each visibleProjects as project}
      <article class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h3 class="card-title">{project.title}</h3>
          <p>{project.summary}</p>
          <div class="flex flex-wrap gap-2">
            {#each project.stack as item}
              <span class="badge badge-outline">{item}</span>
            {/each}
          </div>
          <a class="link link-primary" href={`/projects/${project.slug}`}>Read case study</a>
        </div>
      </article>
    {/each}
  </div>
</div>
```

## Motion usage

Use animations lightly:

- Fade-in for section headings.
- Small card hover movement.
- Command palette open/close.
- Project filter transitions.

Avoid:

- Animating every paragraph.
- Slow scroll-jacking.
- Heavy parallax.
- Random blobs following the mouse.

In Astro/Svelte, you can use:

- Svelte's own transition/motion features.
- Motion's JavaScript API.
- CSS transitions for simple interactions.

Simple CSS-first card hover is often enough:

```astro
<article class="card bg-base-200 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
  ...
</article>
```

## Blog frontend

Pages:

```txt
/blog
/blog/[slug]
```

Blog card fields:

- Title
- Description
- Published date
- Tags
- Reading time
- Link

Recommended blog topics:

```txt
How I deployed a Spring Boot app to Google Compute Engine
Blue-green deployment with Docker Compose explained simply
What I learned from building an AI flyer extraction pipeline
How I debugged Nginx 502 Bad Gateway
Why I use simple architecture before adding complexity
```

## Accessibility checklist

Every page must have:

- One `<h1>`.
- Good heading order.
- Real text, not screenshots of text.
- `alt` text for important images.
- Buttons for actions, links for navigation.
- Visible focus state.
- Good contrast.
- No animation required to understand content.

## Performance checklist

Before final deploy:

```bash
bun run build
bun run preview
```

Check:

- Homepage loads fast.
- Images are compressed.
- No unused huge JS libraries.
- Svelte islands are used only where needed.
- Blog/project pages are pre-rendered.
