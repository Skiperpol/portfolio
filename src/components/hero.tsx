import type { CSSProperties, ReactNode } from "react";
import { offer } from "@/content/offer";
import { profile } from "@/content/profile";
import { pick, type Locale, type Requirement } from "@/content/types";
import { ui } from "@/content/ui";
import { evidenceCount } from "@/lib/evidence";
import { GitHubIcon } from "./icons";
import { ButtonLink } from "./section";
import { SplitWords } from "./split-words";
import { TestRunFrame } from "./test-run-frame";

const specFile = `${offer.company.toLowerCase()}.spec.ts`;

function Line({ i, children, className = "" }: { i: number; children?: ReactNode; className?: string }) {
  return (
    <div className={`run-line min-h-[1.7em] ${className}`} style={{ "--i": i } as CSSProperties}>
      {children}
    </div>
  );
}

function TestRun({ locale }: { locale: Locale }) {
  const t = ui[locale].terminal;
  const groups = [
    { name: t.mustHave, items: offer.mustHave },
    { name: t.niceToHave, items: offer.niceToHave },
  ];
  const all = [...offer.mustHave, ...offer.niceToHave];
  const passed = all.filter((r) => r.status === "pass").length;
  const todo = all.length - passed;

  const evidence = (r: Requirement) => {
    const count = evidenceCount(r);
    const text = count !== null ? t.projects(count) : r.note ? pick(r.note, locale) : "";
    const href = r.href ?? (r.skill ? "#requirements" : undefined);
    return href ? (
      <a href={href} className="underline-offset-4 hover:text-text hover:underline">
        {text}
      </a>
    ) : (
      text
    );
  };

  let i = 0;
  return (
    <TestRunFrame file={specFile} label={t.label} rerunLabel={t.rerun}>
      <Line i={i++}>
        <span className="text-muted">$</span> npx vitest run {specFile}
      </Line>
      <Line i={i++} />
      {groups.map((group) => (
        <div key={group.name}>
          <Line i={i++}>
            <span className="text-pass">✓</span> {group.name}{" "}
            <span className="text-muted">({group.items.length})</span>
          </Line>
          {group.items.map((r) => (
            <Line key={r.label.en} i={i++} className="flex flex-wrap justify-between gap-x-4 pl-4">
              <span>
                {r.status === "pass" ? (
                  <span className="text-pass">✓</span>
                ) : (
                  <span className="text-todo">↓</span>
                )}{" "}
                {pick(r.label, locale)}
              </span>
              <span className={`pl-4 sm:pl-0 ${r.status === "todo" ? "text-todo" : "text-muted"}`}>
                {evidence(r)}
              </span>
            </Line>
          ))}
        </div>
      ))}
      <Line i={i++} />
      <Line i={i++}>
        <span className="mr-3 text-muted">{t.summaryLabel}</span>
        <span className="text-pass">{t.passed(passed)}</span>
        <span className="text-muted"> | </span>
        <span className="text-todo">{t.todo(todo)}</span>
        <span className="text-muted"> ({all.length})</span>
      </Line>
      <Line i={i++} />
      <Line i={i++}>
        <span className="rounded-sm bg-pass px-1.5 py-px font-semibold text-ink">PASS</span>{" "}
        <span className="text-muted">{t.waiting}</span>
      </Line>
    </TestRunFrame>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const t = ui[locale].hero;
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(132,134,255,0.22),transparent)] blur-2xl"
      />
      <div className="frame relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-14">
        <div className="hero-parallax">
          <a
            href="#requirements"
            className="hero-in inline-flex rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-text"
          >
            {t.applying(offer.role, offer.company)}
          </a>
          <h1 className="display mt-8 text-[clamp(3.5rem,11vw,7.5rem)]">
            <span className="block">
              <SplitWords text={first} wordClassName="hero-word" />
            </span>
            <span className="block">
              <SplitWords text={rest.join(" ")} wordClassName="hero-word" offset={1} />
            </span>
          </h1>
          <p className="hero-in prose-measure mt-8 text-xl leading-snug md:text-2xl" style={{ "--d": "350ms" } as CSSProperties}>
            {t.lead}
          </p>
          <p className="hero-in prose-measure mt-4 text-muted" style={{ "--d": "480ms" } as CSSProperties}>
            {t.sub}
          </p>
          <div className="hero-in mt-9 flex flex-wrap gap-3" style={{ "--d": "600ms" } as CSSProperties}>
            <ButtonLink href="#projects">{t.primary}</ButtonLink>
            <ButtonLink href={profile.github} variant="secondary" external>
              <GitHubIcon />
              {t.secondary}
            </ButtonLink>
          </div>
        </div>
        <div className="hero-parallax-slow">
          <div className="hero-in" style={{ "--d": "450ms" } as CSSProperties}>
            <TestRun locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
