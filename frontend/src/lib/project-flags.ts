const GROUP_PROJECT_SLUGS = new Set(["kdgrides", "roometrix"]);
const PERSONAL_PROJECT_SLUGS = new Set(["packplay", "servicepulse"]);

export function isGroupProject(project: { slug: string }) {
  return GROUP_PROJECT_SLUGS.has(project.slug);
}

export type ProjectStatus = "team" | "personal" | "academic";

export function getProjectStatus(project: { slug: string }): ProjectStatus {
  if (GROUP_PROJECT_SLUGS.has(project.slug)) return "team";
  if (PERSONAL_PROJECT_SLUGS.has(project.slug)) return "personal";
  return "academic";
}
