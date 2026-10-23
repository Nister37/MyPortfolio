export type Lang = "en" | "pl";

export const siteMetadata = {
  name: "Paweł Ryfiak",
  url: "https://pawelryfiak.is-a.dev",
  portfolioName: "Paweł Ryfiak — Portfolio",
  jobTitle: "Software Engineer",
  defaultDescription:
    "Paweł Ryfiak — Software Engineer building Java, Spring Boot, cloud, and automation projects.",
  personDescription:
    "Software Engineer focused on Java, Spring Boot, cloud deployments, and automation.",
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
    privacy:
      "Cookie-free analytics measure page views and selected link activations. No advertising profiles or form contents are collected.",
  },
  pl: {
    builtWith: "Zbudowane przy użyciu Astro, Svelte, Tailwind CSS i Strapi.",
    privacy:
      "Analityka bez plików cookie mierzy odsłony i wybrane kliknięcia. Nie tworzy profili reklamowych ani nie zbiera treści formularzy.",
  },
} as const satisfies Record<Lang, { builtWith: string; privacy: string }>;

export const homeCopy = {
  en: {
    hero: {
      headline: "Software Engineer | Java & Spring Boot | Cloud & Automation",
      headlineVariants: [
        "Full-Stack Developer | Backend-First Delivery",
        "Backend Developer | APIs, Data & Integrations",
        "Cloud & Automation Engineer | CI/CD & Containers",
      ],
      summary:
        "I build backend applications, automate deployments, and turn complex technical problems into working software.",
      body: "I'm an Applied Computer Science student in Antwerp with hands-on experience developing Spring Boot systems, building automation tools, and deploying containerized applications to Google Cloud. My work includes IoT monitoring, real-time services, CI/CD pipelines, and AI-assisted data extraction.",
      availability: "Open to internship and junior opportunities",
      contactMe: "Contact Me",
      codeLines: [
        "Build reliable backend systems.",
        "Automate repeatable delivery.",
        "Deploy containerized services.",
        "Turn complex problems into working software.",
        "Design clear service boundaries.",
        "Make failure states observable.",
        "Ship small, reviewable changes.",
        "Test behaviour that matters.",
        "Document decisions for the next engineer.",
      ],
      terminalEasterEggLabel: "Trigger terminal easter egg",
      errorLines: [
        "Java: NullPointerException at Portfolio.java:42",
        "Python: TypeError: 'NoneType' is not iterable",
        "JavaScript: ReferenceError: deploy is not defined",
        "C#: InvalidOperationException: Sequence contains no elements",
        "SQL: duplicate key value violates unique constraint",
      ],
    },
    skills: {
      heading: "Core Skills",
      subheading:
        "Technologies I use most, followed by detailed areas of experience and exposure.",
      additionalHeading: "Skills by area",
      categoryLabels: {
        Backend: "Backend",
        DevOps: "DevOps",
        "AI & Automation": "AI & Automation",
        Frontend: "Frontend",
        Database: "Database",
        Business: "Business",
      },
      levelLabels: [
        "Exploring",
        "Learning basics",
        "Intermediate usage",
        "Solid knowledge",
        "Proficient fluency",
      ],
      meterTemplate: "of 5 experience grades",
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
      navLabel: "Contact links",
      emailLabel: "Send email",
    },
    featuredProjects: {
      heading: "Recent Projects",
      subheading:
        "The three latest systems I built or contributed to significantly.",
    },
  },
  pl: {
    hero: {
      headline:
        "Software Engineer | Java i Spring Boot | Chmura i automatyzacja",
      headlineVariants: [
        "Full-Stack Developer | Backend przede wszystkim",
        "Backend Developer | API, dane i integracje",
        "Cloud & Automation Engineer | CI/CD i kontenery",
      ],
      summary:
        "Buduję aplikacje backendowe, automatyzuję wdrożenia i zamieniam złożone problemy techniczne w działające oprogramowanie.",
      body: "Studiuję informatykę stosowaną w Antwerpii i mam praktyczne doświadczenie w tworzeniu systemów Spring Boot, narzędzi automatyzujących oraz wdrażaniu skonteneryzowanych aplikacji w Google Cloud. Pracowałem nad monitoringiem IoT, usługami czasu rzeczywistego, pipeline'ami CI/CD i ekstrakcją danych wspieraną przez AI.",
      availability: "Otwarty na staże i role juniorskie",
      contactMe: "Skontaktuj się",
      codeLines: [
        "Buduj niezawodne systemy backendowe.",
        "Automatyzuj powtarzalne wdrożenia.",
        "Wdrażaj skonteneryzowane usługi.",
        "Zamieniaj złożone problemy w działające oprogramowanie.",
        "Projektuj czytelne granice usług.",
        "Dbaj o obserwowalność błędów.",
        "Wdrażaj małe zmiany łatwe do przeglądu.",
        "Testuj zachowania, które mają znaczenie.",
        "Dokumentuj decyzje dla kolejnego programisty.",
      ],
      terminalEasterEggLabel: "Uruchom easter egg terminala",
      errorLines: [
        "Java: NullPointerException at Portfolio.java:42",
        "Python: TypeError: 'NoneType' is not iterable",
        "JavaScript: ReferenceError: deploy is not defined",
        "C#: InvalidOperationException: Sequence contains no elements",
        "SQL: duplicate key value violates unique constraint",
      ],
    },
    skills: {
      heading: "Kluczowe umiejętności",
      subheading:
        "Technologie, z których korzystam najczęściej, oraz szczegółowe obszary doświadczenia i podstawowej znajomości.",
      additionalHeading: "Umiejętności według obszaru",
      categoryLabels: {
        Backend: "Backend",
        DevOps: "DevOps",
        "AI & Automation": "AI i automatyzacja",
        Frontend: "Frontend",
        Database: "Bazy danych",
        Business: "Biznes",
      },
      levelLabels: [
        "Poznaję",
        "Uczę się podstaw",
        "Poziom średniozaawansowany",
        "Solidna znajomość",
        "Biegła znajomość",
      ],
      meterTemplate: "z 5 poziomów doświadczenia",
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
      navLabel: "Linki kontaktowe",
      emailLabel: "Wyślij e-mail",
    },
    featuredProjects: {
      heading: "Najnowsze projekty",
      subheading:
        "Trzy najnowsze systemy, które zbudowałem lub znacząco współtworzyłem.",
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
      photoAlt:
        "Portrait of Paweł Ryfiak outdoors overlooking a mountain landscape",
      intro:
        "I am a software engineering student at Karel de Grote Hogeschool in Antwerp, focused on backend systems, deployment automation, and practical infrastructure work.",
      paragraphs: [
        "I enjoy the parts of engineering where a vague operational problem has to become a dependable system: defining the domain, choosing a clear API boundary, handling failure cases, and making deployment repeatable.",
        "My project work has covered Spring Boot backends, PostgreSQL data models, Docker-based environments, CI/CD pipelines, IoT monitoring, and real-time communication. I also use Python for automation and data-oriented tasks.",
        "I work well in project teams and value direct technical communication, small reviewable changes, and documentation that helps the next person understand why a decision was made.",
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
      photoAlt: "Portret Pawła Ryfiaka na tle górskiego krajobrazu",
      intro:
        "Jestem studentem informatyki stosowanej na Karel de Grote Hogeschool w Antwerpii. Skupiam się na backendzie w Javie i Spring Boot, automatyzacji powtarzalnych procesów oraz podstawach deploymentu aplikacji.",
      paragraphs: [
        "Najbardziej interesują mnie zadania, w których niejasny problem operacyjny trzeba zamienić w niezawodny system: opisać domenę, wyznaczyć czytelną granicę API, obsłużyć błędy i przygotować powtarzalne wdrożenie.",
        "W projektach pracowałem z backendami Spring Boot, modelami danych PostgreSQL, środowiskami Docker, pipeline'ami CI/CD, monitoringiem IoT i komunikacją czasu rzeczywistego. Pythona wykorzystuję do automatyzacji i zadań związanych z danymi.",
        "Dobrze odnajduję się w pracy projektowej. Cenię bezpośrednią komunikację techniczną, małe zmiany łatwe do przeglądu oraz dokumentację wyjaśniającą powody podjętych decyzji.",
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
