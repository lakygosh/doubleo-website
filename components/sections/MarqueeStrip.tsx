"use client";

import { useTranslations } from "next-intl";
import { Marquee } from "@/components/motion/Marquee";

/** Capability ticker between sections, as on the reference. */
export function MarqueeStrip() {
  const t = useTranslations("home.marquee");
  const items = t.raw("items") as string[];

  return (
    <div className="strip">
      <Marquee speed={34}>
        {items.map((item) => (
          <span key={item} className="strip__item">
            {item}
            <span className="strip__sep" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/** The reference's second ticker — a repeating call-to-action band. */
export function CtaTicker({ href }: { href: string }) {
  const t = useTranslations("home.ticker");
  const label = t("label");
  const items = Array.from({ length: 6 }, (_, i) => i);

  return (
    <a className="ticker" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      <Marquee speed={26}>
        {items.map((i) => (
          <span key={i} className="ticker__item">
            {label}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        ))}
      </Marquee>
    </a>
  );
}
