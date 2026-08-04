"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Client boundary for MotionConfig so the locale layout can stay a server
 * component. `reducedMotion="user"` makes every transform animation in the
 * app respect the OS setting without each component checking for itself.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
