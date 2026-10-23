import type { Core } from "@strapi/strapi";

// CORS origins are read from the environment so no production URLs are hardcoded
// in source. Set CORS_ORIGIN_FRONTEND and CORS_ORIGIN_CMS in production.
const frontendOrigin = process.env.CORS_ORIGIN_FRONTEND ?? "http://localhost:4321";
const cmsOrigin = process.env.CORS_ORIGIN_CMS ?? "http://localhost:1337";

const config: Core.Config.Middlewares = [
  "strapi::logger",
  "strapi::errors",
  "global::embeddable-uploads",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "https:"],
          "media-src": ["'self'", "data:", "blob:", "https:"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      // Locked to the actual frontend and CMS origins.
      // DO NOT use '*' — that allows unauthenticated mutations from any origin.
      origin: [frontendOrigin, cmsOrigin],
      methods: ["GET", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

export default config;
