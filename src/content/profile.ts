import type { Localized } from "./types";

export const profile = {
  name: "Dawid Błaszczyk",
  email: "dawidbv1@gmail.com",
  github: "https://github.com/Skiperpol",
  linkedin: "https://www.linkedin.com/in/dawid-b%C5%82aszczyk/",
  source: "https://github.com/Skiperpol/portfolio",
};

export type TimelineEntry = {
  period: Localized;
  title: Localized;
  place: string;
  detail: Localized;
};

export const experience: TimelineEntry[] = [
  {
    period: { pl: "2024 – 2026", en: "2024 – 2026" },
    title: { pl: "Frontend Developer", en: "Frontend Developer" },
    place: "Miłosz Protyński Services, Wrocław",
    detail: {
      pl: "Frontend aplikacji do zarządzania kontenerami. Do tego wtyczka do WordPressa, która łączy się z backendem i przekierowuje użytkownika do aplikacji z zapamiętanymi danymi.",
      en: "The frontend of a container management app, plus a WordPress plugin that talks to the backend and sends users on to the app with their data carried over.",
    },
  },
  {
    period: { pl: "od 2022", en: "2022 – now" },
    title: { pl: "Full-Stack Developer", en: "Full-Stack Developer" },
    place: "Freelance",
    detail: {
      pl: "System zleceń dla rzeczoznawców z aplikacją mobilną, sklep B2B, sklep z częściami do klasycznych Mercedesów i strona agencji ubezpieczeniowej. Opisy w sekcji Projekty.",
      en: "An order system for vehicle appraisers with a mobile app, a B2B shop, a classic Mercedes parts shop and an insurance agency website. Details in the Projects section.",
    },
  },
  {
    period: { pl: "sierpień 2022", en: "Aug 2022" },
    title: { pl: "Stażysta, programista", en: "Developer intern" },
    place: "PsycheON Sp. z o.o.",
    detail: {
      pl: "Moduł kalendarza w projekcie w Django.",
      en: "A calendar module in a Django project.",
    },
  },
  {
    period: {
      pl: "luty – marzec 2022, październik 2020",
      en: "Feb – Mar 2022, Oct 2020",
    },
    title: { pl: "Stażysta, programista", en: "Developer intern" },
    place: "DGCS S.A., Kalisz",
    detail: {
      pl: "Podstawy pracy programisty: CRUD, Git i dokumentacja.",
      en: "The basics of a developer's job: CRUD, Git and documentation.",
    },
  },
];

export const education: TimelineEntry[] = [
  {
    period: { pl: "od 2023", en: "2023 – now" },
    title: {
      pl: "Informatyka Stosowana, 4. rok",
      en: "Applied Computer Science, 4th year",
    },
    place: "Politechnika Wrocławska",
    detail: {
      pl: "Honorowy członek koła naukowego Solvro, w którym współtworzyłem Eventownika.",
      en: "Honorary member of the Solvro research group, where I helped build Eventownik.",
    },
  },
  {
    period: { pl: "2019 – 2023", en: "2019 – 2023" },
    title: { pl: "Technik informatyk", en: "IT technician diploma" },
    place: "Technikum im. św. Józefa, Kalisz",
    detail: {
      pl: "Programuję od 2018 roku. Poza kodem współzałożyłem fundację e-sportową.",
      en: "I've been programming since 2018. Outside code, I co-founded an esports foundation.",
    },
  },
];

export const aiPractice: { title: Localized; body: Localized }[] = [
  {
    title: {
      pl: "Claude Code i Cursor na co dzień",
      en: "Claude Code and Cursor day to day",
    },
    body: {
      pl: "Pomagają mi zrozumieć zadanie, pisać kod i testy oraz dokumentację. Ta strona też powstała z Claude Code: od analizy moich repozytoriów po kod w Next.js.",
      en: "They help me understand the task, write code and tests, and document the result. This site was built with Claude Code too: from analysing my repositories to the Next.js code.",
    },
  },
  {
    title: {
      pl: "Fundamenty bez autopilota",
      en: "Fundamentals without autopilot",
    },
    body: {
      pl: "Projekt House Organizer piszę celowo bez agentów AI, a wnioski notuję w repozytorium. Chcę rozumieć każdą warstwę, żeby trafnie oceniać kod, który generuje AI.",
      en: "I'm deliberately writing the House Organizer project without AI agents and keeping learning notes in the repo. I want to understand every layer so I can judge AI-generated code well.",
    },
  },
  {
    title: { pl: "Następny krok: MCP", en: "Next step: MCP" },
    body: {
      pl: "Na liście kolejnych funkcji House Organizera jest integracja z Claude Code przez MCP. To mój wstęp do integracji LLM i agentów.",
      en: "House Organizer's feature list includes a Claude Code integration over MCP. It's my way into LLM integrations and agents.",
    },
  },
];
