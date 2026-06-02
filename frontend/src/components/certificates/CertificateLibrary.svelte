<script lang="ts">
  import { onDestroy } from "svelte";

  type CertificateKind = "certificate" | "course";
  type Certificate = {
    title: string;
    slug: string;
    issuer: string;
    kind: CertificateKind;
    category: string;
    summary?: string;
    issuedAt?: string;
    skills: string[];
    fileUrl: string;
    fileName?: string;
    fileMime?: string;
    credentialUrl?: string;
    language: "en" | "pl";
    order?: number;
  };

  type SortKey = "newest" | "oldest" | "title" | "issuer";

  export let certificates: Certificate[] = [];
  export let lang: "en" | "pl" = "en";

  const MIN_ZOOM = 0.75;
  const MAX_ZOOM = 2.25;
  const ZOOM_STEP = 0.25;

  let selectedKind = "all";
  let selectedCategory = "all";
  let sortBy: SortKey = "newest";
  let selectedCertificate: Certificate | null = null;
  let zoom = 1;
  let previousBodyOverflow: string | null = null;

  $: labels =
    lang === "pl"
      ? {
          filters: "Filtry",
          type: "Typ",
          category: "Kategoria",
          sort: "Sortowanie",
          all: "Wszystkie",
          certificate: "Certyfikat",
          course: "Kurs",
          newest: "Najnowsze",
          oldest: "Najstarsze",
          title: "Tytuł A-Z",
          issuer: "Wystawca A-Z",
          noDate: "Bez daty",
          openPdf: "Otwórz PDF",
          openInNewTab: "Otwórz w nowej karcie",
          credential: "Poświadczenie",
          zoomOut: "Pomniejsz",
          zoomIn: "Powiększ",
          close: "Zamknij",
          closeHint: "kliknij tło, aby zamknąć podgląd",
          empty: "Certyfikaty i kursy pojawią się wkrótce.",
          visibleCount: "Widoczne",
          of: "z",
        }
      : {
          filters: "Filters",
          type: "Type",
          category: "Category",
          sort: "Sort",
          all: "All",
          certificate: "Certificate",
          course: "Course",
          newest: "Newest",
          oldest: "Oldest",
          title: "Title A-Z",
          issuer: "Issuer A-Z",
          noDate: "No date",
          openPdf: "Open PDF",
          openInNewTab: "Open in new tab",
          credential: "Credential",
          zoomOut: "Zoom out",
          zoomIn: "Zoom in",
          close: "Close",
          closeHint: "press on background to close overview",
          empty: "Certificates and courses are coming soon.",
          visibleCount: "Showing",
          of: "of",
        };

  $: kindOptions = [
    "all",
    ...new Set(certificates.map((certificate) => certificate.kind).filter(Boolean)),
  ];

  $: categoryOptions = [
    "all",
    ...new Set(certificates.map((certificate) => certificate.category).filter(Boolean)),
  ];

  $: visibleCertificates = certificates
    .filter((certificate) => selectedKind === "all" || certificate.kind === selectedKind)
    .filter(
      (certificate) =>
        selectedCategory === "all" || certificate.category === selectedCategory,
    )
    .sort(compareCertificates);

  $: if (typeof document !== "undefined") {
    if (selectedCertificate && previousBodyOverflow === null) {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else if (!selectedCertificate && previousBodyOverflow !== null) {
      document.body.style.overflow = previousBodyOverflow;
      previousBodyOverflow = null;
    }
  }

  onDestroy(() => {
    if (typeof document !== "undefined" && previousBodyOverflow !== null) {
      document.body.style.overflow = previousBodyOverflow;
    }
  });

  function compareCertificates(a: Certificate, b: Certificate) {
    if (sortBy === "title") return a.title.localeCompare(b.title, lang);
    if (sortBy === "issuer") return a.issuer.localeCompare(b.issuer, lang);

    const aTime = getDateTime(a.issuedAt);
    const bTime = getDateTime(b.issuedAt);
    return sortBy === "oldest" ? aTime - bTime : bTime - aTime;
  }

  function getDateTime(value?: string) {
    if (!value) return 0;

    const time = new Date(value).getTime();
    return Number.isNaN(time) ? 0 : time;
  }

  function formatDate(value?: string) {
    if (!value) return labels.noDate;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat(lang === "pl" ? "pl-PL" : "en-GB", {
      month: "short",
      year: "numeric",
    }).format(date);
  }

  function getKindLabel(kind: string) {
    if (kind === "certificate") return labels.certificate;
    if (kind === "course") return labels.course;
    return kind;
  }

  function openPreview(certificate: Certificate) {
    selectedCertificate = certificate;
    zoom = 1;
  }

  function closePreview() {
    selectedCertificate = null;
  }

  function clampZoom(value: number) {
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
  }

  function zoomIn() {
    zoom = clampZoom(zoom + ZOOM_STEP);
  }

  function zoomOut() {
    zoom = clampZoom(zoom - ZOOM_STEP);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && selectedCertificate) {
      closePreview();
    }
  }

  function getViewerSrc(url: string) {
    const separator = url.includes("#") ? "&" : "#";
    return `${url}${separator}toolbar=0&navpanes=0`;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="space-y-8">
  <div class="grid gap-4 rounded-lg border border-base-300 bg-base-200 p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
    <div>
      <label class="label pb-1" for="certificate-kind-filter">
        <span class="label-text">{labels.type}</span>
      </label>
      <select
        id="certificate-kind-filter"
        class="select select-bordered w-full"
        bind:value={selectedKind}
      >
        {#each kindOptions as kind}
          <option value={kind}>{kind === "all" ? labels.all : getKindLabel(kind)}</option>
        {/each}
      </select>
    </div>

    <div>
      <label class="label pb-1" for="certificate-category-filter">
        <span class="label-text">{labels.category}</span>
      </label>
      <select
        id="certificate-category-filter"
        class="select select-bordered w-full"
        bind:value={selectedCategory}
      >
        {#each categoryOptions as category}
          <option value={category}>{category === "all" ? labels.all : category}</option>
        {/each}
      </select>
    </div>

    <div>
      <label class="label pb-1" for="certificate-sort">
        <span class="label-text">{labels.sort}</span>
      </label>
      <select id="certificate-sort" class="select select-bordered w-full" bind:value={sortBy}>
        <option value="newest">{labels.newest}</option>
        <option value="oldest">{labels.oldest}</option>
        <option value="title">{labels.title}</option>
        <option value="issuer">{labels.issuer}</option>
      </select>
    </div>

    <p class="pb-3 text-sm text-base-content/60 md:text-right">
      {labels.visibleCount} {visibleCertificates.length} {labels.of} {certificates.length}
    </p>
  </div>

  {#if visibleCertificates.length > 0}
    <div class="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each visibleCertificates as certificate (certificate.slug)}
        <button
          type="button"
          class="certificate-card card h-full border border-base-300 bg-base-200 text-left shadow-sm transition duration-200 hover:shadow-lg hover:ring-1 hover:ring-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          on:click={() => openPreview(certificate)}
          aria-label={`${labels.openPdf}: ${certificate.title}`}
        >
          <span class="card-body flex h-full gap-4">
            <span class="flex flex-wrap gap-2">
              <span class="badge badge-primary badge-sm">{getKindLabel(certificate.kind)}</span>
              <span class="badge badge-outline badge-sm">{certificate.category}</span>
            </span>

            <span class="block text-lg font-semibold leading-snug">{certificate.title}</span>
            <span class="block text-sm font-medium text-base-content/70">
              {certificate.issuer} · {formatDate(certificate.issuedAt)}
            </span>

            {#if certificate.summary}
              <span class="block text-sm leading-relaxed text-base-content/65">
                {certificate.summary}
              </span>
            {/if}

            {#if certificate.skills.length > 0}
              <span class="mt-auto flex flex-wrap gap-2 pt-2">
                {#each certificate.skills as skill}
                  <span class="badge badge-outline badge-sm">{skill}</span>
                {/each}
              </span>
            {/if}

            <span class="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary">
              {labels.openPdf}
              <span aria-hidden="true">+</span>
            </span>
          </span>
        </button>
      {/each}
    </div>
  {:else}
    <p class="py-12 text-center text-base-content/50">{labels.empty}</p>
  {/if}
</div>

{#if selectedCertificate}
  <div
    class="certificate-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="certificate-preview-title"
    on:click={closePreview}
  >
    <div class="certificate-overlay__hint" aria-live="polite">
      {labels.closeHint}
    </div>

    <section class="certificate-preview" role="document" on:click|stopPropagation>
      <header class="certificate-preview__header">
        <div class="min-w-0">
          <p class="text-xs font-medium uppercase tracking-wide text-primary">
            {getKindLabel(selectedCertificate.kind)}
          </p>
          <h2 id="certificate-preview-title" class="truncate text-base font-semibold md:text-lg">
            {selectedCertificate.title}
          </h2>
          <p class="text-sm text-base-content/60">
            {selectedCertificate.issuer} · {formatDate(selectedCertificate.issuedAt)}
          </p>
        </div>

        <div class="certificate-preview__actions">
          <a
            class="btn btn-ghost btn-sm"
            href={selectedCertificate.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.openInNewTab}
          </a>
          {#if selectedCertificate.credentialUrl}
            <a
              class="btn btn-ghost btn-sm"
              href={selectedCertificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {labels.credential}
            </a>
          {/if}
          <div class="join">
            <button
              type="button"
              class="btn btn-sm join-item"
              on:click={zoomOut}
              disabled={zoom <= MIN_ZOOM}
              aria-label={labels.zoomOut}
            >
              -
            </button>
            <span class="join-item inline-flex min-w-16 items-center justify-center border border-base-300 px-3 text-sm">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              class="btn btn-sm join-item"
              on:click={zoomIn}
              disabled={zoom >= MAX_ZOOM}
              aria-label={labels.zoomIn}
            >
              +
            </button>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" on:click={closePreview}>
            {labels.close}
          </button>
        </div>
      </header>

      <div class="certificate-preview__scroller">
        <div
          class="certificate-preview__canvas"
          style={`width: ${zoom * 100}%; height: ${zoom * 78}vh;`}
        >
          <iframe
            title={selectedCertificate.title}
            src={getViewerSrc(selectedCertificate.fileUrl)}
            class="certificate-preview__frame"
            style={`width: ${100 / zoom}%; height: ${100 / zoom}%; transform: scale(${zoom});`}
          ></iframe>
        </div>
      </div>
    </section>
  </div>
{/if}

<style>
  .certificate-card {
    appearance: none;
    cursor: pointer;
  }

  .certificate-overlay {
    position: fixed;
    inset: 0;
    z-index: 9000;
    display: grid;
    place-items: center;
    padding: 4.5rem 1rem 1rem;
    background: rgb(0 0 0 / 0.72);
    backdrop-filter: blur(3px);
  }

  .certificate-overlay__hint {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    max-width: calc(100vw - 2rem);
    border-radius: 9999px;
    border: 1px solid rgb(255 255 255 / 0.18);
    background: rgb(0 0 0 / 0.62);
    color: white;
    box-shadow: 0 16px 38px rgb(0 0 0 / 0.28);
    padding: 0.65rem 1rem;
    text-align: center;
    font-size: 0.875rem;
    line-height: 1.25;
  }

  .certificate-preview {
    display: flex;
    flex-direction: column;
    width: min(1180px, 100%);
    height: min(86vh, 920px);
    overflow: hidden;
    border: 1px solid var(--color-base-300, rgb(255 255 255 / 0.18));
    border-radius: 0.5rem;
    background: var(--color-base-100, #111827);
    color: var(--color-base-content, white);
    box-shadow: 0 28px 70px rgb(0 0 0 / 0.38);
  }

  .certificate-preview__header {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.75rem;
    border-bottom: 1px solid var(--color-base-300, rgb(255 255 255 / 0.16));
    background: var(--color-base-200, #1f2937);
    padding: 0.85rem;
  }

  .certificate-preview__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .certificate-preview__scroller {
    flex: 1;
    min-height: 0;
    overflow: auto;
    background:
      linear-gradient(45deg, rgb(255 255 255 / 0.04) 25%, transparent 25%),
      linear-gradient(-45deg, rgb(255 255 255 / 0.04) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgb(255 255 255 / 0.04) 75%),
      linear-gradient(-45deg, transparent 75%, rgb(255 255 255 / 0.04) 75%);
    background-position: 0 0, 0 8px, 8px -8px, -8px 0;
    background-size: 16px 16px;
    padding: 1rem;
  }

  .certificate-preview__canvas {
    margin: 0 auto;
    min-width: 320px;
    min-height: 420px;
  }

  .certificate-preview__frame {
    display: block;
    transform-origin: top left;
    border: 0;
    border-radius: 0.35rem;
    background: white;
  }

  @media (min-width: 768px) {
    .certificate-preview__header {
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      padding: 0.85rem 1rem;
    }

    .certificate-preview__actions {
      justify-content: flex-end;
    }

  }
</style>
