# 03 - Strapi CMS and Admin Panel

## Core rule

Strapi is not part of GitHub Pages.

Your portfolio frontend is static. Strapi must run separately:

```txt
GitHub Pages = static frontend
Strapi = CMS backend + admin panel
```

## Local Strapi setup

From repository root:

```bash
cd cms
npx create-strapi@latest .
```

Why `npx` here?

Strapi's official CLI flow is based around its own generator. You can still use Bun for the Astro frontend and root tooling, but do not waste time fighting the CMS generator if the official Strapi setup expects Node/npm behavior.

Recommended local choices:

```txt
Database: SQLite for local MVP
TypeScript: Yes, if available
Install dependencies: Yes
Start Strapi: Yes
```

Start Strapi:

```bash
cd cms
npm run develop
```

Admin panel:

```txt
http://localhost:1337/admin
```

Create your first admin user.

Commit:

```bash
git add .
git commit -m "chore: scaffold strapi cms"
```

## Admin panel purpose

The Strapi admin panel should manage:

- Blog posts
- Projects
- Skills
- Experience entries
- Site settings
- Optional assets/media

It should not manage:

- Frontend layout
- Theme logic
- GitHub Pages deployment
- CV file generation in the MVP

## Development mode vs production mode

Use development mode when creating content types.

Use production mode when deployed.

The Content-Type Builder is mainly a development-time tool. For proper long-term work, content type definitions should be committed to Git so the schema is versioned.

## Environment file

Create `cms/.env.example`:

```env
HOST=0.0.0.0
PORT=1337

APP_KEYS=replace-me-1,replace-me-2,replace-me-3,replace-me-4
API_TOKEN_SALT=replace-me
ADMIN_JWT_SECRET=replace-me
TRANSFER_TOKEN_SALT=replace-me
JWT_SECRET=replace-me

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

Do not commit real secrets.

## Local admin workflow

```txt
1. Start Strapi.
2. Open /admin.
3. Add or edit project/blog content.
4. Publish entries.
5. Start Astro frontend.
6. Verify pages.
7. Build Astro.
8. Deploy static site.
```

## Public API permissions

For MVP you have two choices.

### Safer option: API token used only during build

Use an API token in GitHub Actions. Astro fetches content at build time. The token is not exposed to the browser if it is used only in server-side build code.

Recommended.

### Simpler option: public read permissions

Allow public read access to blog posts and projects.

Simpler, but less controlled.

For a portfolio, public read access is usually acceptable because blog/project content is public anyway. Still, never expose private fields.

## Strapi content must be published

If an entry is saved as draft but not published, your public API/build may not see it.

For every blog/project page:

```txt
Create -> Save -> Publish -> Rebuild frontend
```

## Media warning

Uploaded images need persistent storage.

For the MVP, easiest approach:

- Store important project screenshots in `frontend/public/images/projects/`.
- In Strapi, store only image path or URL.
- Add real Strapi upload provider later.

Avoid building the whole first version around Strapi media uploads unless you already know where production media files will live.

## Hosting Strapi later

If you want the admin panel online:

```txt
Strapi backend: Render / Railway / Strapi Cloud / VPS
Database: PostgreSQL
Frontend: GitHub Pages
```

Important:

- GitHub Pages stays frontend-only.
- Strapi must have environment variables.
- Production database should be PostgreSQL, not local SQLite.
- Media uploads need persistent storage or external provider.
- Free hosting may sleep or have limits.

## Production-like flow

```txt
You edit blog post in Strapi admin
        ↓
You publish content
        ↓
You manually trigger GitHub Actions workflow
        ↓
Astro fetches Strapi content at build time
        ↓
GitHub Pages deploys static portfolio
```

Later improvement:

```txt
Strapi webhook -> GitHub Actions workflow_dispatch -> automatic rebuild
```

Do webhook automation after the MVP, not before.
