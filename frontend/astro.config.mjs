// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://pawelryfiak.is-a.dev",
  integrations: [svelte(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});