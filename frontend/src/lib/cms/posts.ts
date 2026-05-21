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
  language?: "en" | "pl";
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
  language?: "en" | "pl";
};

type StrapiListResponse = {
  data: StrapiPostItem[];
};

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const result = await fetchFromStrapi<StrapiListResponse>({
      path: "blog-posts",
      query: "?fields=*&sort=publishedAtCustom:desc",
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
      language: item.language ?? "en",
    }));
  } catch (error) {
    console.warn("Strapi unavailable — using fallback blog post data.", error);
    return fallbackPosts;
  }
}

export async function getPostsByLanguage(lang: "en" | "pl"): Promise<BlogPost[]> {
  const posts = await getPosts();
  return posts.filter((post) => (post.language ?? "en") === lang);
}

