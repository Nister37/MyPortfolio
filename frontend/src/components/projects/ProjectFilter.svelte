<script lang="ts">
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

  $: caseStudyLabel = lang === "pl" ? "Szczegóły" : "Case study";
  $: noProjectsLabel =
    lang === "pl" ? "Brak projektów w tej kategorii." : "No projects in this category.";

  let selected = "All";

  $: categories = ["All", ...new Set(projects.flatMap((p) => p.categories))];

  $: visibleProjects =
    selected === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(selected));
</script>

<div class="space-y-8">
  <!-- Filter buttons -->
  <div class="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
    {#each categories as category}
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

  <!-- Project grid -->
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each visibleProjects as project (project.slug)}
      <article class="card bg-base-200 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div class="card-body gap-4">
          <div class="flex flex-wrap gap-2">
            {#each project.categories as cat}
              <span class="badge badge-primary badge-sm">{cat}</span>
            {/each}
          </div>

          <h3 class="card-title text-lg leading-snug">{project.title}</h3>
          <p class="text-sm text-base-content/70">{project.summary}</p>

          {#if project.highlights.length > 0}
            <ul class="space-y-1 text-sm text-base-content/60">
              {#each project.highlights as point}
                <li class="flex items-start gap-2">
                  <span class="mt-1 text-primary" aria-hidden="true">▸</span>
                  {point}
                </li>
              {/each}
            </ul>
          {/if}

          <div class="flex flex-wrap gap-2 pt-1">
            {#each project.stack as item}
              <span class="badge badge-outline badge-sm">{item}</span>
            {/each}
          </div>

          <div class="card-actions mt-2 flex-wrap gap-2">
            <a href={`${projectBase}${project.slug}`} class="btn btn-primary btn-sm">
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
                Live demo
              </a>
            {/if}
          </div>
        </div>
      </article>
    {/each}
  </div>

  {#if visibleProjects.length === 0}
    <p class="py-12 text-center text-base-content/50">{noProjectsLabel}</p>
  {/if}
</div>




