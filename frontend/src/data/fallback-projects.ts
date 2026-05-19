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
    featured: false,
    order: 4,
  },
];

