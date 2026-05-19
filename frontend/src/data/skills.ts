export type SkillLevel = "Strong" | "Good" | "Learning";

export type Skill = {
  name: string;
  icon?: string;
  level: SkillLevel;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

// Static skill data — updated manually, not sourced from Strapi for the MVP.
export const skillCategories: SkillCategory[] = [
  {
    category: "Backend",
    skills: [
      { name: "Java", level: "Strong" },
      { name: "Spring Boot", level: "Strong" },
      { name: "REST API Design", level: "Strong" },
      { name: "JPA / Hibernate", level: "Good" },
      { name: "Python", level: "Good" },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", level: "Strong" },
      { name: "GitLab CI", level: "Strong" },
      { name: "Linux", level: "Good" },
      { name: "Nginx", level: "Good" },
      { name: "Google Cloud", level: "Good" },
      { name: "GitHub Actions", level: "Learning" },
    ],
  },
  {
    category: "AI & Automation",
    skills: [
      { name: "Gemini API", level: "Good" },
      { name: "Data extraction pipelines", level: "Good" },
      { name: "Prompt engineering", level: "Good" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "Astro", level: "Learning" },
      { name: "Svelte", level: "Learning" },
      { name: "TypeScript", level: "Good" },
      { name: "Tailwind CSS", level: "Good" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL", level: "Strong" },
      { name: "SQLite", level: "Good" },
      { name: "Redis", level: "Learning" },
    ],
  },
];

