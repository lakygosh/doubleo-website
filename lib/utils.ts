import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names. Only needed by the vendored components under
 * components/lightswind and components/ui — the rest of the site is hand-written
 * CSS against the tokens, and has no use for it. See DESIGN-SYSTEM.md.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
