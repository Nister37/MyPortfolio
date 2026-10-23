import { fetchFromStrapi } from "./strapi";
import { fallbackProjects } from "../../data/fallback-projects";
import { strapiBlocksToHtml } from "./strapi-blocks-to-html";

export type Project = {
  title: string;
  slug: string;
  summary: string;
  categories: string[];
  stack: string[];
  highlights: string[];
  tags?: string[];
  readingTime?: number;
  problem?: string;
  myRole?: string;
  architecture?: string;
  hardestProblem?: string;
  lessonsLearned?: string;
  githubUrl?: string;
  liveUrl?: string;
  coverImageUrl?: string;
  featured?: boolean;
  order?: number;
};

type StrapiProjectItem = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  summary: string;
  categories?: string[];
  stack?: string[];
  highlights?: string[];
  tags?: string[];
  readingTime?: number;
  problem?: unknown;
  myRole?: unknown;
  architecture?: unknown;
  hardestProblem?: unknown;
  lessonsLearned?: unknown;
  githubUrl?: string;
  liveUrl?: string;
  coverImageUrl?: string;
  featured?: boolean;
  order?: number;
};

type StrapiListResponse = {
  data: StrapiProjectItem[];
};

export async function getProjects(): Promise<Project[]> {
  try {
    const result = await fetchFromStrapi<StrapiListResponse>({
      path: "projects",
      query: "?sort=order:asc&status=published",
    });

    // Use fallback when Strapi returns no projects — avoids showing an empty
    // page while the CMS is seeded or reset between environments.
    if (result.data.length === 0) {
      console.warn(
        "Strapi returned no projects — using fallback project data.",
      );
      return fallbackProjects;
    }

    return result.data.map((item) => ({
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      categories: item.categories ?? [],
      stack: item.stack ?? [],
      highlights: item.highlights ?? [],
      tags: item.tags,
      readingTime: item.readingTime,
      problem: strapiBlocksToHtml(item.problem),
      myRole: strapiBlocksToHtml(item.myRole),
      architecture: strapiBlocksToHtml(item.architecture),
      hardestProblem: strapiBlocksToHtml(item.hardestProblem),
      lessonsLearned: strapiBlocksToHtml(item.lessonsLearned),
      githubUrl: item.githubUrl,
      liveUrl: item.liveUrl,
      coverImageUrl: item.coverImageUrl,
      featured: item.featured,
      order: item.order,
    }));
  } catch (error) {
    console.warn("Strapi unavailable — using fallback project data.", error);
    return fallbackProjects;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((project) => project.featured);
}
