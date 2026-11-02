import type { ReactNode } from "react";
import { Document } from "@/components/document";
import { pageMetadata } from "@/components/home-page";

export const metadata = pageMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <Document locale="en">{children}</Document>;
}
