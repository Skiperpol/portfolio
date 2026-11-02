import type { CSSProperties } from "react";
import { classes, workday, workdayLabel } from "@/content/schedule";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { activeClasses, weeklyFreeMinutes } from "@/lib/availability";
import { Section } from "./section";
import { WeekGrid } from "./week-grid";

export function Availability({ locale }: { locale: Locale }) {
  const t = ui[locale].availability;
  const hours = (phase: "now" | "later") =>
    Math.round(weeklyFreeMinutes(activeClasses(classes, phase), workday.start, workday.end) / 60);

  const facts = [
    { term: t.office, value: t.officeValue },
    { term: t.hours, value: t.hoursValue(hours("now"), hours("later"), workdayLabel) },
    { term: t.location, value: t.locationValue },
    { term: t.contract, value: t.contractValue },
  ];

  return (
    <Section id="availability" title={t.title} lead={t.lead(workdayLabel)}>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <dl data-reveal="left" data-stagger className="divide-y divide-line border-y border-line">
          {facts.map((f) => (
            <div key={f.term} className="py-5">
              <dt className="text-sm text-muted">{f.term}</dt>
              <dd className="mt-1.5 text-[1.0625rem]">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div data-reveal="right" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          <WeekGrid locale={locale} />
        </div>
      </div>
    </Section>
  );
}
