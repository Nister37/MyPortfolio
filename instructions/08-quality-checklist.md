# 08 - Quality Checklist

Use this before sharing the website.

## Technical checks

Run from `frontend/`:

```bash
bun install
bun run check
bun run build
bun run preview
```

Pass criteria:

- No TypeScript errors.
- No broken routes.
- No missing images.
- No console errors on homepage.
- Project pages generate.
- Blog pages generate.
- GitHub Pages deployment succeeds.

## CMS checks

Run from `cms/`:

```bash
npm run develop
```

Pass criteria:

- Admin panel opens.
- Admin user can log in.
- Project entries exist.
- Blog post entries exist.
- Entries are published.
- API returns expected data.
- Frontend can fetch data.

## GitHub Pages checks

Check:

- Correct public URL.
- CSS loads.
- Images load.
- Navigation links work.
- Direct page refresh works on `/projects/...` and `/blog/...`.
- Base path is correct if repo is not `username.github.io`.

## Content checks

Homepage:

- Name and role are clear.
- Availability is clear.
- Contact button visible.
- GitHub and LinkedIn visible.
- CV link works or is hidden until ready.

Projects:

- At least 3 strong projects.
- Each project has problem, solution, role, stack, proof.
- No fake/demo-only projects presented as production.
- Screenshots or diagrams included where possible.

Blog:

- At least 2 technical posts before promoting it.
- Posts are based on real experience.
- No generic tutorial filler.

## Recruiter check

A recruiter should understand within 30 seconds:

```txt
Who are you?
What role do you want?
What can you build?
Where is the proof?
How can they contact you?
```

If this is not clear, fix the homepage before adding more animations.

## UI/UX checks

- Consistent spacing.
- Cards align.
- Mobile menu works.
- Text is readable.
- Buttons look clickable.
- Links are not hidden.
- No excessive animations.
- No giant skill-logo wall.
- No fake progress bars.
- No overdecorated hero that hides content.

## Accessibility checks

- One `<h1>` per page.
- Headings are in logical order.
- Links have understandable labels.
- Buttons are used for actions.
- Images have alt text.
- Keyboard navigation works.
- Focus state is visible.
- Reduced motion is respected.

## Performance checks

- Compress large screenshots.
- Prefer `.webp` or optimized `.jpg`.
- Do not load heavy JS for static sections.
- Use Svelte only for interactive islands.
- Avoid huge animation libraries for basic transitions.
- Keep third-party scripts minimal.

## Security checks

- No `.env` committed.
- No Strapi API token exposed as `PUBLIC_`.
- No admin credentials in docs.
- No secret screenshots.
- No private repo links if not intended.
- Strapi admin URL not linked publicly unless intentionally deployed.

## Final sharing checklist

Before adding portfolio link to CV/LinkedIn:

```txt
[ ] Homepage complete
[ ] 3+ project case studies
[ ] Blog has real content or is hidden
[ ] Contact works
[ ] CV download works
[ ] GitHub links work
[ ] Mobile layout works
[ ] GitHub Pages deployment works
[ ] No broken image paths
[ ] No placeholder lorem ipsum
```
