"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Appear, EASE } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import { Marquee } from "@/components/motion/Marquee";

/**
 * "Wall of love" — a single-card carousel with prev/next, the stats row and
 * a logo ticker, exactly as laid out on the reference.
 *
 * Quotes are placeholders until real client permission is in hand.
 */
export function Testimonials() {
  const t = useTranslations("home.social");
  const quotes = t.raw("quotes") as { quote: string; name: string; role: string }[];
  const stats = t.raw("stats") as { value: string; label: string }[];
  const logos = t.raw("logos") as string[];

  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (step: number) => {
    setDir(step);
    setI((v) => (v + step + quotes.length) % quotes.length);
  };

  /* The prev/next buttons are hidden under 560px (see sections.css), so on a
     phone the card itself has to be draggable. `drag="x"` sets touch-action:
     pan-y, which leaves vertical page scrolling alone. Flicks count as well as
     long drags, hence velocity folded into the threshold. */
  const onDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const power = info.offset.x + info.velocity.x * 0.2;
    if (power <= -60) go(1);
    else if (power >= 60) go(-1);
  };

  const active = quotes[i];

  return (
    <section className="section testimonials" id="testimonials">
      <div className="testimonials__bg" aria-hidden="true">
        <span className="aurora__blob aurora__blob--1" />
        <span className="aurora__blob aurora__blob--3" />
      </div>

      <div className="wrap testimonials__inner">
        <div className="sec-head">
          <Appear y={16}>
            <span className="pill">{t("kicker")}</span>
          </Appear>
          <SplitWords as="h2" text={t("h2")} />
        </div>

        <div className="tcarousel">
          <button
            type="button"
            className="tcarousel__nav"
            onClick={() => go(-1)}
            aria-label={t("prev")}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="tcarousel__stage">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={i}
                className="tcard"
                initial={{ opacity: 0, x: dir * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -28 }}
                transition={{ duration: 0.32, ease: EASE }}
                drag="x"
                dragDirectionLock
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                dragMomentum={false}
                onDragEnd={onDragEnd}
              >
                <blockquote>{active.quote}</blockquote>
                <figcaption>
                  <span className="tcard__avatar" aria-hidden="true">
                    {active.name.charAt(0)}
                  </span>
                  <span>
                    <span className="tcard__name">{active.name}</span>
                    <span className="tcard__role">{active.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="tcarousel__dots" role="tablist" aria-label={t("kicker")}>
              {quotes.map((q, n) => (
                <button
                  key={n}
                  type="button"
                  role="tab"
                  aria-selected={n === i}
                  aria-label={q.name}
                  className={n === i ? "is-active" : undefined}
                  onClick={() => {
                    setDir(n > i ? 1 : -1);
                    setI(n);
                  }}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="tcarousel__nav"
            onClick={() => go(1)}
            aria-label={t("next")}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <ul className="stats">
          {stats.map((s) => (
            <li key={s.label}>
              <span className="stats__value">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <Marquee speed={38} className="logos">
        {logos.map((l) => (
          <span key={l} className="logos__item">
            {l}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
