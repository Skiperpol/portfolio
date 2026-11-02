import type { ClassBlock, Weekday } from "@/content/types";

export type Window = { start: number; end: number };

/** "HH:MM" → minutes since midnight. */
export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** 480 → "8 h", 245 → "4 h 5 min". */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** Minutes since midnight → "HH:MM". */
export function toTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * "now" uses the timetable as it is. "later" drops classes that only have a few
 * sessions left, which is what the week looks like once they are over.
 */
export type Phase = "now" | "later";

export function activeClasses(classes: ClassBlock[], phase: Phase): ClassBlock[] {
  return phase === "now" ? classes : classes.filter((c) => c.remaining === undefined);
}

/** Breaks between classes are too short to count as working time. */
export const MIN_WINDOW = 60;

/** Free windows of at least MIN_WINDOW minutes on one day, clipped to [from, to]. */
export function freeWindows(
  classes: ClassBlock[],
  day: Weekday,
  from: string,
  to: string,
): Window[] {
  const start = toMinutes(from);
  const end = toMinutes(to);
  const busy = classes
    .filter((c) => c.day === day)
    .map((c) => ({ start: toMinutes(c.start), end: toMinutes(c.end) }))
    .sort((a, b) => a.start - b.start);

  const windows: Window[] = [];
  let cursor = start;
  for (const block of busy) {
    if (block.end <= cursor) continue;
    if (block.start >= end) break;
    if (block.start > cursor) windows.push({ start: cursor, end: block.start });
    cursor = Math.max(cursor, block.end);
  }
  if (cursor < end) windows.push({ start: cursor, end });
  return windows.filter((w) => w.end - w.start >= MIN_WINDOW);
}

const days: Weekday[] = [0, 1, 2, 3, 4];

export function weeklyFreeMinutes(classes: ClassBlock[], from: string, to: string): number {
  return days
    .flatMap((day) => freeWindows(classes, day, from, to))
    .reduce((sum, w) => sum + (w.end - w.start), 0);
}

/** Days with no classes inside [from, to], best candidates for the office day. */
export function fullyFreeDays(classes: ClassBlock[], from: string, to: string): Weekday[] {
  const length = toMinutes(to) - toMinutes(from);
  return days.filter((day) => {
    const windows = freeWindows(classes, day, from, to);
    return windows.length === 1 && windows[0].end - windows[0].start === length;
  });
}
