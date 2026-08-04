"use client";

import type { ReactNode } from "react";

/**
 * Infinite horizontal ticker. Two identical tracks translate by -50% in a
 * CSS loop, so the seam is never visible. Edges fade out with a mask,
 * matching the blur overlay on the reference.
 *
 * CSS animation rather than JS: it keeps running off the main thread and
 * stops automatically under prefers-reduced-motion (see base.css).
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
}: {
  children: ReactNode;
  /** Seconds for one full pass. Higher = slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={className ? `marquee ${className}` : "marquee"} aria-hidden="true">
      <div
        className={reverse ? "marquee__track marquee__track--rev" : "marquee__track"}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="marquee__group">{children}</div>
        <div className="marquee__group">{children}</div>
      </div>
    </div>
  );
}
