import { aiPractice } from "@/content/profile";
import { pick, type Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { Section } from "./section";

export function AiPractice({ locale }: { locale: Locale }) {
  const t = ui[locale].ai;

  return (
    <Section id="ai" title={t.title} lead={t.lead}>
      <ul data-reveal data-stagger="cells" className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
        {aiPractice.map((item) => (
          <li key={item.title.en} className="bg-ink p-6 md:p-8">
            <h3 className="text-xl font-medium tracking-tight">{pick(item.title, locale)}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{pick(item.body, locale)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
