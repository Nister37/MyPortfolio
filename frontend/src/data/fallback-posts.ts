import type { BlogPost } from "../lib/cms/posts";

export const fallbackPosts: BlogPost[] = [
  {
    title: "How I deployed a Spring Boot app to Google Compute Engine",
    slug: "spring-boot-google-compute-engine-deployment",
    description:
      "A step-by-step walkthrough of using GitLab CI and Docker to ship a Java application onto a fresh GCE instance.",
    tags: ["DevOps", "Spring Boot", "Google Cloud", "Docker"],
    featured: true,
    readingTime: 8,
  },
  {
    title: "What I learned from building an AI flyer extraction pipeline",
    slug: "ai-flyer-extraction-lessons",
    description:
      "Lessons from building a multi-pass Gemini extraction system: confidence scoring, clustering, and when AI is not enough.",
    tags: ["AI", "Java", "Automation"],
    featured: false,
    readingTime: 6,
  },
  {
    title: "Why I use simple architecture before adding complexity",
    slug: "simple-architecture-first",
    description:
      "A reflection on overengineering traps and how starting simple makes systems easier to reason about, debug, and hand off.",
    tags: ["Architecture", "Backend"],
    featured: false,
    readingTime: 5,
  },
];

