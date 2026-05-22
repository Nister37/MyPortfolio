// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://pawelryfiak.is-a.dev",
  base: "/",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [svelte(), mdx(), sitemap({
    i18n: {
      defaultLocale: "en",
      locales: {
        en: "en-GB",
        pl: "pl-PL",
      },
    },
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});