"use client";

import { useTranslations } from "next-intl";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import { Marquee } from "@/components/motion/Marquee";
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
} from "@/components/ui/animated-cards-stack";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/**
 * "Wall of love" — the quotes are a scroll-driven deck: the stage sticks while
 * the page scrolls past it and each card swings in and peels off the top. The
 * stats row and the logo ticker close the section out, as on the reference.
 *
 * Quotes are placeholders until real client permission is in hand.
 */
export function Testimonials() {
  const t = useTranslations("home.social");
  const quotes = t.raw("quotes") as { quote: string; name: string; role: string }[];
  const stats = t.raw("stats") as { value: string; label: string }[];
  const logos = t.raw("logos") as string[];

  return (
    <section className="section testimonials" id="testimonials">
      {/* The clouds photo is the section's backdrop, the way the reference
          lays it out. It is masked top and bottom so it dissolves into the
          plain sections either side instead of ending on a hard edge. */}
      <div className="testimonials__bg" aria-hidden="true" />

      <div className="wrap testimonials__inner">
        <div className="sec-head">
          <Appear y={16}>
            <span className="pill">{t("kicker")}</span>
          </Appear>
          <SplitWords as="h2" text={t("h2")} />
        </div>

        {/* The track is taller than the viewport on purpose — that extra
            height is the scroll budget the deck animates across. Roughly one
            screen per card plus one to settle. */}
        <ContainerScroll className="tstack">
          <div className="tstack__sticky">
            <CardsContainer className="tstack__deck">
              {quotes.map((q, index) => (
                <CardTransformed
                  key={q.name}
                  variant="bare"
                  className="tstack__card"
                  arrayLength={quotes.length}
                  /* +2 keeps the first card from starting flat on top of the
                     stage — it enters with the same swing as the rest. */
                  index={index + 2}
                  role="article"
                  aria-label={`${q.name}, ${q.role}`}
                >
                  <svg className="tcard__mark" viewBox="0 0 32 24" aria-hidden="true">
                    <path d="M13.4 0v9.8c0 8-4.3 12.6-11.9 14.2L0 20.6c4-1.2 6.2-3.5 6.6-6.9H2.3V0h11.1Zm18.6 0v9.8c0 8-4.3 12.6-11.9 14.2l-1.5-3.4c4-1.2 6.2-3.5 6.6-6.9h-4.3V0H32Z" />
                  </svg>
                  <blockquote>{q.quote}</blockquote>
                  <figcaption>
                    <Avatar className="tcard__avatar">
                      <AvatarFallback className="tcard__avatar-text">
                        {q.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      <span className="tcard__name">{q.name}</span>
                      <span className="tcard__role">{q.role}</span>
                    </span>
                  </figcaption>
                </CardTransformed>
              ))}
            </CardsContainer>
          </div>
        </ContainerScroll>

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
