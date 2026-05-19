# 05 - GitHub Pages Deployment

## Important

Only deploy the Astro frontend to GitHub Pages.

Do not deploy Strapi to GitHub Pages.

## Astro config for GitHub Pages

If your repository is:

```txt
https://github.com/your-username/portfolio
```

and your site URL will be:

```txt
https://your-username.github.io/portfolio/
```

then set this in `frontend/astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://your-username.github.io",
  base: "/portfolio",
  integrations: [svelte(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

If your repository is named:

```txt
your-username.github.io
```

then the site will be:

```txt
https://your-username.github.io/
```

and you usually do not need `base`.

## Use correct asset paths

In Astro templates, prefer Astro-aware links and imports.

Be careful with hardcoded root paths:

```txt
/images/project.png
```

This can break when GitHub Pages uses a repository base path like `/portfolio`.

Better:

```astro
<img src={`${import.meta.env.BASE_URL}images/project.png`} alt="Project screenshot" />
```

Or use imported assets where possible.

## GitHub Actions workflow

Create:

```txt
.github/workflows/deploy.yml
```

At repository root:

```yaml
name: Deploy Portfolio Frontend to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: github-pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: frontend

    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Install, build, and upload Astro site
        uses: withastro/action@v6
        env:
          STRAPI_URL: ${{ secrets.STRAPI_URL }}
          STRAPI_API_TOKEN: ${{ secrets.STRAPI_API_TOKEN }}
        with:
          path: frontend
          package-manager: bun@latest
          node-version: 24
          build-cmd: bun run build
          out-dir: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## GitHub repository settings

In GitHub:

```txt
Repository -> Settings -> Pages -> Build and deployment -> Source: GitHub Actions
```

## GitHub secrets

Add these only if your build fetches hosted Strapi:

```txt
Repository -> Settings -> Secrets and variables -> Actions -> New repository secret
```

Secrets:

```txt
STRAPI_URL=https://your-strapi-backend.example.com
STRAPI_API_TOKEN=your-read-only-token
```

For local-only MVP, you will not be able to fetch local Strapi from GitHub Actions. In that case, use fallback content or commit generated/static content.

## Local test before pushing

From `frontend/`:

```bash
bun install
bun run build
bun run preview
```

Only push when build passes.

## Deployment commit

```bash
git add .
git commit -m "ci: deploy astro frontend to github pages"
git push origin main
```

## Common GitHub Pages problems

### Problem: CSS/assets broken

Likely cause:

```txt
Missing `base` in astro.config.mjs
```

Fix:

```js
base: "/repository-name"
```

### Problem: Build fails because Strapi is not reachable

Options:

1. Make Strapi public and set `STRAPI_URL`.
2. Use fallback data.
3. Build locally and deploy manually.
4. Host Strapi before enabling CMS build in CI.

### Problem: API token exposed

Likely cause:

```txt
You used PUBLIC_STRAPI_API_TOKEN
```

Fix:

```txt
Use STRAPI_API_TOKEN only in server/build-time code.
```

### Problem: Admin panel missing

Expected.

GitHub Pages only hosts frontend. Strapi admin is separate:

```txt
https://your-strapi-host.com/admin
```
