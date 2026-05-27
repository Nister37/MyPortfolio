import { fetchFromStrapi } from "./strapi";
import { fallbackProjects } from "../../data/fallback-projects";

export type Project = {
  title: string;
  slug: string;
  summary: string;
  categories: string[];
  stack: string[];
  highlights: string[];
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

type StrapiListResponse = {
  data: StrapiProjectItem[];
};

export async function getProjects(): Promise<Project[]> {
  try {
    const result = await fetchFromStrapi<StrapiListResponse>({
      path: "projects",
      query: "?sort=order:asc",
    });

    // Use fallback when Strapi returns no projects — avoids showing an empty
    // page while the CMS is seeded or reset between environments.
    if (result.data.length === 0) {
      console.warn("Strapi returned no projects — using fallback project data.");
      return fallbackProjects;
    }

    return result.data.map((item) => ({
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      categories: item.categories ?? [],
      stack: item.stack ?? [],
      highlights: item.highlights ?? [],
      problem: item.problem,
      myRole: item.myRole,
      architecture: item.architecture,
      hardestProblem: item.hardestProblem,
      lessonsLearned: item.lessonsLearned,
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




