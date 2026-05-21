<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { tsParticles, type Container } from "@tsparticles/engine";
  import { loadSlim } from "@tsparticles/slim";

  /**
   * Animated particle background that re-themes when `<html data-theme>` changes.
   * Skips rendering for users who prefer reduced motion.
   */

  export let id: string = "particles-bg";

  let container: Container | undefined;
  let themeObserver: MutationObserver | undefined;
  let initialised = false;

  // Theme-aware colors. Light mode needs deeper saturation, stronger opacity,
  // and a darker link color — pastel particles on a near-white background
  // washed out entirely in earlier passes.
  function buildConfig(theme: "dark" | "light") {
    const particleColors =
      theme === "light"
        ? ["#4338ca", "#7c3aed", "#0891b2", "#0284c7", "#059669"]
        : ["#a5b4fc", "#c4b5fd", "#67e8f9", "#7dd3fc", "#6ee7b7"];

    const linkColor = theme === "light" ? "#475569" : "#64748b";
    const particleOpacity = theme === "light" ? 0.85 : 0.55;
    const linkOpacity = theme === "light" ? 0.55 : 0.35;
    const linkWidth = theme === "light" ? 1.2 : 1;

    return {
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 60, density: { enable: true, area: 900 } },
        color: { value: particleColors },
        shape: { type: "circle" },
        opacity: { value: particleOpacity },
        size: { value: { min: 1.2, max: 3.2 } },
        links: {
          enable: true,
          distance: 140,
          color: linkColor,
          opacity: linkOpacity,
          width: linkWidth,
        },
        move: {
          enable: true,
          speed: 1.1,
          direction: "none" as const,
          outModes: { default: "bounce" as const },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: false },
        },
        modes: {
          grab: { distance: 160, links: { opacity: theme === "light" ? 0.8 : 0.6 } },
        },
      },
    };
  }

  function currentTheme(): "dark" | "light" {
    const attr = document.documentElement.getAttribute("data-theme");
    return attr === "portfolio-light" ? "light" : "dark";
  }

  async function reloadParticles() {
    const theme = currentTheme();
    await container?.destroy();
    container = await tsParticles.load({ id, options: buildConfig(theme) });
  }

  onMount(async () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    await loadSlim(tsParticles);
    initialised = true;
    await reloadParticles();

    // Re-init on theme toggle so colors stay readable.
    themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
          reloadParticles();
        }
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true });
  });

  onDestroy(() => {
    themeObserver?.disconnect();
    container?.destroy();
  });
</script>

<div {id} class="particles-bg" aria-hidden="true"></div>

<style>
  .particles-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
  /* tsparticles injects a canvas — make sure it inherits container sizing */
  .particles-bg :global(canvas) {
    width: 100% !important;
    height: 100% !important;
  }
</style>


