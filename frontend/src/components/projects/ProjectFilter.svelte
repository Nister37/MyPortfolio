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
      <article class="card relative bg-base-200 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-1 hover:ring-primary/40">
        <!-- Stretched link opens the case study from anywhere on the card.
             GitHub / Live demo buttons restore pointer-events and raise their
             z-index so they keep their own click targets. -->
        <a
          href={`${projectBase}${project.slug}`}
          class="absolute inset-0 z-0 rounded-[inherit] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`${caseStudyLabel}: ${project.title}`}
        ></a>
        <div class="card-body relative z-[1] gap-4 pointer-events-none">
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

          {#if project.githubUrl || project.liveUrl}
            <div class="card-actions pointer-events-auto relative z-10 mt-2 flex-wrap gap-2">
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
          {/if}
        </div>
      </article>
    {/each}
  </div>

  {#if visibleProjects.length === 0}
    <p class="py-12 text-center text-base-content/50">{noProjectsLabel}</p>
  {/if}
</div>





