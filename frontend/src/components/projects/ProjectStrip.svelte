<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import type { Project } from "../../lib/cms/projects";
  import ProjectCard from "./ProjectCard.svelte";
  import "../../styles/components/project-strip.css";

  export let projects: Project[] = [];
  export let projectBase = "/projects/";
  export let lang: "en" | "pl" = "en";

  let track: HTMLElement;
  let canScrollPrevious = false;
  let canScrollNext = false;
  let activePointerId: number | null = null;
  let startX = 0;
  let startY = 0;
  let startScrollLeft = 0;
  let dragging = false;
  let suppressNextClick = false;
  let resizeObserver: ResizeObserver | undefined;
  let updateFrame: number | undefined;
  let wheelFrame: number | undefined;
  let wheelTarget = 0;

  const dragThreshold = 7;

  $: labels =
    lang === "pl"
      ? {
          region: "Karuzela projektów",
          previous: "Poprzednie projekty",
          next: "Następne projekty",
          hint: "Przeciągnij, użyj strzałek lub Shift + kółko, aby zobaczyć więcej",
        }
      : {
          region: "Project carousel",
          previous: "Previous projects",
          next: "Next projects",
          hint: "Drag, use the arrows, or Shift + scroll to explore more",
        };

  function scheduleControlUpdate() {
    if (updateFrame !== undefined) cancelAnimationFrame(updateFrame);
    updateFrame = requestAnimationFrame(updateControls);
  }

  function updateControls() {
    if (!track) return;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    canScrollPrevious = track.scrollLeft > 2;
    canScrollNext = track.scrollLeft < maxScroll - 2;
  }

  function cardStep() {
    const card = track.querySelector<HTMLElement>("[data-project-card]");
    if (!card) return Math.max(280, track.clientWidth * 0.8);
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
    return card.getBoundingClientRect().width + gap;
  }

  function stopWheelScrolling() {
    if (wheelFrame !== undefined) cancelAnimationFrame(wheelFrame);
    wheelFrame = undefined;
    wheelTarget = track.scrollLeft;
    track.classList.remove("is-wheel-scrolling");
  }

  function scroll(direction: -1 | 1) {
    stopWheelScrolling();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollBy({
      left: cardStep() * direction,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.target !== track) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scroll(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scroll(1);
    }
  }

  function handleWheel(event: WheelEvent) {
    if (
      !event.shiftKey ||
      Math.abs(event.deltaY) <= Math.abs(event.deltaX) ||
      track.scrollWidth <= track.clientWidth
    ) {
      return;
    }

    event.preventDefault();
    track.classList.add("is-wheel-scrolling");

    const lineHeight =
      Number.parseFloat(getComputedStyle(track).lineHeight) || 16;
    const deltaInPixels =
      event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? event.deltaY * lineHeight
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? event.deltaY * track.clientWidth
          : event.deltaY;
    const controlledDelta = Math.max(-56, Math.min(56, deltaInPixels * 0.28));
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);

    if (wheelFrame === undefined) wheelTarget = track.scrollLeft;
    wheelTarget = Math.max(
      0,
      Math.min(maxScroll, wheelTarget + controlledDelta),
    );

    if (wheelFrame !== undefined) return;

    const animateWheel = () => {
      const distance = wheelTarget - track.scrollLeft;
      if (Math.abs(distance) < 0.5) {
        track.scrollLeft = wheelTarget;
        wheelFrame = undefined;
        scheduleControlUpdate();
        return;
      }

      track.scrollLeft += distance * 0.2;
      scheduleControlUpdate();
      wheelFrame = requestAnimationFrame(animateWheel);
    };

    wheelFrame = requestAnimationFrame(animateWheel);
  }

  function handlePointerDown(event: PointerEvent) {
    if (event.button !== 0 || activePointerId !== null) return;

    stopWheelScrolling();
    activePointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startScrollLeft = track.scrollLeft;
    dragging = false;
    track.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent) {
    if (event.pointerId !== activePointerId) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (!dragging) {
      if (
        Math.abs(deltaY) > Math.abs(deltaX) &&
        Math.abs(deltaY) > dragThreshold
      ) {
        releasePointer(event.pointerId);
        return;
      }
      if (Math.abs(deltaX) < dragThreshold) return;
      dragging = true;
      track.classList.add("is-dragging");
    }

    event.preventDefault();
    track.scrollLeft = startScrollLeft - deltaX;
  }

  function handlePointerUp(event: PointerEvent) {
    if (event.pointerId !== activePointerId) return;
    if (dragging) suppressNextClick = true;
    releasePointer(event.pointerId);
    scheduleControlUpdate();
  }

  function releasePointer(pointerId: number) {
    if (track?.hasPointerCapture(pointerId)) {
      track.releasePointerCapture(pointerId);
    }
    activePointerId = null;
    dragging = false;
    track?.classList.remove("is-dragging");
  }

  function handleLostPointerCapture(event: PointerEvent) {
    if (event.pointerId !== activePointerId) return;
    activePointerId = null;
    dragging = false;
    track.classList.remove("is-dragging");
  }

  function handleClick(event: MouseEvent) {
    if (!suppressNextClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressNextClick = false;
  }

  onMount(() => {
    resizeObserver = new ResizeObserver(updateControls);
    resizeObserver.observe(track);
    updateControls();
  });

  onDestroy(() => {
    resizeObserver?.disconnect();
    if (updateFrame !== undefined) cancelAnimationFrame(updateFrame);
    if (wheelFrame !== undefined) cancelAnimationFrame(wheelFrame);
    if (activePointerId !== null && track?.hasPointerCapture(activePointerId)) {
      track.releasePointerCapture(activePointerId);
    }
  });
</script>

<div
  class="project-strip industries-strip"
  role="region"
  aria-label={labels.region}
>
  <div class="project-strip__controls">
    <p class="hidden text-xs text-base-content/45 sm:block">{labels.hint}</p>
    <div class="ml-auto flex gap-2">
      <button
        type="button"
        class="btn btn-circle btn-outline btn-sm mobile-touch-target"
        aria-label={labels.previous}
        disabled={!canScrollPrevious}
        on:click={() => scroll(-1)}
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        class="btn btn-circle btn-outline btn-sm mobile-touch-target"
        aria-label={labels.next}
        disabled={!canScrollNext}
        on:click={() => scroll(1)}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  </div>

  <div
    class="project-strip__viewport"
    class:project-strip__viewport--start={canScrollPrevious}
    class:project-strip__viewport--end={canScrollNext}
  >
    <ul
      bind:this={track}
      class="project-strip__track cursor-grab touch-pan-y"
      tabindex="0"
      aria-label={labels.region}
      on:scroll={scheduleControlUpdate}
      on:wheel|nonpassive={handleWheel}
      on:keydown={handleKeydown}
      on:pointerdown={handlePointerDown}
      on:pointermove={handlePointerMove}
      on:pointerup={handlePointerUp}
      on:pointercancel={handlePointerUp}
      on:lostpointercapture={handleLostPointerCapture}
      on:click|capture={handleClick}
    >
      {#each projects as project (project.slug)}
        <li data-project-card>
          <ProjectCard {project} {projectBase} {lang} />
        </li>
      {/each}
    </ul>
  </div>
</div>
