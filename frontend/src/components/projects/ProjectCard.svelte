<script lang="ts">
  import Code2 from "lucide-svelte/icons/code-2";
  import ExternalLink from "lucide-svelte/icons/external-link";
  import { getProjectStatus } from "../../lib/project-flags";
  import type { Project } from "../../lib/cms/projects";

  export let project: Project;
  export let projectBase = "/projects/";
  export let lang: "en" | "pl" = "en";

  $: caseStudyLabel = lang === "pl" ? "Studium przypadku" : "Case study";
  $: liveDemoLabel = lang === "pl" ? "Wersja live" : "Live demo";
  $: status = getProjectStatus(project);
  $: statusLabel = {
    en: {
      team: "Team project",
      personal: "Personal project",
      academic: "Academic project",
    },
    pl: {
      team: "Projekt zespołowy",
      personal: "Projekt własny",
      academic: "Projekt akademicki",
    },
  }[lang][status];
</script>

<article class="project-strip-card">
  <div class="project-strip-card__media">
    {#if project.coverImageUrl}
      <img src={project.coverImageUrl} alt="" loading="lazy" decoding="async" />
    {:else}
      <div class="project-strip-card__fallback" aria-hidden="true">
        <Code2 size={32} strokeWidth={1.5} />
        <span>{project.categories[0] ?? "Software"}</span>
      </div>
    {/if}
  </div>

  <div class="project-strip-card__body">
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
      <span class="font-medium text-primary">
        {project.categories[0] ?? "Software"}
      </span>
      <span class="text-base-content/25" aria-hidden="true">•</span>
      <span class="text-base-content/55">{statusLabel}</span>
    </div>

    <h3 class="mt-3 text-xl font-semibold leading-snug">{project.title}</h3>
    <p
      class="project-strip-card__summary mt-3 text-sm leading-relaxed text-base-content/68"
    >
      {project.summary}
    </p>

    <ul
      class="mt-5 flex flex-wrap gap-2"
      aria-label={lang === "pl" ? "Technologie" : "Technologies"}
    >
      {#each project.stack.slice(0, 4) as item (item)}
        <li class="badge badge-outline badge-sm">{item}</li>
      {/each}
    </ul>

    <div
      class="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-base-300 pt-5"
    >
      <a
        href={projectBase + project.slug}
        class="project-strip-card__link"
        data-umami-event="project-case-study"
        data-umami-event-project={project.slug}
      >
        {caseStudyLabel}
        <ExternalLink size={15} aria-hidden="true" />
      </a>

      {#if project.githubUrl}
        <a
          href={project.githubUrl}
          class="project-strip-card__link"
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="github-click"
          data-umami-event-project={project.slug}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          GitHub
        </a>
      {/if}

      {#if project.liveUrl}
        <a
          href={project.liveUrl}
          class="project-strip-card__link"
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="project-live-demo"
          data-umami-event-project={project.slug}
        >
          {liveDemoLabel}
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      {/if}
    </div>
  </div>
</article>
