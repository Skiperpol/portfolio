import { describe, expect, it } from "vitest";
import { projectsWithSkill } from "@/lib/evidence";
import { offer } from "./offer";
import { aiPractice, education, experience } from "./profile";
import { commercialProjects, projects } from "./projects";
import { skillIds } from "./types";
import { ui } from "./ui";

const sections = ["top", "requirements", "projects", "ai", "availability", "experience", "contact"];

function keysOf(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return [prefix];
  return Object.entries(value).flatMap(([key, v]) => keysOf(v, prefix ? `${prefix}.${key}` : key));
}

describe("offer requirements", () => {
  const all = [...offer.mustHave, ...offer.niceToHave];

  it.each(all.filter((r) => r.status === "pass").map((r) => [r.label.en, r]))(
    "%s is backed by a project or a note",
    (_, r) => {
      const proof = r.skill ? projectsWithSkill(r.skill).length : r.note ? 1 : 0;
      expect(proof).toBeGreaterThan(0);
    },
  );

  it("marks every must-have as passing", () => {
    expect(offer.mustHave.every((r) => r.status === "pass")).toBe(true);
  });

  it("only links to sections that exist", () => {
    for (const r of all.filter((r) => r.href)) {
      expect(sections).toContain(r.href!.slice(1));
    }
  });

  it("has a matrix row for every skill", () => {
    expect(offer.stack.map((row) => row.skill).sort()).toEqual([...skillIds].sort());
  });
});

describe("projects", () => {
  it("have unique ids that don't clash with sections", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.filter((id) => sections.includes(id))).toEqual([]);
  });

  it.each(projects.map((p) => [p.name, p]))("%s is described in both languages", (_, p) => {
    expect(p.learned.pl.length).toBeGreaterThan(0);
    expect(p.learned.pl.length).toBe(p.learned.en.length);
    expect(p.summary.pl && p.summary.en).toBeTruthy();
    expect(Boolean(p.role?.pl)).toBe(Boolean(p.role?.en));
  });

  it("use months in YYYY-MM order", () => {
    for (const p of projects) {
      expect(p.start).toMatch(/^\d{4}-\d{2}$/);
      if (p.end) expect(p.end >= p.start).toBe(true);
    }
  });

  it("all describe client work in both languages", () => {
    for (const p of commercialProjects) {
      expect(p.summary.pl && p.summary.en && p.kind.pl && p.kind.en).toBeTruthy();
    }
  });
});

describe("translations", () => {
  it("have the same keys in Polish and English", () => {
    expect(keysOf(ui.en)).toEqual(keysOf(ui.pl));
  });

  it("cover every profile entry", () => {
    for (const entry of [...experience, ...education]) {
      expect(entry.detail.pl && entry.detail.en).toBeTruthy();
    }
    for (const item of aiPractice) {
      expect(item.body.pl && item.body.en).toBeTruthy();
    }
  });
});
