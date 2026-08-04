import type { Solution } from "@/lib/solutions";

/**
 * Line icons for the six solutions. Inline SVG (no icon dependency), 24×24,
 * 1.6px stroke, inheriting currentColor so each card can tint its own.
 */
export function SolutionIcon({ name, size = 22 }: { name: Solution["icon"]; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: "false" as const,
  };

  switch (name) {
    case "chat":
      return (
        <svg {...common}>
          <path d="M20 12a7 7 0 0 1-7 7H8l-4 3v-3.6A7 7 0 0 1 4 12v-1a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7Z" />
          <path d="M9 11h6M9 14.5h3.5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M3 10h18M8 3v4M16 3v4" />
          <path d="M8 14.5h3M8 17.5h6" />
        </svg>
      );
    case "revive":
      return (
        <svg {...common}>
          <path d="M20 12a8 8 0 1 1-2.6-5.9" />
          <path d="M20 3v4.5h-4.5" />
          <path d="M12 8v4l2.6 1.6" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13.5 2 4 13.5h6.5L9.5 22 20 10.5h-7L13.5 2Z" />
        </svg>
      );
    case "video":
      return (
        <svg {...common}>
          <rect x="2.5" y="6" width="13" height="12" rx="3" />
          <path d="M15.5 10.8 21 8v8l-5.5-2.8Z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M6.2 3.5h2.4l1.5 3.7-2 1.3a11 11 0 0 0 5.4 5.4l1.3-2 3.7 1.5v2.4a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
        </svg>
      );
  }
}
