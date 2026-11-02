"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

export function CopyEmail({ email, label, doneLabel }: { email: string; label: string; doneLabel: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[0.9375rem] font-medium transition-colors hover:border-muted"
    >
      {copied ? <CheckIcon className="text-pass" /> : <CopyIcon />}
      <span aria-live="polite">{copied ? doneLabel : label}</span>
    </button>
  );
}
