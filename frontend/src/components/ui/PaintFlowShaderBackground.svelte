<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    Shader,
    FilmGrain,
    Glow,
    Swirl,
    Blob,
    WaveDistortion,
    ChromaticAberration,
    isWebGPUSupported,
  } from "shaders/svelte";

  /**
   * Paint Flow 2 background shader (https://shaders.com/collection/paint-flow/d8490634-dae8-4e69-b23a-11b91995bc33).
   * WebGPU-powered dynamic liquid wave gradient with organic swirl, glowing highlights,
   * subtle wave distortion, chromatic aberration, and delicate film grain.
   */

  export let id: string = "paint-flow-bg";

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

    if (!supportsWebGPU) {
      signalReady();
    } else {
      // Signal ready once canvas is mounted and painted to screen compositor
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          signalReady();
        });
      });
      safetyTimer = window.setTimeout(() => {
        signalReady();
      }, 2000);
    }

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
</script>

{#if mounted && supportsWebGPU}
  <div {id} class="paint-flow-shader-wrapper theme-{theme}" aria-hidden="true">
    <Shader
      disableTelemetry={true}
      toneMapping="neutral"
      class="paint-flow-canvas"
      onready={handleShaderReady}
      onunavailable={handleUnavailable}
    >
      <FilmGrain strength={0.15}>
        <Glow blendMode="screen" intensity={0.14} size={15} threshold={0.35}>
          <Swirl
            colorA="#6ce1e6"
            colorB="#5326a8"
            colorSpace="oklch"
            detail={2.5}
            speed={0.8}
          />
          <Blob
            center={{
              x: 0.06,
              y: 0.77,
            }}
            colorA="#82e354"
            colorB="#b95ab4"
            colorSpace="oklch"
            highlightColor="#2ba7ff"
            highlightIntensity={0.8}
            opacity={0.9}
            size={0.54}
            softness={1}
            speed={1.2}
          />
          <WaveDistortion
            angle={156}
            edges="mirror"
            frequency={6}
            speed={2.5}
            strength={0.15}
          />
          <ChromaticAberration
            blueOffset={1.5}
            redOffset={-1.5}
            strength={0.02}
          />
        </Glow>
      </FilmGrain>
    </Shader>
    <div class="shader-fade" aria-hidden="true"></div>
  </div>
{:else}
  <!-- Fallback for environments without WebGPU or when reduced motion is preferred -->
  <div {id} class="paint-flow-fallback theme-{theme}" aria-hidden="true"></div>
{/if}

<style>
  .paint-flow-shader-wrapper {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
    transition: opacity 0.5s ease;
  }

  .paint-flow-shader-wrapper.theme-dark {
    opacity: 0.85;
  }

  .paint-flow-shader-wrapper.theme-light {
    opacity: 0.6;
  }

  :global(.paint-flow-canvas) {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  :global(.paint-flow-canvas canvas) {
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

  .paint-flow-shader-wrapper.theme-dark .shader-fade {
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

  .paint-flow-shader-wrapper.theme-light .shader-fade {
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

  .paint-flow-fallback {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .paint-flow-fallback.theme-dark {
    background:
      radial-gradient(
        circle at 10% 80%,
        rgba(108, 225, 230, 0.28),
        transparent 55%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(83, 38, 168, 0.32),
        transparent 55%
      ),
      radial-gradient(
        circle at 20% 70%,
        rgba(130, 227, 84, 0.22),
        transparent 50%
      ),
      radial-gradient(
        circle at 60% 60%,
        rgba(185, 90, 180, 0.25),
        transparent 55%
      ),
      var(--color-base-100);
  }

  .paint-flow-fallback.theme-light {
    background:
      radial-gradient(
        circle at 10% 80%,
        rgba(108, 225, 230, 0.18),
        transparent 55%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(83, 38, 168, 0.2),
        transparent 55%
      ),
      radial-gradient(
        circle at 20% 70%,
        rgba(130, 227, 84, 0.15),
        transparent 50%
      ),
      radial-gradient(
        circle at 60% 60%,
        rgba(185, 90, 180, 0.18),
        transparent 55%
      ),
      var(--color-base-100);
  }
</style>
