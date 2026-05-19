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

