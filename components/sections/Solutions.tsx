"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import { StickyStack, StickyStackItem } from "@/components/motion/StickyStack";
import { SolutionIcon } from "@/components/ui/SolutionIcon";
import { ArrowIcon } from "@/components/ui/Button";
import { SOLUTIONS } from "@/lib/solutions";

/**
 * Every solution the agency sells, as the reference's sticky card stack.
 * Cards are generated from lib/solutions.ts — adding a solution there adds
 * it here, in the nav, in the footer, in the sitemap and in the JSON-LD.
 */
export function Solutions() {
  const t = useTranslations("home.solutions");
  const tSol = useTranslations("sol");

  return (
    <section className="section solutions" id="solutions">
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

        <StickyStack className="solutions__stack">
          {SOLUTIONS.map((s, i) => {
            const points = tSol.raw(`${s.slug}.points`) as string[];
            return (
              <StickyStackItem key={s.slug} index={i} total={SOLUTIONS.length}>
                <article
                  className={i % 2 ? "solcard solcard--flip" : "solcard"}
                  style={{ ["--sol" as string]: s.accent }}
                >
                  <div className="solcard__body">
                    <div className="solcard__head">
                      <span className="solcard__icon">
                        <SolutionIcon name={s.icon} size={20} />
                      </span>
                      <span className="solcard__name">{tSol(`${s.slug}.name`)}</span>
                      {s.featured && <span className="solcard__flag">{t("flagship")}</span>}
                      <span className="solcard__no">{String(i + 1).padStart(2, "0")}</span>
                    </div>

                    <h3 className="solcard__title">{tSol(`${s.slug}.h3`)}</h3>
                    <p className="solcard__desc">{tSol(`${s.slug}.body`)}</p>

                    <ul className="solcard__points">
                      {points.map((p) => (
                        <li key={p}>
                          <span className="tick">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m4 12 6 6L20 6" />
                            </svg>
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>

                    <p className="solcard__ideal">
                      <span>{t("idealFor")}</span> {tSol(`${s.slug}.ideal`)}
                    </p>

                    <Link href={`/solutions/${s.slug}`} className="btn btn--secondary solcard__link">
                      {t("readMore")}
                      <ArrowIcon />
                    </Link>
                  </div>

                  <div className="solcard__art" style={{ background: s.tint }}>
                    <span className="u-noise" />
                    <span className="solcard__glyph">
                      <SolutionIcon name={s.icon} size={72} />
                    </span>
                  </div>
                </article>
              </StickyStackItem>
            );
          })}
        </StickyStack>
      </div>
    </section>
  );
}
