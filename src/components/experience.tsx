import type { CSSProperties } from "react";
import { education, experience, type TimelineEntry } from "@/content/profile";
import { pick, type Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { glue } from "@/lib/typography";
import { Section } from "./section";

function Timeline({
  title,
  entries,
  locale,
  delay = 0,
  from,
}: {
  title: string;
  entries: TimelineEntry[];
  locale: Locale;
  delay?: number;
  from: "left" | "right";
}) {
  return (
    <div data-reveal={from} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      <h3 className="text-sm text-muted">{title}</h3>
      <ol data-stagger style={{ "--stagger-base": "300ms" } as CSSProperties} className="mt-4 border-t border-line">
        {entries.map((e) => (
          <li key={e.place + pick(e.period, locale)} className="grid gap-x-6 gap-y-1 border-b border-line py-5 sm:grid-cols-[9.5rem_1fr]">
            <p className="text-[0.9375rem] text-muted">{pick(e.period, locale)}</p>
            <div>
              <p className="font-medium">
                {pick(e.title, locale)}
                <span className="font-normal text-muted">, {glue(e.place)}</span>
              </p>
              <p className="prose-measure mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{pick(e.detail, locale)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Experience({ locale }: { locale: Locale }) {
  const t = ui[locale].experience;

  return (
    <Section id="experience" title={t.title}>
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <Timeline title={t.work} entries={experience} locale={locale} from="left" />
        <Timeline title={t.education} entries={education} locale={locale} delay={120} from="right" />
      </div>
    </Section>
  );
}
