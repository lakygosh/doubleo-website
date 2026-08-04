/**
 * Single source of truth for the agency's solutions.
 *
 * Everything that enumerates solutions reads this array: the nav dropdown,
 * the landing-page stack, /solutions, /solutions/[slug], the footer,
 * the sitemap and the Service nodes in the JSON-LD graph.
 *
 * Copy lives in messages/{locale}.json under `sol.<slug>.*` — the slug is
 * both the route segment and the message key, so there is one identifier
 * per solution and nothing to keep in sync.
 *
 * Slugs are intentionally English in both locales: stable URLs, no
 * next-intl `pathnames` config, no broken links when copy is retranslated.
 */

export type SolutionSlug =
  | "chatbot"
  | "content-dashboard"
  | "lead-reactivation"
  | "speed-to-lead"
  | "ai-ugc-creatives"
  | "ai-receptionist";

export type Solution = {
  slug: SolutionSlug;
  /** Accent used for the card dot, icon wash and page hero glow. */
  accent: string;
  /** Soft background tint for the card art. */
  tint: string;
  /** Icon key — maps to a shape in components/ui/SolutionIcon.tsx */
  icon: "chat" | "calendar" | "revive" | "bolt" | "video" | "phone";
  /** The flagship. Gets the hero, the first slot, and a badge. */
  featured?: boolean;
  /** schema.org serviceType for the JSON-LD Service node. */
  serviceType: string;
};

export const SOLUTIONS: readonly Solution[] = [
  {
    slug: "chatbot",
    accent: "#d37bff",
    tint: "var(--tint-violet)",
    icon: "chat",
    featured: true,
    serviceType: "AI Chatbot",
  },
  {
    slug: "content-dashboard",
    accent: "#80aafd",
    tint: "var(--tint-sky)",
    icon: "calendar",
    serviceType: "Content Marketing Automation",
  },
  {
    slug: "lead-reactivation",
    accent: "#ff49d4",
    tint: "var(--tint-rose)",
    icon: "revive",
    serviceType: "Lead Reactivation",
  },
  {
    slug: "speed-to-lead",
    accent: "#fcac84",
    tint: "var(--tint-peach)",
    icon: "bolt",
    serviceType: "Speed to Lead",
  },
  {
    slug: "ai-ugc-creatives",
    accent: "#d37bff",
    tint: "var(--tint-lilac)",
    icon: "video",
    serviceType: "AI Video Ad Production",
  },
  {
    slug: "ai-receptionist",
    accent: "#80aafd",
    tint: "var(--tint-sky)",
    icon: "phone",
    serviceType: "AI Inbound Receptionist",
  },
] as const;

export const SOLUTION_SLUGS = SOLUTIONS.map((s) => s.slug);

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export function isSolutionSlug(slug: string): slug is SolutionSlug {
  return SOLUTIONS.some((s) => s.slug === slug);
}
