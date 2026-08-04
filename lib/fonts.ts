import localFont from "next/font/local";
import { Fragment_Mono } from "next/font/google";

/**
 * Display face — General Sans (Fontshare, free for commercial use).
 * Self-hosted from public/fonts so there is no third-party request and no CLS.
 */
export const generalSans = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  // Inter is metrically close enough to keep the swap from jumping.
  fallback: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
});

/** Eyebrow / label face — uppercase, tracked out. */
export const fragmentMono = Fragment_Mono({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
});
