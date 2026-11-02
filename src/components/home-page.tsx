import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { AiPractice } from "./ai-practice";
import { Availability } from "./availability";
import { Contact } from "./contact";
import { Experience } from "./experience";
import { Hero } from "./hero";
import { Nav } from "./nav";
import { Projects } from "./projects";
import { RevealOnScroll } from "./reveal";
import { Requirements } from "./requirements";

export function pageMetadata(locale: Locale): Metadata {
  const t = ui[locale].meta;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: t.title,
    description: t.description,
    // A file-based app/icon.svg gets a mismatched hash under basePath in Next 16, so serve it from public/.
    icons: { icon: { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg`, type: "image/svg+xml" } },
    alternates: {
      canonical: locale === "pl" ? "/" : "/en/",
      languages: { pl: "/", en: "/en/" },
    },
    openGraph: { title: t.title, description: t.description, type: "profile", locale: locale === "pl" ? "pl_PL" : "en_GB" },
  };
}

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        {ui[locale].skip}
      </a>
      <Nav locale={locale} />
      <main id="main">
        <Hero locale={locale} />
        <Requirements locale={locale} />
        <Projects locale={locale} />
        <AiPractice locale={locale} />
        <Availability locale={locale} />
        <Experience locale={locale} />
      </main>
      <Contact locale={locale} />
      <RevealOnScroll />
    </>
  );
}
