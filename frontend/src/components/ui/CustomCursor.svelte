<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  /**
   * Single-element custom cursor: a soft ring that follows the mouse with easing.
   * Grows on interactive elements, shrinks on press.
   *
   * The native cursor is hidden via global CSS in BaseLayout (CSS-only, no flash).
   */

  let ring: HTMLDivElement;
  let rafId = 0;
  let cleanup: (() => void) | undefined;

  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;

  const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

  function tick() {
    x += (targetX - x) * 0.22;
    y += (targetY - y) * 0.22;
    if (ring) ring.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
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
        ring.style.opacity = "1";
        firstMove = false;
      }
    };

    const onOver = (e: PointerEvent) => {
      if ((e.target as HTMLElement | null)?.closest(INTERACTIVE)) {
        ring.classList.add("hover");
      }
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as HTMLElement | null)?.closest(INTERACTIVE)) {
        ring.classList.remove("hover");
      }
    };
    const onDown = () => ring.classList.add("press");
    const onUp = () => ring.classList.remove("press");
    const onLeave = () => (ring.style.opacity = "0");
    const onEnter = () => (ring.style.opacity = "1");

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

<div bind:this={ring} class="cursor" aria-hidden="true"></div>

<style>
  .cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-radius: 9999px;
    border: 1.5px solid var(--color-primary, #6366f1);
    background: color-mix(in srgb, var(--color-primary, #6366f1) 10%, transparent);
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    will-change: transform, opacity, width, height;
    transition:
      width 0.18s ease,
      height 0.18s ease,
      background-color 0.18s ease,
      opacity 0.2s ease;
  }

  .cursor:global(.hover) {
    width: 44px;
    height: 44px;
    background: color-mix(in srgb, var(--color-primary, #6366f1) 18%, transparent);
  }

  .cursor:global(.press) {
    width: 18px;
    height: 18px;
    background: color-mix(in srgb, var(--color-primary, #6366f1) 35%, transparent);
  }
</style>

