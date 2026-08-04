"use client";

import { useTranslations } from "next-intl";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import { ArrowIcon } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { CALCOM_URL } from "@/lib/config";

export function HowItWorks() {
  const t = useTranslations("home.how");
  const steps = t.raw("steps") as { title: string; body: string }[];
  const cta = CALCOM_URL || "/contact";

  return (
    <section className="section how" id="how">
      <div className="wrap">
        <div className="how__top">
          <div className="sec-head sec-head--start">
            <Appear y={16}>
              <span className="pill">{t("kicker")}</span>
            </Appear>
            <SplitWords as="h2" text={t("h2")} />
            <Appear y={20} delay={0.1}>
              <p className="sec-head__sub">{t("sub")}</p>
            </Appear>
          </div>

          <Appear y={20} delay={0.15}>
            <div className="cta-row">
              <a
                className="btn btn--primary btn--lg"
                href={cta}
                {...(CALCOM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {t("ctaPrimary")}
                <ArrowIcon />
              </a>
              <Link href="/solutions" className="btn btn--secondary btn--lg">
                {t("ctaSecondary")}
              </Link>
            </div>
          </Appear>
        </div>

        <ol className="how__steps">
          {steps.map((s, i) => (
            <Appear key={s.title} y={28} delay={0.08 * i}>
              <li className="step">
                <span className="step__no">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            </Appear>
          ))}
        </ol>
      </div>
    </section>
  );
}
