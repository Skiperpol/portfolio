import type { CSSProperties } from "react";
import { offer } from "@/content/offer";
import { projects } from "@/content/projects";
import { pick, type Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { projectsWithSkill } from "@/lib/evidence";
import { Section } from "./section";

export function Requirements({ locale }: { locale: Locale }) {
  const t = ui[locale].requirements;
  const other = offer.mustHave.filter((r) => !r.skill);

  return (
    <Section id="requirements" title={t.title} lead={t.lead}>
      <div data-reveal className="relative overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[58rem] border-collapse text-[0.9375rem]">
          <caption className="sr-only">{t.caption}</caption>
          <thead>
            <tr className="[&>th]:border-b [&>th]:border-line">
              <th
                scope="col"
                className="sticky left-0 z-10 w-40 bg-ink px-4 py-4 text-left text-sm font-normal text-muted sm:w-56 sm:px-5"
              >
                {t.requirement}
              </th>
              {projects.map((p) => (
                <th key={p.id} scope="col" className="px-2 py-4 align-bottom text-[0.8125rem] font-medium leading-tight">
                  <a href={`#${p.id}`} className="inline-block text-muted transition-colors hover:text-accent">
                    {p.shortName}
                  </a>
                </th>
              ))}
              <th scope="col" className="px-5 py-4 text-right text-sm font-normal text-muted">
                {t.total}
              </th>
            </tr>
          </thead>
          <tbody className="[&>tr:last-child>*]:border-b-0">
            {offer.stack.map((row, r) => {
              const used = projectsWithSkill(row.skill);
              return (
                <tr key={row.skill} className="group [&>*]:border-b [&>*]:border-line">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-ink px-4 py-3.5 text-left font-medium transition-colors group-hover:bg-panel sm:px-5"
                  >
                    {pick(row.label, locale)}
                    <span className="block text-[0.8125rem] font-normal text-muted">
                      {pick(row.level, locale)}
                    </span>
                  </th>
                  {projects.map((p, c) => {
                    const isUsed = used.includes(p);
                    return (
                      <td key={p.id} className="px-2 text-center transition-colors group-hover:bg-panel">
                        <span
                          aria-hidden
                          style={{ "--r": r, "--c": c } as CSSProperties}
                          className={
                            isUsed
                              ? "matrix-dot inline-block size-3 rounded-full bg-accent"
                              : "matrix-dot inline-block size-1 rounded-full bg-line-strong"
                          }
                        />
                        <span className="sr-only">{isUsed ? t.used : t.notUsed}</span>
                      </td>
                    );
                  })}
                  <td className="px-5 text-right font-mono text-sm transition-colors group-hover:bg-panel">
                    <span data-count={used.length}>{used.length}</span>
                    <span className="text-muted">/{projects.length}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3 data-reveal className="mt-14 text-xl font-medium">{t.otherTitle}</h3>
      <ul data-reveal data-stagger="cells" className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {other.map((r) => (
          <li key={r.label.en} className="bg-ink p-5">
            <p className="text-muted">{pick(r.label, locale)}</p>
            <p className="mt-2 text-lg font-medium">
              {r.href ? (
                <a href={r.href} className="underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent">
                  {r.note && pick(r.note, locale)}
                </a>
              ) : (
                r.note && pick(r.note, locale)
              )}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
