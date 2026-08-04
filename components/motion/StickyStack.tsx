"use client";

import { motion, useMotionValue, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sticky card stack, as used for the reference's "Product Overview" section.
 *
 * Every card pins at the same line, so the incoming card lands exactly on top
 * of the one before it and covers it completely. As the next card rises, the
 * outgoing one scales down from its top edge and dims — it reads as receding
 * into the stack rather than sliding away.
 *
 * Scaling from `top` matters: the outgoing card's top edge stays on the pin
 * line while its bottom rises, so a card at scale 0.88 is always strictly
 * shorter than the full-size card arriving over it. That guarantees full
 * coverage without forcing every card to the same height.
 */

/** Distance from the viewport top that every card pins to. */
const PIN_TOP = "calc(var(--nav-h) + 2rem)";

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
  const progress = useMotionValue(0);
  const isLast = index === total - 1;

  useEffect(() => {
    // Nothing covers the last card, so it never recedes.
    if (reduced || isLast) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const next = el.nextElementSibling as HTMLElement | null;
      if (!next) return;

      // While pinned, this card's top *is* the pin line. The next card's top
      // closes on it; one card-height out is where the recede starts.
      const pinTop = el.getBoundingClientRect().top;
      const travel = el.offsetHeight || 1;
      const remaining = next.getBoundingClientRect().top - pinTop;
      const p = 1 - remaining / travel;
      progress.set(p < 0 ? 0 : p > 1 ? 1 : p);
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
  }, [progress, reduced, isLast]);

  const scale = useTransform(progress, [0, 1], [1, 0.88]);
  const opacity = useTransform(progress, [0, 1], [1, 0.72]);

  return (
    <div className="stack__slot" ref={ref} style={{ top: PIN_TOP, zIndex: index }}>
      <motion.div
        className={className}
        style={
          reduced || isLast
            ? undefined
            : { scale, opacity, transformOrigin: "center top", willChange: "transform" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StickyStack({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ? `stack ${className}` : "stack"}>{children}</div>;
}
