"use client";

import { useTranslations } from "next-intl";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import { CALCOM_URL } from "@/lib/config";

/**
 * Occupies the reference's pricing slot, but describes how an engagement
 * works rather than listing tiers — the agency scopes per project, so a
 * monthly/yearly price table would be a lie. Same three-card layout with the
 * middle option highlighted.
 */
export function Engagement() {
  const t = useTranslations("home.engage");
  const plans = t.raw("plans") as {
    name: string;
    tagline: string;
    price: string;
    priceNote: string;
    cta: string;
    includes: string[];
  }[];
  const cta = CALCOM_URL || "/contact";

  return (
    <section className="section engage" id="engagement">
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

        <div className="plans">
          {plans.map((p, i) => {
            const featured = i === 1;
            return (
              <Appear key={p.name} y={28} delay={0.07 * i}>
                <article className={`plan${featured ? " plan--featured" : ""}`}>
                  <div className="plan__head">
                    <h3 className="plan__name">
                      <span className="plan__star" aria-hidden="true">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z" />
                        </svg>
                      </span>
                      {p.name}
                      {featured && <span className="plan__badge">{t("popular")}</span>}
                    </h3>
                    <p className="plan__tagline">{p.tagline}</p>
                  </div>

                  <p className="plan__price">
                    {p.price}
                    <span>{p.priceNote}</span>
                  </p>

                  <a
                    className={`btn btn--lg ${featured ? "btn--primary" : "btn--secondary"} plan__cta`}
                    href={cta}
                    {...(CALCOM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {p.cta}
                  </a>

                  <p className="plan__inclabel">{t("includes")}</p>
                  <ul className="plan__list">
                    {p.includes.map((line) => (
                      <li key={line}>
                        <span className="plan__tick" aria-hidden="true">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z" />
                          </svg>
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </article>
              </Appear>
            );
          })}
        </div>

        <Appear y={16} delay={0.1}>
          <p className="engage__note">{t("note")}</p>
        </Appear>
      </div>
    </section>
  );
}
