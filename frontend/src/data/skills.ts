export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

// Static skill data — updated manually, not sourced from Strapi for the MVP.
// Levels represent experience duration; keep them aligned with the UI legend.
export const skillCategories: SkillCategory[] = [
  {
    category: "Backend",
    skills: [
      { name: "Java", level: 5 },
      { name: "Spring Boot", level: 4 },
      { name: "REST API Design", level: 4 },
      { name: "JPA / Hibernate", level: 3 },
      { name: "Python", level: 3 },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", level: 4 },
      { name: "GitLab CI", level: 4 },
      { name: "Linux", level: 3 },
      { name: "Nginx", level: 3 },
      { name: "Google Cloud", level: 3 },
      { name: "GitHub Actions", level: 3 },
    ],
  },
  {
    category: "AI & Automation",
    skills: [
      { name: "Gemini API", level: 3 },
      { name: "Data extraction pipelines", level: 3 },
      { name: "Prompt engineering", level: 3 },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "Astro", level: 1 },
      { name: "Svelte", level: 1 },
      { name: "TypeScript", level: 3 },
      { name: "Tailwind CSS", level: 3 },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL", level: 4 },
      { name: "SQLite", level: 3 },
      { name: "Redis", level: 1 },
    ],
  },
];

