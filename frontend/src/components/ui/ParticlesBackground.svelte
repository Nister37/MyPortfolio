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

  // Theme-aware colors. Keeps decent contrast on both dark and light backgrounds.
  function buildConfig(theme: "dark" | "light") {
    const particleColors =
      theme === "light"
        ? ["#6366f1", "#8b5cf6", "#06b6d4", "#0ea5e9", "#10b981"]
        : ["#a5b4fc", "#c4b5fd", "#67e8f9", "#7dd3fc", "#6ee7b7"];

    const linkColor = theme === "light" ? "#94a3b8" : "#64748b";

    return {
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 60, density: { enable: true, area: 900 } },
        color: { value: particleColors },
        shape: { type: "circle" },
        opacity: { value: 0.55 },
        size: { value: { min: 1, max: 3 } },
        links: {
          enable: true,
          distance: 140,
          color: linkColor,
          opacity: 0.35,
          width: 1,
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
          grab: { distance: 160, links: { opacity: 0.6 } },
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

