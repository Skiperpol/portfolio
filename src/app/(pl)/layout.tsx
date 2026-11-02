import type { ReactNode } from "react";
import { Document } from "@/components/document";
import { pageMetadata } from "@/components/home-page";

export const metadata = pageMetadata("pl");

export default function PolishLayout({ children }: { children: ReactNode }) {
  return <Document locale="pl">{children}</Document>;
}
