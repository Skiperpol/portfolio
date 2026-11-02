"use client";

import { useState, type CSSProperties } from "react";
import { classes, weekdays, weekdaysLong, workday, workdayLabel } from "@/content/schedule";
import type { Locale, Weekday } from "@/content/types";
import { ui } from "@/content/ui";
import {
  activeClasses,
  freeWindows,
  toMinutes,
  toTime,
  weeklyFreeMinutes,
  type Phase,
} from "@/lib/availability";

const DAY_START = toMinutes("06:30");
const DAY_END = toMinutes("21:00");
const SPAN = DAY_END - DAY_START;
const HOURS = [8, 10, 12, 14, 16, 18, 20];
const DAYS: Weekday[] = [0, 1, 2, 3, 4];

function place(start: number, end: number): CSSProperties {
  return {
    top: `${((start - DAY_START) / SPAN) * 100}%`,
    height: `${((end - start) / SPAN) * 100}%`,
  };
}

export function WeekGrid({ locale }: { locale: Locale }) {
  const t = ui[locale].availability;
  const [phase, setPhase] = useState<Phase>("now");
  const active = activeClasses(classes, phase);
  const hours = Math.round(weeklyFreeMinutes(active, workday.start, workday.end) / 60);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label={t.phaseLabel}
          className="inline-flex rounded-full border border-line p-1 text-sm"
        >
          {(["now", "later"] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={phase === p}
              onClick={() => setPhase(p)}
              className={`rounded-full px-3.5 py-1.5 transition-colors ${
                phase === p ? "bg-panel text-text" : "text-muted hover:text-text"
              }`}
            >
              {p === "now" ? t.now : t.later}
            </button>
          ))}
        </div>
        <p className="font-mono text-sm text-muted" aria-live="polite">
          <span className="text-text">{hours} h</span> / {workdayLabel}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-[2.25rem_repeat(5,1fr)] gap-x-1.5 sm:gap-x-2">
        <div />
        {DAYS.map((day) => (
          <div key={day} className="pb-2 text-center text-sm font-medium">
            {weekdays[locale][day]}
          </div>
        ))}

        <div className="relative h-[26rem]" aria-hidden>
          {HOURS.map((h) => (
            <span
              key={h}
              className="absolute right-1 -translate-y-1/2 font-mono text-[0.6875rem] text-muted"
              style={{ top: `${((h * 60 - DAY_START) / SPAN) * 100}%` }}
            >
              {h}:00
            </span>
          ))}
        </div>

        {DAYS.map((day) => {
          const free = freeWindows(active, day, workday.start, workday.end);
          return (
            <div
              key={day}
              data-lane
              style={{ "--i": day } as CSSProperties}
              className="relative h-[26rem] overflow-hidden rounded-lg bg-ink-raised"
            >
              {HOURS.map((h) => (
                <div
                  key={h}
                  aria-hidden
                  className="absolute inset-x-0 border-t border-line/60"
                  style={{ top: `${((h * 60 - DAY_START) / SPAN) * 100}%` }}
                />
              ))}
              <ul aria-label={t.gridLabel(weekdaysLong[locale][day])} className="absolute inset-0">
                {free.map((w, i) => (
                  <li
                    key={`free-${i}`}
                    className="absolute inset-x-1 rounded-md border-l-2 border-accent bg-accent/15 px-1.5 py-1 font-mono text-[0.6875rem] leading-tight text-text transition-[top,height] duration-300 ease-out"
                    style={place(w.start, w.end)}
                  >
                    <span aria-hidden>
                      {toTime(w.start)}
                      <br />
                      {toTime(w.end)}
                    </span>
                    <span className="sr-only">{t.freeAt(toTime(w.start), toTime(w.end))}</span>
                  </li>
                ))}
                {classes
                  .filter((c) => c.day === day)
                  .map((c) => {
                    const gone = phase === "later" && c.remaining !== undefined;
                    return (
                      <li
                        key={c.start}
                        aria-hidden={gone}
                        className={`hatch absolute inset-x-1 rounded-md border border-line-strong transition-[opacity,transform] duration-300 ease-out ${
                          gone ? "scale-95 opacity-0" : "opacity-100"
                        }`}
                        style={place(toMinutes(c.start), toMinutes(c.end))}
                      >
                        <span className="sr-only">{t.classAt(c.start, c.end)}</span>
                        {c.remaining !== undefined && (
                          <span className="absolute inset-x-1 bottom-1 truncate rounded bg-todo px-1 text-center font-mono text-[0.625rem] font-semibold leading-4 text-ink">
                            <span className="sm:hidden">{t.remainingShort(c.remaining)}</span>
                            <span className="hidden sm:inline">{t.remaining(c.remaining)}</span>
                          </span>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <li className="flex items-center gap-2">
          <span aria-hidden className="hatch inline-block size-3.5 rounded-sm border border-line-strong" />
          {t.classes}
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="inline-block size-3.5 rounded-sm border-l-2 border-accent bg-accent/15" />
          {t.free(workdayLabel)}
        </li>
      </ul>
    </div>
  );
}
