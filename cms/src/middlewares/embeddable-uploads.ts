import type { Core } from "@strapi/strapi";

const FRAME_ANCESTORS = [
  "'self'",
  "https://pawelryfiak.is-a.dev",
  "https://nister37.github.io",
];

const config: Core.MiddlewareFactory = () => async (ctx, next) => {
  await next();

  if (!ctx.path.startsWith("/uploads/")) return;

  // Uploaded PDFs are previewed by the static portfolio in an iframe.
  // Keep Strapi admin pages protected by limiting this exception to media files.
  ctx.remove("X-Frame-Options");

  const contentSecurityPolicy = ctx.response.get("Content-Security-Policy");
  if (!contentSecurityPolicy) return;

  const frameAncestors = `frame-ancestors ${FRAME_ANCESTORS.join(" ")}`;
  const updatedPolicy = contentSecurityPolicy.includes("frame-ancestors")
    ? contentSecurityPolicy.replace(/frame-ancestors [^;]+/, frameAncestors)
    : `${contentSecurityPolicy};${frameAncestors}`;

  ctx.set("Content-Security-Policy", updatedPolicy);
};

export default config;
