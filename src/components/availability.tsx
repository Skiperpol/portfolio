import { workdayLabel } from "@/content/schedule";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { Section } from "./section";
import { WeekGrid } from "./week-grid";

export function Availability({ locale }: { locale: Locale }) {
  const t = ui[locale].availability;

  return (
    <Section id="availability" title={t.title} lead={t.lead(workdayLabel)}>
      <div data-reveal>
        <WeekGrid locale={locale} />
      </div>
    </Section>
  );
}
