import { fetchFromStrapi } from "./strapi";
import { fallbackPosts } from "../../data/fallback-posts";

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  content?: string;
  tags?: string[];
  publishedAt?: string;
  coverImageUrl?: string;
  readingTime?: number;
  featured?: boolean;
};

type StrapiPostItem = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  tags?: string[];
  publishedAtCustom?: string;
  publishedAt?: string;
  coverImageUrl?: string;
  readingTime?: number;
  featured?: boolean;
};

type StrapiListResponse = {
  data: StrapiPostItem[];
};

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const result = await fetchFromStrapi<StrapiListResponse>({
      path: "blog-posts",
      query: "?sort=publishedAtCustom:desc",
    });

    return result.data.map((item) => ({
      title: item.title,
      slug: item.slug,
      description: item.description,
      content: item.content,
      tags: item.tags ?? [],
      publishedAt: item.publishedAtCustom ?? item.publishedAt,
      coverImageUrl: item.coverImageUrl,
      readingTime: item.readingTime,
      featured: item.featured,
    }));
  } catch (error) {
    console.warn("Strapi unavailable — using fallback blog post data.", error);
    return fallbackPosts;
  }
}

