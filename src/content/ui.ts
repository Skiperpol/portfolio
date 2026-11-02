import type { Locale } from "./types";

/** Polish plural: 1 projekt, 2–4 projekty, 5+ projektów. */
function plPlural(n: number, one: string, few: string, many: string) {
  if (n === 1) return one;
  const tens = n % 100;
  const units = n % 10;
  if (units >= 2 && units <= 4 && (tens < 12 || tens > 14)) return few;
  return many;
}

const pl = {
  meta: {
    title: "Dawid Błaszczyk — full-stack developer (TypeScript)",
    description:
      "Projekty w Next.js, React, NestJS i PostgreSQL z opisem stacku i tego, czego się nauczyłem, oraz moja dostępność.",
  },
  skip: "Przejdź do treści",
  nav: {
    label: "Główna nawigacja",
    requirements: "Wymagania",
    projects: "Projekty",
    availability: "Dostępność",
    contact: "Kontakt",
    switchTo: "English version",
    switchShort: "EN",
    github: "Profil na GitHubie",
  },
  hero: {
    applying: (role: string, company: string) => `Kandydatura: ${role} w ${company}`,
    lead: "Full-stack developer w TypeScripcie. Buduję aplikacje webowe w Next.js, React i NestJS: od interfejsu, przez API i bazę danych, po infrastrukturę w AWS.",
    sub: "Student 4. roku Informatyki Stosowanej na Politechnice Wrocławskiej i honorowy członek koła naukowego Solvro. Programuję od 2018 roku, komercyjnie od 2023.",
    primary: "Zobacz projekty",
    secondary: "GitHub",
  },
  terminal: {
    label: "Wymagania z oferty w formie testów",
    mustHave: "wymagane",
    niceToHave: "mile widziane",
    projects: (n: number) => `${n} ${plPlural(n, "projekt", "projekty", "projektów")}`,
    summaryLabel: "Testy",
    passed: (n: number) => `${n} ${plPlural(n, "zaliczony", "zaliczone", "zaliczonych")}`,
    todo: (n: number) => `${n} todo`,
    waiting: "Czekam na rozmowę",
    rerun: "Uruchom ponownie",
  },
  requirements: {
    title: "Wymagania z oferty, sprawdzone na projektach",
    lead: "Wiersze to stack z ogłoszenia z poziomem, jakiego szukacie. Kolumny to moje projekty, od najnowszego. Kliknij nazwę projektu, żeby przejść do jego opisu.",
    caption: "Które technologie z oferty wykorzystałem w których projektach",
    requirement: "Wymaganie",
    total: "Razem",
    used: "użyte",
    notUsed: "nie użyte",
    otherTitle: "Pozostałe wymagania",
  },
  projects: {
    title: "Projekty",
    lead: "Najpierw zlecenia komercyjne, potem projekty z otwartym kodem. Przy każdym: z czego korzystałem, jaka była moja rola i czego się nauczyłem.",
    commercialTitle: "Zlecenia komercyjne",
    commercialNote: "Kod należy do klientów, więc tu bez linków do repozytoriów.",
    openTitle: "Projekty z kodem na GitHubie",
    openNote: "Od najnowszego.",
    visit: "Zobacz stronę",
    zoom: "Powiększ",
    close: "Zamknij",
    learned: "Czego się nauczyłem",
    role: "Moja rola",
    repo: "Repozytorium",
    now: "teraz",
    solo: "Samodzielnie",
    team: (n: number) => `Zespół ${n} os.`,
    moreTitle: "Inne projekty",
  },
  ai: {
    title: "Jak pracuję z AI",
    lead: "Oferta stawia na AI-first. Tak wygląda to u mnie dziś.",
  },
  availability: {
    title: "Dostępność",
    lead: (range: string) =>
      `Studiuję dziennie, ale plan zostawia sporo czasu na pracę. Zakreskowane bloki to zajęcia, fioletowe to wolne okna w godzinach ${range}.`,
    phaseLabel: "Widok tygodnia",
    now: "Teraz",
    later: "Po ostatnich zajęciach w poniedziałki",
    remaining: (n: number) => `jeszcze ${n}×`,
    remainingShort: (n: number) => `${n}×`,
    classes: "Zajęcia",
    free: (range: string) => `Wolne, ${range}`,
    office: "Dzień w biurze",
    officeValue:
      "Środa, cały dzień: zajęcia mam dopiero wieczorem. Poniedziałek od 10:30, a po trzech ostatnich zajęciach także cały dzień.",
    hours: "Wolne okna",
    hoursValue: (now: number, later: number, range: string) =>
      `Mogę pracować w godzinach ${range}. Wolnych okien jest ${now} h tygodniowo, a po zakończeniu zajęć w poniedziałki ${later} h.`,
    location: "Lokalizacja",
    locationValue: "Wrocław. Studiuję na Politechnice, więc do biura na Wyspie Słodowej mam blisko.",
    contract: "Forma współpracy",
    contractValue: "Umowa zlecenie. Mam status studenta.",
    gridLabel: (day: string) => `${day}: plan dnia`,
    classAt: (start: string, end: string) => `Zajęcia ${start}–${end}`,
    freeAt: (start: string, end: string) => `Wolne ${start}–${end}`,
  },
  experience: {
    title: "Doświadczenie i edukacja",
    work: "Praca",
    education: "Edukacja",
  },
  contact: {
    title: "Porozmawiajmy",
    lead: "Najszybciej odpowiadam mailowo.",
    write: "Napisz e-mail",
    copy: "Kopiuj adres",
    copied: "Skopiowano",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  footer: {
    built: "Zbudowane w Next.js 16, TypeScripcie i Tailwind CSS, z testami w Vitest.",
    source: "Kod strony",
  },
};

export type UiStrings = typeof pl;

const en: UiStrings = {
  meta: {
    title: "Dawid Błaszczyk — full-stack developer (TypeScript)",
    description:
      "Projects in Next.js, React, NestJS and PostgreSQL, with the stack behind each and what I learned, plus my availability.",
  },
  skip: "Skip to content",
  nav: {
    label: "Main navigation",
    requirements: "Requirements",
    projects: "Projects",
    availability: "Availability",
    contact: "Contact",
    switchTo: "Wersja polska",
    switchShort: "PL",
    github: "GitHub profile",
  },
  hero: {
    applying: (role: string, company: string) => `Applying for ${role} at ${company}`,
    lead: "Full-stack developer working in TypeScript. I build web apps with Next.js, React and NestJS: from the interface, through the API and database, to infrastructure on AWS.",
    sub: "Fourth-year Applied Computer Science student at Wrocław University of Science and Technology and an honorary member of the Solvro research group. Programming since 2018, commercially since 2023.",
    primary: "See projects",
    secondary: "GitHub",
  },
  terminal: {
    label: "The offer's requirements written as tests",
    mustHave: "must have",
    niceToHave: "nice to have",
    projects: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
    summaryLabel: "Tests",
    passed: (n: number) => `${n} passed`,
    todo: (n: number) => `${n} todo`,
    waiting: "Waiting for the interview",
    rerun: "Run again",
  },
  requirements: {
    title: "The offer's requirements, checked against my projects",
    lead: "Rows are the stack from the job ad, with the level you're looking for. Columns are my projects, newest first. Click a project's name to jump to its description.",
    caption: "Which technologies from the offer I used in which projects",
    requirement: "Requirement",
    total: "Total",
    used: "used",
    notUsed: "not used",
    otherTitle: "Other requirements",
  },
  projects: {
    title: "Projects",
    lead: "Client work first, then projects with open code. For each: what I used, what my role was and what I learned.",
    commercialTitle: "Client work",
    commercialNote: "The code belongs to the clients, so there are no repository links here.",
    openTitle: "Projects with code on GitHub",
    openNote: "Newest first.",
    visit: "Visit site",
    zoom: "Enlarge",
    close: "Close",
    learned: "What I learned",
    role: "My role",
    repo: "Repository",
    now: "now",
    solo: "Solo",
    team: (n: number) => `Team of ${n}`,
    moreTitle: "Other projects",
  },
  ai: {
    title: "How I work with AI",
    lead: "The offer asks for an AI-first mindset. Here's where I stand today.",
  },
  availability: {
    title: "Availability",
    lead: (range: string) =>
      `I study full-time, but my timetable leaves plenty of room for work. Hatched blocks are classes, violet ones are free windows between ${range}.`,
    phaseLabel: "Week view",
    now: "Now",
    later: "After Monday classes end",
    remaining: (n: number) => `${n} left`,
    remainingShort: (n: number) => `${n}×`,
    classes: "Classes",
    free: (range: string) => `Free, ${range}`,
    office: "Office day",
    officeValue:
      "Wednesday, all day: my only class is in the evening. Monday from 10:30, and all day once the last three classes are over.",
    hours: "Free time",
    hoursValue: (now: number, later: number, range: string) =>
      `I can work between ${range}. That leaves ${now} h of free windows a week, rising to ${later} h once Monday classes end.`,
    location: "Location",
    locationValue: "Wrocław. I study at Wrocław Tech, so the office on Słodowa Island is close by.",
    contract: "Contract",
    contractValue: "Mandate contract (umowa zlecenie). I have student status.",
    gridLabel: (day: string) => `${day} schedule`,
    classAt: (start: string, end: string) => `Class ${start}–${end}`,
    freeAt: (start: string, end: string) => `Free ${start}–${end}`,
  },
  experience: {
    title: "Experience and education",
    work: "Work",
    education: "Education",
  },
  contact: {
    title: "Let's talk",
    lead: "Email is the fastest way to reach me.",
    write: "Send an email",
    copy: "Copy address",
    copied: "Copied",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  footer: {
    built: "Built with Next.js 16, TypeScript and Tailwind CSS, tested with Vitest.",
    source: "Source code",
  },
};

export const ui: Record<Locale, UiStrings> = { pl, en };
