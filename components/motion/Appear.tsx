"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * The reference site's one appear animation, lifted from its Framer config:
 *   opacity 0.001 → 1, y 20/40 → 0, ease [0.12, 0.23, 0.5, 1]
 * Hero elements run on load with a cascade of delays (0.4 / 0.8 / 1.2 / 1.3);
 * everything below the fold runs once on scroll into view.
 */

export const EASE = [0.12, 0.23, 0.5, 1] as const;

export type AppearProps = {
  children: ReactNode;
  /** Travel distance in px. Reference uses 20 for small elements, 40 for blocks. */
  y?: number;
  delay?: number;
  duration?: number;
  /** `load` fires immediately (hero); `view` waits for the viewport. */
  trigger?: "load" | "view";
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

export function Appear({
  children,
  y = 24,
  delay = 0,
  duration = 0.6,
  trigger = "view",
  className,
  style,
  id,
}: AppearProps) {
  const target = { opacity: 1, y: 0 };

  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0.001, y }}
      {...(trigger === "load"
        ? { animate: target }
        : {
            whileInView: target,
            viewport: { once: true, margin: "0px 0px -12% 0px" },
          })}
      transition={{ delay, duration, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
