export type Lang = "en" | "pl";

export const siteMetadata = {
  name: "Paweł Ryfiak",
  url: "https://pawelryfiak.is-a.dev",
  portfolioName: "Paweł Ryfiak — Portfolio",
  jobTitle: "Junior Software Engineer",
  defaultDescription:
    "Paweł Ryfiak — Junior Software Engineer focused on backend, automation, and practical DevOps.",
  personDescription:
    "Junior Software Engineer focused on backend systems, automation, and practical DevOps.",
  sameAs: [
    "https://github.com/Nister37",
    "https://www.linkedin.com/in/pawelryfiak2004/",
  ],
} as const;

export const layoutCopy = {
  en: {
    skipToContent: "Skip to content",
  },
  pl: {
    skipToContent: "Przejdź do treści",
  },
} as const satisfies Record<Lang, { skipToContent: string }>;

export const headerCopy = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      certificates: "Certificates",
      blog: "Blog",
      about: "About",
    },
    cvButton: "Download CV",
    cvDialogTitle:
      "Which language version of my CV would you like to download? 👀",
    cvEnglish: "English version",
    cvPolish: "Polish version",
    close: "Close",
    openNavigation: "Open navigation menu",
    closeNavigation: "Close navigation menu",
  },
  pl: {
    nav: {
      home: "Strona główna",
      projects: "Projekty",
      certificates: "Certyfikaty",
      blog: "Blog",
      about: "O mnie",
    },
    cvButton: "Pobierz CV",
    cvDialogTitle: "W jakiej wersji językowej chcesz pobrać moje CV? 👀",
    cvEnglish: "Wersja angielska",
    cvPolish: "Wersja polska",
    close: "Zamknij",
    openNavigation: "Otwórz menu nawigacji",
    closeNavigation: "Zamknij menu nawigacji",
  },
} as const satisfies Record<
  Lang,
  {
    nav: Record<
      "home" | "projects" | "certificates" | "blog" | "about",
      string
    >;
    cvButton: string;
    cvDialogTitle: string;
    cvEnglish: string;
    cvPolish: string;
    close: string;
    openNavigation: string;
    closeNavigation: string;
  }
>;

export const footerCopy = {
  en: {
    builtWith: "Built with Astro, Svelte, Tailwind CSS, and Strapi.",
  },
  pl: {
    builtWith: "Zbudowane przy użyciu Astro, Svelte, Tailwind CSS i Strapi.",
  },
} as const satisfies Record<Lang, { builtWith: string }>;

export const homeCopy = {
  en: {
    hero: {
      available: "Available for opportunities",
      subtitle:
        "Junior Software Engineer focused on backend, automation, and practical DevOps.",
      body: "I build Spring Boot systems, deployment pipelines, AI-assisted data extraction tools, and infrastructure scripts. Currently learning Astro, Svelte, Strapi, and modern frontend workflows by building this portfolio.",
      openTo:
        "Open to: IT internship, junior backend, automation, DevOps-oriented roles · Antwerp / remote / EU",
      viewProjects: "View projects",
      downloadCv: "Download CV",
    },
    skills: {
      heading: "Skills",
      subheading:
        "Select a domain to see technologies and hands-on experience.",
      legendHeading: "Experience legend",
      categoryLabels: {
        Backend: "Backend",
        DevOps: "DevOps",
        "AI & Automation": "AI & Automation",
        Frontend: "Frontend",
        Database: "Database",
      },
      levelLabels: [
        "0-5 months",
        "6+ months",
        "1+ year",
        "2+ years",
        "3+ years",
      ],
      meterTemplate: "of 5 experience bars",
      technologies: "technologies",
    },
    experience: {
      heading: "Experience & Education",
      subheading: "Most recent first. Select an item to see more details.",
      educationHeading: "Education and Professional Experience",
      projectsHeading: "Projects",
      labels: {
        moreDetails: "More details",
        education: "Education",
        project: "Project",
        work: "Work",
        readArticle: "Read article →",
        github: "GitHub →",
      },
    },
    blogPreview: {
      heading: "Recent Posts",
      subheading:
        "Technical writing on things I built, debugged, or learned the hard way.",
    },
    contact: {
      heading: "Get in touch",
      body: "I am open to IT internships, junior backend positions, automation roles, and DevOps-oriented opportunities. Based in Antwerp — available for remote and EU roles.",
      navLabel: "Contact links",
      emailLabel: "Send email",
    },
    featuredProjects: {
      heading: "Featured Projects",
      subheading:
        "A selection of real systems I built or contributed to significantly.",
      allProjects: "All projects ->",
    },
  },
  pl: {
    hero: {
      available: "OTWARTY NA STAŻE I ROLE JUNIORSKIE",
      subtitle:
        "Student Applied Computer Science — backend Java/Spring, automatyzacja i podstawy deploymentu.",
      body: "Tworzę aplikacje backendowe w Spring Boot, pracuję z bazami danych, REST API, Dockerem i Linuksem oraz buduję narzędzia automatyzujące powtarzalne procesy. Aktualnie uczę się Astro, Svelte, Strapi i nowoczesnego frontendu, budując to portfolio.",
      openTo:
        "Szukam: stażu programistycznego, roli junior backend lub zadań związanych z automatyzacją · Antwerpia / okolice Głogowa / zdalnie / UE",
      viewProjects: "Zobacz projekty",
      downloadCv: "Pobierz CV",
    },
    skills: {
      heading: "Umiejętności techniczne",
      subheading:
        "Wybierz obszar, aby zobaczyć technologie i czas doświadczenia.",
      legendHeading: "Legenda doświadczenia",
      categoryLabels: {
        Backend: "Backend",
        DevOps: "DevOps",
        "AI & Automation": "AI i automatyzacja",
        Frontend: "Frontend",
        Database: "Bazy danych",
      },
      levelLabels: [
        "0-5 miesięcy",
        "6+ miesięcy",
        "1+ rok",
        "2+ lata",
        "3+ lata",
      ],
      meterTemplate: "z 5 pasków doświadczenia",
      technologies: "technologii",
    },
    experience: {
      heading: "Doświadczenie i edukacja",
      subheading:
        "Najnowsze na górze. Wybierz wpis, aby zobaczyć więcej szczegółów.",
      educationHeading: "Edukacja i doświadczenie zawodowe",
      projectsHeading: "Projekty",
      labels: {
        moreDetails: "Więcej szczegółów",
        education: "Edukacja",
        project: "Projekt",
        work: "Praca",
        readArticle: "Przeczytaj artykuł →",
        github: "GitHub →",
      },
    },
    blogPreview: {
      heading: "Ostatnie wpisy",
      subheading:
        "Techniczne notatki o projektach, problemach i decyzjach, które pojawiły się podczas budowania aplikacji, automatyzacji i infrastruktury.",
    },
    contact: {
      heading: "Skontaktuj się",
      body: "Jestem otwarty na staże programistyczne, role junior backend, projekty automatyzacyjne oraz zadania związane z podstawami deploymentu. Obecnie mieszkam w Antwerpii, ale jestem dostępny także zdalnie oraz w Polsce.",
      navLabel: "Linki kontaktowe",
      emailLabel: "Wyślij e-mail",
    },
    featuredProjects: {
      heading: "Wyróżnione projekty",
      subheading:
        "Wybrane projekty, które zbudowałem lub znacząco współtworzyłem.",
      allProjects: "Wszystkie projekty ->",
    },
  },
} as const satisfies Record<Lang, unknown>;

export const pageCopy = {
  en: {
    home: {
      title: "Paweł Ryfiak | Java Backend Engineer",
      description:
        "Junior Software Engineer building Spring Boot APIs, Docker pipelines, and automation tools. Based in Antwerp — open to internship and junior backend roles in Belgium, Poland, or remote EU.",
    },
    about: {
      title: "About | Paweł Ryfiak",
      description:
        "Applied Computer Science student at Karel de Grote in Antwerp. Spring Boot, Docker, GitLab CI, and AI-assisted automation. Seeking IT internship or junior backend role.",
      heading: "About",
      intro:
        "I am a software engineering student at Karel de Grote Hogeschool in Antwerp, focused on backend systems, deployment automation, and practical infrastructure work.",
      paragraphs: [
        "My strongest area is Java and Spring Boot — building REST APIs, validation layers, JPA integrations, and running them inside Docker. I have shipped CI/CD pipelines on Google Cloud using GitLab CI, Nginx, and Compose-based blue-green deployments. Most recently I have been building AI-assisted data extraction tooling with Gemini and Spring Boot.",
        "I am expanding into modern frontend work — learning Astro, Svelte, Tailwind CSS, and Strapi — by building this portfolio from scratch. Not to become a frontend developer, but to understand the full deployment picture.",
        "I am looking for an IT internship or junior backend/automation role where I can contribute to a real codebase, learn from experienced engineers, and keep improving my DevOps and system design skills. Based in Antwerp, open to remote and EU roles.",
      ],
    },
    projects: {
      title: "Projects | Paweł Ryfiak",
      description:
        "Spring Boot microservices, GitLab CI/CD on Google Cloud, IoT sensor backends, and HTTP monitoring tools. Each project includes a case study with stack rationale and technical decisions.",
      heading: "Projects",
      intro:
        "Real systems and tools, not toy examples. Each entry links to a detailed case study with problem context, stack rationale, and technical decisions.",
    },
    blog: {
      title: "Blog | Paweł Ryfiak",
      description:
        "Short technical posts on Spring Boot, Docker, GitLab CI/CD, GitHub Actions, and lessons from real projects. Honest writing — not tutorials, just things that took time to figure out.",
      heading: "Blog",
      intro:
        "Short technical posts on backend engineering, deployment patterns, AI tooling, and things I wish I had found documented when I needed them.",
      empty: "Posts are coming soon.",
    },
    certificates: {
      title: "Certificates | Paweł Ryfiak",
      description:
        "Certificates and course completion PDFs with a searchable, filterable overview.",
      heading: "Certificates",
      intro:
        "Certificates, course completions, and supporting PDFs collected in one place. Filter by type or category, sort the list, and open each PDF in a focused preview.",
    },
    notFound: {
      title: "Page not found | Paweł Ryfiak",
      description: "The page you are looking for does not exist.",
      heading: "Page not found",
      body: "You're looking for something that doesn't exist.",
      home: "Go home",
    },
  },
  pl: {
    home: {
      title: "Paweł Ryfiak | Backend Java i DevOps",
      description:
        "Student informatyki stosowanej budujący backendy w Spring Boot, pipeline'y Docker i narzędzia automatyzujące. Otwarty na staż i role juniorskie w Belgii, Polsce lub zdalnie.",
    },
    about: {
      title: "O mnie | Paweł Ryfiak",
      description:
        "Student informatyki stosowanej na Karel de Grote w Antwerpii. Spring Boot, Docker, GitLab CI i automatyzacja AI. Szukam stażu programistycznego lub roli junior backend.",
      heading: "O mnie",
      intro:
        "Jestem studentem informatyki stosowanej na Karel de Grote Hogeschool w Antwerpii. Skupiam się na backendzie w Javie i Spring Boot, automatyzacji powtarzalnych procesów oraz podstawach deploymentu aplikacji.",
      paragraphs: [
        "Najpewniej czuję się w Javie i Spring Boot — projektuję REST API, warstwy walidacji, integracje z bazą danych przez JPA i uruchamiam aplikacje w Dockerze. Pracowałem też nad procesem CI/CD na Google Cloud z użyciem GitLab CI, Nginx i strategii blue-green deployment z Docker Compose.",
        "Równolegle uczę się nowoczesnego frontendu — Astro, Svelte, Tailwind CSS i Strapi — budując to portfolio od podstaw. Nie zamierzam zostać frontend developerem, ale chcę rozumieć cały proces wdrożenia aplikacji.",
        "Szukam stażu programistycznego lub roli junior backend / automatyzacja, w której będę mógł wnosić wkład do realnego kodu, uczyć się od bardziej doświadczonych inżynierów oraz rozwijać umiejętności w zakresie projektowania systemów i podstaw deploymentu. Obecnie mieszkam w Antwerpii, jestem dostępny zdalnie oraz w Polsce i UE.",
      ],
    },
    projects: {
      title: "Projekty | Paweł Ryfiak",
      description:
        "Backendy Spring Boot, CI/CD na Google Cloud, systemy IoT i narzędzie monitorujące HTTP. Każdy projekt zawiera studium przypadku z uzasadnieniem stosu i decyzjami technicznymi.",
      heading: "Projekty",
      intro:
        "Wybrane projekty i narzędzia. Każdy wpis zawiera szczegółowe studium przypadku z kontekstem problemu, uzasadnieniem stosu technologicznego i podjętymi decyzjami technicznymi.",
    },
    blog: {
      title: "Blog | Paweł Ryfiak",
      description:
        "Krótkie techniczne wpisy o Spring Boot, Dockerze, GitLab CI/CD i GitHub Actions. Nie tutoriale — rzeczy, których sam szukałem i których nie było dobrze udokumentowanych.",
      heading: "Blog",
      intro:
        "Krótkie techniczne wpisy o backendzie, wzorcach wdrożeniowych, narzędziach AI oraz o rzeczach, których brakowało mi w dokumentacji, gdy ich potrzebowałem.",
      empty: "Wpisy pojawią się wkrótce.",
    },
    certificates: {
      title: "Certyfikaty | Paweł Ryfiak",
      description:
        "Certyfikaty i potwierdzenia ukończenia kursów w PDF z filtrowaniem, sortowaniem i podglądem.",
      heading: "Certyfikaty",
      intro:
        "Certyfikaty, ukończone kursy i powiązane pliki PDF w jednym miejscu. Możesz filtrować je według typu lub kategorii, sortować listę i otwierać każdy PDF w pełnoekranowym podglądzie.",
    },
    notFound: {
      title: "Nie znaleziono strony | Paweł Ryfiak",
      description: "Strona, której szukasz, nie istnieje.",
      heading: "Nie znaleziono strony",
      body: "Szukasz czegoś, czego tutaj nie ma.",
      home: "Strona główna",
    },
  },
} as const satisfies Record<Lang, unknown>;

export const projectCardCopy = {
  en: {
    caseStudy: "Case study",
    showDetails: "Show details",
    hideDetails: "Hide details",
    liveDemo: "Live demo",
    groupProject: "Group project",
  },
  pl: {
    caseStudy: "Studium przypadku",
    showDetails: "Pokaż szczegóły",
    hideDetails: "Ukryj szczegóły",
    liveDemo: "Wersja live",
    groupProject: "Projekt grupowy",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export const projectDetailCopy = {
  en: {
    allProjects: "← All projects",
    technicalHighlights: "Technical highlights",
    problem: "Problem",
    myRole: "My role",
    architecture: "Architecture",
    hardestProblem: "Hardest technical problem",
    lessonsLearned: "What I learned",
    viewOnGitHub: "View on GitHub",
    liveDemo: "Live demo",
    groupProject: "Group project",
  },
  pl: {
    allProjects: "← Wszystkie projekty",
    technicalHighlights: "Najważniejsze aspekty techniczne",
    problem: "Problem",
    myRole: "Moja rola",
    architecture: "Architektura",
    hardestProblem: "Najtrudniejszy problem techniczny",
    lessonsLearned: "Wnioski",
    viewOnGitHub: "Zobacz na GitHub",
    liveDemo: "Demo na żywo",
    groupProject: "Projekt grupowy",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export const blogCopy = {
  en: {
    allPosts: "← All posts",
    minRead: "min read",
    fallbackContent:
      "Full article content will appear here once sourced from Strapi.",
  },
  pl: {
    allPosts: "← Wszystkie wpisy",
    minRead: "min czytania",
    fallbackContent: "Pełna treść artykułu pojawi się po pobraniu z Strapi.",
  },
} as const satisfies Record<Lang, Record<string, string>>;
