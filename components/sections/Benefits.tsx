"use client";

import { useTranslations } from "next-intl";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";

/**
 * "Why Double O" — the reference's Key Benefits grid plus the three
 * gradient key-point cards that sit beside it.
 */
export function Benefits() {
  const t = useTranslations("home.benefits");
  const items = t.raw("items") as { title: string; body: string }[];
  const keys = t.raw("keyPoints") as { title: string; body: string }[];

  return (
    <section className="section benefits" id="why">
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

        <div className="benefits__grid">
          {items.map((b, i) => (
            <Appear key={b.title} y={26} delay={0.05 * i}>
              <article className="benefit">
                <span className="benefit__no">{String(i + 1).padStart(2, "0")}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </article>
            </Appear>
          ))}
        </div>

        <div className="keypoints">
          {keys.map((k, i) => (
            <Appear key={k.title} y={26} delay={0.06 * i}>
              <article className={`keypoint keypoint--${i + 1}`}>
                <span className="u-noise" />
                <h3>{k.title}</h3>
                <p>{k.body}</p>
              </article>
            </Appear>
          ))}
        </div>
      </div>
    </section>
  );
}
