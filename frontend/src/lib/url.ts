/**
 * Resolved base URL with guaranteed trailing slash.
 * Defined once here so the `/MyPortfolio/` prefix is never hand-rolled in components.
 * Astro/Vite substitutes `import.meta.env.BASE_URL` at build time across all
 * `.astro`, `.ts`, and `.svelte` files, so this import is safe anywhere in `src/`.
 */
export const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");

