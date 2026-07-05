import { fallbackCertificates } from "../../data/fallback-certificates";
import { fetchFromStrapi, resolveStrapiMediaUrl } from "./strapi";

export type CertificateLanguage = "en" | "pl";
export type CertificateKind = "certificate" | "course";

export type Certificate = {
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
  language: CertificateLanguage;
  order?: number;
};

type StrapiMediaItem = {
  url?: string;
  name?: string;
  mime?: string;
};

type StrapiMediaField =
  | StrapiMediaItem
  | {
      data: null | {
        attributes?: StrapiMediaItem;
      };
    }
  | null;

type StrapiCertificateItem = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  issuer: string;
  kind?: CertificateKind;
  category?: string;
  summary?: string;
  issuedAt?: string;
  skills?: string[];
  pdf?: StrapiMediaField;
  credentialUrl?: string;
  language?: CertificateLanguage;
  order?: number;
};

type StrapiListResponse = {
  data: StrapiCertificateItem[];
};

function getMediaItem(media?: StrapiMediaField): StrapiMediaItem | undefined {
  if (!media) return undefined;
  if ("data" in media) return media.data?.attributes;
  return media;
}

function toCertificate(item: StrapiCertificateItem): Certificate | undefined {
  const pdf = getMediaItem(item.pdf);
  const fileUrl = resolveStrapiMediaUrl(pdf?.url);

  if (!fileUrl) {
    console.warn(
      `Certificate "${item.title}" has no PDF media attached; skipping.`,
    );
    return undefined;
  }

  return {
    title: item.title,
    slug: item.slug,
    issuer: item.issuer,
    kind: item.kind ?? "certificate",
    category: item.category ?? "General",
    summary: item.summary,
    issuedAt: item.issuedAt,
    skills: item.skills ?? [],
    fileUrl,
    fileName: pdf?.name,
    fileMime: pdf?.mime,
    credentialUrl: item.credentialUrl,
    language: item.language ?? "en",
    order: item.order,
  };
}

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const result = await fetchFromStrapi<StrapiListResponse>({
      path: "certificates",
      query: "?populate=pdf&sort[0]=order:asc&sort[1]=issuedAt:desc",
    });

    return result.data.flatMap((item) => {
      const certificate = toCertificate(item);
      return certificate ? [certificate] : [];
    });
  } catch (error) {
    console.warn(
      "Strapi unavailable - using fallback certificate data.",
      error,
    );
    return fallbackCertificates;
  }
}

export async function getCertificatesByLanguage(
  lang: CertificateLanguage,
): Promise<Certificate[]> {
  const certificates = await getCertificates();
  return certificates.filter((certificate) => certificate.language === lang);
}
