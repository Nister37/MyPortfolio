<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  /**
   * Custom cursor: a small dot that tracks the mouse exactly, plus a larger ring
   * that lags behind for a fluid feel. Expands on interactive elements.
   *
   * Disabled on touch devices and when prefers-reduced-motion is set.
   */

  let dot: HTMLDivElement;
  let ring: HTMLDivElement;
  let enabled = false;
  let rafId = 0;
  let cleanup: (() => void) | undefined;

  // Target coords (real cursor) and animated ring coords (eased toward target).
  let targetX = 0;
  let targetY = 0;
  let ringX = 0;
  let ringY = 0;

  // CSS selector for elements that should make the ring grow.
  const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, label, summary";

  function animate() {
    // Ease ring toward target — lerp factor 0.18 feels responsive without being twitchy.
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
    rafId = requestAnimationFrame(animate);
  }

  onMount(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    enabled = true;
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        ring.classList.add("is-hovering");
      }
    };

    const onOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        ring.classList.remove("is-hovering");
      }
    };

    const onDown = () => ring.classList.add("is-pressing");
    const onUp = () => ring.classList.remove("is-pressing");

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    rafId = requestAnimationFrame(animate);

    cleanup = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
    cleanup?.();
  });
</script>

{#if true}
  <div bind:this={dot} class="cursor-dot" aria-hidden="true" class:enabled></div>
  <div bind:this={ring} class="cursor-ring" aria-hidden="true" class:enabled></div>
{/if}

<style>
  .cursor-dot,
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    will-change: transform, opacity;
  }
  .cursor-dot.enabled,
  .cursor-ring.enabled {
    opacity: 1;
  }

  .cursor-dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: var(--color-primary, #6366f1);
    transition: opacity 0.2s ease;
  }

  .cursor-ring {
    width: 32px;
    height: 32px;
    border-radius: 9999px;
    border: 1.5px solid var(--color-primary, #6366f1);
    transition:
      width 0.2s ease,
      height 0.2s ease,
      border-color 0.2s ease,
      background-color 0.2s ease,
      opacity 0.2s ease;
    mix-blend-mode: difference;
  }

  /* Light theme tweak: difference blend can look harsh on pure light backgrounds. */
  :global([data-theme="portfolio-light"]) .cursor-ring {
    mix-blend-mode: normal;
    border-color: rgba(99, 102, 241, 0.6);
  }

  .cursor-ring:global(.is-hovering) {
    width: 52px;
    height: 52px;
    background-color: color-mix(in srgb, var(--color-primary, #6366f1) 12%, transparent);
  }

  .cursor-ring:global(.is-pressing) {
    width: 22px;
    height: 22px;
    background-color: color-mix(in srgb, var(--color-primary, #6366f1) 25%, transparent);
  }
</style>

