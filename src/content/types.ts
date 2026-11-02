import type { StaticImageData } from "next/image";

export const locales = ["pl", "en"] as const;
export type Locale = (typeof locales)[number];

/** A value written once per language. */
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/** Skills that appear in the job offer and can be proven by a project. */
export const skillIds = [
  "typescript",
  "react",
  "node",
  "sql",
  "git",
  "nextjs",
  "testing",
  "devops",
  "documents",
] as const;
export type SkillId = (typeof skillIds)[number];

/** A screenshot imported from src/assets, so the bundler adds the base path and dimensions. */
export type Screenshot = { src: StaticImageData; alt: Localized };

export type Project = {
  id: string;
  name: string;
  /** Short label used as a column header in the requirements matrix. */
  shortName: string;
  repo: string;
  extraLinks?: { label: Localized; href: string }[];
  /** ISO months, e.g. "2025-06". `end: null` means the work is ongoing. */
  start: string;
  end: string | null;
  team: number;
  /** Replaces "Team of N" when the team size isn't a fixed number. */
  teamLabel?: Localized;
  context: Localized;
  summary: Localized;
  role?: Localized;
  stack: string[];
  learned: Localized<string[]>;
  skills: SkillId[];
  image?: Screenshot;
};

export type Requirement = {
  label: Localized;
  /** Proven by every project tagged with this skill. */
  skill?: SkillId;
  /** Proof that does not come from a project (experience, language, location). */
  note?: Localized;
  /** Section on the page that backs the claim up. */
  href?: string;
  status: "pass" | "todo";
};

export type Offer = {
  company: string;
  role: string;
  mustHave: Requirement[];
  niceToHave: Requirement[];
  /** Stack names the offer mentions; matching chips get highlighted. */
  keywords: RegExp;
  /** Rows of the matrix with the level the offer asks for. */
  stack: { skill: SkillId; label: Localized; level: Localized }[];
};

/** Client work: the code stays with the client, so there is no repository link. */
export type CommercialProject = {
  name: string;
  kind: Localized;
  summary: Localized;
  stack?: string[];
  href?: string;
  image?: Screenshot;
};

export type Weekday = 0 | 1 | 2 | 3 | 4;

export type ClassBlock = {
  day: Weekday;
  /** 24h "HH:MM". */
  start: string;
  end: string;
  /** How many sessions are left this semester, when it ends soon. */
  remaining?: number;
};
