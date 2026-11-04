<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    Shader,
    FlowingGradient,
    BarShift,
    GridDistortion,
    BlueNoise,
    isWebGPUSupported,
  } from "shaders/svelte";

  /**
   * Offsets background shader.
   * WebGPU-powered animated flowing gradient with bar shift,
   * cursor-driven grid distortion, and soft noise overlay.
   *
   * Dark mode: Kept exactly as configured.
   * Light mode: Deepened palette & opacity so it's noticeably darker, calm, and glare-free.
   * Strictly avoids pure black (#000000) and pure white (#ffffff).
   */

  export let id: string = "offsets-bg";

  let theme: "dark" | "light" = "dark";
  let themeObserver: MutationObserver | undefined;
  let supportsWebGPU = false;
  let mounted = false;

  function readTheme(): "dark" | "light" {
    if (typeof document === "undefined") return "dark";
    const attr = document.documentElement.getAttribute("data-theme");
    return attr === "portfolio-light" ? "light" : "dark";
  }

  let safetyTimer: number | undefined;

  function signalReady() {
    if (safetyTimer !== undefined) {
      window.clearTimeout(safetyTimer);
      safetyTimer = undefined;
    }
    if (typeof window !== "undefined") {
      window.__portfolioShaderReady = true;
      window.__portfolioReady = true;
      window.dispatchEvent(new CustomEvent("portfolio-ready"));
    }
  }

  function handleShaderReady() {
    signalReady();
  }

  function handleUnavailable() {
    supportsWebGPU = false;
    signalReady();
  }

  onMount(() => {
    supportsWebGPU = isWebGPUSupported();
    theme = readTheme();
    mounted = true;

    // Signal that the canvas is mounted and painted to screen compositor
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        signalReady();
      });
    });

    themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          theme = readTheme();
        }
      }
    });

    themeObserver.observe(document.documentElement, { attributes: true });
  });

  onDestroy(() => {
    if (safetyTimer !== undefined) {
      window.clearTimeout(safetyTimer);
    }
    themeObserver?.disconnect();
  });

  $: palette =
    theme === "dark"
      ? {
          // Dark mode kept exactly as is:
          colorA: "#0a1324",
          colorB: "#1d4ed8",
          colorC: "#0d9488",
          colorD: "#0284c7",
          noiseA: "#94a3b8",
          noiseB: "#0f172a",
          noiseOpacity: 0.1,
        }
      : {
          // Deeper, darker light mode palette: slate-400, deep royal blue, ocean teal & indigo
          colorA: "#94a3b8",
          colorB: "#2563eb",
          colorC: "#0f766e",
          colorD: "#4f46e5",
          noiseA: "#94a3b8",
          noiseB: "#334155",
          noiseOpacity: 0.08,
        };
</script>

{#if mounted && supportsWebGPU}
  <div {id} class="offsets-shader-wrapper theme-{theme}" aria-hidden="true">
    <Shader
      disableTelemetry={true}
      toneMapping="neutral"
      class="offsets-canvas"
      onready={handleShaderReady}
      onunavailable={handleUnavailable}
    >
      <FlowingGradient
        speed={2.8}
        colorA={palette.colorA}
        colorB={palette.colorB}
        colorC={palette.colorC}
        colorD={palette.colorD}
        colorSpace="oklab"
        distortion={0}
        seed={0}
        opacity={1}
      />
      <BarShift
        count={6}
        edges="mirror"
        intensity={0.12}
        speed={0}
        angle={0}
        seed={0}
        opacity={1}
      />
      <GridDistortion
        decay={8.3}
        edges="stretch"
        radius={3}
        gridSize={6}
        intensity={1.2}
        opacity={1}
      />
      <BlueNoise
        grain={1}
        colorA={palette.noiseA}
        colorB={palette.noiseB}
        balance={0}
        contrast={0}
        opacity={palette.noiseOpacity}
        blendMode="overlay"
        colorSpace="linear"
        seed={0}
      />
    </Shader>
    <div class="shader-fade" aria-hidden="true"></div>
  </div>
{:else}
  <!-- Fallback for environments without WebGPU or when reduced motion is preferred -->
  <div {id} class="offsets-fallback theme-{theme}" aria-hidden="true"></div>
{/if}

<style>
  .offsets-shader-wrapper {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
    transition: opacity 0.5s ease;
  }

  /* Dark mode kept untouched */
  .offsets-shader-wrapper.theme-dark {
    opacity: 0.82;
  }

  /* Darker light mode background: increased coverage of deeper slate & ocean tones */
  .offsets-shader-wrapper.theme-light {
    opacity: 0.55;
  }

  :global(.offsets-canvas) {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  :global(.offsets-canvas canvas) {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
  }

  .shader-fade {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: background 0.5s ease;
  }

  /* Dark mode fade kept untouched */
  .offsets-shader-wrapper.theme-dark .shader-fade {
    background:
      radial-gradient(
        ellipse 65% 75% at 20% 35%,
        color-mix(in srgb, var(--color-base-100) 45%, transparent) 0%,
        color-mix(in srgb, var(--color-base-100) 15%, transparent) 65%,
        transparent 100%
      ),
      linear-gradient(
        to bottom,
        transparent 0%,
        transparent 70%,
        var(--color-base-100) 100%
      );
  }

  /* Light mode fade: smoother, deeper blend with the darkened base */
  .offsets-shader-wrapper.theme-light .shader-fade {
    background:
      radial-gradient(
        ellipse 70% 80% at 25% 40%,
        color-mix(in srgb, var(--color-base-100) 65%, transparent) 0%,
        color-mix(in srgb, var(--color-base-100) 30%, transparent) 70%,
        transparent 100%
      ),
      linear-gradient(
        to bottom,
        transparent 0%,
        transparent 65%,
        var(--color-base-100) 100%
      );
  }

  .offsets-fallback {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  /* Dark mode fallback kept untouched */
  .offsets-fallback.theme-dark {
    background:
      radial-gradient(
        circle at 75% 25%,
        rgba(29, 78, 216, 0.32),
        transparent 55%
      ),
      radial-gradient(
        circle at 25% 65%,
        rgba(13, 148, 136, 0.26),
        transparent 55%
      ),
      radial-gradient(
        circle at 85% 75%,
        rgba(2, 132, 199, 0.28),
        transparent 55%
      ),
      var(--color-base-100);
  }

  /* Light mode fallback with deeper, richer contrast */
  .offsets-fallback.theme-light {
    background:
      radial-gradient(
        circle at 75% 25%,
        rgba(37, 99, 235, 0.22),
        transparent 55%
      ),
      radial-gradient(
        circle at 25% 65%,
        rgba(15, 118, 110, 0.2),
        transparent 55%
      ),
      radial-gradient(
        circle at 85% 75%,
        rgba(79, 70, 229, 0.2),
        transparent 55%
      ),
      var(--color-base-100);
  }
</style>
