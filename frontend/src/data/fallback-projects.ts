import type { Project } from "../lib/cms/projects";

export const fallbackProjects: Project[] = [
  {
    title: "Gazetkomania AI Flyer Extraction",
    slug: "gazetkomania-ai-flyer-extraction",
    summary:
      "AI-assisted extraction pipeline for grocery flyer offers with multi-pass Gemini validation and structured PostgreSQL persistence.",
    categories: ["AI", "Backend", "Automation"],
    stack: ["Java", "Spring Boot", "Gemini", "Docker", "PostgreSQL", "MinIO"],
    highlights: [
      "Multi-pass Gemini extraction with confidence scoring",
      "Bounding-box based offer clustering to deduplicate entries",
      "Price sanity checks and manual correction flow",
    ],
    problem:
      "Grocery flyer screenshots contain dozens of offers in varying layouts. Manual data entry is slow and error-prone. The goal was to extract structured offer data automatically from images at scale.",
    myRole:
      "Designed and built the full extraction pipeline: image intake, Gemini prompt chain, clustering algorithm, sanity validation, PostgreSQL persistence, and the manual correction REST API.",
    hardestProblem:
      "Gemini would confidently return malformed or hallucinated prices. Solving this required a multi-pass approach: a first pass to extract raw text, a second to validate structure, and a sanity layer to flag outlier prices against historical averages.",
    lessonsLearned:
      "AI models are not reliable parsers. You need deterministic validation layers around them. Bounding-box overlap detection solved the deduplication problem far more reliably than trying to teach the model to deduplicate itself.",
    featured: true,
    order: 1,
  },
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
    title: "ServicePulse Link Monitor",
    slug: "servicepulse-link-monitor",
    summary:
      "Scheduled link monitoring service that checks HTTP endpoints on a configurable schedule and alerts on failures.",
    categories: ["Backend", "Automation"],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    highlights: [
      "Configurable check interval per monitored endpoint",
      "Persistent failure history with timestamp logging",
      "Email alert integration on consecutive failures",
    ],
    problem:
      "Development and staging services would go down silently. There was no automated way to know a service was unreachable until someone tried to use it.",
    myRole:
      "Built the full service: endpoint registry, scheduled checker, persistence layer, and email alerting with configurable failure threshold.",
    lessonsLearned:
      "Simple tools solve real problems. A 200-line Spring Boot service with a scheduled task and SMTP integration is enough for most monitoring needs. Reaching for a full observability stack (Prometheus, Grafana) would have been overkill at this scale.",
    featured: true,
    order: 3,
  },
  {
    title: "Roometrix IoT Air Quality System",
    slug: "roometrix-iot-air-quality",
    summary:
      "IoT system that collects air quality sensor readings and visualises CO2, temperature, and humidity trends in real time.",
    categories: ["IoT", "Backend"],
    stack: ["Java", "Spring Boot", "MQTT", "PostgreSQL", "Docker"],
    highlights: [
      "MQTT broker integration for sensor data ingestion",
      "Time-series storage with threshold alerting",
      "REST API for dashboard consumption",
    ],
    problem:
      "Classrooms and shared workspaces had no visibility into air quality. High CO2 levels affect concentration and health but are invisible without instrumentation.",
    myRole:
      "Built the MQTT ingestion layer, defined the database schema for time-series sensor reads, implemented threshold alerting, and designed the REST API consumed by the dashboard.",
    lessonsLearned:
      "MQTT is the right protocol for this kind of sensor data: lightweight, pub/sub, and works well over flaky connections. The main challenge was designing the time-series schema to be queryable efficiently for range-based dashboard queries.",
    featured: false,
    order: 4,
  },
];
