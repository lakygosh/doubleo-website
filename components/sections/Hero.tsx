"use client";

import { useTranslations } from "next-intl";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import { AuroraBackdrop } from "@/components/motion/AuroraBackdrop";
import { Shape } from "@/components/motion/Shapes";
import { HeroChat } from "@/components/chat/HeroChat";
import { ArrowIcon } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { CALCOM_URL } from "@/lib/config";

/**
 * Hero. Delays match the reference's Framer appear cascade:
 * pill 0.4s → headline 0.6s → sub 0.8s → CTAs 1.0s → chat card 1.2s.
 */
export function Hero() {
  const t = useTranslations("home.hero");
  const cta = CALCOM_URL || "/contact";

  return (
    <header className="hero" id="top">
      <div className="hero__bg">
        <AuroraBackdrop video />
      </div>

      <div className="wrap hero__inner">
        <Appear trigger="load" delay={0.4} y={20}>
          <span className="pill pill--glass">
            <span className="pill__dot" />
            {t("eyebrow")}
          </span>
        </Appear>

        <SplitWords
          as="h1"
          className="hero__title"
          text={t("h1")}
          trigger="load"
          delay={0.55}
          stagger={0.045}
        />

        <Appear trigger="load" delay={0.9} y={20}>
          <p className="hero__sub">{t("sub")}</p>
        </Appear>

        <Appear trigger="load" delay={1.05} y={20}>
          <div className="cta-row hero__cta">
            <a
              className="btn btn--primary btn--lg"
              href={cta}
              {...(CALCOM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {t("ctaPrimary")}
              <ArrowIcon />
            </a>
            <Link href="/solutions" className="btn btn--ghost btn--lg">
              {t("ctaSecondary")}
            </Link>
          </div>
        </Appear>

        {/* The frame spans the full content column, so its left edge lines up
            with the headline; the chat itself stays centred inside it. */}
        <Appear trigger="load" delay={1.25} y={40} className="hero__chatwrap">
          <div className="hero__chatframe">
            <Shape name={2} size={118} className="hero__shape hero__shape--a" />
            <Shape name={4} size={140} className="hero__shape hero__shape--b" />
            <HeroChat />
          </div>
          <p className="hero__hint">{t("chat.hint")}</p>
        </Appear>
      </div>
    </header>
  );
}
