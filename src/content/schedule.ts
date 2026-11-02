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
export const workday = { start: "07:00", end: "20:30" };

/** Typical office hours, used to pick a day I can spend fully in the office. */
export const officeHours = { start: "08:00", end: "18:00" };

/** "07:00" → "7", "20:30" → "20:30". */
const shortTime = (time: string) => (time.endsWith(":00") ? String(Number(time.slice(0, 2))) : time.replace(/^0/, ""));

/** "07:00"–"20:30" → "7–20:30". */
export const workdayLabel = `${shortTime(workday.start)}–${shortTime(workday.end)}`;

export const weekdays: Localized<string[]> = {
  pl: ["Pon", "Wt", "Śr", "Czw", "Pt"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri"],
};

export const weekdaysLong: Localized<string[]> = {
  pl: ["poniedziałek", "wtorek", "środa", "czwartek", "piątek"],
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
};
