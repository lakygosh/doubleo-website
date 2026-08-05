"use client";

import { motion, useMotionValue, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * The About section's signature effect, cloned from the reference:
 * a tall scroll track containing a `position: sticky` block. Each word sits
 * at opacity 0.1 / blur(4px) and lights up to full as the scroll progress
 * passes it, left to right, top to bottom.
 *
 * Confirmed from the reference's source — it uses exactly:
 *   opacity 0.1 → 1, filter blur → 0 per word.
 *
 * Progress is measured here rather than with `useScroll({ target, offset })`:
 * the offset form resolves against view-timeline ranges, which don't line up
 * with the window during which the child is actually pinned. Measuring the
 * track directly makes progress 0 the moment it pins and 1 the moment it
 * releases, which is what the effect needs.
 */

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const blur = useTransform(progress, range, [4, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.span className="swr__word" style={{ opacity, filter }}>
      {children}
    </motion.span>
  );
}

export function ScrollWordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // The sticky child is pinned for (track height − viewport height) px.
      const span = el.offsetHeight - window.innerHeight;
      if (span <= 0) {
        progress.set(1);
        return;
      }
      const p = -rect.top / span;
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
  }, [progress, reduced]);

  const words = text.split(" ");

  /* Words light over overlapping slices so the wave reads as continuous. The
     overlap has to be paid for out of the track, not tacked onto the end —
     dividing by `words.length` alone pushed the last word's range past 1,
     where progress is already clamped, so it never finished lighting up.
     `END` leaves a beat with the sentence fully lit before the track lets go. */
  const OVERLAP = 1.6;
  const END = 0.92;
  const step = END / (words.length - 1 + OVERLAP);

  if (reduced) {
    return (
      <div className="swr">
        <div className="swr__sticky">
          <p className={className ? `swr__text ${className}` : "swr__text"}>{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="swr" ref={ref}>
      <div className="swr__sticky">
        <p className={className ? `swr__text ${className}` : "swr__text"} aria-label={text}>
          {words.map((word, i) => (
            <Word
              key={i}
              progress={progress}
              range={[i * step, (i + OVERLAP) * step]}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </div>
  );
}
