"use client";

import { useTranslations } from "next-intl";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import CoolSlideGallery from "@/components/lightswind/cool-slide-gallery";

/**
 * Who actually builds the systems. Sits right after About, which claims the
 * team is "marketing and operations people" — this is where that gets faces.
 *
 * The gallery is Lightswind's cool-slide-gallery. Everything about it that
 * would read as someone else's design system is turned off: no badges, no
 * counter, no arrows (the cards are clickable and draggable instead), and
 * the dim is pulled back so the side cards stay legible on our light page.
 *
 * Photos: drop real files in public/team and point `photo` at them in
 * messages/*.json. Until then every member falls back to the placeholder.
 */

type Member = { name: string; role: string; photo?: string };

const FALLBACK_PHOTO = "/team/placeholder.svg";

export function Team() {
  const t = useTranslations("home.team");
  const members = t.raw("members") as Member[];

  return (
    <section className="section team" id="team">
      <div className="wrap">
        <div className="sec-head">
          <Appear y={16}>
            <span className="pill">{t("kicker")}</span>
          </Appear>
          <SplitWords as="h2" text={t("h2")} />
          <Appear y={20} delay={0.1}>
            <p className="sec-head__sub">{t("sub")}</p>
          </Appear>
        </div>

        <Appear y={30} delay={0.15} className="team__gallery">
          <CoolSlideGallery
            slides={members.map((m) => ({
              src: m.photo || FALLBACK_PHOTO,
              alt: m.name,
              title: m.name,
              subtitle: m.role,
            }))}
            cardWidth={320}
            cardHeight={400}
            radius={4}
            gap={7}
            /* Reads backwards: the component computes the black overlay as
               1 - dimOpacity/100, so a high number here is a light veil.
               85 leaves the side cards clearly visible. */
            dimOpacity={85}
            tilt={12}
            sideTilt={4}
            easing="smooth"
            showBadge={false}
            showCounter={false}
            showArrows={false}
            showDots
            clickable
            draggable
            titlePosition="bottom-left"
          />
        </Appear>
      </div>
    </section>
  );
}
