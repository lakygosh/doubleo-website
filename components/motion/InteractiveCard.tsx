"use client";

import { motion, useMotionTemplate, useSpring, useTransform, useReducedMotion } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

/**
 * Pointer-reactive card: the surface tilts in 3D towards the cursor while a
 * soft radial glow tracks it across the card. Ported from Lightswind's
 * `interactive-card` — same two effects, but written against our own tokens
 * and applied to the existing card markup, so the card itself is unchanged
 * and nothing here depends on Tailwind.
 *
 * The tilt lives on the element that carries `className`, which is also the
 * element with the border radius and `overflow: hidden`, so the glow is
 * clipped to the card's shape.
 */
export function InteractiveCard({
  children,
  className,
  as = "div",
  /** Peak tilt in degrees at the card's corners. */
  tilt = 6,
  /** Colour of the cursor glow — sits at ~55% alpha by default. */
  glow = "rgba(211, 123, 255, 0.55)",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  tilt?: number;
  glow?: string;
}) {
  const reduced = useReducedMotion();

  // Pointer position within the card, 0–1 on each axis. Springs keep the
  // surface from snapping between frames on a fast pointer.
  const x = useSpring(0.5, { stiffness: 170, damping: 22, mass: 0.4 });
  const y = useSpring(0.5, { stiffness: 170, damping: 22, mass: 0.4 });
  const lit = useSpring(0, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(y, [0, 1], [tilt, -tilt]);
  const rotateY = useTransform(x, [0, 1], [-tilt, tilt]);
  const glowX = useTransform(x, (v) => `${v * 100}%`);
  const glowY = useTransform(y, (v) => `${v * 100}%`);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, ${glow} 0%, transparent 70%)`;

  const Outer = as;

  if (reduced) {
    return <Outer className={className}>{children}</Outer>;
  }

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - b.left) / b.width);
    y.set((e.clientY - b.top) / b.height);
  };

  const leave = () => {
    // Settle back to flat rather than holding the last angle.
    x.set(0.5);
    y.set(0.5);
    lit.set(0);
  };

  return (
    <Outer
      className="tilt"
      onPointerMove={onPointerMove}
      onPointerEnter={() => lit.set(1)}
      onPointerLeave={leave}
    >
      <motion.div
        className={className}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
        <motion.span
          className="tilt__glow"
          aria-hidden="true"
          style={{ background: glowBg, opacity: lit }}
        />
      </motion.div>
    </Outer>
  );
}
