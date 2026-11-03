import type { CSSProperties } from "react";
import { offer } from "@/content/offer";
import { commercialProjects, moreProjects, projects } from "@/content/projects";
import { pick, type CommercialProject, type Locale, type Project, type Screenshot as ScreenshotData } from "@/content/types";
import { ui } from "@/content/ui";
import { GitHubIcon, GlobeIcon } from "./icons";
import { Screenshot } from "./screenshot";
import { Section } from "./section";

function formatMonth(month: string, locale: Locale) {
  const [year, m] = month.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, m - 1, 1)));
}

function period(p: Project, locale: Locale) {
  const start = formatMonth(p.start, locale);
  if (p.end === p.start) return start;
  return `${start} – ${p.end ? formatMonth(p.end, locale) : ui[locale].projects.now}`;
}

function Shot({
  image,
  locale,
  frameClassName,
  imageClassName,
}: {
  image: ScreenshotData;
  locale: Locale;
  frameClassName?: string;
  imageClassName?: string;
}) {
  const t = ui[locale].projects;
  return (
    <Screenshot
      src={image.src}
      alt={pick(image.alt, locale)}
      zoomLabel={t.zoom}
      closeLabel={t.close}
      frameClassName={frameClassName}
      imageClassName={imageClassName}
    />
  );
}

function ProjectRow({ project, locale }: { project: Project; locale: Locale }) {
  const t = ui[locale].projects;
  const links = [{ label: t.repo, href: project.repo }, ...(project.extraLinks ?? []).map((l) => ({ label: pick(l.label, locale), href: l.href }))];

  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="grid gap-x-10 gap-y-6 border-t border-line py-12 first:border-t-0 first:pt-0 md:grid-cols-[11rem_1fr] lg:grid-cols-[11rem_1fr_1fr]"
    >
      <div data-reveal="left" className="text-[0.9375rem]">
        <p className="font-medium">{period(project, locale)}</p>
        <p className="mt-1 text-muted">
          {project.teamLabel ? pick(project.teamLabel, locale) : project.team === 1 ? t.solo : t.team(project.team)}
        </p>
        <p className="text-muted">{pick(project.context, locale)}</p>
        <ul className="mt-4 space-y-1.5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-accent transition-colors hover:text-accent-hover"
              >
                {link.href.startsWith("https://github.com/") ? (
                  <GitHubIcon width={15} height={15} />
                ) : (
                  <GlobeIcon width={15} height={15} />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
        <h3 id={`${project.id}-title`} className="heading text-[1.75rem] md:text-3xl">
          {project.name}
        </h3>
        <p className="prose-measure mt-4">{pick(project.summary, locale)}</p>
        {project.role && (
          <p className="prose-measure mt-4 text-muted">
            <span className="font-medium text-text">{t.role}: </span>
            {pick(project.role, locale)}
          </p>
        )}
        <ul
          data-stagger
          style={{ "--stagger-step": "35ms", "--stagger-base": "450ms" } as CSSProperties}
          className="mt-6 flex flex-wrap gap-1.5"
          aria-label="Stack"
        >
          {project.stack.map((tech) => (
            <li
              key={tech}
              className={`rounded-md border px-2 py-0.5 font-mono text-xs ${
                offer.keywords.test(tech)
                  ? "border-accent/50 text-text"
                  : "border-line text-muted"
              }`}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div data-reveal="right" style={{ "--reveal-delay": "160ms" } as CSSProperties} className="md:col-start-2 lg:col-start-auto">
        <h4 className="text-sm font-medium text-muted">{t.learned}</h4>
        <ul data-stagger style={{ "--stagger-base": "400ms" } as CSSProperties} className="mt-3 space-y-3">
          {pick(project.learned, locale).map((item) => (
            <li key={item} className="relative pl-5 text-[0.9375rem] leading-relaxed">
              <span aria-hidden className="absolute left-0 top-[0.72em] h-0.5 w-2 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {project.image && (
        <div data-reveal="scale" className="mx-auto w-full max-w-4xl md:col-span-full">
          <Shot
            image={project.image}
            locale={locale}
            frameClassName="rounded-lg border border-line"
            imageClassName="reveal-zoom"
          />
        </div>
      )}
    </article>
  );
}

function CommercialCard({ project, locale }: { project: CommercialProject; locale: Locale }) {
  const t = ui[locale].projects;
  return (
    <li className="flex flex-col bg-ink">
      {project.image && (
        <Shot
          image={project.image}
          locale={locale}
          frameClassName="border-b border-line"
          imageClassName="reveal-zoom aspect-[2/1] object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="text-sm text-muted">{pick(project.kind, locale)}</p>
        <h4 className="heading mt-1.5 text-2xl">{project.name}</h4>
        <p className="mt-3 text-[0.9375rem] leading-relaxed">{pick(project.summary, locale)}</p>
        {(project.stack || project.href) && (
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
            {project.stack ? (
              <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted">
                    {tech}
                  </li>
                ))}
              </ul>
            ) : (
              <span />
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[0.9375rem] text-accent transition-colors hover:text-accent-hover"
              >
                <GlobeIcon width={15} height={15} />
                {t.visit}
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

function SubHeading({ title, note }: { title: string; note: string }) {
  return (
    <div data-reveal className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h3 className="text-2xl font-medium tracking-tight">{title}</h3>
      <p className="text-[0.9375rem] text-muted">{note}</p>
    </div>
  );
}

export function Projects({ locale }: { locale: Locale }) {
  const t = ui[locale].projects;

  return (
    <Section id="projects" title={t.title} lead={t.lead}>
      <SubHeading title={t.commercialTitle} note={t.commercialNote} />
      <ul
        data-reveal
        data-stagger="cells"
        className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2"
      >
        {commercialProjects.map((project) => (
          <CommercialCard key={project.name} project={project} locale={locale} />
        ))}
      </ul>

      <div className="mt-20">
        <SubHeading title={t.openTitle} note={t.openNote} />
        <div className="border-t border-line pt-12">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} locale={locale} />
          ))}
        </div>
      </div>

      <div data-reveal className="mt-8 border-t border-line pt-12">
        <h3 className="text-xl font-medium">{t.moreTitle}</h3>
        <ul data-stagger className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-text underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
              >
                {p.name}
              </a>
              <p className="mt-1 text-[0.9375rem] text-muted">{pick(p.summary, locale)}</p>
              <p className="mt-1 font-mono text-xs text-muted">{p.stack}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
