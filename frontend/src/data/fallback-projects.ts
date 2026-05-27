import type { Project } from "../lib/cms/projects";

export const fallbackProjects: Project[] = [
  {
    title: "Integration 4 CI/CD on Google Cloud",
    slug: "integration4-cicd-google-cloud",
    summary:
      "Full CI/CD pipeline on Google Cloud Platform for a Java microservices project with Docker, GitLab CI, and Compute Engine deployment.",
    categories: ["DevOps", "Backend"],
    stack: ["Java", "Spring Boot", "Docker", "GitLab CI", "Google Cloud", "Linux"],
    highlights: [
      "Blue-green deployment strategy with Docker Compose",
      "Automated GitLab CI pipeline from commit to live",
      "Nginx reverse proxy and health check automation",
    ],
    problem:
      "The project needed a repeatable, automated path from a developer pushing code to a running service on a cloud VM — with zero manual SSH steps.",
    myRole:
      "Set up the GitLab CI pipeline, configured the GCE instance, wrote the Docker Compose blue-green switch scripts, and set up Nginx as a reverse proxy with automated health checks.",
    hardestProblem:
      "Blue-green switching with Docker Compose required careful port management and a health check polling loop. Getting Nginx to reload cleanly during the switch without dropping in-flight requests took several iterations.",
    lessonsLearned:
      "Blue-green is simpler than it looks if you design for it from the start. The complexity comes from retrofitting it onto an existing setup. Starting with two named Compose services and a proxy reload script was the right approach.",
    featured: true,
    order: 2,
  },
  {
    title: "ServicePulse",
    slug: "servicepulse",
    summary:
      "Spring Boot HTTP endpoint monitor with check history, live dashboard, PostgreSQL persistence, Redis caching, Thymeleaf UI, Docker Compose setup, Caddy HTTPS reverse proxy, Adminer, GitLab CI, and GCP deployment scripts.",
    categories: ["Backend", "DevOps"],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker", "Thymeleaf", "Caddy", "GitLab CI", "Google Cloud"],
    highlights: [
      "Live dashboard with real-time endpoint check history",
      "Redis caching layer with PostgreSQL persistence",
      "Caddy HTTPS reverse proxy with Docker Compose and GCP deployment scripts",
    ],
    problem:
      "Services would go down silently with no automated visibility. Engineers needed a self-hosted monitor with a real dashboard, persistent history, and a production-grade deployment.",
    myRole:
      "Built the full stack: endpoint registry, scheduled checker, Thymeleaf dashboard, Redis caching, PostgreSQL persistence, Docker Compose setup, Caddy reverse proxy config, GitLab CI pipeline, and GCP deployment scripts.",
    lessonsLearned:
      "Caddy's automatic HTTPS makes reverse proxy setup dramatically simpler than Nginx for self-hosted projects. Redis as a read-through cache in front of PostgreSQL reduced dashboard query load significantly with minimal code.",
    githubUrl: "https://github.com/Nister37/ServicePulse",
    featured: true,
    order: 3,
  },
  {
    title: "Traffic Lights Management System",
    slug: "traffic-lights-management",
    summary:
      "Spring Boot web app for managing intersections, traffic lights, maintenance logs, and maintenance companies. Includes Thymeleaf MVC pages, REST APIs, PostgreSQL, Spring Security, AJAX, CSV import, caching, tests, and GitLab CI.",
    categories: ["Backend", "Web"],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Thymeleaf", "Spring Security", "GitLab CI"],
    highlights: [
      "Full CRUD for intersections, lights, maintenance logs, and companies",
      "CSV import, AJAX-driven UI updates, and Spring Security role-based access",
      "Caching, REST APIs, and a complete GitLab CI pipeline",
    ],
    problem:
      "Traffic infrastructure teams needed a centralised system to track intersections, monitor light status, log maintenance events, and manage contractor companies — all with proper access control.",
    myRole:
      "Built the full application: domain model, Thymeleaf MVC pages, REST endpoints, Spring Security configuration, CSV import, caching, and the GitLab CI pipeline.",
    lessonsLearned:
      "Mixing Thymeleaf MVC and REST APIs in a single Spring Boot app works well when the boundaries are clear. Spring Security's role-based access integrates naturally when security decisions are kept out of service logic.",
    githubUrl: "https://github.com/Nister37/TrafficLights",
    featured: true,
    order: 4,
  },
  {
    title: "KdGRides",
    slug: "kdgrides",
    summary:
      "Spring Boot ride-sharing and activity platform for KdG students, featuring travel groups, activities, real-time STOMP/WebSocket chat, voting, friendships, maps/routes, Google Calendar integration, OAuth2 login, PostgreSQL persistence, Thymeleaf UI, tests, Docker, and GitLab CI/CD.",
    categories: ["Backend", "Web"],
    stack: ["Java", "Spring Boot", "PostgreSQL", "WebSocket", "STOMP", "OAuth2", "Docker", "GitLab CI", "Thymeleaf"],
    highlights: [
      "Real-time group chat via STOMP/WebSocket with voting and friendship system",
      "Google Calendar integration and maps/routes for trip planning",
      "OAuth2 login, Docker containerisation, and a full GitLab CI/CD pipeline",
    ],
    problem:
      "KdG students lacked a dedicated platform to coordinate shared rides and group activities. Coordination happened ad-hoc over messaging apps with no structured planning or real-time collaboration.",
    myRole:
      "Contributed to the full stack: domain model, Thymeleaf pages, WebSocket chat, OAuth2 integration, Google Calendar sync, Docker setup, and CI/CD pipeline.",
    lessonsLearned:
      "STOMP over WebSocket requires careful session management to avoid ghost connections. Google Calendar OAuth2 flows need explicit token refresh handling — silent expiry is easy to miss in development but breaks production users.",
    githubUrl: "https://github.com/Nister37/KdGRides",
    featured: true,
    order: 5,
  },
  {
    title: "Roometrix",
    slug: "roometrix",
    summary:
      "Spring Boot IoT smart room monitoring platform for real-time temperature, humidity, CO₂, noise, TVOC and occupancy tracking. Includes analytics dashboards, threshold alerts, multi-room support, role-based access, device store/subscriptions, PostgreSQL, Thymeleaf, Bootstrap and Chart.js.",
    categories: ["IoT", "Backend"],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Thymeleaf", "Bootstrap", "Chart.js"],
    highlights: [
      "Real-time tracking of temperature, humidity, CO₂, noise, TVOC, and occupancy",
      "Analytics dashboards with Chart.js and threshold-based alerts",
      "Multi-room support, role-based access control, and device store/subscriptions",
    ],
    problem:
      "Smart buildings needed a unified platform to monitor environmental conditions across multiple rooms, surface threshold violations, and manage IoT device subscriptions — without requiring custom hardware expertise to operate.",
    myRole:
      "Built the sensor ingestion pipeline, analytics dashboard, threshold alert system, multi-room management, role-based access, and the device store/subscription flow.",
    lessonsLearned:
      "Chart.js works well for real-time sensor dashboards when polling intervals are kept conservative. Role-based access for multi-tenant IoT data needs to be modelled explicitly from the start — retrofitting it is expensive.",
    githubUrl: "https://github.com/Nister37/Roometrix-web-application",
    featured: false,
    order: 6,
  },
];
