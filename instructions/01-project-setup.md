# 01 - Project Setup

## Prerequisites

Install:

- Git
- Bun
- Node.js LTS or current stable
- IDE: IntelliJ IDEA / WebStorm / VS Code
- Optional: Docker Desktop or Docker Engine

Verify:

```bash
git --version
bun --version
node --version
npm --version
```

## Create repository

```bash
mkdir portfolio
cd portfolio
git init
```

Create this structure:

```bash
mkdir frontend cms docs
```

Add root `.gitignore`:

```gitignore
# dependencies
node_modules/

# builds
dist/
.astro/
.output/

# env
.env
.env.*
!.env.example

# logs
*.log

# OS/IDE
.DS_Store
.idea/
.vscode/

# Strapi
cms/.tmp/
cms/build/
cms/dist/
cms/public/uploads/*
!cms/public/uploads/.gitkeep
```

## Root README

Create `README.md`:

```md
# Portfolio

Personal portfolio built with Astro, Svelte, Tailwind CSS, daisyUI, Sass, Bun, GitHub Pages, and Strapi CMS.

## Apps

- `frontend/` - static Astro portfolio
- `cms/` - Strapi CMS and admin panel
```

Commit:

```bash
git add .
git commit -m "chore: initialize portfolio monorepo"
```

## Scaffold Astro frontend

```bash
cd frontend
bun create astro@latest .
```

Recommended Astro choices:

```txt
Template: Empty or minimal
TypeScript: Yes
Install dependencies: Yes
Git repository: No, because root repo already exists
```

Add Svelte and MDX:

```bash
bunx astro add svelte
bunx astro add mdx
```

Install styling and UI packages:

```bash
bun add -D tailwindcss @tailwindcss/vite daisyui sass
bun add lucide-svelte motion
bun add -D @iconify-json/devicon @iconify-json/simple-icons
```

If `lucide-svelte` causes compatibility issues later, replace it with SVG icons or Iconify.

## Configure Tailwind CSS v4

Update `frontend/astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [svelte(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

Create `frontend/src/styles/global.css`:

```css
@import "tailwindcss";
@plugin "daisyui";

@plugin "daisyui/theme" {
  name: "portfolio-dark";
  default: true;
  prefersdark: true;
  color-scheme: dark;

  --color-base-100: oklch(14% 0.02 260);
  --color-base-200: oklch(18% 0.025 260);
  --color-base-300: oklch(23% 0.03 260);
  --color-base-content: oklch(92% 0.01 260);

  --color-primary: oklch(70% 0.16 250);
  --color-secondary: oklch(70% 0.14 180);
  --color-accent: oklch(75% 0.15 80);
  --color-neutral: oklch(25% 0.02 260);
}
```

Create `frontend/src/styles/custom.scss`:

```scss
:root {
  --section-max-width: 1120px;
  --section-padding-inline: 1rem;
}

.prose-portfolio {
  line-height: 1.75;

  h2 {
    margin-top: 2.5rem;
  }

  pre {
    border-radius: 1rem;
    overflow-x: auto;
  }
}
```

Import styles in the main layout, not randomly in many components.

## Create base layout

Create `frontend/src/layouts/BaseLayout.astro`:

```astro
---
import "../styles/global.css";
import "../styles/custom.scss";

interface Props {
  title: string;
  description?: string;
}

const {
  title,
  description = "Portfolio website"
} = Astro.props;
---

<!doctype html>
<html lang="en" data-theme="portfolio-dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen bg-base-100 text-base-content antialiased">
    <slot />
  </body>
</html>
```

Commit:

```bash
git add .
git commit -m "chore: scaffold astro frontend with svelte and mdx"
```

## Add scripts

In `frontend/package.json`, check scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

Run:

```bash
bun run dev
bun run build
```

Commit:

```bash
git add .
git commit -m "chore: configure tailwind daisyui sass and base layout"
```
