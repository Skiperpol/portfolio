import b2bShot from "@/assets/projects/b2b.webp";
import cvFlowBpmn from "@/assets/projects/cv-flow-bpmn.webp";
import dbDesignErd from "@/assets/projects/db-design-erd.webp";
import ecdtShot from "@/assets/projects/ecdt.webp";
import eventownikShot from "@/assets/projects/eventownik.webp";
import mercedesShot from "@/assets/projects/mercedes.webp";
import insuranceShot from "@/assets/projects/ubezpieczenia.webp";
import type { CommercialProject, Project } from "./types";

const gh = (repo: string) => `https://github.com/Skiperpol/${repo}`;

/** Newest first. Every claim here can be checked in the linked repository. */
export const projects: Project[] = [
  {
    id: "house-organizer",
    name: "House Organizer",
    shortName: "House Organizer",
    repo: gh("full-stack-house-organizator"),
    start: "2026-10",
    end: null,
    team: 1,
    context: { pl: "Projekt własny, w toku", en: "Personal project, in progress" },
    summary: {
      pl: "Aplikacja do ogarniania domu: wspólne zadania, listy zakupów, wydarzenia rodzinne i dziennik serwisowy auta. Monorepo, w którym najpierw powstaje backend — uwierzytelnianie, sesje i rodziny z zaproszeniami już działają.",
      en: "An app for running a household: shared to-dos, shopping lists, family events and a car service log. A monorepo where the backend comes first — authentication, sessions and families with invitations already work.",
    },
    stack: [
      "TypeScript",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Swagger",
      "React",
      "TanStack Query",
      "Orval",
      "Turborepo",
      "pnpm",
    ],
    learned: {
      pl: [
        "Sesje w Redis zamiast samego JWT: ciasteczko HttpOnly, TTL, odświeżanie sesji i wylogowanie ze wszystkich urządzeń.",
        "Migracje Prisma i relacje w PostgreSQL: użytkownicy z rolami, rodziny, członkostwa i zaproszenia.",
        "Guardy i dekoratory w NestJS do autoryzacji (np. tylko właściciel rodziny może zapraszać).",
        "Wspólne typy bez kopiowania: Swagger generuje OpenAPI, a Orval robi z niego klienta dla frontendu.",
      ],
      en: [
        "Redis-backed sessions instead of bare JWT: an HttpOnly cookie, TTLs, session refresh and logging out of every device.",
        "Prisma migrations and PostgreSQL relations: users with roles, families, memberships and invitations.",
        "NestJS guards and decorators for authorization (for example, only a family's owner can invite).",
        "Shared types without copying: Swagger emits OpenAPI and Orval turns it into a typed client for the frontend.",
      ],
    },
    skills: ["typescript", "node", "sql"],
  },
  {
    id: "cv-flow",
    name: "Recruitment CV-Flow",
    shortName: "CV-Flow",
    repo: gh("cloud-programming"),
    start: "2026-03",
    end: "2026-05",
    team: 1,
    context: { pl: "Studia, programowanie w chmurze", en: "University, cloud programming" },
    summary: {
      pl: "Jeden proces rekrutacyjny przebudowywany w ośmiu etapach: od zdarzeń w RabbitMQ, przez sześć mikroserwisów NestJS z osobną bazą dla każdego, po wdrożenie na AWS opisane w Terraformie i uruchamiane z GitHub Actions. Serwis parsujący wyciąga umiejętności z przesłanego CV.",
      en: "One recruitment process rebuilt in eight stages: from RabbitMQ events, through six NestJS microservices with a database each, to an AWS deployment described in Terraform and run from GitHub Actions. A parsing service pulls skills out of the uploaded CV.",
    },
    stack: [
      "NestJS",
      "TypeScript",
      "RabbitMQ",
      "CQRS",
      "PostgreSQL (RDS)",
      "Redis",
      "S3",
      "ECS Fargate",
      "Lambda",
      "DynamoDB",
      "Terraform",
      "Docker Swarm",
      "GitHub Actions",
    ],
    learned: {
      pl: [
        "Komunikacja asynchroniczna: fan-out zdarzeń (ApplicationSubmitted → SkillsReady → DecisionMade) i składanie wyniku w Redis z TTL i blokadą.",
        "Clean Architecture: logika domeny nie zależy od NestJS, bazy ani brokera — wszystko idzie przez porty i adaptery.",
        "Infrastruktura jako kod: Terraform w dwóch etapach (dane, potem aplikacja), zdalny stan, obrazy w ECR i usługi na ECS.",
        "CI/CD: jedenaście workflowów GitHub Actions do bootstrapu, wdrożenia i sprzątania, plus wersja serverless na Lambdzie.",
      ],
      en: [
        "Asynchronous messaging: fanning out events (ApplicationSubmitted → SkillsReady → DecisionMade) and joining the result in Redis with a TTL and a lock.",
        "Clean Architecture: domain logic does not depend on NestJS, the database or the broker — everything goes through ports and adapters.",
        "Infrastructure as code: Terraform in two stages (data first, then the app), remote state, images in ECR and services on ECS.",
        "CI/CD: eleven GitHub Actions workflows for bootstrapping, deploying and tearing down, plus a serverless version on Lambda.",
      ],
    },
    skills: ["typescript", "node", "sql", "devops", "documents"],
    image: {
      src: cvFlowBpmn,
      alt: {
        pl: "Diagram BPMN procesu: sześć torów dla mikroserwisów. Gateway zapisuje CV i rozsyła ApplicationSubmitted; Candidate, Parsing i Verification obsługują je równolegle. Qualification czeka na SkillsReady i SafetyVerified, ustawia QUALIFIED albo REJECTED i wysyła DecisionMade do serwisu powiadomień.",
        en: "BPMN diagram of the process, in Polish: six lanes, one per microservice. Gateway stores the CV and fans out ApplicationSubmitted; Candidate, Parsing and Verification handle it in parallel. Qualification waits for SkillsReady and SafetyVerified, sets QUALIFIED or REJECTED and sends DecisionMade to the notification service.",
      },
    },
  },
  {
    id: "eventownik",
    name: "Eventownik Solvro",
    shortName: "Eventownik",
    repo: "https://github.com/Solvro/web-eventownik-v2",
    extraLinks: [
      { label: { pl: "Backend v2", en: "Backend v2" }, href: "https://github.com/Solvro/backend-eventownik-v2" },
      { label: { pl: "Backend v1", en: "Backend v1" }, href: "https://github.com/Solvro/backend-eventownik-v1-legacy-legacy" },
      { label: { pl: "eventownik.solvro.pl", en: "eventownik.solvro.pl" }, href: "https://eventownik.solvro.pl" },
    ],
    start: "2024-05",
    end: "2026-04",
    team: 0,
    teamLabel: { pl: "Zespół koła Solvro", en: "Solvro team" },
    context: { pl: "Koło naukowe Solvro, PWr", en: "Solvro research group, Wrocław Tech" },
    summary: {
      pl: "Platforma koła Solvro do organizowania wydarzeń studenckich: zapisy uczestników, formularze, e-maile i eksporty danych. Samorządy wydziałowe PWr używały jej pilotażowo przy dużych wyjazdach, takich jak rajdy i rejsy.",
      en: "Solvro's platform for running student events: participant sign-ups, forms, emails and data exports. Faculty student councils at Wrocław Tech piloted it on large trips such as rallies and cruises.",
    },
    role: {
      pl: "W wersji na Supabase pisałem migracje, funkcje i triggery w PL/pgSQL, polityki RLS, sprawdzanie limitu miejsc i eksport uczestników do Excela. W v2 zrobiłem w AdonisJS model, migracje, walidację i CRUD formularzy, a we frontendzie w Next.js eksport uczestników i tabelę historii e-maili.",
      en: "In the Supabase version I wrote migrations, PL/pgSQL functions and triggers, RLS policies, a capacity check and an Excel export of participants. In v2 I built the forms model, migrations, validation and CRUD in AdonisJS, and on the Next.js frontend the participant export and the email history table.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "AdonisJS",
      "Lucid ORM",
      "VineJS",
      "PostgreSQL",
      "Supabase",
      "PL/pgSQL",
    ],
    learned: {
      pl: [
        "Logika po stronie bazy: triggery, funkcje i Row Level Security w PostgreSQL.",
        "Backend w AdonisJS: Lucid ORM, relacje wiele-do-wielu i walidacja w VineJS.",
        "Pull requesty z code review w dużym zespole i praca nad produktem, z którego korzystają prawdziwi użytkownicy.",
      ],
      en: [
        "Logic in the database: triggers, functions and Row Level Security in PostgreSQL.",
        "A backend in AdonisJS: Lucid ORM, many-to-many relations and VineJS validation.",
        "Pull requests with code review on a large team, on a product real people use.",
      ],
    },
    skills: ["typescript", "react", "nextjs", "node", "sql", "git"],
    image: {
      src: eventownikShot,
      alt: {
        pl: "Strona główna Eventownika Solvro z kartami wydarzeń, które korzystały z aplikacji.",
        en: "Eventownik Solvro home page with cards for events that used the app.",
      },
    },
  },
  {
    id: "iot-library",
    name: "IoT Library System",
    shortName: "IoT Library",
    repo: gh("full-stack-web-iot-library-system"),
    start: "2025-12",
    end: "2026-01",
    team: 5,
    context: { pl: "Studia, projekt zespołowy", en: "University, team project" },
    summary: {
      pl: "System biblioteczny z czytnikiem kart RFID. Raspberry Pi wysyła skany przez MQTT do backendu w NestJS, a bibliotekarz obsługuje książki, czytelników i wypożyczenia w panelu w React.",
      en: "A library system with an RFID card reader. A Raspberry Pi sends scans over MQTT to a NestJS backend, and the librarian manages books, readers and loans in a React dashboard.",
    },
    role: {
      pl: "Założyłem repozytorium, postawiłem broker MQTT (Mosquitto w Docker Compose) i szkielet frontendu, a na koniec rozbudowałem widoki książek i czytelników.",
      en: "I set up the repository, the MQTT broker (Mosquitto in Docker Compose) and the frontend skeleton, and later extended the book and reader views.",
    },
    stack: [
      "NestJS",
      "TypeORM",
      "SQLite",
      "MQTT",
      "Socket.IO",
      "React",
      "Vite",
      "Tailwind CSS",
      "Docker",
      "Raspberry Pi",
    ],
    learned: {
      pl: [
        "Model publish/subscribe w MQTT i łączenie fizycznego urządzenia z aplikacją webową.",
        "Przepływ danych od skanu karty, przez broker i backend, aż do widoku w React.",
        "Praca w pięcioosobowym zespole na jednym repozytorium, z podziałem na sprzęt, backend i frontend.",
      ],
      en: [
        "The MQTT publish/subscribe model and connecting a physical device to a web app.",
        "Following data from a card scan, through the broker and the backend, to a React view.",
        "Working in a team of five on one repository, split into hardware, backend and frontend.",
      ],
    },
    skills: ["typescript", "react", "node", "sql", "git", "devops"],
  },
  {
    id: "web-systems",
    name: "Web Systems Platform",
    shortName: "Web Systems",
    repo: gh("full-stack-web-systems-programming"),
    start: "2025-11",
    end: "2025-11",
    team: 1,
    context: { pl: "Studia, programowanie systemów webowych", en: "University, web systems programming" },
    summary: {
      pl: "Trzy współpracujące aplikacje: REST API w NestJS w architekturze heksagonalnej, aplikacja SSR w Django, która co jakiś czas synchronizuje rabaty przez Celery, oraz SPA w React 19 do zarządzania produktami, magazynami i klientami.",
      en: "Three apps working together: a NestJS REST API in hexagonal architecture, a Django SSR app that periodically syncs discounts with Celery, and a React 19 SPA for managing products, warehouses and clients.",
    },
    stack: [
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "Jest",
      "Swagger",
      "Django",
      "Celery",
      "Redis",
      "React 19",
      "Tailwind CSS",
      "Radix UI",
      "TanStack Table",
      "Docker",
    ],
    learned: {
      pl: [
        "Architektura heksagonalna: model domeny, porty i adaptery, dzięki którym logikę testuje się bez bazy.",
        "Około 70 testów jednostkowych w Jest dla modeli domenowych i serwisów aplikacji.",
        "Zadania cykliczne (Celery i django-celery-beat) oraz integracja dwóch backendów przez REST.",
        "Widoki danych w React z TanStack Table i komponentami Radix UI.",
      ],
      en: [
        "Hexagonal architecture: a domain model, ports and adapters, so the logic can be tested without a database.",
        "About 70 Jest unit tests for the domain models and application services.",
        "Scheduled jobs (Celery and django-celery-beat) and two backends integrated over REST.",
        "Data views in React with TanStack Table and Radix UI components.",
      ],
    },
    skills: ["typescript", "react", "node", "sql", "testing", "devops"],
  },
  {
    id: "db-design",
    name: "E-commerce Database Design",
    shortName: "Bazy danych",
    repo: gh("projektowanie-baz-danych"),
    start: "2025-10",
    end: "2026-01",
    team: 4,
    context: { pl: "Studia, projektowanie baz danych", en: "University, database design" },
    summary: {
      pl: "Baza sklepu internetowego od wymagań do optymalizacji: model ER, 26 tabel w 3NF w PostgreSQL, generatory danych w Pythonie i ponad 20 raportów SQL. Potem ta sama domena w MongoDB i porównanie obu podejść.",
      en: "An online store's database from requirements to tuning: an ER model, 26 tables in 3NF in PostgreSQL, Python data generators and 20+ SQL reports. Then the same domain in MongoDB and a comparison of both approaches.",
    },
    role: {
      pl: "Najwięcej commitów w zespole: diagram ER, schemat SQL, algorytm generowania danych, raporty oraz model MongoDB z walidacją i generatorem.",
      en: "The most commits on the team: the ER diagram, the SQL schema, the data generation algorithm, the reports, and the MongoDB model with validation and a generator.",
    },
    stack: ["PostgreSQL", "SQL", "MongoDB", "Python", "draw.io"],
    learned: {
      pl: [
        "Normalizacja do 3NF i więzy integralności: CHECK, kaskady, role z różnymi uprawnieniami.",
        "Czytanie planów EXPLAIN i dobieranie indeksów pod konkretne zapytania.",
        "Kiedy relacyjnie, a kiedy dokumentowo: spójność ACID kontra denormalizacja i niezmienne snapshoty zamówień.",
        "Generowanie dużych, spójnych zbiorów danych testowych z zachowaniem relacji.",
      ],
      en: [
        "Normalising to 3NF and integrity constraints: CHECKs, cascades, roles with different permissions.",
        "Reading EXPLAIN plans and choosing indexes for specific queries.",
        "When to go relational and when to use documents: ACID consistency versus denormalisation and immutable order snapshots.",
        "Generating large, consistent test datasets that keep their relations intact.",
      ],
    },
    skills: ["sql", "git"],
    image: {
      src: dbDesignErd,
      alt: {
        pl: "Diagram ER bazy sklepu internetowego z typami kolumn i licznością relacji. Katalog: produkty, producenci, drzewo kategorii, atrybuty, opcje i warianty z promocjami. Klienci: użytkownicy, adresy, koszyki, opinie i ulubione. Zamówienia ze statusem, metodą dostawy i płatności oraz pozycjami. Magazyn: magazyny, egzemplarze towaru i wysyłki.",
        en: "ER diagram of the online store database, with column types and relationship cardinality. Catalogue: products, manufacturers, a category tree, attributes, options and variants with promotions. Customers: users, addresses, carts, reviews and favourites. Orders with a status, delivery and payment method, and line items. Inventory: warehouses, stock items and shipments.",
      },
    },
  },
  {
    id: "typing-test",
    name: "Typing Test",
    shortName: "Typing Test",
    repo: gh("frontend-typing-test"),
    start: "2025-07",
    end: "2025-07",
    team: 1,
    context: { pl: "Projekt własny", en: "Personal project" },
    summary: {
      pl: "Test szybkości pisania, który liczy WPM i dokładność na żywo. Ma rejestrację i logowanie, historię wyników, profil i ranking, a dane trzyma w osobnym REST API.",
      en: "A typing speed test that counts WPM and accuracy live. It has sign-up and login, result history, a profile page and a leaderboard, with data kept in a separate REST API.",
    },
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "shadcn/ui"],
    learned: {
      pl: [
        "Routing i layouty w App Routerze Next.js.",
        "Stan zalogowania w React Context i chronione widoki.",
        "Liczenie WPM i dokładności na żywo z timerem na useEffect i setInterval.",
      ],
      en: [
        "Routing and layouts in the Next.js App Router.",
        "Login state in React Context and protected views.",
        "Counting WPM and accuracy live with a timer built on useEffect and setInterval.",
      ],
    },
    skills: ["typescript", "react", "nextjs"],
  },
  {
    id: "receipt-scanner",
    name: "Receipt Scanner",
    shortName: "Receipt Scanner",
    repo: gh("Backend-receipt-scanner"),
    extraLinks: [
      { label: { pl: "Frontend", en: "Frontend" }, href: gh("Frontend-receipt-scanner") },
    ],
    start: "2025-06",
    end: "2025-06",
    team: 2,
    context: { pl: "Projekt zespołowy, 4 dni", en: "Team project, 4 days" },
    summary: {
      pl: "Śledzenie wydatków ze zdjęcia paragonu: OCR wyciąga z obrazu pozycje i kwoty, API w Django REST zapisuje transakcje i liczy podsumowania w kalendarzu, a frontend w Next.js pokazuje je w tabelach.",
      en: "Expense tracking from a photo of a receipt: OCR pulls line items and amounts out of the image, a Django REST API stores transactions and builds calendar summaries, and a Next.js frontend shows them in tables.",
    },
    role: {
      pl: "Zrobiłem całe API (modele, serializery, endpointy, 16 testów), endpoint skanowania, konfigurację Dockera i cały frontend. Parser OCR napisał drugi członek zespołu.",
      en: "I built the whole API (models, serializers, endpoints, 16 tests), the scan endpoint, the Docker setup and the entire frontend. My teammate wrote the OCR parser.",
    },
    stack: [
      "Django REST Framework",
      "Python",
      "EasyOCR",
      "OpenCV",
      "Docker",
      "Next.js",
      "TypeScript",
      "shadcn/ui",
      "TanStack Table",
    ],
    learned: {
      pl: [
        "Projektowanie REST API: serializery, uwierzytelnianie tokenem i testy endpointów.",
        "Przetwarzanie dokumentów: od zdjęcia, przez OCR, do ustrukturyzowanych danych w bazie.",
        "Konteneryzacja aplikacji (Dockerfile i docker-compose).",
        "Praca na pull requestach i dowiezienie działającego produktu w cztery dni.",
      ],
      en: [
        "Designing a REST API: serializers, token authentication and endpoint tests.",
        "Document processing: from a photo, through OCR, to structured data in a database.",
        "Containerising the app (Dockerfile and docker-compose).",
        "Working through pull requests and shipping a working product in four days.",
      ],
    },
    skills: ["typescript", "react", "nextjs", "git", "testing", "devops", "documents"],
  },
  {
    id: "it-project-management",
    name: "IT Project Management API",
    shortName: "ITPM API",
    repo: gh("ITProjectManagementApp"),
    extraLinks: [
      {
        label: { pl: "Dokumentacja API", en: "API docs" },
        href: "https://documenter.getpostman.com/view/33994095/2sA3Bj9u4L",
      },
    ],
    start: "2024-04",
    end: "2024-04",
    team: 1,
    context: { pl: "Zadanie rekrutacyjne do koła Solvro", en: "Solvro research group recruitment task" },
    summary: {
      pl: "REST API do zarządzania zadaniami w zespołach IT: projekty, zadania, deweloperzy i statusy, plus algorytm, który przydziela zadania według specjalizacji i średniego czasu wykonania. Dzięki niemu dostałem się do koła naukowego Solvro.",
      en: "A REST API for managing tasks in IT teams: projects, tasks, developers and statuses, plus an algorithm that assigns tasks by specialisation and average completion time. It got me into the Solvro research group.",
    },
    stack: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "bcrypt", "Postman"],
    learned: {
      pl: [
        "Pierwsze REST API w Node.js: routing, middleware i walidacja danych wejściowych.",
        "Uwierzytelnianie JWT i hashowanie haseł.",
        "Dokumentowanie API w Postmanie.",
      ],
      en: [
        "My first REST API in Node.js: routing, middleware and input validation.",
        "JWT authentication and password hashing.",
        "Documenting an API in Postman.",
      ],
    },
    skills: ["node"],
  },
];

export const moreProjects: { name: string; href: string; stack: string; summary: { pl: string; en: string } }[] = [
  {
    name: "Mieszkaniownik",
    href: gh("mobile-mieszkaniownik"),
    stack: "React Native, Expo, Zustand",
    summary: {
      pl: "Aplikacja mobilna dla współlokatorów: rozliczanie wydatków, grafik obowiązków, rezerwacja łazienki.",
      en: "A mobile app for flatmates: expense splitting, chore rotation, bathroom booking.",
    },
  },
  {
    name: "Trading Simulator API",
    href: gh("wakacyjne-wyzwanie-solvro-backend-2025"),
    stack: "NestJS, Prisma, PostgreSQL",
    summary: {
      pl: "Backend symulatora giełdy z backtestem strategii (wakacyjne wyzwanie Solvro 2025).",
      en: "A trading simulator backend with strategy backtesting (Solvro summer challenge 2025).",
    },
  },
  {
    name: "FormatImage",
    href: gh("desktop-formatimage"),
    stack: "Electron, ONNX Runtime",
    summary: {
      pl: "Aplikacja desktopowa do zdjęć produktów: usuwanie tła modelem AI offline i eksport do WebP.",
      en: "A desktop app for product photos: offline AI background removal and WebP export.",
    },
  },
  {
    name: "PadelMix",
    href: "https://skiperpol.github.io/padelmix/",
    stack: "React, TypeScript, Vite",
    summary: {
      pl: "Generator rund do padla w formacie americano z rankingiem na żywo.",
      en: "A round generator for americano padel with a live leaderboard.",
    },
  },
];

export const commercialProjects: CommercialProject[] = [
  {
    name: "ECDT",
    kind: { pl: "System zleceń z aplikacją mobilną", en: "Order system with a mobile app" },
    summary: {
      pl: "System do obsługi zleceń rzeczoznawczych: lista zleceń z filtrami i statusami, raporty z oględzin ze zdjęciami i dokumentacją szkody oraz dane techniczne pojazdów z historią postępowania. Do tego aplikacja mobilna połączona z całym systemem.",
      en: "A system for handling vehicle appraisal orders: an order list with filters and statuses, inspection reports with photos and damage documentation, and vehicle technical data with case history. Plus a mobile app connected to the whole system.",
    },
    stack: [
      "TypeScript",
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "React",
      "TanStack Query",
      "Tailwind CSS",
      "React Native",
      "Expo",
      "WatermelonDB",
      "Cloudflare R2",
    ],
    image: {
      src: ecdtShot,
      alt: {
        pl: "Ekran logowania systemu ECDT z opisem modułów: zlecenia, raporty i pojazdy.",
        en: "ECDT sign-in screen listing its modules: orders, reports and vehicles.",
      },
    },
  },
  {
    name: "Sklep B2B",
    kind: { pl: "Sklep hurtowy", en: "B2B shop" },
    summary: {
      pl: "Sklep dla klientów biznesowych z włoskimi produktami spożywczymi: katalog z aktualnymi cenami po zalogowaniu, koszyk zapamiętany między sesjami i historia wszystkich zamówień.",
      en: "A shop for business customers selling Italian food: a catalogue with current prices after login, a cart that survives between sessions and a full order history.",
    },
    stack: [
      "TypeScript",
      "MedusaJS",
      "Next.js",
      "React",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
      "Cloudflare R2",
    ],
    image: {
      src: b2bShot,
      alt: {
        pl: "Ekran logowania sklepu B2B z włoskimi produktami i listą korzyści dla klientów.",
        en: "Sign-in screen of the B2B Italian food shop with a list of customer benefits.",
      },
    },
  },
  {
    name: "Części do klasycznych Mercedesów",
    kind: { pl: "Sklep internetowy", en: "Online shop" },
    summary: {
      pl: "Sklep z oryginalnymi i zamiennymi częściami do modeli W123, W124, W201 i R107: wyszukiwanie po nazwie, kodzie i SKU, koszyk, ulubione i wersje językowe.",
      en: "A shop with original and replacement parts for the W123, W124, W201 and R107: search by name, part code and SKU, cart, wishlist and language versions.",
    },
    stack: ["MedusaJS"],
    image: {
      src: mercedesShot,
      alt: {
        pl: "Strona główna sklepu z częściami do klasycznych Mercedesów: wyszukiwarka, koszyk i baner z Mercedesem 300 SL.",
        en: "Home page of the classic Mercedes parts shop: search, cart and a banner with a Mercedes 300 SL.",
      },
    },
  },
  {
    name: "ubezpieczenia-cichy.pl",
    kind: { pl: "Strona wizytówka", en: "Business website" },
    summary: {
      pl: "Strona agencji ubezpieczeniowej z biurami w Błaszkach i Kaliszu: oferta dla klientów indywidualnych, firm i rolników, rejestracja pojazdów i umawianie spotkań.",
      en: "A website for an insurance agency with offices in Błaszki and Kalisz: products for individuals, businesses and farmers, vehicle registration and booking meetings.",
    },
    stack: ["React", "TypeScript", "Tailwind CSS"],
    image: {
      src: insuranceShot,
      alt: {
        pl: "Strona główna agencji ubezpieczeniowej z hasłem „Od polisy po tablice rejestracyjne”.",
        en: "Insurance agency home page with the headline “From policy to number plates”.",
      },
    },
  },
];
