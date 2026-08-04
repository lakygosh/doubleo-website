import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SOLUTIONS, getSolution, isSolutionSlug } from "@/lib/solutions";
import { SITE_URL, CALCOM_URL } from "@/lib/config";
import { SolutionIcon } from "@/components/ui/SolutionIcon";
import { ArrowIcon } from "@/components/ui/Button";
import { AuroraBackdrop } from "@/components/motion/AuroraBackdrop";
import { Shape } from "@/components/motion/Shapes";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import { SolutionFaq } from "./SolutionFaq";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SOLUTIONS.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isSolutionSlug(slug)) return {};

  const t = await getTranslations({ locale, namespace: `sol.${slug}` });
  const title = `${t("name")} — Double O`;
  const description = t("hero.sub");

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/solutions/${slug}`,
      languages: {
        sr: `${SITE_URL}/sr/solutions/${slug}`,
        en: `${SITE_URL}/en/solutions/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/${locale}/solutions/${slug}`,
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isSolutionSlug(slug)) notFound();
  setRequestLocale(locale as Locale);

  const solution = getSolution(slug)!;
  const t = await getTranslations(`sol.${slug}`);
  const p = await getTranslations("solutionPage");
  const tSol = await getTranslations("sol");

  const steps = t.raw("steps") as { title: string; body: string }[];
  const features = t.raw("features") as string[];
  const outcomes = t.raw("outcomes") as string[];
  const faq = t.raw("faq") as { q: string; a: string }[];
  const others = SOLUTIONS.filter((s) => s.slug !== slug);
  const cta = CALCOM_URL || "/contact";

  return (
    <main id="main" style={{ ["--sol" as string]: solution.accent }}>
      {/* Hero */}
      <header className="shero">
        <div className="shero__bg">
          <AuroraBackdrop />
          <Shape name={3} size={135} className="shero__shape" />
        </div>

        <div className="wrap">
          <div className="shero__inner">
          <Appear trigger="load" delay={0.3} y={16}>
            <Link href="/solutions" className="shero__back">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
              {p("backToAll")}
            </Link>
          </Appear>

          <Appear trigger="load" delay={0.4} y={20}>
            <span className="pill pill--glass">
              <span className="shero__icon">
                <SolutionIcon name={solution.icon} size={15} />
              </span>
              {t("name")}
            </span>
          </Appear>

          <SplitWords as="h1" className="shero__title" text={t("hero.h1")} trigger="load" delay={0.55} />

          <Appear trigger="load" delay={0.9} y={20}>
            <p className="shero__sub">{t("hero.sub")}</p>
          </Appear>

          <Appear trigger="load" delay={1.05} y={20}>
            <div className="cta-row">
              <a
                className="btn btn--primary btn--lg"
                href={cta}
                {...(CALCOM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {p("ctaButton")}
                <ArrowIcon />
              </a>
              <a className="btn btn--ghost btn--lg" href="#how">
                {p("howKicker")}
              </a>
            </div>
          </Appear>

          <Appear trigger="load" delay={1.2} y={20}>
            <ul className="shero__points">
              {(t.raw("points") as string[]).map((pt) => (
                <li key={pt}>
                  <span className="tick">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m4 12 6 6L20 6" />
                    </svg>
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
            </Appear>
          </div>
        </div>
      </header>

      {/* Problem */}
      <section className="section--dark spage-problem">
        <div className="wrap wrap--narrow spage-problem__inner">
          <span className="pill pill--dark">{p("problemKicker")}</span>
          <SplitWords as="h2" className="spage-problem__h2" text={t("problem.h2")} />
          <p className="spage-problem__body">{t("problem.body")}</p>
        </div>
      </section>

      {/* How it works */}
      <section className="section" id="how">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">{p("howKicker")}</span>
            <SplitWords as="h2" text={t("h3")} />
            <p className="sec-head__sub">{t("body")}</p>
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

      {/* Features + outcomes */}
      <section className="section--tight">
        <div className="wrap spage-split">
          <Appear y={26}>
            <div className="spage-panel">
              <span className="kicker">{p("featuresKicker")}</span>
              <h2 className="spage-panel__h2">{p("featuresH2")}</h2>
              <ul className="spage-list">
                {features.map((f) => (
                  <li key={f}>
                    <span className="tick">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m4 12 6 6L20 6" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Appear>

          <Appear y={26} delay={0.08}>
            <div className="spage-panel spage-panel--accent">
              <span className="u-noise" />
              <span className="kicker spage-panel__kicker">{p("outcomesKicker")}</span>
              <h2 className="spage-panel__h2">{p("outcomesH2")}</h2>
              <ul className="spage-outcomes">
                {outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <p className="spage-panel__ideal">
                <strong>{p("idealFor")}:</strong> {t("ideal")}
              </p>
            </div>
          </Appear>
        </div>
      </section>

      {/* FAQ */}
      <SolutionFaq items={faq} kicker={p("faqKicker")} heading={p("faqH2")} />

      {/* Other solutions */}
      <section className="section--tight">
        <div className="wrap">
          <div className="sec-head sec-head--start">
            <span className="pill">{p("otherKicker")}</span>
            <h2>{p("otherH2")}</h2>
          </div>

          <div className="othergrid">
            {others.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="othercard">
                <span className="othercard__icon" style={{ background: s.accent }}>
                  <SolutionIcon name={s.icon} size={18} />
                </span>
                <span className="othercard__name">{tSol(`${s.slug}.name`)}</span>
                <span className="othercard__desc">{tSol(`${s.slug}.tagline`)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section--dark finalcta">
        <div className="wrap finalcta__inner">
          <div>
            <h2 className="finalcta__title">{p("ctaH2")}</h2>
            <p className="finalcta__sub">{p("ctaSub")}</p>
            <a
              className="btn btn--light btn--lg finalcta__btn"
              href={cta}
              {...(CALCOM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {p("ctaButton")}
            </a>
          </div>
          <Shape name={2} size={185} className="finalcta__shape" />
        </div>
      </section>
    </main>
  );
}
