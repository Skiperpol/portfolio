import { projects } from "@/content/projects";
import type { Project, Requirement, SkillId } from "@/content/types";

export function projectsWithSkill(skill: SkillId, list: Project[] = projects): Project[] {
  return list.filter((p) => p.skills.includes(skill));
}

export function evidenceCount(requirement: Requirement): number | null {
  return requirement.skill ? projectsWithSkill(requirement.skill).length : null;
}
