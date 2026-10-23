<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import FileText from "lucide-svelte/icons/file-text";
  import X from "lucide-svelte/icons/x";
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
    labels,
    kindOptions,
    categoryOptions,
    sortOptions,
    visibleCertificates,
    openPreview,
    closePreview,
    handleKeydown,
  } = library;

  $: library.setInput(certificates, lang);

  let dialogElement: HTMLElement;
  let closeButton: HTMLButtonElement;
  let previewOpener: HTMLElement | null = null;

  function handleOpenPreview(certificate: Certificate, event: MouseEvent) {
    previewOpener =
      event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    openPreview(certificate);
  }

  function handleDialogKeydown(event: KeyboardEvent) {
    if (event.key !== "Tab" || !dialogElement) return;

    const focusable = Array.from(
      dialogElement.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe[tabindex="0"]',
      ),
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  let unsubscribePreview: (() => void) | undefined;

  onMount(() => {
    unsubscribePreview = selectedCertificate.subscribe((certificate) => {
      if (certificate) {
        void tick().then(() => closeButton?.focus());
        return;
      }

      if (previewOpener) {
        void tick().then(() => {
          previewOpener?.focus();
          previewOpener = null;
        });
      }
    });
  });

  onDestroy(() => {
    unsubscribePreview?.();
    library.destroy();
    previewOpener?.focus();
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="space-y-8">
  <div
    class="grid gap-4 rounded-lg border border-base-300 bg-base-200 p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end"
  >
    <div>
      <label class="label pb-1" for="certificate-kind-filter">
        <span class="label-text">{$labels.type}</span>
      </label>
      <select
        id="certificate-kind-filter"
        class="select select-bordered w-full"
        bind:value={$selectedKind}
      >
        {#each $kindOptions as kind (kind)}
          <option value={kind}>
            {kind === "all"
              ? $labels.all
              : getCertificateKindLabel(kind, $labels)}
          </option>
        {/each}
      </select>
    </div>

    <div>
      <label class="label pb-1" for="certificate-category-filter">
        <span class="label-text">{$labels.category}</span>
      </label>
      <select
        id="certificate-category-filter"
        class="select select-bordered w-full"
        bind:value={$selectedCategory}
      >
        {#each $categoryOptions as category (category)}
          <option value={category}>
            {category === "all" ? $labels.all : category}
          </option>
        {/each}
      </select>
    </div>

    <div>
      <label class="label pb-1" for="certificate-sort">
        <span class="label-text">{$labels.sort}</span>
      </label>
      <select
        id="certificate-sort"
        class="select select-bordered w-full"
        bind:value={$sortBy}
      >
        {#each $sortOptions as option (option.value)}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </div>

    <p class="pb-3 text-sm text-base-content/60 md:text-right">
      {$labels.visibleCount}
      {$visibleCertificates.length}
      {$labels.of}
      {certificates.length}
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
            <summary
              class="cursor-pointer list-none rounded-[inherit] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div class="card-body gap-4">
                <div class="flex flex-wrap gap-2">
                  <span class="badge badge-primary badge-sm"
                    >{getCertificateKindLabel(certificate.kind, $labels)}</span
                  >
                  <span class="badge badge-outline badge-sm"
                    >{certificate.category}</span
                  >
                </div>

                <h2 class="card-title text-lg leading-snug">
                  {certificate.title}
                </h2>
                <p class="text-sm font-medium text-base-content/70">
                  {certificate.issuer} · {formatCertificateDate(
                    certificate.issuedAt,
                    lang,
                    $labels,
                  )}
                </p>

                <span
                  class="inline-flex items-center gap-1 self-start text-xs font-medium text-primary"
                >
                  <span class="certificate-card__show-label"
                    >{$labels.showDetails}</span
                  >
                  <span class="certificate-card__hide-label"
                    >{$labels.hideDetails}</span
                  >
                  <svg
                    class="certificate-card__chevron h-3.5 w-3.5 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m6 9 6 6 6-6"
                    ></path>
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
                  {#each certificate.skills as skill (skill)}
                    <span class="badge badge-outline badge-sm">{skill}</span>
                  {/each}
                </div>
              {/if}

              <div class="card-actions mt-2 flex-wrap gap-2">
                <button
                  type="button"
                  class="btn btn-primary btn-square btn-sm mobile-touch-target"
                  title={$labels.openPdf}
                  aria-label={`${$labels.openPdf}: ${certificate.title}`}
                  on:click={(event) => handleOpenPreview(certificate, event)}
                >
                  <FileText size={17} aria-hidden="true" />
                </button>
                {#if certificate.credentialUrl}
                  <a
                    class="btn btn-ghost btn-sm mobile-touch-target"
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
      <p class="certificate-empty py-12 text-center text-base-content/50">
        {$labels.empty}
      </p>
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
    on:click|self={closePreview}
  >
    <section
      bind:this={dialogElement}
      class="certificate-preview"
      role="document"
      on:keydown={handleDialogKeydown}
    >
      <header class="certificate-preview__header">
        <div class="min-w-0">
          <p class="text-xs font-medium uppercase tracking-wide text-primary">
            {getCertificateKindLabel($selectedCertificate.kind, $labels)}
          </p>
          <h2
            id="certificate-preview-title"
            class="truncate text-base font-semibold md:text-lg"
          >
            {$selectedCertificate.title}
          </h2>
          <p class="text-sm text-base-content/60">
            {$selectedCertificate.issuer} · {formatCertificateDate(
              $selectedCertificate.issuedAt,
              lang,
              $labels,
            )}
          </p>
        </div>

        <div class="certificate-preview__actions">
          <a
            class="btn btn-ghost btn-sm mobile-touch-target"
            href={$selectedCertificate.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {$labels.openInNewTab}
          </a>
          <button
            bind:this={closeButton}
            type="button"
            class="btn btn-primary btn-sm mobile-touch-target"
            data-certificate-close
            on:click={closePreview}
          >
            <X size={17} aria-hidden="true" />
            {$labels.close}
          </button>
        </div>
      </header>

      <div class="certificate-preview__viewport">
        <iframe
          title={$selectedCertificate.title}
          src={getCertificateViewerSrc($selectedCertificate.fileUrl)}
          class="certificate-preview__frame"
          tabindex="0"
        ></iframe>
      </div>
      <footer class="certificate-preview__footer">
        <p>{$labels.closeHint}</p>
      </footer>
    </section>
  </div>
{/if}
