<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import FileText from "lucide-svelte/icons/file-text";
  import ExternalLink from "lucide-svelte/icons/external-link";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import Check from "lucide-svelte/icons/check";
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
    CertificateKind,
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

  // Active open dropdown for rolling/unrolling animation ('kind' | 'category' | 'sort' | null)
  let openDropdown: "kind" | "category" | "sort" | null = null;
  let filtersBar: HTMLElement;

  function toggleDropdown(name: "kind" | "category" | "sort") {
    openDropdown = openDropdown === name ? null : name;
  }

  // Handle kind selection with unclick / unmark logic
  function handleKindSelect(kind: CertificateKind | "all") {
    if ($selectedKind === kind && kind !== "all") {
      // Unclicked: unmark and reset to all
      $selectedKind = "all";
    } else {
      $selectedKind = kind;
    }
    openDropdown = null;
  }

  // Handle category selection with unclick / unmark logic
  function handleCategorySelect(category: string) {
    if ($selectedCategory === category && category !== "all") {
      // Unclicked: unmark and reset to all
      $selectedCategory = "all";
    } else {
      $selectedCategory = category;
    }
    openDropdown = null;
  }

  // Handle sort selection with toggle logic
  function handleSortSelect(value: typeof $sortBy) {
    if ($sortBy === value && value !== "newest") {
      $sortBy = "newest";
    } else {
      $sortBy = value;
    }
    openDropdown = null;
  }

  function handleClosePreview() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("portfolio-show-cursor"));
    }
    closePreview();
  }

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("portfolio-show-cursor"));
    }
  });

  function handleOpenPreview(
    certificate: Certificate,
    event: MouseEvent | KeyboardEvent,
  ) {
    previewOpener =
      event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    openPreview(certificate);
  }

  function handleCardKeydown(certificate: Certificate, event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenPreview(certificate, event);
    }
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

  function isImageFile(url?: string, mime?: string): boolean {
    if (mime?.startsWith("image/")) return true;
    if (!url) return false;
    return /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(url);
  }

  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    document.body.style.overflow = "hidden";
    return {
      destroy() {
        document.body.style.overflow = "";
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      },
    };
  }

  function onWindowClick(event: MouseEvent) {
    if (
      openDropdown &&
      filtersBar &&
      !filtersBar.contains(event.target as Node)
    ) {
      openDropdown = null;
    }
  }

  let unsubscribePreview: (() => void) | undefined;

  onMount(() => {
    unsubscribePreview = selectedCertificate.subscribe((certificate) => {
      if (certificate) {
        void tick().then(() => closeButton?.focus());
        return;
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("portfolio-show-cursor"));
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

<svelte:window on:keydown={handleKeydown} on:click={onWindowClick} />

<div class="space-y-8">
  <!-- Filter controls with smooth rolling/unrolling animation and unmark capability -->
  <div
    bind:this={filtersBar}
    class="relative z-30 grid gap-4 rounded-xl border border-base-300 bg-base-200/80 p-4 shadow-sm backdrop-blur-sm md:grid-cols-[1fr_1fr_1fr_auto] md:items-end"
  >
    <!-- Type Filter -->
    <div class="relative">
      <span
        class="label pb-1.5 text-xs font-semibold uppercase tracking-wider text-base-content/70"
      >
        {$labels.type}
      </span>
      <button
        type="button"
        class="filter-select-trigger btn btn-outline btn-sm w-full justify-between font-normal normal-case mobile-touch-target"
        class:btn-primary={$selectedKind !== "all"}
        on:click|stopPropagation={() => toggleDropdown("kind")}
        aria-expanded={openDropdown === "kind"}
        aria-haspopup="listbox"
      >
        <span class="truncate">
          {$selectedKind === "all"
            ? $labels.all
            : getCertificateKindLabel($selectedKind, $labels)}
        </span>
        <ChevronDown
          size={16}
          class="shrink-0 transition-transform duration-200 {openDropdown ===
          'kind'
            ? 'rotate-180'
            : ''}"
          aria-hidden="true"
        />
      </button>

      <!-- Unrolling Dropdown Menu -->
      <div
        class="filter-unroll-container {openDropdown === 'kind'
          ? 'is-open'
          : ''}"
        role="listbox"
        aria-label={$labels.type}
      >
        <div class="filter-dropdown-card">
          {#each $kindOptions as kind (kind)}
            {@const isSelected = $selectedKind === kind}
            <button
              type="button"
              class="filter-dropdown-item mobile-touch-target {isSelected
                ? 'is-selected'
                : ''}"
              on:click|stopPropagation={() => handleKindSelect(kind)}
              role="option"
              aria-selected={isSelected}
            >
              <span class="truncate">
                {kind === "all"
                  ? $labels.all
                  : getCertificateKindLabel(kind, $labels)}
              </span>
              {#if isSelected}
                <Check
                  size={15}
                  class="shrink-0 text-primary"
                  aria-hidden="true"
                />
              {/if}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="relative">
      <span
        class="label pb-1.5 text-xs font-semibold uppercase tracking-wider text-base-content/70"
      >
        {$labels.category}
      </span>
      <button
        type="button"
        class="filter-select-trigger btn btn-outline btn-sm w-full justify-between font-normal normal-case mobile-touch-target"
        class:btn-primary={$selectedCategory !== "all"}
        on:click|stopPropagation={() => toggleDropdown("category")}
        aria-expanded={openDropdown === "category"}
        aria-haspopup="listbox"
      >
        <span class="truncate">
          {$selectedCategory === "all" ? $labels.all : $selectedCategory}
        </span>
        <ChevronDown
          size={16}
          class="shrink-0 transition-transform duration-200 {openDropdown ===
          'category'
            ? 'rotate-180'
            : ''}"
          aria-hidden="true"
        />
      </button>

      <!-- Unrolling Dropdown Menu -->
      <div
        class="filter-unroll-container {openDropdown === 'category'
          ? 'is-open'
          : ''}"
        role="listbox"
        aria-label={$labels.category}
      >
        <div class="filter-dropdown-card">
          {#each $categoryOptions as category (category)}
            {@const isSelected = $selectedCategory === category}
            <button
              type="button"
              class="filter-dropdown-item mobile-touch-target {isSelected
                ? 'is-selected'
                : ''}"
              on:click|stopPropagation={() => handleCategorySelect(category)}
              role="option"
              aria-selected={isSelected}
            >
              <span class="truncate">
                {category === "all" ? $labels.all : category}
              </span>
              {#if isSelected}
                <Check
                  size={15}
                  class="shrink-0 text-primary"
                  aria-hidden="true"
                />
              {/if}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Sort Filter -->
    <div class="relative">
      <span
        class="label pb-1.5 text-xs font-semibold uppercase tracking-wider text-base-content/70"
      >
        {$labels.sort}
      </span>
      <button
        type="button"
        class="filter-select-trigger btn btn-outline btn-sm w-full justify-between font-normal normal-case mobile-touch-target"
        class:btn-primary={$sortBy !== "newest"}
        on:click|stopPropagation={() => toggleDropdown("sort")}
        aria-expanded={openDropdown === "sort"}
        aria-haspopup="listbox"
      >
        <span class="truncate">
          {$sortOptions.find((o) => o.value === $sortBy)?.label ?? $labels.sort}
        </span>
        <ChevronDown
          size={16}
          class="shrink-0 transition-transform duration-200 {openDropdown ===
          'sort'
            ? 'rotate-180'
            : ''}"
          aria-hidden="true"
        />
      </button>

      <!-- Unrolling Dropdown Menu -->
      <div
        class="filter-unroll-container {openDropdown === 'sort'
          ? 'is-open'
          : ''}"
        role="listbox"
        aria-label={$labels.sort}
      >
        <div class="filter-dropdown-card">
          {#each $sortOptions as option (option.value)}
            {@const isSelected = $sortBy === option.value}
            <button
              type="button"
              class="filter-dropdown-item mobile-touch-target {isSelected
                ? 'is-selected'
                : ''}"
              on:click|stopPropagation={() => handleSortSelect(option.value)}
              role="option"
              aria-selected={isSelected}
            >
              <span class="truncate">{option.label}</span>
              {#if isSelected}
                <Check
                  size={15}
                  class="shrink-0 text-primary"
                  aria-hidden="true"
                />
              {/if}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <p class="pb-2 text-sm text-base-content/65 md:text-right">
      {$labels.visibleCount}
      <span class="font-semibold text-base-content"
        >{$visibleCertificates.length}</span
      >
      {$labels.of}
      {certificates.length}
    </p>
  </div>

  <!-- Certificate Cards (Direct Click-to-View without redundant accordion unrolling) -->
  {#key `${$selectedKind}:${$selectedCategory}:${$sortBy}`}
    {#if $visibleCertificates.length > 0}
      <div class="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each $visibleCertificates as certificate, index (certificate.slug)}
          <div
            role="button"
            tabindex="0"
            class="certificate-card card border border-base-300 bg-base-200/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:ring-2 hover:ring-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer select-none"
            style={`--certificate-index: ${Math.min(index, 8)};`}
            on:click={(event) => handleOpenPreview(certificate, event)}
            on:keydown={(event) => handleCardKeydown(certificate, event)}
            aria-label={`${certificate.title} - ${$labels.openPdf}`}
          >
            <div class="card-body flex flex-col justify-between gap-4 p-5">
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <span class="badge badge-primary badge-sm font-medium">
                    {getCertificateKindLabel(certificate.kind, $labels)}
                  </span>
                  <span
                    class="badge badge-outline badge-sm text-base-content/80"
                  >
                    {certificate.category}
                  </span>
                </div>

                <h2
                  class="card-title mt-3 text-lg font-semibold leading-snug tracking-tight text-base-content"
                >
                  {certificate.title}
                </h2>

                <p class="mt-2 text-sm text-base-content/70">
                  {certificate.issuer} · {formatCertificateDate(
                    certificate.issuedAt,
                    lang,
                    $labels,
                  )}
                </p>

                {#if certificate.skills && certificate.skills.length > 0}
                  <div class="mt-4 flex flex-wrap gap-1.5">
                    {#each certificate.skills as skill (skill)}
                      <span
                        class="badge badge-outline badge-xs text-base-content/75"
                        >{skill}</span
                      >
                    {/each}
                  </div>
                {/if}
              </div>

              <!-- Quick action footer -->
              <div
                class="mt-2 flex items-center justify-between border-t border-base-300/80 pt-3"
              >
                <span
                  class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors"
                >
                  <FileText size={15} aria-hidden="true" />
                  {$labels.openPdf}
                </span>

                {#if certificate.credentialUrl}
                  <a
                    class="btn btn-ghost btn-xs mobile-touch-target gap-1 text-base-content/70 hover:text-primary"
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    on:click|stopPropagation
                    title={$labels.credential}
                  >
                    {$labels.credential}
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="certificate-empty py-16 text-center text-base-content/60">
        {$labels.empty}
      </p>
    {/if}
  {/key}
</div>

<!-- Modal Certificate Preview (Viewport Centered and Scaled) -->
{#if $selectedCertificate}
  <div
    use:portal
    class:certificate-overlay--closing={$isClosingPreview}
    class="certificate-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="certificate-preview-title"
    on:click|self={handleClosePreview}
  >
    <section
      bind:this={dialogElement}
      class="certificate-preview"
      role="document"
      on:keydown={handleDialogKeydown}
    >
      <header class="certificate-preview__header">
        <div class="min-w-0 pr-2">
          <p
            class="text-xs font-semibold uppercase tracking-wider text-primary"
          >
            {getCertificateKindLabel($selectedCertificate.kind, $labels)}
          </p>
          <h2
            id="certificate-preview-title"
            class="truncate text-base font-semibold md:text-lg"
          >
            {$selectedCertificate.title}
          </h2>
          <p class="text-xs text-base-content/65 md:text-sm">
            {$selectedCertificate.issuer} · {formatCertificateDate(
              $selectedCertificate.issuedAt,
              lang,
              $labels,
            )}
          </p>
        </div>

        <div class="certificate-preview__actions shrink-0">
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
            class="btn btn-primary btn-sm mobile-touch-target gap-1.5"
            data-certificate-close
            on:click={handleClosePreview}
          >
            <X size={17} aria-hidden="true" />
            {$labels.close}
          </button>
        </div>
      </header>

      <div
        class="certificate-preview__viewport"
        on:pointerenter={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("portfolio-hide-cursor"));
          }
        }}
        on:pointerleave={(e) => {
          if (
            typeof window !== "undefined" &&
            e.relatedTarget instanceof Element &&
            !e.relatedTarget.closest(".certificate-preview__viewport")
          ) {
            window.dispatchEvent(new CustomEvent("portfolio-show-cursor"));
          }
        }}
      >
        {#if isImageFile($selectedCertificate.fileUrl, $selectedCertificate.fileMime)}
          <img
            src={$selectedCertificate.fileUrl}
            alt={$selectedCertificate.title}
            class="certificate-preview__image"
          />
        {:else}
          <iframe
            title={$selectedCertificate.title}
            src={getCertificateViewerSrc($selectedCertificate.fileUrl)}
            class="certificate-preview__frame"
            tabindex="0"
            on:pointerenter={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("portfolio-hide-cursor"));
              }
            }}
          ></iframe>
        {/if}
      </div>

      <footer class="certificate-preview__footer">
        <p>{$labels.closeHint}</p>
      </footer>
    </section>
  </div>
{/if}
