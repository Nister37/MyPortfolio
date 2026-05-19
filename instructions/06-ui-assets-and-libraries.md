# 06 - UI Assets and Libraries

## Main UI stack

Use:

```txt
Tailwind CSS v4
daisyUI
Sass/SCSS
Lucide icons
Devicon icons
unDraw illustrations
Motion / Svelte motion
```

## daisyUI usage

Use daisyUI for:

- Navbar
- Buttons
- Cards
- Badges
- Timeline
- Drawer/mobile nav
- Modal/dialog
- Theme variables

Install:

```bash
cd frontend
bun add -D daisyui@latest
```

In `src/styles/global.css`:

```css
@import "tailwindcss";
@plugin "daisyui";
```

Good daisyUI components for portfolio:

```txt
btn
card
badge
navbar
timeline
drawer
collapse
modal
stats
tabs
breadcrumbs
```

Avoid using every component just because it exists.

## Sass/SCSS usage

Use Sass for:

- Typography/prose styling.
- Custom variables.
- Blog content styles.
- Small reusable patterns that are annoying in utility classes.

Do not use Sass to recreate Tailwind.

Example:

```scss
.prose-portfolio {
  h2 {
    scroll-margin-top: 6rem;
  }

  img {
    border-radius: 1rem;
  }

  code {
    font-size: 0.9em;
  }
}
```

## Lucide

Use Lucide for interface icons:

```txt
ExternalLink
Github
Linkedin
Mail
Download
Menu
Moon
Sun
ArrowRight
Code
Server
Database
Cloud
```

Install:

```bash
cd frontend
bun add lucide-svelte
```

Example:

```svelte
<script lang="ts">
  import { Github, Mail } from "lucide-svelte";
</script>

<a class="btn btn-outline" href="https://github.com/your-user">
  <Github size={18} />
  GitHub
</a>

<a class="btn btn-primary" href="mailto:your@email.com">
  <Mail size={18} />
  Contact
</a>
```

If Lucide Svelte creates build problems, fallback to inline SVGs or Iconify.

## Devicon

Use Devicon for tech stack icons:

```txt
Java
Spring
Docker
PostgreSQL
Git
GitLab
GitHub
Linux
TypeScript
Svelte
Astro
Tailwind
Redis
```

Recommended approach:

- Use icons sparingly.
- Pair icons with labels.
- Do not create a giant wall of logos.

Good skill card:

```txt
[Spring Boot icon] Spring Boot
Backend APIs, validation, JPA, testing
```

Bad skill card:

```txt
Logo only, no context
```

## unDraw

Use unDraw for:

- Subtle empty states.
- Blog placeholder illustration.
- Contact section illustration.
- Optional hero side graphic.

Avoid:

- Making the site look like a generic SaaS landing page.
- Using too many illustrations.
- Replacing real screenshots with generic images.

Better than unDraw for projects:

- Real screenshots.
- Architecture diagrams.
- Terminal screenshots.
- Pipeline screenshots.
- App screenshots.

## Motion

Use motion sparingly.

Good:

```txt
Subtle reveal
Card hover
Theme switch transition
Command palette open animation
```

Bad:

```txt
Every section flies in
Slow parallax
Animated background that distracts from projects
```

## Recommended npm package list

Frontend:

```bash
bun add @astrojs/svelte @astrojs/mdx svelte
bun add -D tailwindcss @tailwindcss/vite daisyui sass
bun add lucide-svelte motion
bun add -D @iconify-json/devicon @iconify-json/simple-icons
```

Optional quality tooling:

```bash
bun add -D prettier prettier-plugin-astro
```

Optional later:

```bash
bun add fuse.js
```

Use `fuse.js` only if you add client-side blog/project search.

## Visual system

Use a mature technical style:

```txt
Dark background
Light cards
Blue/cyan/green accent
Readable typography
Architecture screenshots
Code snippets
Badges
Minimal animation
```

Recommended color feeling:

```txt
base: deep slate / navy
primary: blue/cyan
secondary: green/teal
accent: amber or violet, used rarely
```

## UI rules

1. Make projects the visual priority.
2. Use screenshots before illustrations.
3. Use icons only with text labels.
4. Keep spacing consistent.
5. Keep buttons obvious.
6. One main CTA per section.
7. Mobile layout first.
8. Avoid fake skill bars.
9. Avoid excessive animations.
10. Prioritize proof over decoration.
