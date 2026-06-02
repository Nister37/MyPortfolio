const GROUP_PROJECT_SLUGS = new Set(["kdgrides", "roometrix"]);

export function isGroupProject(project: { slug: string }) {
  return GROUP_PROJECT_SLUGS.has(project.slug);
}
