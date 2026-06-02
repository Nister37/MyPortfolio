export const STRAPI_URL = import.meta.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = import.meta.env.STRAPI_API_TOKEN as string | undefined;

type FetchOptions = {
  path: string;
  query?: string;
};

export async function fetchFromStrapi<T>({ path, query = "" }: FetchOptions): Promise<T> {
  const url = `${STRAPI_URL}/api/${path}${query}`;

  const response = await fetch(url, {
    headers: STRAPI_API_TOKEN
      ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
      : {},
  });

  if (!response.ok) {
    throw new Error(
      `Strapi request failed: ${response.status} ${response.statusText} — ${url}`,
    );
  }

  return response.json() as Promise<T>;
}

export function resolveStrapiMediaUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;

  const root = STRAPI_URL.replace(/\/$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${root}${path}`;
}
