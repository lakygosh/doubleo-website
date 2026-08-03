import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { OpsLogTicker } from "@/components/OpsLogTicker";
import { ContactForm } from "@/components/ContactForm";
import { CALCOM_URL } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations();
  const ctaHref = CALCOM_URL || "#contact";
  const ctaProps = CALCOM_URL ? { target: "_blank", rel: "noopener" } : {};

  return (
    <main id="main">
      {/* Hero */}
      <section className="hero" id="top">
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="status-pill">
              <span className="status-pill__dot" aria-hidden="true"></span>
              <span>{t("hero.status")}</span>
            </p>
            <h1 className="hero__h1" tabIndex={-1} dangerouslySetInnerHTML={{ __html: t.raw("hero.h1") }} />
            <p className="hero__sub">{t("hero.sub")}</p>
            <div className="hero__ctas">
              <a className="btn btn--solid" href={ctaHref} {...ctaProps}>
                {t("hero.ctaPrimary")}
              </a>
              <a className="btn btn--ghost" href="#solutions">
                {t("hero.ctaSecondary")}
              </a>
            </div>
            <p className="hero__note">{t("hero.note")}</p>
          </div>

          <OpsLogTicker />
        </div>

        <div className="strip">
          <div className="strip__cell">
            <span className="strip__k">{t("strip.calls")}</span>
            <span className="strip__v strip__v--ok">{t("strip.callsV")}</span>
          </div>
          <div className="strip__cell">
            <span className="strip__k">{t("strip.leads")}</span>
            <span className="strip__v strip__v--ok">{t("strip.leadsV")}</span>
          </div>
          <div className="strip__cell">
            <span className="strip__k">{t("strip.content")}</span>
            <span className="strip__v strip__v--ok">{t("strip.contentV")}</span>
          </div>
          <div className="strip__cell">
            <span className="strip__k">{t("strip.hours")}</span>
            <span className="strip__v">{t("strip.hoursV")}</span>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="problem" id="problem">
        <Reveal className="section-head">
          <p className="kicker">{t("problem.kicker")}</p>
          <h2 dangerouslySetInnerHTML={{ __html: t.raw("problem.h2") }} />
          <p className="section-head__intro">{t("problem.intro")}</p>
        </Reveal>

        <div className="ledger">
          {(["l1", "l2", "l3"] as const).map((key, i) => (
            <Reveal as="article" className="ledger__row" key={key}>
              <span className="ledger__no">{`0${i + 1}`}</span>
              <div className="ledger__leak">
                <p className="ledger__tag ledger__tag--leak">{t("problem.leakLabel")}</p>
                <p className="ledger__time">{t(`problem.${key}.time`)}</p>
                <p>{t(`problem.${key}.leak`)}</p>
              </div>
              <div className="ledger__fix">
                <p className="ledger__tag ledger__tag--fix">{t("problem.fixLabel")}</p>
                <p>{t(`problem.${key}.fix`)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="problem__outro">
          {t("problem.outro")}
        </Reveal>
      </section>

      {/* Solutions */}
      <section className="solutions" id="solutions">
        <Reveal className="section-head">
          <p className="kicker">{t("solutions.kicker")}</p>
          <h2 dangerouslySetInnerHTML={{ __html: t.raw("solutions.h2") }} />
          <p className="section-head__intro">{t("solutions.intro")}</p>
        </Reveal>

        {/* 01 — Chatbot (one brain, three channels) */}
        <Reveal as="article" className="sol" id="sol-chatbot">
          <div className="sol__meta">
            <span className="sol__no">01</span>
            <h3 className="sol__name">{t("s1.name")}</h3>
            <p className="sol__ideal">
              <span>{t("solutions.idealFor")}</span>: <span>{t("s1.ideal")}</span>
            </p>
          </div>
          <div className="sol__body">
            <h4 className="sol__h">{t("s1.h3")}</h4>
            <p>{t("s1.body")}</p>
          </div>
          <div className="sol__vig">
            <div className="vig vig--list">
              <p className="vig__head">{t("s1.v.header")}</p>
              {(["1", "2", "3"] as const).map((n) => (
                <p className="vig__row" key={n}>
                  <span>{t(`s1.v.c${n}n`)}</span>
                  <span>{t(`s1.v.c${n}d`)}</span>
                </p>
              ))}
              <p className="vig__foot">{t("s1.v.foot")}</p>
            </div>
          </div>
        </Reveal>

        {/* 02 — Content Dashboard */}
        <Reveal as="article" className="sol sol--flip" id="sol-content">
          <div className="sol__meta">
            <span className="sol__no">02</span>
            <h3 className="sol__name">{t("s2.name")}</h3>
            <p className="sol__ideal">
              <span>{t("solutions.idealFor")}</span>: <span>{t("s2.ideal")}</span>
            </p>
          </div>
          <div className="sol__body">
            <h4 className="sol__h">{t("s2.h3")}</h4>
            <p>{t("s2.body")}</p>
          </div>
          <div className="sol__vig">
            <div className="vig vig--week">
              <p className="vig__head">{t("s2.v.header")}</p>
              <div className="vig__days">
                {(["1", "2", "3", "4", "5"] as const).map((n) => (
                  <span className={`vig__day${n === "4" ? " vig__day--blog" : ""}`} key={n}>
                    <b>{t(`s2.v.d${n}`)}</b>
                    <i>{t(`s2.v.p${n}`)}</i>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* 03 — Lead Reactivation */}
        <Reveal as="article" className="sol" id="sol-reactivation">
          <div className="sol__meta">
            <span className="sol__no">03</span>
            <h3 className="sol__name">{t("s3.name")}</h3>
            <p className="sol__ideal">
              <span>{t("solutions.idealFor")}</span>: <span>{t("s3.ideal")}</span>
            </p>
          </div>
          <div className="sol__body">
            <h4 className="sol__h">{t("s3.h3")}</h4>
            <p>{t("s3.body")}</p>
          </div>
          <div className="sol__vig">
            <div className="vig vig--list">
              <p className="vig__head">{t("s3.v.header")}</p>
              <p className="vig__row">
                <span>{t("s3.v.r1n")}</span>
                <span className="vig__chip vig__chip--ok">{t("s3.v.r1s")}</span>
              </p>
              <p className="vig__row">
                <span>{t("s3.v.r2n")}</span>
                <span className="vig__chip">{t("s3.v.r2s")}</span>
              </p>
              <p className="vig__row">
                <span>{t("s3.v.r3n")}</span>
                <span className="vig__chip">{t("s3.v.r3s")}</span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* 04 — Speed to Lead */}
        <Reveal as="article" className="sol sol--flip" id="sol-speed">
          <div className="sol__meta">
            <span className="sol__no">04</span>
            <h3 className="sol__name">{t("s4.name")}</h3>
            <p className="sol__ideal">
              <span>{t("solutions.idealFor")}</span>: <span>{t("s4.ideal")}</span>
            </p>
          </div>
          <div className="sol__body">
            <h4 className="sol__h">{t("s4.h3")}</h4>
            <p>{t("s4.body")}</p>
          </div>
          <div className="sol__vig">
            <div className="vig vig--timeline">
              <p className="vig__head">{t("s4.v.header")}</p>
              <p className="vig__step">
                <time>0:00</time>
                <span>{t("s4.v.t1")}</span>
              </p>
              <p className="vig__step vig__step--hot">
                <time>0:47</time>
                <span>{t("s4.v.t2")}</span>
              </p>
              <p className="vig__step">
                <time>1:12</time>
                <span>{t("s4.v.t3")}</span>
              </p>
              <p className="vig__foot">{t("s4.v.note")}</p>
            </div>
          </div>
        </Reveal>

        {/* 05 — AI UGC Creatives */}
        <Reveal as="article" className="sol" id="sol-ugc">
          <div className="sol__meta">
            <span className="sol__no">05</span>
            <h3 className="sol__name">{t("s5.name")}</h3>
            <p className="sol__ideal">
              <span>{t("solutions.idealFor")}</span>: <span>{t("s5.ideal")}</span>
            </p>
          </div>
          <div className="sol__body">
            <h4 className="sol__h">{t("s5.h3")}</h4>
            <p>{t("s5.body")}</p>
          </div>
          <div className="sol__vig">
            <div className="vig vig--tiles">
              <p className="vig__head">{t("s5.v.header")}</p>
              <div className="vig__tiles">
                <span className="vig__tile">{t("s5.v.v1")}</span>
                <span className="vig__tile">{t("s5.v.v2")}</span>
                <span className="vig__tile">{t("s5.v.v3")}</span>
                <span className="vig__tile vig__tile--more">{t("s5.v.v4")}</span>
              </div>
              <p className="vig__foot">
                <span className="vig__chip vig__chip--ok">{t("s5.v.status")}</span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* 06 — AI Receptionist (upgrade on top of the chatbot) */}
        <Reveal as="article" className="sol sol--flip" id="sol-receptionist">
          <div className="sol__meta">
            <span className="sol__no">06</span>
            <h3 className="sol__name">{t("s6.name")}</h3>
            <p className="sol__ideal">
              <span>{t("solutions.idealFor")}</span>: <span>{t("s6.ideal")}</span>
            </p>
          </div>
          <div className="sol__body">
            <h4 className="sol__h">{t("s6.h3")}</h4>
            <p>{t("s6.body")}</p>
          </div>
          <div className="sol__vig">
            <div className="vig vig--call">
              <p className="vig__head">{t("s6.v.header")}</p>
              <p className="vig__bubble vig__bubble--them">{t("s6.v.caller")}</p>
              <p className="vig__bubble vig__bubble--us">{t("s6.v.agent")}</p>
              <p className="vig__result">{t("s6.v.result")}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="process" id="process">
        <Reveal className="section-head section-head--paper">
          <p className="kicker">{t("process.kicker")}</p>
          <h2>{t("process.h2")}</h2>
        </Reveal>

        <Reveal className="workorder">
          <div className="workorder__head">
            <span>{t("process.docLabel")}</span>
            <span className="workorder__no">{t("process.docNo")}</span>
          </div>
          <div className="workorder__steps">
            {(["s1", "s2", "s3"] as const).map((key, i) => (
              <div className="workorder__step" key={key}>
                <span className="workorder__digit">{`0${i + 1}`}</span>
                <h3>{t(`process.${key}.title`)}</h3>
                <p>{t(`process.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Why Double O */}
      <section className="why" id="why">
        <Reveal className="why__main">
          <p className="kicker">{t("why.kicker")}</p>
          <h2 dangerouslySetInnerHTML={{ __html: t.raw("why.h2") }} />
          <p className="why__body">{t("why.body")}</p>
        </Reveal>
        <div className="why__points">
          {(["p1", "p2", "p3"] as const).map((key) => (
            <Reveal className="why__point" key={key}>
              <h3>{t(`why.${key}.t`)}</h3>
              <p>{t(`why.${key}.b`)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta">
        <Reveal className="cta__inner">
          <h2 dangerouslySetInnerHTML={{ __html: t.raw("cta.h2") }} />
          <p>{t("cta.body")}</p>
          <a className="btn btn--solid btn--big" href={ctaHref} {...ctaProps}>
            {t("cta.button")}
          </a>
          <p className="cta__micro">{t("cta.micro")}</p>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="contact" id="contact">
        <Reveal className="contact__copy">
          <p className="kicker">{t("contact.kicker")}</p>
          <h2>{t("contact.h2")}</h2>
          <p>{t("contact.body")}</p>
          <p className="contact__alt">hello@doubleo.agency</p>
        </Reveal>

        <ContactForm />
      </section>
    </main>
  );
}
