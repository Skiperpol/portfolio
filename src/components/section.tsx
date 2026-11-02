import type { ReactNode } from "react";
import { SplitWords } from "./split-words";

export function Section({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-b border-line">
      <div className="frame py-20 md:py-28">
        <header data-reveal="text" className="mb-12 max-w-3xl md:mb-16">
          <h2 id={`${id}-title`} className="heading text-4xl md:text-[3.5rem]">
            <SplitWords text={title} />
          </h2>
          {lead && <p className="reveal-lead prose-measure mt-5 text-lg text-muted">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
  external,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
  external?: boolean;
}) {
  const styles =
    variant === "primary"
      ? "bg-accent text-ink hover:bg-accent-hover"
      : "border border-line-strong text-text hover:border-muted";
  return (
    <a
      href={href}
      className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium transition-colors ${styles}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
