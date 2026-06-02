<script lang="ts">
  import { onDestroy } from "svelte";
  import FileText from "lucide-svelte/icons/file-text";
  import {
    createCertificateLibrary,
    formatCertificateDate,
    getCertificateKindLabel,
    getCertificateViewerSrc,
  } from "../../lib/certificates/certificate-library";
  import type {
    Certificate,
    CertificateLanguage,
  } from "../../lib/cms/certificates";

  export let certificates: Certificate[] = [];
  export let lang: CertificateLanguage = "en";

  const library = createCertificateLibrary();
  const {
    selectedKind,
    selectedCategory,
    sortBy,
    selectedCertificate,
    isClosingPreview,
    zoom,
    zoomOrigin,
    labels,
    kindOptions,
    categoryOptions,
    sortOptions,
    visibleCertificates,
    openPreview,
    closePreview,
    toggleZoom,
    handleZoomKeydown,
    handleKeydown,
  } = library;

  $: library.setInput(certificates, lang);

  onDestroy(library.destroy);
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="space-y-8">
  <div class="space-y-4 rounded-lg border border-base-300 bg-base-200 p-4">
    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/55">
        {$labels.type}
      </p>
      <div class="flex flex-wrap gap-2" role="group" aria-label={$labels.type}>
        {#each $kindOptions as kind}
          <button
            type="button"
            class="btn btn-sm"
            class:btn-primary={$selectedKind === kind}
            class:btn-outline={$selectedKind !== kind}
            aria-pressed={$selectedKind === kind}
            on:click={() => selectedKind.set(kind)}
          >
            {kind === "all" ? $labels.all : getCertificateKindLabel(kind, $labels)}
          </button>
        {/each}
      </div>
    </div>

    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/55">
        {$labels.category}
      </p>
      <div class="flex flex-wrap gap-2" role="group" aria-label={$labels.category}>
        {#each $categoryOptions as category}
          <button
            type="button"
            class="btn btn-sm"
            class:btn-primary={$selectedCategory === category}
            class:btn-outline={$selectedCategory !== category}
            aria-pressed={$selectedCategory === category}
            on:click={() => selectedCategory.set(category)}
          >
            {category === "all" ? $labels.all : category}
          </button>
        {/each}
      </div>
    </div>

    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/55">
        {$labels.sort}
      </p>
      <div class="flex flex-wrap gap-2" role="group" aria-label={$labels.sort}>
        {#each $sortOptions as option}
          <button
            type="button"
            class="btn btn-sm"
            class:btn-primary={$sortBy === option.value}
            class:btn-outline={$sortBy !== option.value}
            aria-pressed={$sortBy === option.value}
            on:click={() => sortBy.set(option.value)}
          >
            {option.label}
          </button>
        {/each}
      </div>
    </div>

    <p class="text-sm text-base-content/60">
      {$labels.visibleCount} {$visibleCertificates.length} {$labels.of} {certificates.length}
    </p>
  </div>

  {#key `${$selectedKind}:${$selectedCategory}:${$sortBy}`}
    {#if $visibleCertificates.length > 0}
      <div class="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each $visibleCertificates as certificate, index (certificate.slug)}
          <details
            class="certificate-card card border border-base-300 bg-base-200 shadow-sm transition duration-200 hover:shadow-lg hover:ring-1 hover:ring-primary/40"
            style={`--certificate-index: ${Math.min(index, 8)};`}
          >
            <summary class="cursor-pointer list-none rounded-[inherit] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <div class="card-body gap-4">
                <div class="flex flex-wrap gap-2">
                  <span class="badge badge-primary badge-sm">{getCertificateKindLabel(certificate.kind, $labels)}</span>
                  <span class="badge badge-outline badge-sm">{certificate.category}</span>
                </div>

                <h2 class="card-title text-lg leading-snug">{certificate.title}</h2>
                <p class="text-sm font-medium text-base-content/70">
                  {certificate.issuer} · {formatCertificateDate(certificate.issuedAt, lang, $labels)}
                </p>

                <span class="inline-flex items-center gap-1 self-start text-xs font-medium text-primary">
                  <span class="certificate-card__show-label">{$labels.showDetails}</span>
                  <span class="certificate-card__hide-label">{$labels.hideDetails}</span>
                  <svg
                    class="certificate-card__chevron h-3.5 w-3.5 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </summary>

            <div class="card-body gap-4 border-t border-base-300 pt-4">
              {#if certificate.summary}
                <p class="text-sm leading-relaxed text-base-content/65">
                  {certificate.summary}
                </p>
              {/if}

              {#if certificate.skills.length > 0}
                <div class="flex flex-wrap gap-2 pt-1">
                  {#each certificate.skills as skill}
                    <span class="badge badge-outline badge-sm">{skill}</span>
                  {/each}
                </div>
              {/if}

              <div class="card-actions mt-2 flex-wrap gap-2">
                <button
                  type="button"
                  class="btn btn-primary btn-square btn-sm"
                  title={$labels.openPdf}
                  aria-label={`${$labels.openPdf}: ${certificate.title}`}
                  on:click={() => openPreview(certificate)}
                >
                  <FileText size={17} aria-hidden="true" />
                </button>
                {#if certificate.credentialUrl}
                  <a
                    class="btn btn-ghost btn-sm"
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {$labels.credential}
                  </a>
                {/if}
              </div>
            </div>
          </details>
        {/each}
      </div>
    {:else}
      <p class="certificate-empty py-12 text-center text-base-content/50">{$labels.empty}</p>
    {/if}
  {/key}
</div>

{#if $selectedCertificate}
  <div
    class:certificate-overlay--closing={$isClosingPreview}
    class="certificate-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="certificate-preview-title"
    on:click={closePreview}
  >
    <div class="certificate-overlay__hint" aria-live="polite">
      {$labels.closeHint}
    </div>

    <section class="certificate-preview" role="document" on:click|stopPropagation>
      <header class="certificate-preview__header">
        <div class="min-w-0">
          <p class="text-xs font-medium uppercase tracking-wide text-primary">
            {getCertificateKindLabel($selectedCertificate.kind, $labels)}
          </p>
          <h2 id="certificate-preview-title" class="truncate text-base font-semibold md:text-lg">
            {$selectedCertificate.title}
          </h2>
          <p class="text-sm text-base-content/60">
            {$selectedCertificate.issuer} · {formatCertificateDate($selectedCertificate.issuedAt, lang, $labels)}
          </p>
        </div>

        <div class="certificate-preview__actions">
          <a
            class="btn btn-ghost btn-sm"
            href={$selectedCertificate.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {$labels.openInNewTab}
          </a>
          {#if $selectedCertificate.credentialUrl}
            <a
              class="btn btn-ghost btn-sm"
              href={$selectedCertificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {$labels.credential}
            </a>
          {/if}
        </div>
      </header>

      <div
        class="certificate-preview__viewport"
        class:certificate-preview__viewport--zoomed={$zoom > 1}
        role="button"
        tabindex="0"
        aria-label={$zoom > 1 ? $labels.zoomOut : $labels.zoomIn}
        on:click={toggleZoom}
        on:keydown={handleZoomKeydown}
      >
        <iframe
          title={$selectedCertificate.title}
          src={getCertificateViewerSrc($selectedCertificate.fileUrl)}
          class="certificate-preview__frame"
          tabindex="-1"
          style={`transform: scale(${$zoom}); transform-origin: ${$zoomOrigin};`}
        ></iframe>
      </div>
    </section>
  </div>
{/if}
