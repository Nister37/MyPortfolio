export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

// Keep quantitative time claims out of the public UI. Levels reflect relative
// confidence and demonstrated project use, from familiarity (1) to strongest
// working skills (5).

export const skillCategories: SkillCategory[] = [
  {
    category: "Backend",
    skills: [
      { name: "Java", level: 5 },
      { name: "Spring Boot", level: 5 },
      { name: "REST API", level: 5 },
      { name: "JPA", level: 4 },
      { name: "JDBC", level: 3 },
      { name: "Maven", level: 4 },
      { name: "Gradle", level: 4 },
      { name: "OpenAPI", level: 3 },
      { name: "C#", level: 2 },
      { name: "C++", level: 2 },
      { name: "NestJS", level: 2 },
      { name: "Django", level: 1 },
      { name: "Strapi", level: 2 },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Linux", level: 5 },
      { name: "Docker", level: 5 },
      { name: "GitLab/GitHub CI", level: 5 },
      { name: "Google Cloud", level: 4 },
      { name: "Proxmox", level: 4 },
      { name: "Caddy", level: 3 },
      { name: "Railway", level: 4 },
      { name: "Kubernetes", level: 2 },
      { name: "Jenkins", level: 3 },
    ],
  },
  {
    category: "AI & Automation",
    skills: [
      { name: "Python", level: 5 },
      { name: "Automation scripting", level: 4 },
      { name: "Gemini API", level: 4 },
      { name: "Prompt engineering", level: 4 },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML", level: 4 },
      { name: "CSS", level: 4 },
      { name: "JavaScript", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "Bootstrap", level: 3 },
      { name: "Astro", level: 3 },
      { name: "Svelte", level: 3 },
      { name: "React", level: 2 },
      { name: "Vue", level: 2 },
      { name: "Angular", level: 1 },
      { name: "Cypress", level: 2 },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "SQL", level: 5 },
      { name: "PostgreSQL", level: 5 },
      { name: "MySQL", level: 4 },
      { name: "H2", level: 3 },
      { name: "MongoDB", level: 2 },
    ],
  },
  {
    category: "Business",
    skills: [
      { name: "BPMN", level: 3 },
      { name: "SIPOC", level: 2 },
      { name: "5 Whys", level: 3 },
      { name: "RACI", level: 2 },
      { name: "TRIZ", level: 1 },
    ],
  },
];
