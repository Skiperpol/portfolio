"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

/** A screenshot that opens at full size in a modal dialog. */
export function Screenshot({
  src,
  alt,
  zoomLabel,
  closeLabel,
  frameClassName = "",
  imageClassName = "",
}: {
  src: StaticImageData;
  alt: string;
  zoomLabel: string;
  closeLabel: string;
  frameClassName?: string;
  imageClassName?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`${zoomLabel}: ${alt}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden bg-ink-raised ${frameClassName}`}
      >
        <Image
          src={src}
          alt={alt}
          sizes="(min-width: 1024px) 900px, 100vw"
          className={`block w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] ${imageClassName}`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-line-strong bg-ink/85 px-3 py-1 text-xs text-text opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {zoomLabel}
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label={alt}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        className="lightbox m-auto max-h-[92vh] max-w-[min(94vw,1840px)] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <Image
          src={src}
          alt={alt}
          sizes="94vw"
          className="block h-auto max-h-[92vh] w-auto max-w-full rounded-lg border border-line-strong"
        />
        <form method="dialog">
          <button
            type="submit"
            aria-label={closeLabel}
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-line-strong bg-ink/85 text-lg leading-none text-text transition-colors hover:bg-panel"
          >
            ×
          </button>
        </form>
      </dialog>
    </>
  );
}
