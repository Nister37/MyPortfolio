<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  /**
   * Smoothed-triangle custom cursor.
   * Tip anchor is at (0,0) of the SVG and matches transform-origin so hover
   * scaling expands away from the tip and never shifts it sideways.
   */

  let cursor: HTMLDivElement;
  let rafId = 0;
  let cleanup: (() => void) | undefined;

  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;

  const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

  // Lower factor = smoother trailing motion. Sub-stepping keeps it framerate-
  // independent enough on 60Hz and 120Hz displays without feeling laggy.
  const SMOOTHING = 0.18;

  function tick() {
    const dx = targetX - x;
    const dy = targetY - y;
    // Snap when within sub-pixel distance to avoid endless tiny easing churn.
    if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
      x = targetX;
      y = targetY;
    } else {
      x += dx * SMOOTHING;
      y += dy * SMOOTHING;
    }
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
  <!-- Halo sits behind the triangle, centered on the tip. Scaling the halo
       (not the triangle) keeps the visible click point exactly stationary —
       the tip never appears to drift when entering interactive elements. -->
  <span class="halo" aria-hidden="true"></span>
  <svg
    width="22"
    height="24"
    viewBox="0 0 22 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    overflow="visible"
  >
    <path
      d="M0 0 L18 11 L9 14 L5 22 Z"
      fill="var(--color-primary, #6366f1)"
      stroke="var(--color-base-100, #fff)"
      stroke-width="1.6"
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
    transition: opacity 0.2s ease;
  }

  .cursor svg {
    display: block;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.25));
    position: relative;
    z-index: 1;
  }

  /* Halo is anchored at the tip (0,0). Centered via negative margins so its
     own center sits on the tip — scaling it never moves anything visibly. */
  .halo {
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    margin: -14px 0 0 -14px;
    border-radius: 9999px;
    background: color-mix(in srgb, var(--color-primary, #6366f1) 32%, transparent);
    opacity: 0;
    transform: scale(0.6);
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
    pointer-events: none;
  }

  .cursor:global(.hover) .halo {
    opacity: 1;
    transform: scale(1);
  }

  .cursor:global(.press) .halo {
    opacity: 1;
    transform: scale(0.8);
    background: color-mix(in srgb, var(--color-primary, #6366f1) 55%, transparent);
  }
</style>

