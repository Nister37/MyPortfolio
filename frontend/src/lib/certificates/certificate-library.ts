import { derived, get, writable } from "svelte/store";
import type {
  Certificate,
  CertificateKind,
  CertificateLanguage,
} from "../cms/certificates";

export type CertificateSortKey = "newest" | "oldest" | "title" | "issuer";

const PREVIEW_EXIT_MS = 180;

const CERTIFICATE_LABELS = {
  pl: {
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
    showDetails: "Pokaż szczegóły",
    hideDetails: "Ukryj szczegóły",
    noDate: "Bez daty",
    openPdf: "Otwórz PDF",
    openInNewTab: "Otwórz w nowej karcie",
    close: "Zamknij",
    credential: "Poświadczenie",
    closeHint: "Naciśnij Esc lub kliknij tło, aby zamknąć podgląd.",
    empty: "Certyfikaty i kursy pojawią się wkrótce.",
    visibleCount: "Widoczne",
    of: "z",
  },
  en: {
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
    showDetails: "Show details",
    hideDetails: "Hide details",
    noDate: "No date",
    openPdf: "Open PDF",
    openInNewTab: "Open in new tab",
    close: "Close",
    credential: "Credential",
    closeHint: "Press Esc or click outside to close the preview.",
    empty: "Certificates and courses are coming soon.",
    visibleCount: "Showing",
    of: "of",
  },
} as const;

export type CertificateLabels =
  (typeof CERTIFICATE_LABELS)[CertificateLanguage];

function getDateTime(value?: string) {
  if (!value) return 0;

  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function compareCertificates(
  a: Certificate,
  b: Certificate,
  sortBy: CertificateSortKey,
  language: CertificateLanguage,
) {
  if (sortBy === "title") return a.title.localeCompare(b.title, language);
  if (sortBy === "issuer") return a.issuer.localeCompare(b.issuer, language);

  const aTime = getDateTime(a.issuedAt);
  const bTime = getDateTime(b.issuedAt);
  return sortBy === "oldest" ? aTime - bTime : bTime - aTime;
}

export function formatCertificateDate(
  value: string | undefined,
  language: CertificateLanguage,
  labels: CertificateLabels,
) {
  if (!value) return labels.noDate;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(language === "pl" ? "pl-PL" : "en-GB", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function getCertificateKindLabel(
  kind: string,
  labels: CertificateLabels,
) {
  if (kind === "certificate") return labels.certificate;
  if (kind === "course") return labels.course;
  return kind;
}

export function getCertificateViewerSrc(url: string) {
  if (url.includes("#")) return url;
  return `${url}#toolbar=1&navpanes=0&view=FitH`;
}

export function createCertificateLibrary() {
  const certificates = writable<Certificate[]>([]);
  const language = writable<CertificateLanguage>("en");
  const selectedKind = writable<CertificateKind | "all">("all");
  const selectedCategory = writable("all");
  const sortBy = writable<CertificateSortKey>("newest");
  const selectedCertificate = writable<Certificate | null>(null);
  const isClosingPreview = writable(false);

  const labels = derived(
    language,
    ($language) => CERTIFICATE_LABELS[$language],
  );
  const kindOptions = derived(certificates, ($certificates) => [
    "all" as const,
    ...new Set(
      $certificates.map((certificate) => certificate.kind).filter(Boolean),
    ),
  ]);
  const categoryOptions = derived(certificates, ($certificates) => [
    "all",
    ...new Set(
      $certificates.map((certificate) => certificate.category).filter(Boolean),
    ),
  ]);
  const sortOptions = derived(labels, ($labels) => [
    { value: "newest" as const, label: $labels.newest },
    { value: "oldest" as const, label: $labels.oldest },
    { value: "title" as const, label: $labels.title },
    { value: "issuer" as const, label: $labels.issuer },
  ]);
  const visibleCertificates = derived(
    [certificates, selectedKind, selectedCategory, sortBy, language],
    ([$certificates, $selectedKind, $selectedCategory, $sortBy, $language]) =>
      $certificates
        .filter(
          (certificate) =>
            $selectedKind === "all" || certificate.kind === $selectedKind,
        )
        .filter(
          (certificate) =>
            $selectedCategory === "all" ||
            certificate.category === $selectedCategory,
        )
        .slice()
        .sort((a, b) => compareCertificates(a, b, $sortBy, $language)),
  );

  let closePreviewTimeout: ReturnType<typeof setTimeout> | undefined;
  let previousBodyOverflow: string | null = null;

  function lockBodyScroll() {
    if (typeof document === "undefined" || previousBodyOverflow !== null)
      return;

    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  function restoreBodyScroll() {
    if (typeof document === "undefined" || previousBodyOverflow === null)
      return;

    document.body.style.overflow = previousBodyOverflow;
    previousBodyOverflow = null;
  }

  function setInput(
    nextCertificates: Certificate[],
    nextLanguage: CertificateLanguage,
  ) {
    certificates.set(nextCertificates);
    language.set(nextLanguage);
  }

  function openPreview(certificate: Certificate) {
    if (closePreviewTimeout) clearTimeout(closePreviewTimeout);

    selectedCertificate.set(certificate);
    isClosingPreview.set(false);
    lockBodyScroll();
  }

  function closePreview() {
    if (!get(selectedCertificate) || get(isClosingPreview)) return;

    isClosingPreview.set(true);
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    closePreviewTimeout = setTimeout(
      () => {
        selectedCertificate.set(null);
        isClosingPreview.set(false);
        closePreviewTimeout = undefined;
        restoreBodyScroll();
      },
      reducedMotion ? 0 : PREVIEW_EXIT_MS,
    );
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && get(selectedCertificate)) {
      closePreview();
    }
  }

  function destroy() {
    if (closePreviewTimeout) clearTimeout(closePreviewTimeout);
    restoreBodyScroll();
  }

  return {
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
    setInput,
    openPreview,
    closePreview,
    handleKeydown,
    destroy,
  };
}
