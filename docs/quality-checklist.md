# Portfolio Quality Checklist

Use this before sharing the portfolio URL publicly or adding it to a CV.

## Technical

Run from `frontend/`:

```bash
bun install
bun run check   # 0 TypeScript errors, 0 warnings
bun run build   # all static pages generate without error
bun run preview # smoke-test locally
```

- [ ] `bun run check` — 0 errors, 0 warnings
- [ ] `bun run build` — completes without errors
- [ ] All project routes generate (`/projects/[slug]`)
- [ ] All blog routes generate (`/blog/[slug]`)
- [ ] No broken internal links
- [ ] No console errors on homepage load
- [ ] No missing images (check Network tab)

## CMS

Run from `cms/`:

```bash
npm run develop
```

- [ ] Admin panel opens at `http://localhost:1337/admin`
- [ ] Admin user can log in
- [ ] All content types visible: Project, BlogPost, Skill, Experience, SiteSettings
- [ ] At least one project entry published
- [ ] At least one blog post entry published
- [ ] API returns JSON: `GET /api/projects?populate=*`
- [ ] Frontend picks up CMS data when `STRAPI_URL` is set

## GitHub Pages

- [ ] `astro.config.mjs` has correct `site` set to the public URL
- [ ] `base` is set if repo name is not `<username>.github.io`
- [ ] GitHub Actions workflow passes on push to `main`
- [ ] Public URL loads without 404
- [ ] CSS and fonts load on the deployed URL
- [ ] Navigation links work on the deployed URL
- [ ] Direct page refresh on `/projects/gazetkomania` works (Astro static output handles this)

## Content

### Homepage

- [ ] Name and current role are immediately visible
- [ ] Availability or open-to-work status is clear
- [ ] At least one contact button visible above the fold on mobile
- [ ] GitHub and LinkedIn links in footer
- [ ] CV link works **or** is removed until the file is ready

### Projects

- [ ] At least 3 projects with real detail
- [ ] Each project has: problem, role, tech stack, at least one highlight
- [ ] No projects described as "demo only" if presenting to recruiters
- [ ] Screenshots or diagrams present where they add value

### Blog

- [ ] At least 2 posts with real article content (not placeholder text)
- [ ] Posts are based on actual experience
- [ ] `content` field populated — no "Full article content will appear here" fallback message visible

## Recruiter check (30-second test)

Ask someone unfamiliar with the project to view the homepage for 30 seconds, then ask:

- Who is this person?
- What kind of role are they looking for?
- What have they built?
- How do I contact them?

All four answers should be clear without scrolling to the bottom.

## UI/UX

- [ ] Consistent spacing between sections on desktop
- [ ] No horizontal scroll on mobile (375 px viewport)
- [ ] Mobile drawer navigation opens and closes correctly
- [ ] Cards and badges align properly
- [ ] Text is readable (sufficient contrast against dark background)
- [ ] All buttons look interactive (hover state visible)
- [ ] No overwhelming skill-logo wall or fake progress bars

## Accessibility

- [ ] One `<h1>` per page
- [ ] Headings follow logical order (h1 → h2 → h3, no skips)
- [ ] All images have non-empty `alt` text
- [ ] All interactive elements reachable by Tab key
- [ ] Focus ring visible on keyboard navigation
- [ ] Skip-to-content link works (visible on focus, jumps to `#main-content`)
- [ ] Section reveal animations respect `prefers-reduced-motion`

## Performance

- [ ] Screenshots compressed to ≤ 200 KB each (use `.webp`)
- [ ] No heavy client-side JS loaded for static sections
- [ ] Svelte used only for the `ProjectFilter` interactive island
- [ ] No large animation library imported globally

## Security

- [ ] No `.env` file committed (`git ls-files | grep -E '\.env$'` returns nothing)
- [ ] Strapi API token not prefixed with `PUBLIC_` (would expose it to the browser)
- [ ] No admin credentials anywhere in committed files
- [ ] `.env.example` present in both `frontend/` and `cms/`

## Final sign-off

```
[ ] Homepage complete
[ ] 3+ project case studies with real content
[ ] Blog has at least 2 posts with full article text
[ ] Contact methods all work
[ ] CV download link works or is removed
[ ] GitHub and LinkedIn links verified
[ ] Mobile layout verified on 375 px viewport
[ ] GitHub Pages deployment passes
[ ] No broken image paths on deployed URL
[ ] No placeholder lorem ipsum or "coming soon" text visible
```

