import type { Core } from '@strapi/strapi';

const GITHUB_TOKEN = process.env.GITHUB_REBUILD_TOKEN;
const GITHUB_REPO = 'Nister37/MyPortfolio';
const WORKFLOW_FILE = 'deploy.yml';
const BRANCH = 'master';

async function triggerGitHubDeploy() {
  if (!GITHUB_TOKEN) {
    strapi.log.warn('[github-webhook] GITHUB_REBUILD_TOKEN is not set — skipping rebuild trigger.');
    return;
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ref: BRANCH }),
  });

  if (response.ok || response.status === 204) {
    strapi.log.info('[github-webhook] GitHub Pages rebuild triggered successfully.');
  } else {
    const text = await response.text();
    strapi.log.error(`[github-webhook] Failed to trigger rebuild: ${response.status} ${text}`);
  }
}

export default {
  register() {},

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Trigger a GitHub Pages rebuild whenever a blog post or project is published.
    const contentTypes = ['api::blog-post.blog-post', 'api::project.project'];

    for (const uid of contentTypes) {
      strapi.db.lifecycles.subscribe({
        models: [uid],
        async afterUpdate(event) {
          // Strapi sets publishedAt when the entry goes from draft → published.
          const wasJustPublished =
            event.result?.publishedAt && !event.params?.data?.publishedAt === false;

          if (wasJustPublished || event.params?.data?.publishedAt) {
            strapi.log.info(`[github-webhook] Detected publish on ${uid} — triggering rebuild.`);
            await triggerGitHubDeploy();
          }
        },
      });
    }
  },
};
