# 04 - Content Models and API Integration

## Strapi content types

Create these collection/single types.

## Collection Type: Project

Fields:

| Field | Type | Required | Notes |
|---|---:|---:|---|
| title | Text | Yes | Project display name |
| slug | UID | Yes | Based on title |
| summary | Text | Yes | One short paragraph |
| problem | Rich Text / Blocks | Yes | Problem solved |
| myRole | Rich Text / Blocks | Yes | What you personally did |
| stack | JSON or Component | Yes | Tech names |
| categories | Enumeration / JSON | Yes | Backend, DevOps, AI, Frontend, IoT |
| highlights | JSON or Component | Yes | 3-5 key points |
| architecture | Rich Text / Blocks | No | Short technical explanation |
| hardestProblem | Rich Text / Blocks | No | Good for case study |
| lessonsLearned | Rich Text / Blocks | No | Concrete lessons |
| githubUrl | Text | No | Repository URL |
| liveUrl | Text | No | Demo URL |
| coverImageUrl | Text | No | Use public image path first |
| featured | Boolean | Yes | For homepage |
| order | Number | No | Manual sorting |

## Collection Type: BlogPost

Fields:

| Field | Type | Required | Notes |
|---|---:|---:|---|
| title | Text | Yes | Blog title |
| slug | UID | Yes | Based on title |
| description | Text | Yes | SEO/card summary |
| content | Rich Text / Blocks | Yes | Main content |
| tags | JSON or Component | No | e.g. DevOps, Spring, CI/CD |
| publishedAtCustom | Date | No | Optional visible date |
| coverImageUrl | Text | No | Use public path or external URL |
| readingTime | Number | No | Can be manual first |
| featured | Boolean | No | Blog homepage |

## Collection Type: Skill

Fields:

| Field | Type | Required | Notes |
|---|---:|---:|---|
| name | Text | Yes | Java, Spring Boot, Docker |
| category | Enumeration | Yes | Backend, DevOps, Frontend, AI, Database |
| level | Enumeration | No | Strong, Good, Learning |
| icon | Text | No | Devicon/Iconify key |
| order | Number | No | Sorting |

## Collection Type: Experience

Fields:

| Field | Type | Required | Notes |
|---|---:|---:|---|
| title | Text | Yes | Role/project/education title |
| organization | Text | Yes | KdG, project name, etc. |
| startDate | Date | No | |
| endDate | Date | No | |
| description | Rich Text / Blocks | No | |
| type | Enumeration | Yes | Education, Project, Work, Hackathon |
| order | Number | No | |

## Single Type: SiteSettings

Fields:

| Field | Type | Required | Notes |
|---|---:|---:|---|
| fullName | Text | Yes | |
| headline | Text | Yes | |
| shortBio | Rich Text / Blocks | Yes | |
| email | Email | Yes | |
| githubUrl | Text | Yes | |
| linkedinUrl | Text | No | |
| cvUrl | Text | No | |
| availability | Text | No | e.g. IT internship / junior backend |
| location | Text | No | Antwerp / remote / EU |

## API client

Create `frontend/src/lib/cms/strapi.ts`:

```ts
const STRAPI_URL = import.meta.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = import.meta.env.STRAPI_API_TOKEN;

type FetchOptions = {
  path: string;
  query?: string;
};

export async function fetchFromStrapi<T>({ path, query = "" }: FetchOptions): Promise<T> {
  const url = `${STRAPI_URL}/api/${path}${query}`;

  const response = await fetch(url, {
    headers: STRAPI_API_TOKEN
      ? {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        }
      : {},
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText} for ${url}`);
  }

  return response.json() as Promise<T>;
}
```

Important:

- Use `STRAPI_URL`, not `PUBLIC_STRAPI_URL`, when the value is only needed during build.
- Use `STRAPI_API_TOKEN`, not `PUBLIC_STRAPI_API_TOKEN`.
- Anything with `PUBLIC_` can be exposed to browser code.

## Fetch projects

Create `frontend/src/lib/cms/projects.ts`:

```ts
import { fetchFromStrapi } from "./strapi";
import { fallbackProjects } from "../../data/fallback-projects";

export type Project = {
  title: string;
  slug: string;
  summary: string;
  categories: string[];
  stack: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
};

type StrapiListResponse<T> = {
  data: Array<{
    id: number;
    documentId?: string;
    title: string;
    slug: string;
    summary: string;
    categories?: string[];
    stack?: string[];
    highlights?: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    order?: number;
  }>;
};

export async function getProjects(): Promise<Project[]> {
  try {
    const result = await fetchFromStrapi<StrapiListResponse<Project>>({
      path: "projects",
      query: "?sort=order:asc",
    });

    return result.data.map((item) => ({
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      categories: item.categories ?? [],
      stack: item.stack ?? [],
      highlights: item.highlights ?? [],
      githubUrl: item.githubUrl,
      liveUrl: item.liveUrl,
      featured: item.featured,
      order: item.order,
    }));
  } catch (error) {
    console.warn("Using fallback project data because Strapi failed.", error);
    return fallbackProjects;
  }
}
```

Adjust mapping after you confirm Strapi's exact API response for your content types.

## Fallback data

Create `frontend/src/data/fallback-projects.ts`:

```ts
import type { Project } from "../lib/cms/projects";

export const fallbackProjects: Project[] = [
  {
    title: "Gazetkomania AI Flyer Extraction",
    slug: "gazetkomania-ai-flyer-extraction",
    summary:
      "AI-assisted extraction pipeline for grocery flyer offers with multi-pass validation and structured persistence.",
    categories: ["AI", "Backend", "Automation"],
    stack: ["Java", "Spring Boot", "Gemini", "Docker", "PostgreSQL", "MinIO"],
    highlights: [
      "Multi-pass extraction",
      "Bounding-box based offer clustering",
      "Price sanity checking"
    ],
    featured: true,
    order: 1,
  },
];
```

## Generate static project pages

In `frontend/src/pages/projects/[slug].astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { getProjects } from "../../lib/cms/projects";

export async function getStaticPaths() {
  const projects = await getProjects();

  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
}

const { project } = Astro.props;
---

<BaseLayout title={`${project.title} | Portfolio`} description={project.summary}>
  <main class="mx-auto max-w-5xl px-4 py-16">
    <a class="link link-primary" href="/projects">← Projects</a>

    <section class="mt-8 space-y-6">
      <div class="flex flex-wrap gap-2">
        {project.categories.map((category) => (
          <span class="badge badge-primary">{category}</span>
        ))}
      </div>

      <h1 class="text-4xl font-bold tracking-tight">{project.title}</h1>
      <p class="max-w-3xl text-lg text-base-content/75">{project.summary}</p>

      <div class="flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span class="badge badge-outline">{item}</span>
        ))}
      </div>
    </section>
  </main>
</BaseLayout>
```

## Blog pages

Repeat the same pattern:

```txt
getPosts()
getStaticPaths()
/blog
/blog/[slug]
```

## Build-time CMS rule

Because this is deployed to GitHub Pages:

- Fetch Strapi content at build time.
- Generate static pages.
- Do not require the browser to call Strapi on every visit.

This avoids CORS problems, protects API tokens, and keeps the site fast.
