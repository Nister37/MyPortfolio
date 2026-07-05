<script lang="ts">
  import { isGroupProject } from "../../lib/project-flags";

  type Project = {
    title: string;
    slug: string;
    categories: string[];
    summary: string;
    stack: string[];
    highlights: string[];
    githubUrl?: string;
    liveUrl?: string;
  };

  export let projects: Project[] = [];
  export let projectBase: string = "/projects/";
  export let lang: string = "en";

  $: caseStudyLabel = lang === "pl" ? "Studium przypadku" : "Case study";
  $: detailsLabel = lang === "pl" ? "Pokaż szczegóły" : "Show details";
  $: hideDetailsLabel = lang === "pl" ? "Ukryj szczegóły" : "Hide details";
  $: groupProjectLabel = lang === "pl" ? "Projekt grupowy" : "Group project";
  $: noProjectsLabel =
    lang === "pl"
      ? "Brak projektów w tej kategorii."
      : "No projects in this category.";

  let selected = "All";

  $: categories = ["All", ...new Set(projects.flatMap((p) => p.categories))];

  $: visibleProjects =
    selected === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(selected));
</script>

<div class="space-y-8">
  <div
    class="flex flex-wrap gap-2"
    role="group"
    aria-label="Filter projects by category"
  >
    {#each categories as category (category)}
      <button
        class="btn btn-sm"
        class:btn-primary={selected === category}
        class:btn-outline={selected !== category}
        on:click={() => (selected = category)}
        aria-pressed={selected === category}
      >
        {category}
      </button>
    {/each}
  </div>

  <div class="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each visibleProjects as project (project.slug)}
      <details
        class="project-card card border border-base-300 bg-base-200 shadow-sm transition duration-200 hover:shadow-lg hover:ring-1 hover:ring-primary/40"
      >
        <summary
          class="cursor-pointer list-none rounded-[inherit] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div class="card-body gap-4">
            <div class="flex flex-wrap gap-2">
              {#each project.categories as cat (cat)}
                <span class="badge badge-outline badge-sm">{cat}</span>
              {/each}
              {#if isGroupProject(project)}
                <span class="badge badge-sm badge-primary"
                  >{groupProjectLabel}</span
                >
              {/if}
            </div>

            <h3 class="card-title text-lg leading-snug">{project.title}</h3>
            <p class="text-sm text-base-content/70">{project.summary}</p>

            <span
              class="inline-flex items-center gap-1 self-start text-xs font-medium text-primary"
            >
              <span class="project-card__show-label">{detailsLabel}</span>
              <span class="project-card__hide-label">{hideDetailsLabel}</span>
              <svg
                class="project-card__chevron h-3.5 w-3.5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m6 9 6 6 6-6"
                ></path>
              </svg>
            </span>
          </div>
        </summary>

        <div class="card-body gap-4 border-t border-base-300 pt-4">
          {#if project.highlights.length > 0}
            <ul class="space-y-1 text-sm text-base-content/60">
              {#each project.highlights as point, index (`${project.slug}-highlight-${index}`)}
                <li class="flex items-start gap-2">
                  <span class="mt-1 text-primary" aria-hidden="true">▸</span>
                  {point}
                </li>
              {/each}
            </ul>
          {/if}

          <div class="flex flex-wrap gap-2 pt-1">
            {#each project.stack as item (item)}
              <span class="badge badge-outline badge-sm">{item}</span>
            {/each}
          </div>

          <div class="card-actions mt-2 flex-wrap gap-2">
            <a
              href={`${projectBase}${project.slug}`}
              class="btn btn-primary btn-sm"
            >
              {caseStudyLabel}
            </a>
            {#if project.githubUrl}
              <a
                href={project.githubUrl}
                class="btn btn-ghost btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            {/if}
            {#if project.liveUrl}
              <a
                href={project.liveUrl}
                class="btn btn-ghost btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {lang === "pl" ? "Wersja live" : "Live demo"}
              </a>
            {/if}
          </div>
        </div>
      </details>
    {/each}
  </div>

  {#if visibleProjects.length === 0}
    <p class="py-12 text-center text-base-content/50">{noProjectsLabel}</p>
  {/if}
</div>

<style>
  .project-card summary::-webkit-details-marker {
    display: none;
  }

  .project-card[open] {
    border-color: color-mix(
      in srgb,
      var(--color-primary, #6366f1) 45%,
      transparent
    );
    box-shadow: 0 14px 32px -22px
      color-mix(in srgb, var(--color-primary, #6366f1) 72%, transparent);
  }

  .project-card__hide-label {
    display: none;
  }

  .project-card[open] .project-card__show-label {
    display: none;
  }

  .project-card[open] .project-card__hide-label {
    display: inline;
  }

  .project-card[open] .project-card__chevron {
    transform: rotate(180deg);
  }
</style>
