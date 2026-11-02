"use client";

import { useEffect } from "react";

const inView = (el: Element) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

/** Counts an element's text up from 0 to its data-count value. */
function countUp(el: HTMLElement, timers: number[]) {
  const target = Number(el.dataset.count);
  const duration = 900;
  timers.push(
    window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        el.textContent = String(Math.round(target * (1 - (1 - t) ** 3)));
        if (t < 1) timers.push(requestAnimationFrame(tick));
      };
      timers.push(requestAnimationFrame(tick));
    }, 450),
  );
}

/**
 * Plays the scroll animations defined in globals.css: [data-reveal] blocks,
 * [data-stagger] lists and [data-count] numbers inside them. Content stays
 * visible until this runs, so the page still works without JavaScript.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    for (const list of document.querySelectorAll<HTMLElement>("[data-stagger]")) {
      Array.from(list.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));
    }

    // Whatever is already on screen stays put, so nothing blinks after hydration.
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]"));
    const pending = blocks.filter((el) => !inView(el));
    for (const el of blocks) if (!pending.includes(el)) el.classList.add("is-revealed");
    // Numbers count up with the block that holds them, which also covers cells
    // scrolled out of sight inside a horizontally scrolling table.
    for (const el of pending) for (const n of el.querySelectorAll<HTMLElement>("[data-count]")) n.textContent = "0";

    document.documentElement.classList.add("reveal-ready");

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-revealed");
          el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => countUp(n, timers));
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    pending.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      timers.forEach((id) => {
        clearTimeout(id);
        cancelAnimationFrame(id);
      });
    };
  }, []);

  return null;
}
