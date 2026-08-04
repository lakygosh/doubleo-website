"use client";

import { motion, useReducedMotion } from "motion/react";
import { createElement, type ReactNode } from "react";
import { EASE } from "./Appear";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

type Props = {
  text: string;
  as?: Tag;
  className?: string;
  /** Seconds between words. */
  stagger?: number;
  delay?: number;
  /** Run on mount rather than on scroll (hero headline). */
  trigger?: "load" | "view";
  /**
   * Words at these indices (0-based) render inside the aurora gradient.
   * Used for the one or two accented words in a headline.
   */
  accentWords?: number[];
};

/**
 * Per-word reveal, matching the reference exactly: each word is an
 * inline-block span animating opacity 0.001 → 1, blur(2px) → 0, y 10 → 0,
 * staggered left to right. Fires once when the heading scrolls into view.
 */
export function SplitWords({
  text,
  as = "h2",
  className,
  stagger = 0.035,
  delay = 0,
  trigger = "view",
  accentWords,
}: Props) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const accent = new Set(accentWords ?? []);

  const target = { opacity: 1, filter: "blur(0px)", y: 0 };

  // Spaces sit between the spans rather than inside them, so wrapping and
  // text selection behave exactly like normal prose.
  const children: ReactNode[] = [];
  words.forEach((word, i) => {
    children.push(
      <motion.span
        key={`w${i}`}
        className={accent.has(i) ? "u-gradient-text" : undefined}
        style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
        initial={reduced ? false : { opacity: 0.001, filter: "blur(2px)", y: 10 }}
        {...(trigger === "load"
          ? { animate: target }
          : {
              whileInView: target,
              viewport: { once: true, margin: "0px 0px -10% 0px" },
            })}
        transition={{ delay: delay + i * stagger, duration: 0.5, ease: EASE }}
      >
        {word}
      </motion.span>,
    );
    if (i < words.length - 1) children.push(<span key={`s${i}`}> </span>);
  });

  return createElement(as, { className, "aria-label": text }, children);
}
