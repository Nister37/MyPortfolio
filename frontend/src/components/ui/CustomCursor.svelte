<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  /**
   * Smoothed-triangle custom cursor.
   * Tip anchor is at (0,0) of the SVG and matches transform-origin so hover
   * scaling expands away from the tip and never shifts it sideways.
   */

  let cursor: HTMLDivElement;
  let rafId = 0;
  let hoverSyncRaf = 0;
  let cleanup: (() => void) | undefined;

  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let hasPointer = false;
  let isEmbedHovered = false;

  const INTERACTIVE =
    "a, button, [role='button'], input, textarea, select, label, summary, details, .skill-card, .project-card, .project-strip-card, .project-strip-card__fallback, .timeline-card, .certificate-card, .certificate-preview button, .certificate-preview a";
  const NATIVE_CURSOR =
    "select, option, iframe, embed, .certificate-preview__frame, .certificate-preview__viewport";

  // Lower factor = smoother trailing motion. Sub-stepping keeps it framerate-
  // independent enough on 60Hz and 120Hz displays without feeling laggy.
  const SMOOTHING = 0.18;

  function syncHoverState() {
    hoverSyncRaf = 0;
    if (!cursor) return;
    if (!hasPointer || isEmbedHovered) {
      cursor.classList.remove("hover");
      if (isEmbedHovered) cursor.classList.add("native");
      return;
    }

    const elementAtPointer = document.elementFromPoint(
      targetX,
      targetY,
    ) as HTMLElement | null;
    const usesNativeCursor = Boolean(elementAtPointer?.closest(NATIVE_CURSOR));
    cursor.classList.toggle("native", usesNativeCursor);
    cursor.classList.toggle(
      "hover",
      !usesNativeCursor && Boolean(elementAtPointer?.closest(INTERACTIVE)),
    );
  }

  function queueHoverSync() {
    if (hoverSyncRaf) return;
    hoverSyncRaf = requestAnimationFrame(syncHoverState);
  }

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
    const isTouchOnly =
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(pointer: fine)").matches;
    if (isTouchOnly) {
      if (typeof window !== "undefined") {
        window.__portfolioCursorReady = true;
        window.dispatchEvent(new CustomEvent("portfolio-cursor-ready"));
      }
      return;
    }

    let firstMove = true;

    const isEmbedElement = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          "iframe, embed, .certificate-preview__frame, .certificate-preview__viewport",
        ),
      );
    };

    const hideCursor = () => {
      isEmbedHovered = true;
      cursor?.classList.add("native");
    };

    const showCursor = () => {
      isEmbedHovered = false;
      cursor?.classList.remove("native");
      if (hasPointer && cursor) {
        cursor.style.opacity = "1";
      }
      queueHoverSync();
    };

    const onMove = (e: PointerEvent) => {
      hasPointer = true;
      targetX = e.clientX;
      targetY = e.clientY;
      if (firstMove) {
        x = targetX;
        y = targetY;
        firstMove = false;
        if (cursor) {
          cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        document.documentElement.classList.add("has-custom-cursor");
      }

      if (isEmbedElement(e.target)) {
        hideCursor();
      } else if (isEmbedHovered) {
        showCursor();
      } else {
        cursor.style.opacity = "1";
      }
      queueHoverSync();
    };

    const onPointerOver = (e: PointerEvent) => {
      if (isEmbedElement(e.target)) {
        hideCursor();
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      if (
        isEmbedHovered &&
        e.relatedTarget instanceof Element &&
        !isEmbedElement(e.relatedTarget)
      ) {
        showCursor();
      }
    };

    const onViewportShift = () => {
      cursor.classList.remove("hover");
      queueHoverSync();
    };
    const onDown = () => cursor.classList.add("press");
    const onUp = () => cursor.classList.remove("press");
    const onLeave = () => {
      hasPointer = false;
      cursor.style.opacity = "0";
      cursor.classList.remove("hover", "press", "native");
    };
    const onEnter = () => {
      if (hasPointer && !isEmbedHovered) cursor.style.opacity = "1";
      queueHoverSync();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("portfolio-hide-cursor", hideCursor);
    window.addEventListener("portfolio-show-cursor", showCursor);
    window.addEventListener("scroll", onViewportShift, { passive: true });
    window.addEventListener("resize", onViewportShift);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    rafId = requestAnimationFrame(tick);

    if (typeof window !== "undefined") {
      window.__portfolioCursorReady = true;
      window.dispatchEvent(new CustomEvent("portfolio-cursor-ready"));
    }

    cleanup = () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("portfolio-hide-cursor", hideCursor);
      window.removeEventListener("portfolio-show-cursor", showCursor);
      window.removeEventListener("scroll", onViewportShift);
      window.removeEventListener("resize", onViewportShift);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
    if (hoverSyncRaf) cancelAnimationFrame(hoverSyncRaf);
    cleanup?.();
  });
</script>

<div bind:this={cursor} class="cursor" aria-hidden="true">
  <svg
    width="22"
    height="24"
    viewBox="0 0 22 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    overflow="visible"
  >
    <path
      class="cursor-path"
      d="M0 0 L18 11 L9 14 L5 22 Z"
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
    z-index: 2147483647 !important;
    opacity: 0;
    will-change: transform, opacity;
    transition: opacity 0.2s ease;
  }

  .cursor svg {
    display: block;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.25));
    transition: filter 0.18s ease;
  }

  /* Default: primary fill, base-100 outline. */
  .cursor :global(.cursor-path) {
    fill: var(--color-primary, #6366f1);
    stroke: var(--color-base-100, #fff);
    transition:
      fill 0.18s ease,
      stroke 0.18s ease;
  }

  /* Hover/press feedback changes color + glow only — no shape, size, or
     position change, so the tip stays pixel-stable on interactive elements. */
  .cursor:global(.hover) svg {
    filter: drop-shadow(
        0 0 6px
          color-mix(in srgb, var(--color-primary, #6366f1) 70%, transparent)
      )
      drop-shadow(0 1px 2px rgb(0 0 0 / 0.25));
  }
  .cursor:global(.hover) :global(.cursor-path) {
    fill: var(--color-base-100, #fff);
    stroke: var(--color-primary, #6366f1);
  }

  .cursor:global(.press) :global(.cursor-path) {
    fill: color-mix(in srgb, var(--color-primary, #6366f1) 75%, #000);
    stroke: var(--color-base-100, #fff);
  }

  .cursor:global(.native) {
    opacity: 0 !important;
  }
</style>
