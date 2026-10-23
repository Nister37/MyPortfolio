<script lang="ts">
  import type { Project } from "../../lib/cms/projects";
  import ProjectStrip from "./ProjectStrip.svelte";

  export let projects: Project[] = [];
  export let projectBase = "/projects/";
  export let lang: "en" | "pl" = "en";

  const allValue = "__all";
  let selected = allValue;

  $: labels =
    lang === "pl"
      ? {
          all: "Wszystkie",
          filters: "Filtruj projekty według kategorii",
          empty: "Brak projektów w tej kategorii.",
        }
      : {
          all: "All projects",
          filters: "Filter projects by category",
          empty: "No projects in this category.",
        };

  $: categories = [
    ...new Set(projects.flatMap((project) => project.categories)),
  ];
  $: visibleProjects =
    selected === allValue
      ? projects
      : projects.filter((project) => project.categories.includes(selected));
</script>

<div class="space-y-6">
  <div class="flex flex-wrap gap-2" role="group" aria-label={labels.filters}>
    <button
      type="button"
      class="btn btn-sm mobile-touch-target"
      class:btn-primary={selected === allValue}
      class:btn-outline={selected !== allValue}
      on:click={() => (selected = allValue)}
      aria-pressed={selected === allValue}
    >
      {labels.all}
    </button>

    {#each categories as category (category)}
      <button
        type="button"
        class="btn btn-sm mobile-touch-target"
        class:btn-primary={selected === category}
        class:btn-outline={selected !== category}
        on:click={() => (selected = category)}
        aria-pressed={selected === category}
      >
        {category}
      </button>
    {/each}
  </div>

  {#if visibleProjects.length > 0}
    {#key selected}
      <ProjectStrip projects={visibleProjects} {projectBase} {lang} />
    {/key}
  {:else}
    <p class="py-12 text-center text-base-content/50">{labels.empty}</p>
  {/if}
</div>
