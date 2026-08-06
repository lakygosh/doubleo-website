"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/toc";

/**
 * Sticky table of contents for a post.
 *
 * Anchor clicks are left alone: SmoothScroll already intercepts every in-page
 * `#hash` link globally and hands it to Lenis with the right nav offset, so
 * adding a handler here would only fight it.
 *
 * The active entry is whichever heading was last scrolled past, measured on a
 * rAF-throttled scroll listener rather than an IntersectionObserver — "the
 * section I'm currently inside" is a question about the *last* heading above
 * the fold line, which observers answer awkwardly when a long section leaves
 * no heading intersecting at all.
 */
export function PostToc({ headings, label }: { headings: Heading[]; label: string }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      // Matches SmoothScroll's -96px anchor offset, plus a little slack.
      const line = 120;
      let current = headings[0].id;

      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = h.id;
        else break;
      }

      // At the very bottom the last section may never cross the line.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = headings[headings.length - 1].id;
      }

      setActive(current);
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="toc" aria-labelledby="toc-label">
      <span className="toc__label" id="toc-label">
        {label}
      </span>
      <ul className="toc__list">
        {headings.map((h, i) => (
          <li key={`${h.id}-${i}`} className={`toc__item toc__item--h${h.level}`}>
            <a
              href={`#${h.id}`}
              className={`toc__link${active === h.id ? " is-active" : ""}`}
              aria-current={active === h.id ? "location" : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
