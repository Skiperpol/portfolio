"use client";

import { useState, type CSSProperties } from "react";
import { classes, weekdays, weekdaysLong, workday, workdayLabel } from "@/content/schedule";
import type { Locale, Weekday } from "@/content/types";
import { ui } from "@/content/ui";
import {
  activeClasses,
  formatDuration,
  freeWindows,
  toMinutes,
  toTime,
  weeklyFreeMinutes,
  type Phase,
} from "@/lib/availability";

const DAY_START = toMinutes("06:30");
const DAY_END = toMinutes("20:30");
const SPAN = DAY_END - DAY_START;
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7:00–20:00
const DAYS: Weekday[] = [0, 1, 2, 3, 4];
const LANE_HEIGHT = "h-[32rem] sm:h-[40rem]";

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

const at = (minutes: number) => `${((minutes - DAY_START) / SPAN) * 100}%`;

function place(start: number, end: number): CSSProperties {
  return { top: at(start), height: `${((end - start) / SPAN) * 100}%` };
}

export function WeekGrid({ locale }: { locale: Locale }) {
  const t = ui[locale].availability;
  const [phase, setPhase] = useState<Phase>("now");
  const active = activeClasses(classes, phase);
  const hours = Math.round(weeklyFreeMinutes(active, workday.start, workday.end) / 60);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={t.phaseLabel} className="inline-flex rounded-full border border-line p-1 text-sm">
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
        <p className="text-muted" aria-live="polite">
          <span className="heading text-3xl text-text">{hours}&nbsp;h</span> {t.weekTotal}{" "}
          <span className="whitespace-nowrap">{workdayLabel}</span>
        </p>
      </div>

      <div className="mt-8 grid grid-cols-[2.5rem_repeat(5,1fr)] gap-x-1.5 sm:grid-cols-[3.25rem_repeat(5,1fr)] sm:gap-x-3">
        <div />
        {DAYS.map((day) => (
          <div key={day} className="pb-3 text-center text-sm font-medium sm:text-base">
            <span className="sm:hidden">{weekdays[locale][day]}</span>
            <span className="hidden sm:inline">{capitalize(weekdaysLong[locale][day])}</span>
          </div>
        ))}

        <div className={`relative ${LANE_HEIGHT}`} aria-hidden>
          {HOURS.map((h) => (
            <span
              key={h}
              className={`absolute right-1.5 -translate-y-1/2 font-mono text-[0.6875rem] text-muted sm:right-2 sm:text-xs ${
                h % 2 ? "hidden sm:block" : ""
              }`}
              style={{ top: at(h * 60) }}
            >
              {h}:00
            </span>
          ))}
          <span className="absolute right-1.5 top-full -translate-y-1/2 font-mono text-[0.6875rem] text-muted sm:right-2 sm:text-xs">
            {toTime(DAY_END)}
          </span>
        </div>

        {DAYS.map((day) => {
          const free = freeWindows(active, day, workday.start, workday.end);
          return (
            <div
              key={day}
              data-lane
              style={{ "--i": day } as CSSProperties}
              className={`relative overflow-hidden rounded-lg bg-ink-raised ${LANE_HEIGHT}`}
            >
              {HOURS.map((h) => (
                <div
                  key={h}
                  aria-hidden
                  className={`absolute inset-x-0 border-t ${h % 2 ? "border-line/35" : "border-line/70"}`}
                  style={{ top: at(h * 60) }}
                />
              ))}
              <ul aria-label={t.gridLabel(weekdaysLong[locale][day])} className="absolute inset-0">
                {free.map((w, i) => (
                  <li
                    key={`free-${i}`}
                    className="absolute inset-x-1 overflow-hidden rounded-md border-l-2 border-accent bg-accent/15 px-1.5 py-1.5 font-mono text-[0.6875rem] leading-tight text-text transition-[top,height] duration-300 ease-out sm:inset-x-1.5 sm:px-3 sm:py-2.5 sm:text-sm"
                    style={place(w.start, w.end)}
                  >
                    <span aria-hidden className="sm:hidden">
                      {toTime(w.start)}
                      <br />
                      {toTime(w.end)}
                    </span>
                    <span aria-hidden className="hidden sm:block">
                      {toTime(w.start)}–{toTime(w.end)}
                    </span>
                    <span aria-hidden className="mt-1 hidden font-sans text-[0.8125rem] text-muted sm:block">
                      {formatDuration(w.end - w.start)}
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
                        className={`hatch absolute inset-x-1 overflow-hidden rounded-md border border-line-strong transition-[opacity,transform] duration-300 ease-out sm:inset-x-1.5 ${
                          gone ? "scale-95 opacity-0" : "opacity-100"
                        }`}
                        style={place(toMinutes(c.start), toMinutes(c.end))}
                      >
                        <span className="sr-only">{t.classAt(c.start, c.end)}</span>
                        <span
                          aria-hidden
                          className="absolute left-1.5 top-1.5 hidden rounded bg-ink-raised/90 px-1.5 py-0.5 text-xs leading-tight text-muted sm:block"
                        >
                          {t.classes}
                          <span className="block font-mono text-[0.6875rem]">
                            {c.start}–{c.end}
                          </span>
                        </span>
                        {c.remaining !== undefined && (
                          <span className="absolute inset-x-1 bottom-1 truncate rounded bg-todo px-1 text-center font-mono text-[0.625rem] font-semibold leading-4 text-ink sm:inset-x-1.5 sm:bottom-1.5 sm:text-xs sm:leading-5">
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

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
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
