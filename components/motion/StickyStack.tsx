"use client";

import { motion, useMotionValue, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sticky card stack, as used for the reference's "Product Overview" section.
 *
 * Each card pins slightly lower than the one before it, so a band of every
 * earlier card stays visible above the incoming one and the section reads as
 * a physical deck. A card recedes by `DEPTH_STEP` for every card stacked on
 * top of it — the effect compounds, so the card at the back of a six-card
 * stack ends up at half size.
 *
 * Two things are load-bearing:
 *
 * - Scaling from `top`: the outgoing card's top edge stays on its pin line
 *   while its bottom rises, so it is always strictly shorter and narrower
 *   than the card arriving over it. Full coverage without forcing every card
 *   to the same height.
 * - The dim is an opaque scrim laid over the card, never `opacity` on the
 *   card itself. Fading the card would make it translucent and the cards
 *   further back would show through it.
 */

/** Distance from the viewport top that the first card pins to. */
const PIN_TOP = "calc(var(--nav-h) + 2rem)";
/** How much each card shrinks per card stacked on top of it. */
const DEPTH_STEP = 0.1;
/** Floor for the compounded scale — half size, as on the reference. */
const MIN_SCALE = 0.5;
/** Scrim opacity per depth step, and its ceiling. */
const DIM_STEP = 0.16;
const MAX_DIM = 0.5;

export function StickyStackItem({
  children,
  index,
  total,
  className,
}: {
  children: ReactNode;
  index: number;
  total: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  /** How many cards are stacked on top of this one, as a continuous value. */
  const depth = useMotionValue(0);
  const isLast = index === total - 1;

  useEffect(() => {
    // Nothing covers the last card, so it never recedes.
    if (reduced || isLast) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;

      // While pinned, this card's top *is* its pin line. Every later card
      // closes on it in turn; one card-height out is where its contribution
      // starts, and it reaches a full 1 once that card has landed. Summing
      // them is what makes the recede compound down the stack.
      const pinTop = el.getBoundingClientRect().top;
      const travel = el.offsetHeight || 1;
      let d = 0;

      for (let sib = el.nextElementSibling; sib; sib = sib.nextElementSibling) {
        const remaining = (sib as HTMLElement).getBoundingClientRect().top - pinTop;
        const p = 1 - remaining / travel;
        if (p <= 0) break; // later cards are further away still
        d += p > 1 ? 1 : p;
      }

      depth.set(d);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [depth, reduced, isLast]);

  const scale = useTransform(depth, (d) => Math.max(1 - d * DEPTH_STEP, MIN_SCALE));
  const dim = useTransform(depth, (d) => Math.min(d * DIM_STEP, MAX_DIM));
  const still = reduced || isLast;

  return (
    <div
      className="stack__slot"
      ref={ref}
      style={{ top: `calc(${PIN_TOP} + ${index} * var(--stack-offset))`, zIndex: index }}
    >
      <motion.div
        className={className ? `stack__item ${className}` : "stack__item"}
        style={still ? undefined : { scale, transformOrigin: "center top", willChange: "transform" }}
      >
        {children}
        {!still && <motion.span className="stack__scrim" style={{ opacity: dim }} aria-hidden="true" />}
      </motion.div>
    </div>
  );
}

export function StickyStack({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ? `stack ${className}` : "stack"}>{children}</div>;
}
