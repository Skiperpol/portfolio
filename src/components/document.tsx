import { JetBrains_Mono, Mona_Sans } from "next/font/google";
import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import "@/app/globals.css";

const mona = Mona_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
});

/** The <html> shell shared by the Polish and English root layouts. */
export function Document({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${mona.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
