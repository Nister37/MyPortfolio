export type Lang = "en" | "pl";

export const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      blog: "Blog",
      about: "About",
      downloadCv: "Download CV",
    },
    hero: {
      available: "Available for opportunities",
      role: "Junior Software Engineer focused on backend, automation, and practical DevOps.",
      description:
        "I build Spring Boot systems, deployment pipelines, and infrastructure scripts. Currently studying Applied Computer Science at Karel de Grote Hogeschool in Antwerp.",
      openTo: "Open to: IT internship, junior backend, automation, DevOps-oriented roles • Antwerp / remote / EU",
      viewProjects: "View Projects",
      readBlog: "Read Blog",
    },
    skills: {
      title: "Technical Skills",
      subtitle: "Technologies I work with regularly, grouped by domain.",
      strong: "Strong",
      good: "Good",
      learning: "Learning",
    },
    experience: {
      title: "Experience & Education",
      subtitle: "Key projects and milestones, most recent first.",
      types: {
        Education: "Education",
        Project: "Project",
        Work: "Work",
        Hackathon: "Hackathon",
      },
    },
    projects: {
      title: "Featured Projects",
      subtitle: "A selection of things I've built.",
      viewAll: "View all projects →",
      allTitle: "Projects",
      allSubtitle: "Everything I've built, filterable by category.",
      stack: "Stack",
      highlights: "Highlights",
      problem: "The Problem",
      myRole: "My Role",
      architecture: "Architecture",
      hardestProblem: "Hardest Problem",
      lessonsLearned: "Lessons Learned",
      viewCode: "View Code",
      viewLive: "View Live",
      backToProjects: "← Back to projects",
    },
    blog: {
      title: "From the Blog",
      subtitle: "Practical notes on engineering decisions.",
      readMore: "Read more →",
      viewAll: "View all posts →",
      allTitle: "Blog",
      allSubtitle: "Notes on backend engineering, DevOps, and lessons from real projects.",
      backToBlog: "← Back to blog",
      publishedOn: "Published",
      minuteRead: "min read",
    },
    contact: {
      title: "Want to work together?",
      subtitle:
        "I'm actively looking for internship, junior backend, or DevOps-oriented roles. If you have a project or opportunity that fits, let's talk.",
      emailMe: "Email Me",
      downloadCv: "Download CV",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with Astro, Svelte & daisyUI.",
    },
    about: {
      title: "About Me",
      bio: "I'm Pawel Ryfiak, a software engineering student at Karel de Grote Hogeschool in Antwerp. I focus on backend development, CI/CD automation, and practical infrastructure work.",
    },
    notFound: {
      title: "Page not found",
      message: "The page you're looking for doesn't exist or has been moved.",
      goHome: "Go home",
      viewProjects: "View projects",
    },
  },
  pl: {
    nav: {
      home: "Strona główna",
      projects: "Projekty",
      blog: "Blog",
      about: "O mnie",
      downloadCv: "Pobierz CV",
    },
    hero: {
      available: "Otwarty na oferty pracy",
      role: "Junior Software Engineer — backend, automatyzacja i praktyczny DevOps.",
      description:
        "Tworzę systemy Spring Boot, pipeline'y wdrożeniowe i skrypty infrastrukturalne. Aktualnie studiuję Informatykę Stosowaną na Karel de Grote Hogeschool w Antwerpii.",
      openTo: "Szukam: stażu IT, stanowiska junior backend, automatyzacja, DevOps • Antwerpia / zdalnie / UE",
      viewProjects: "Zobacz projekty",
      readBlog: "Czytaj blog",
    },
    skills: {
      title: "Umiejętności techniczne",
      subtitle: "Technologie, z którymi pracuję regularnie, pogrupowane według dziedziny.",
      strong: "Biegły",
      good: "Dobry",
      learning: "Uczę się",
    },
    experience: {
      title: "Doświadczenie i edukacja",
      subtitle: "Najważniejsze projekty i kamienie milowe, od najnowszych.",
      types: {
        Education: "Edukacja",
        Project: "Projekt",
        Work: "Praca",
        Hackathon: "Hackathon",
      },
    },
    projects: {
      title: "Wybrane projekty",
      subtitle: "Rzeczy, które zbudowałem.",
      viewAll: "Zobacz wszystkie projekty →",
      allTitle: "Projekty",
      allSubtitle: "Wszystko, co zbudowałem, filtrowane według kategorii.",
      stack: "Technologie",
      highlights: "Kluczowe funkcje",
      problem: "Problem",
      myRole: "Moja rola",
      architecture: "Architektura",
      hardestProblem: "Najtrudniejszy problem",
      lessonsLearned: "Wnioski",
      viewCode: "Kod źródłowy",
      viewLive: "Zobacz na żywo",
      backToProjects: "← Wróć do projektów",
    },
    blog: {
      title: "Z bloga",
      subtitle: "Praktyczne notatki o decyzjach inżynierskich.",
      readMore: "Czytaj więcej →",
      viewAll: "Zobacz wszystkie wpisy →",
      allTitle: "Blog",
      allSubtitle: "Notatki o backendzie, DevOps i wnioski z realnych projektów.",
      backToBlog: "← Wróć do bloga",
      publishedOn: "Opublikowano",
      minuteRead: "min czytania",
    },
    contact: {
      title: "Chcesz współpracować?",
      subtitle:
        "Aktywnie szukam stażu, stanowiska junior backend lub roli DevOps. Jeśli masz projekt lub ofertę — napisz.",
      emailMe: "Napisz do mnie",
      downloadCv: "Pobierz CV",
    },
    footer: {
      rights: "Wszelkie prawa zastrzeżone.",
      builtWith: "Zbudowane z Astro, Svelte i daisyUI.",
    },
    about: {
      title: "O mnie",
      bio: "Jestem Pawel Ryfiak, student informatyki stosowanej na Karel de Grote Hogeschool w Antwerpii. Skupiam się na backendzie, automatyzacji CI/CD i praktycznej pracy z infrastrukturą.",
    },
    notFound: {
      title: "Strona nie istnieje",
      message: "Strona, której szukasz, nie istnieje lub została przeniesiona.",
      goHome: "Strona główna",
      viewProjects: "Zobacz projekty",
    },
  },
} as const;

export function t(lang: Lang) {
  return translations[lang];
}

