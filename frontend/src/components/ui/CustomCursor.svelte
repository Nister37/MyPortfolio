<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  /**
   * Smooth arrow-shaped custom cursor.
   * Anchor point is the tip (top-left of the SVG).
   * Hover on interactive elements scales it up slightly; pressing scales it down.
   */

  let cursor: HTMLDivElement;
  let rafId = 0;
  let cleanup: (() => void) | undefined;

  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;

  const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

  function tick() {
    // Slight easing so movement feels fluid but the tip still lands where the
    // user expects on click — kept fast (0.35) to stay precise.
    x += (targetX - x) * 0.35;
    y += (targetY - y) * 0.35;
    if (cursor) cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    rafId = requestAnimationFrame(tick);
  }

  onMount(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (touch || reduced) return;

    let firstMove = true;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (firstMove) {
        x = targetX;
        y = targetY;
        cursor.style.opacity = "1";
        firstMove = false;
      }
    };

    const onOver = (e: PointerEvent) => {
      if ((e.target as HTMLElement | null)?.closest(INTERACTIVE)) {
        cursor.classList.add("hover");
      }
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as HTMLElement | null)?.closest(INTERACTIVE)) {
        cursor.classList.remove("hover");
      }
    };
    const onDown = () => cursor.classList.add("press");
    const onUp = () => cursor.classList.remove("press");
    const onLeave = () => (cursor.style.opacity = "0");
    const onEnter = () => (cursor.style.opacity = "1");

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    rafId = requestAnimationFrame(tick);

    cleanup = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
    cleanup?.();
  });
</script>

<div bind:this={cursor} class="cursor" aria-hidden="true">
  <!-- Smooth arrow: filled with primary, thin contrasting outline so it stays
       visible on both dark and light backgrounds. Anchor at (0,0) = the tip. -->
  <svg
    width="22"
    height="28"
    viewBox="0 0 22 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 2 L2 22 L7.5 17.5 L11 25.5 L14 24 L10.5 16 L18 16 Z"
      fill="var(--color-primary, #6366f1)"
      stroke="var(--color-base-100, #fff)"
      stroke-width="1.4"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
</div>

<style>
  .cursor {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    will-change: transform, opacity;
    transition:
      opacity 0.2s ease,
      scale 0.18s ease;
    /* Use scale instead of width/height so the tip stays at (0,0). */
    transform-origin: 2px 2px;
  }

  .cursor svg {
    display: block;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.25));
  }

  .cursor:global(.hover) {
    scale: 1.25;
  }

  .cursor:global(.press) {
    scale: 0.85;
  }
</style>

