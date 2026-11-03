import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { CopyEmail } from "./copy-email";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { ButtonLink } from "./section";
import { SplitWords } from "./split-words";

export function Contact({ locale }: { locale: Locale }) {
  const t = ui[locale].contact;
  const footer = ui[locale].footer;

  return (
    <footer id="contact" aria-labelledby="contact-title">
      <div className="frame py-24 md:py-32">
        <div data-reveal="text">
          <h2 id="contact-title" className="display text-[clamp(2.25rem,9vw,6.5rem)]">
            <SplitWords text={t.title} />
          </h2>
          <p className="reveal-lead mt-6 text-xl text-muted">{t.lead}</p>
          <p className="reveal-lead mt-2 font-mono text-lg">
            <a href={`mailto:${profile.email}`} className="underline decoration-line-strong underline-offset-4 hover:decoration-accent">
              {profile.email}
            </a>
          </p>
          <div data-stagger style={{ "--stagger-base": "500ms" } as CSSProperties} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${profile.email}`}>
              <MailIcon />
              {t.write}
            </ButtonLink>
            <CopyEmail email={profile.email} label={t.copy} doneLabel={t.copied} />
            <ButtonLink href={profile.linkedin} variant="secondary" external>
              <LinkedInIcon />
              {t.linkedin}
            </ButtonLink>
            <ButtonLink href={profile.github} variant="secondary" external>
              <GitHubIcon />
              {t.github}
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="frame flex flex-wrap justify-between gap-x-8 gap-y-2 py-6 text-sm text-muted">
          <p>
            © 2026 {profile.name}
          </p>
          <p>
            {footer.built}{" "}
            <a href={profile.source} target="_blank" rel="noreferrer" className="text-text underline decoration-line-strong underline-offset-4 hover:decoration-accent">
              {footer.source}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
