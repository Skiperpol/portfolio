import Link from "next/link";
import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { GitHubIcon } from "./icons";

export function Nav({ locale }: { locale: Locale }) {
  const t = ui[locale].nav;
  const links = [
    { href: "#requirements", label: t.requirements },
    { href: "#projects", label: t.projects },
    { href: "#availability", label: t.availability },
    { href: "#contact", label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/80 backdrop-blur-md">
      <div aria-hidden className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
      <div className="frame flex h-[var(--nav-height)] items-center justify-between gap-6">
        <a href="#top" className="text-[0.9375rem] font-semibold tracking-tight">
          {profile.name}
        </a>
        <nav aria-label={t.label} className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md px-3 py-2 text-[0.9375rem] text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <span aria-hidden className="mx-2 hidden h-5 w-px bg-line md:block" />
          <Link
            href={locale === "pl" ? "/en/" : "/"}
            hrefLang={locale === "pl" ? "en" : "pl"}
            aria-label={t.switchTo}
            className="rounded-md px-3 py-2 font-mono text-[0.8125rem] text-muted transition-colors hover:text-text"
          >
            {t.switchShort}
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label={t.github}
            className="rounded-md p-2 text-muted transition-colors hover:text-text"
          >
            <GitHubIcon />
          </a>
        </nav>
      </div>
    </header>
  );
}
