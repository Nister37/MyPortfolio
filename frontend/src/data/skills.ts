export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Skill = {
  name: string;
  months: number;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

export function getSkillLevel(months: number): SkillLevel {
  if (months < 6) return 1;
  if (months < 12) return 2;
  if (months < 24) return 3;
  if (months < 36) return 4;
  return 5;
}

// Static skill data — updated manually, not sourced from Strapi for the MVP.
// Durations are stored in months and rendered against the UI legend.
export const skillCategories: SkillCategory[] = [
  {
    category: "Backend",
    skills: [
      { name: "Java", months: 24 },
      { name: "Spring Boot", months: 9 },
      { name: "REST API", months: 9 },
      { name: "JPA", months: 9 },
      { name: "JDBC", months: 18 },
      { name: "Gradle", months: 9 },
      { name: "Maven", months: 12 },
      { name: "Strapi", months: 1 },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", months: 5 },
      { name: "Kubernetes", months: 1 },
      { name: "Caddy", months: 1 },
      { name: "Linux", months: 36 },
      { name: "GitLab/GitHub CI", months: 3 },
      { name: "Google Cloud", months: 6 },
      { name: "Proxmox", months: 3 },
      { name: "Railway", months: 1 },
    ],
  },
  {
    category: "AI & Automation",
    skills: [
      { name: "Python", months: 48 },
      { name: "Gemini API", months: 24 },
      { name: "Prompt engineering", months: 36 },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML", months: 48 },
      { name: "CSS", months: 48 },
      { name: "JavaScript", months: 36 },
      { name: "TypeScript", months: 6 },
      { name: "Astro", months: 1 },
      { name: "Svelte", months: 1 },
      { name: "Vue", months: 6 },
      { name: "React", months: 3 },
      { name: "Bootstrap", months: 12 },
      { name: "jQuery", months: 12 },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "SQL", months: 48 },
      { name: "PostgreSQL", months: 24 },
      { name: "MySQL", months: 24 },
      { name: "H2", months: 9 },
      { name: "MongoDB", months: 1 },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "C++", months: 24 },
      { name: "C#", months: 24 },
    ],
  },
];

