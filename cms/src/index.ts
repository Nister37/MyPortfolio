import type { Core } from '@strapi/strapi';

const GITHUB_REPO = 'Nister37/MyPortfolio';
const WORKFLOW_FILE = 'deploy.yml';
const BRANCH = 'master';

// Avoid triggering multiple rebuilds when Strapi batches publish operations.
let rebuildScheduled = false;

async function triggerGitHubDeploy(strapiInstance: Core.Strapi) {
  const token = process.env.GITHUB_REBUILD_TOKEN;

  if (!token) {
    strapiInstance.log.warn('[github-webhook] GITHUB_REBUILD_TOKEN is not set — skipping rebuild.');
    return;
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ref: BRANCH }),
  });

  if (response.ok || response.status === 204) {
    strapiInstance.log.info('[github-webhook] GitHub Pages rebuild triggered.');
  } else {
    const text = await response.text();
    strapiInstance.log.error(`[github-webhook] Rebuild trigger failed: ${response.status} ${text}`);
  }
}

const WATCHED_UIDS = ['api::blog-post.blog-post', 'api::project.project'];

export default {
  register() {},

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Strapi v5 Document Service middleware — runs for every document action.
    strapi.documents.use(async (context, next) => {
      const result = await next();

      // Fire after a publish action on watched content types.
      if (context.action === 'publish' && WATCHED_UIDS.includes(context.uid as string)) {
        if (!rebuildScheduled) {
          rebuildScheduled = true;
          // Small delay so rapid consecutive publishes only trigger one rebuild.
          setTimeout(async () => {
            rebuildScheduled = false;
            await triggerGitHubDeploy(strapi);
          }, 3000);
        }
      }

      return result;
    });
  },
};
