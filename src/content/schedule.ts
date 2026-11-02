import type { ClassBlock, Localized } from "./types";

/** Winter semester timetable at Wrocław Tech (Mon = 0). Times are rounded to 5 minutes. */
export const classes: ClassBlock[] = [
  { day: 0, start: "07:30", end: "10:00", remaining: 3 },
  { day: 1, start: "15:00", end: "17:00" },
  { day: 2, start: "18:15", end: "20:30" },
  { day: 3, start: "07:30", end: "10:00" },
  { day: 3, start: "10:15", end: "13:00" },
  { day: 3, start: "17:05", end: "19:25" },
  { day: 4, start: "15:00", end: "16:30" },
];

/** When I can work at all. */
export const workday = { start: "07:00", end: "20:00" };

/** Typical office hours, used to pick a day I can spend fully in the office. */
export const officeHours = { start: "08:00", end: "18:00" };

/** "08:00"–"20:00" → "8–20". */
export const workdayLabel = `${Number(workday.start.slice(0, 2))}–${Number(workday.end.slice(0, 2))}`;

export const weekdays: Localized<string[]> = {
  pl: ["Pon", "Wt", "Śr", "Czw", "Pt"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri"],
};

export const weekdaysLong: Localized<string[]> = {
  pl: ["poniedziałek", "wtorek", "środa", "czwartek", "piątek"],
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
};
