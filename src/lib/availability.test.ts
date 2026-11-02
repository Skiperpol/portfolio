import { describe, expect, it } from "vitest";
import { classes, officeHours, workday, workdayLabel } from "@/content/schedule";
import type { ClassBlock } from "@/content/types";
import {
  activeClasses,
  formatDuration,
  freeWindows,
  fullyFreeDays,
  toMinutes,
  toTime,
  weeklyFreeMinutes,
} from "./availability";

const hours = (minutes: number) => minutes / 60;

describe("time helpers", () => {
  it("converts between HH:MM and minutes", () => {
    expect(toMinutes("07:30")).toBe(450);
    expect(toTime(1085)).toBe("18:05");
  });

  it("formats durations for the calendar", () => {
    expect(formatDuration(480)).toBe("8 h");
    expect(formatDuration(245)).toBe("4 h 5 min");
  });
});

describe("freeWindows", () => {
  const sample: ClassBlock[] = [
    { day: 0, start: "09:00", end: "10:00" },
    { day: 0, start: "10:15", end: "12:00" },
    { day: 0, start: "11:00", end: "13:00" },
  ];

  it("merges overlapping classes and returns the gaps", () => {
    expect(freeWindows(sample, 0, "08:00", "18:00")).toEqual([
      { start: toMinutes("08:00"), end: toMinutes("09:00") },
      { start: toMinutes("13:00"), end: toMinutes("18:00") },
    ]);
  });

  it("drops breaks shorter than an hour", () => {
    const windows = freeWindows(sample, 0, "08:00", "18:00");
    expect(windows.some((w) => w.start === toMinutes("10:00"))).toBe(false);
  });

  it("returns the whole range on a day without classes", () => {
    expect(freeWindows(sample, 2, "08:00", "18:00")).toEqual([{ start: 480, end: 1080 }]);
  });
});

describe("the real timetable", () => {
  it("keeps Wednesday free for a full office day", () => {
    expect(fullyFreeDays(classes, officeHours.start, officeHours.end)).toEqual([2]);
  });

  it("frees Monday once its last sessions are over", () => {
    const later = activeClasses(classes, "later");
    expect(fullyFreeDays(later, officeHours.start, officeHours.end)).toEqual([0, 2]);
  });

  it("leaves about 50 h now and 53 h later between 7:00 and 20:30", () => {
    expect(workdayLabel).toBe("7–20:30");
    expect(Math.round(hours(weeklyFreeMinutes(classes, workday.start, workday.end)))).toBe(50);
    expect(
      Math.round(hours(weeklyFreeMinutes(activeClasses(classes, "later"), workday.start, workday.end))),
    ).toBe(53);
  });

  it("opens evenings after classes", () => {
    const toRanges = (day: 1 | 3 | 4) =>
      freeWindows(classes, day, workday.start, workday.end).map((w) => `${toTime(w.start)}-${toTime(w.end)}`);
    expect(toRanges(1)).toEqual(["07:00-15:00", "17:00-20:30"]);
    expect(toRanges(3)).toEqual(["13:00-17:05", "19:25-20:30"]);
    expect(toRanges(4)).toEqual(["07:00-15:00", "16:30-20:30"]);
  });
});
