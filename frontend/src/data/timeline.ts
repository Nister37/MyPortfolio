import type { Lang } from "./site-copy";

export type TimelineEntryType = "Education" | "Project" | "Work";

export type TimelineEntry = {
  title: string;
  organization: string;
  period: string;
  type: TimelineEntryType;
  description?: string;
  /** When set, the entry links to /blog/{blogSlug}. */
  blogSlug?: string;
  /** When set without blogSlug, the entry links directly to this URL. */
  githubUrl?: string;
};

export function getTimelineEntries(lang: Lang): TimelineEntry[] {
  return [
    {
      title: "Integration 4 CI/CD on Google Cloud",
      organization: lang === "pl" ? "Projekt uczelniany" : "Academic project",
      period: "2026",
      type: "Project",
      description:
        lang === "pl"
          ? "Projekt wdrożeniowy obejmujący GitLab CI, Docker, Google Compute Engine, Nginx, HTTPS oraz strategię blue-green deployment. Skupiał się na automatyzacji deploymentu i ograniczeniu przestojów aplikacji."
          : "Full CI/CD pipeline on GCE with GitLab CI, Docker, and Nginx. Blue-green deployment strategy with automated health checks.",
    },
    {
      title: "ServicePulse",
      organization: lang === "pl" ? "Projekt własny" : "Personal project",
      period: "2026",
      type: "Project",
      githubUrl: "https://github.com/Nister37/ServicePulse",
      description:
        lang === "pl"
          ? "Aplikacja Spring Boot do monitorowania dostępności endpointów HTTP z historią sprawdzeń, live dashboardem, Redis, PostgreSQL, Thymeleaf UI, Docker Compose, reverse proxy Caddy, Adminer, GitLab CI i skryptami deployment na GCP."
          : "Spring Boot HTTP endpoint monitor with check history, live dashboard, PostgreSQL persistence, Redis caching, Thymeleaf UI, Docker Compose, Caddy HTTPS reverse proxy, Adminer, GitLab CI, and GCP deployment scripts.",
    },
    {
      title: "Traffic Lights Management System",
      organization: lang === "pl" ? "Projekt uczelniany" : "Academic project",
      period: "2026",
      type: "Project",
      githubUrl: "https://github.com/Nister37/TrafficLights",
      description:
        lang === "pl"
          ? "Aplikacja Spring Boot do zarządzania skrzyżowaniami, sygnalizatorami, dziennikami serwisowymi i firmami konserwacyjnymi. Thymeleaf MVC, REST API, PostgreSQL, Spring Security, AJAX, import CSV, cache, testy, GitLab CI."
          : "Spring Boot web app for managing intersections, traffic lights, maintenance logs, and maintenance companies. Thymeleaf MVC, REST APIs, PostgreSQL, Spring Security, AJAX, CSV import, caching, tests, and GitLab CI.",
    },
    {
      title: "KdGRides",
      organization: lang === "pl" ? "Projekt uczelniany" : "Academic project",
      period: "2026",
      type: "Project",
      githubUrl: "https://github.com/Nister37/KdGRides",
      description:
        lang === "pl"
          ? "Platforma Spring Boot do współdzielenia przejazdów i aktywności dla studentów KdG. Czat STOMP/WebSocket w czasie rzeczywistym, głosowania, znajomości, mapy, integracja z Google Calendar, OAuth2, Docker, GitLab CI/CD."
          : "Spring Boot ride-sharing and activity platform for KdG students. Real-time STOMP/WebSocket chat, voting, friendships, maps/routes, Google Calendar integration, OAuth2 login, PostgreSQL, Thymeleaf, Docker, and GitLab CI/CD.",
    },
    {
      title: "Roometrix",
      organization: lang === "pl" ? "Projekt uczelniany" : "Academic project",
      period: "2025",
      type: "Project",
      githubUrl: "https://github.com/Nister37/Roometrix-web-application",
      description:
        lang === "pl"
          ? "Platforma Spring Boot do monitorowania inteligentnych pomieszczeń w czasie rzeczywistym — temperatura, wilgotność, CO₂, hałas, TVOC i zajętość. Dashboardy analityczne, alerty progowe, wielopokojowa obsługa, RBAC, PostgreSQL, Bootstrap, Chart.js."
          : "Spring Boot IoT smart room monitoring platform for real-time temperature, humidity, CO₂, noise, TVOC and occupancy tracking. Analytics dashboards, threshold alerts, multi-room support, role-based access, PostgreSQL, Thymeleaf, Bootstrap and Chart.js.",
    },
    {
      title:
        lang === "pl" ? "Informatyka Stosowana" : "Applied Computer Science",
      organization:
        lang === "pl"
          ? "Karel de Grote Hogeschool, Antwerpia"
          : "Karel de Grote Hogeschool, Antwerp",
      period: lang === "pl" ? "2024 — obecnie" : "2024 — present",
      type: "Education",
      description:
        lang === "pl"
          ? "Studia anglojęzyczne skoncentrowane na tworzeniu aplikacji, bazach danych, analizie systemów, testowaniu, pracy zespołowej i praktycznych projektach programistycznych."
          : "Backend development, databases, networking, and project management. Focus on practical engineering over theory.",
    },
    {
      title: lang === "pl" ? "Staż programistyczny" : "Programming internship",
      organization: "NSI",
      period: "2022",
      type: "Work",
      description:
        lang === "pl"
          ? "Krótki staż zawodowy w trakcie nauki w technikum — pierwsze zetknięcie z pracą w środowisku IT."
          : "Short professional internship during secondary school — first exposure to working in an IT environment.",
    },
    {
      title: lang === "pl" ? "Technik programista" : "Programming Technician",
      organization:
        lang === "pl"
          ? "Zespół Szkół Politechnicznych w Głogowie"
          : "Polytechnic School Complex in Głogów, Poland",
      period: "2019 — 2024",
      type: "Education",
      description:
        lang === "pl"
          ? "Pięcioletnie technikum o profilu programistycznym. Podstawy programowania, baz danych, sieci komputerowych oraz egzaminy zawodowe INF.03 i INF.04."
          : "Five-year technical secondary school specialising in programming. Foundations of programming, databases, computer networks, and professional certifications INF.03 and INF.04.",
    },
  ];
}
