import type { Offer } from "./types";

/** Requirements copied from the Junior Software Engineer offer. Swap this file to target another offer. */
export const offer: Offer = {
  company: "ADVOSYNC",
  role: "Junior Software Engineer",
  keywords:
    /^(TypeScript|React( \d+)?|Next\.js( \d+)?|Node\.js|NestJS|Express|PostgreSQL( \(RDS\))?|SQL|Docker( Swarm)?|GitHub Actions|Jest|Vitest)$/,
  stack: [
    {
      skill: "typescript",
      label: { pl: "TypeScript", en: "TypeScript" },
      level: { pl: "Regular", en: "Regular" },
    },
    {
      skill: "react",
      label: { pl: "React", en: "React" },
      level: { pl: "Junior", en: "Junior" },
    },
    {
      skill: "node",
      label: { pl: "Node.js i REST API", en: "Node.js and REST APIs" },
      level: { pl: "Junior", en: "Junior" },
    },
    {
      skill: "sql",
      label: { pl: "SQL / PostgreSQL", en: "SQL / PostgreSQL" },
      level: { pl: "Junior", en: "Junior" },
    },
    {
      skill: "git",
      label: { pl: "Git w zespole", en: "Git on a team" },
      level: { pl: "Junior", en: "Junior" },
    },
    {
      skill: "nextjs",
      label: { pl: "Next.js", en: "Next.js" },
      level: { pl: "Mile widziane", en: "Nice to have" },
    },
    {
      skill: "testing",
      label: { pl: "Testy automatyczne", en: "Automated tests" },
      level: { pl: "Mile widziane", en: "Nice to have" },
    },
    {
      skill: "devops",
      label: { pl: "Docker, CI/CD, chmura", en: "Docker, CI/CD, cloud" },
      level: { pl: "Mile widziane", en: "Nice to have" },
    },
    {
      skill: "documents",
      label: { pl: "Przetwarzanie dokumentów", en: "Document processing" },
      level: { pl: "Mile widziane", en: "Nice to have" },
    },
  ],
  mustHave: [
    {
      label: {
        pl: "6–12 mies. doświadczenia",
        en: "6–12 months of experience",
      },
      note: {
        pl: "2 lata jako frontend dev, 4 lata\u00a0freelance",
        en: "2 years as a frontend dev, 4 freelancing",
      },
      href: "#experience",
      status: "pass",
    },
    {
      label: {
        pl: "AI-first: asystenci kodowania",
        en: "AI-first: coding assistants",
      },
      note: { pl: "Claude Code, Cursor", en: "Claude Code, Cursor" },
      href: "#ai",
      status: "pass",
    },
    {
      label: { pl: "TypeScript w praktyce", en: "Hands-on TypeScript" },
      skill: "typescript",
      status: "pass",
    },
    {
      label: { pl: "Podstawy Reacta", en: "React basics" },
      skill: "react",
      status: "pass",
    },
    {
      label: {
        pl: "Node.js: REST API i dane",
        en: "Node.js: REST APIs and data",
      },
      skill: "node",
      status: "pass",
    },
    {
      label: { pl: "Bazy danych i SQL", en: "Databases and SQL" },
      skill: "sql",
      status: "pass",
    },
    {
      label: { pl: "Git i code review", en: "Git and code review" },
      skill: "git",
      status: "pass",
    },
    {
      label: { pl: "Angielski min. B2", en: "English, B2 or better" },
      note: { pl: "B2/C1", en: "B2/C1" },
      status: "pass",
    },
    {
      label: {
        pl: "1 dzień w tygodniu w biurze",
        en: "One day a week in the office",
      },
      note: { pl: "mieszkam we Wrocławiu", en: "I live in Wrocław" },
      href: "#availability",
      status: "pass",
    },
  ],
  niceToHave: [
    {
      label: { pl: "Next.js i full-stack", en: "Next.js and full-stack" },
      skill: "nextjs",
      status: "pass",
    },
    {
      label: { pl: "Testy automatyczne", en: "Automated testing" },
      skill: "testing",
      status: "pass",
    },
    {
      label: { pl: "Docker, CI/CD, chmura", en: "Docker, CI/CD, cloud" },
      skill: "devops",
      status: "pass",
    },
    {
      label: { pl: "Przetwarzanie dokumentów", en: "Document processing" },
      skill: "documents",
      status: "pass",
    },
    {
      label: { pl: "Własne projekty z LLM", en: "Own LLM projects" },
      note: { pl: "w planach: MCP", en: "planned: MCP" },
      href: "#ai",
      status: "todo",
    },
  ],
};
