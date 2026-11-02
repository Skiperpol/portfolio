"use client";

import { useState, type ReactNode } from "react";
import { RerunIcon } from "./icons";

/** Remounts the output so the CSS print-out plays again. */
export function TestRunFrame({
  file,
  label,
  rerunLabel,
  children,
}: {
  file: string;
  label: string;
  rerunLabel: string;
  children: ReactNode;
}) {
  const [run, setRun] = useState(0);

  return (
    <figure
      aria-label={label}
      className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-raised font-mono text-[0.8125rem] leading-[1.7] shadow-[0_30px_80px_-40px_rgba(132,134,255,0.45)]"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
        <span className="text-muted">{file}</span>
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="-mr-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-muted transition-colors hover:text-text"
        >
          <RerunIcon width={14} height={14} />
          {rerunLabel}
        </button>
      </div>
      <div key={run} className="px-4 py-4 sm:px-5">
        {children}
      </div>
    </figure>
  );
}
