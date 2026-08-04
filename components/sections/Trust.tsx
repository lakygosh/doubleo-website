"use client";

import { useTranslations } from "next-intl";
import { Appear } from "@/components/motion/Appear";

/**
 * The reference's "Enterprise-Grade Security" strip. Retargeted to what
 * actually applies to a Serbian agency working with EU clients — GDPR and
 * data-handling commitments rather than borrowed US compliance logos.
 */
export function Trust() {
  const t = useTranslations("home.trust");
  const badges = t.raw("badges") as { label: string; note: string }[];

  return (
    <section className="section--tight trust">
      <div className="wrap">
        <Appear y={24}>
          <div className="trust__card">
            <div className="trust__text">
              <h2>{t("h2")}</h2>
              <p>{t("sub")}</p>
            </div>
            <ul className="trust__badges">
              {badges.map((b) => (
                <li key={b.label}>
                  <span className="trust__label">{b.label}</span>
                  <span className="trust__note">{b.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Appear>
      </div>
    </section>
  );
}
