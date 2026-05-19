# 07 - Commit Work Plan

Use this as your implementation checklist.

Each item is designed as one commit or one small group of commits.

## Phase 0 - Repository foundation

### Commit 1

```bash
git commit -m "chore: initialize portfolio monorepo"
```

Work:

- Create root repository.
- Add `frontend/`, `cms/`, `docs/`.
- Add root README.
- Add `.gitignore`.

Definition of done:

- Empty monorepo exists.
- Git history starts cleanly.

---

## Phase 1 - Astro frontend foundation

### Commit 2

```bash
git commit -m "chore: scaffold astro frontend"
```

Work:

- Create Astro app in `frontend/`.
- Enable TypeScript.
- Confirm `bun run dev` works.

Definition of done:

- Astro homepage runs locally.
- No broken dependency state.

### Commit 3

```bash
git commit -m "chore: add svelte and mdx integrations"
```

Work:

- Add Svelte integration.
- Add MDX integration.
- Confirm build passes.

Definition of done:

- `.svelte` component can be rendered in Astro.
- `.mdx` page works.

### Commit 4

```bash
git commit -m "style: configure tailwind daisyui and sass"
```

Work:

- Install Tailwind v4.
- Configure `@tailwindcss/vite`.
- Add daisyUI.
- Add Sass.
- Create `global.css`.
- Create `custom.scss`.

Definition of done:

- Tailwind utilities work.
- daisyUI classes work.
- Sass file imports without error.

---

## Phase 2 - Base layout and navigation

### Commit 5

```bash
git commit -m "feat: add base layout header and footer"
```

Work:

- Create `BaseLayout.astro`.
- Create `Header.astro`.
- Create `Footer.astro`.
- Add basic navigation.

Definition of done:

- Layout is reused by pages.
- Header works on desktop and mobile.
- Footer contains GitHub, LinkedIn, email.

### Commit 6

```bash
git commit -m "feat: add homepage hero section"
```

Work:

- Create `Hero.astro`.
- Add name, role, short value proposition.
- Add CTA buttons.
- Add optional unDraw or technical illustration.

Definition of done:

- Visitor understands who you are within 5 seconds.
- Hero has clear project/contact buttons.

---

## Phase 3 - Portfolio content

### Commit 7

```bash
git commit -m "feat: add fallback project data"
```

Work:

- Create `fallback-projects.ts`.
- Add 3-5 real projects.
- Add stack, categories, summary, highlights.

Suggested projects:

- Gazetkomania AI Flyer Extraction
- Integration 4 CI/CD on Google Cloud
- ServicePulse Link Monitor
- Roometrix IoT Air Quality System
- WalkyBuddy AI Walking Routes, only if enough material exists

Definition of done:

- Project data is typed.
- No empty fake projects.

### Commit 8

```bash
git commit -m "feat: add featured projects section"
```

Work:

- Create `ProjectCard.astro`.
- Create `FeaturedProjects.astro`.
- Render top projects on homepage.

Definition of done:

- Homepage shows real projects.
- Each project links to a case study route.

### Commit 9

```bash
git commit -m "feat: add project listing and case study pages"
```

Work:

- Create `/projects`.
- Create `/projects/[slug]`.
- Use `getStaticPaths`.
- Add page layout.

Definition of done:

- Every project has a page.
- Build generates static project routes.

### Commit 10

```bash
git commit -m "feat: add svelte project filter"
```

Work:

- Create `ProjectFilter.svelte`.
- Filter projects by category.
- Use Astro island only on `/projects`.

Definition of done:

- Filtering works.
- JavaScript is used only where needed.

---

## Phase 4 - Skills, experience, and contact

### Commit 11

```bash
git commit -m "feat: add grouped skills section"
```

Work:

- Add skill categories.
- Add Devicon/Iconify keys or simple text icons.
- Group skills by Backend, DevOps, AI, Frontend, Databases.

Definition of done:

- Skills are readable.
- No fake percentage bars.

### Commit 12

```bash
git commit -m "feat: add experience and education timeline"
```

Work:

- Add KdG education.
- Add major project experience.
- Add technical focus.

Definition of done:

- Timeline is short and relevant.
- It does not read like a full CV.

### Commit 13

```bash
git commit -m "feat: add contact section and cv link"
```

Work:

- Add email link.
- Add GitHub and LinkedIn.
- Add CV download path.
- Add availability.

Definition of done:

- Recruiter can contact you in one click.
- CV link works or clearly says coming soon.

---

## Phase 5 - Strapi CMS

### Commit 14

```bash
git commit -m "chore: scaffold strapi cms"
```

Work:

- Create Strapi app in `cms/`.
- Run admin locally.
- Create first admin user.
- Add `.env.example`.

Definition of done:

- Strapi runs at `localhost:1337`.
- Admin panel works.

### Commit 15

```bash
git commit -m "feat: add strapi content models"
```

Work:

Create content types:

- Project
- BlogPost
- Skill
- Experience
- SiteSettings

Definition of done:

- Content type schemas are committed.
- Admin panel can create entries.

### Commit 16

```bash
git commit -m "feat: add strapi api client"
```

Work:

- Add `strapi.ts`.
- Add `getProjects()`.
- Add fallback behavior.
- Add environment variables.

Definition of done:

- Frontend can fetch projects from Strapi.
- Build does not fully die if fallback is enabled.

### Commit 17

```bash
git commit -m "feat: source projects from strapi"
```

Work:

- Replace static project loading with CMS loading.
- Keep fallback data.
- Verify project pages generate.

Definition of done:

- Published Strapi projects appear in Astro.
- Static fallback still exists.

---

## Phase 6 - Blog

### Commit 18

```bash
git commit -m "feat: add blog data model and api"
```

Work:

- Add Strapi BlogPost content.
- Add frontend `getPosts()`.
- Add fallback posts.

Definition of done:

- Blog posts can come from Strapi.
- Fallback posts exist.

### Commit 19

```bash
git commit -m "feat: add blog listing and article pages"
```

Work:

- Create `/blog`.
- Create `/blog/[slug]`.
- Add `BlogCard.astro`.
- Render content.

Definition of done:

- Blog listing works.
- Blog detail pages work.
- Build generates routes.

### Commit 20

```bash
git commit -m "content: add first technical blog posts"
```

Work:

Add 2-3 real posts:

- How I built this portfolio with Astro and Strapi
- What I learned from AI flyer extraction
- How I think about CI/CD for beginner-friendly projects

Definition of done:

- Blog has real technical writing.
- Posts are not generic AI filler.

---

## Phase 7 - Animation and polish

### Commit 21

```bash
git commit -m "feat: add subtle motion effects"
```

Work:

- Add section reveal.
- Add card hover.
- Add reduced-motion respect.

Definition of done:

- Animations are subtle.
- Site works fine without motion.

### Commit 22

```bash
git commit -m "style: polish responsive layout"
```

Work:

- Fix mobile spacing.
- Fix tablet layout.
- Fix large desktop max widths.
- Improve section rhythm.

Definition of done:

- Site looks good on mobile and desktop.
- No horizontal scroll.

### Commit 23

```bash
git commit -m "style: improve project case study presentation"
```

Work:

- Add screenshots.
- Add architecture diagram image.
- Add technical highlight cards.

Definition of done:

- Case studies look convincing.
- Projects show proof, not only text.

---

## Phase 8 - Deployment

### Commit 24

```bash
git commit -m "ci: deploy astro frontend to github pages"
```

Work:

- Add GitHub Actions workflow.
- Configure `site` and `base`.
- Enable GitHub Pages with Actions.

Definition of done:

- Push to `main` deploys frontend.
- Public URL works.

### Commit 25

```bash
git commit -m "docs: add local development and deployment guide"
```

Work:

- Add commands to README.
- Explain frontend and CMS startup.
- Explain build/deploy flow.

Definition of done:

- Another developer can run the project.

---

## Phase 9 - Quality checks

### Commit 26

```bash
git commit -m "test: add portfolio quality checklist"
```

Work:

- Add manual test checklist.
- Add accessibility checklist.
- Add performance checklist.
- Add content checklist.

Definition of done:

- You know what to verify before sharing the link.

### Commit 27

```bash
git commit -m "fix: resolve accessibility and performance issues"
```

Work:

- Fix headings.
- Fix alt text.
- Fix contrast.
- Compress images.
- Remove unused dependencies.

Definition of done:

- Site is ready to send with internship applications.

---

# Suggested branch flow

```bash
git checkout -b feature/frontend-foundation
git checkout -b feature/portfolio-content
git checkout -b feature/strapi-cms
git checkout -b feature/blog
git checkout -b feature/github-pages-deploy
```

For a solo portfolio, you can also work directly on `main`, but branches look more professional.

# Commit message style

Use:

```txt
chore: setup/config/tooling
feat: new user-visible feature
style: visual-only changes
fix: bug fixes
docs: documentation
content: portfolio/blog/project text
ci: GitHub Actions/deployment
test: checks/validation
```

Examples:

```txt
feat: add project case study pages
style: polish responsive project cards
ci: deploy astro frontend to github pages
content: add gazetkomania project case study
docs: document local strapi workflow
```
