import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SOLUTIONS } from "@/lib/solutions";
import { SITE_URL, CALCOM_URL } from "@/lib/config";
import { SolutionIcon } from "@/components/ui/SolutionIcon";
import { ArrowIcon } from "@/components/ui/Button";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionsPage" });

  return {
    title: `${t("h1")} — Double O`,
    description: t("sub"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/solutions`,
      languages: {
        sr: `${SITE_URL}/sr/solutions`,
        en: `${SITE_URL}/en/solutions`,
      },
    },
  };
}

export default async function SolutionsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("solutionsPage");
  const tSol = await getTranslations("sol");
  const cta = CALCOM_URL || "/contact";

  return (
    <main id="main">
      <section className="section pagehead">
        <div className="wrap">
          <div className="sec-head">
            <Appear trigger="load" delay={0.25} y={16}>
              <span className="pill">{t("kicker")}</span>
            </Appear>
            <SplitWords as="h1" text={t("h1")} trigger="load" delay={0.35} />
            <Appear trigger="load" delay={0.6} y={20}>
              <p className="sec-head__sub">{t("sub")}</p>
            </Appear>
          </div>

          <div className="solgrid">
            {SOLUTIONS.map((s, i) => (
              <Appear key={s.slug} y={28} delay={0.05 * i}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="solgrid__card"
                  style={{ ["--sol" as string]: s.accent }}
                >
                  <div className="solgrid__art" style={{ background: s.tint }}>
                    <span className="u-noise" />
                    <span className="solgrid__glyph">
                      <SolutionIcon name={s.icon} size={44} />
                    </span>
                    {s.featured && <span className="solgrid__flag">{t("flagship")}</span>}
                  </div>

                  <div className="solgrid__body">
                    <h2 className="solgrid__name">{tSol(`${s.slug}.name`)}</h2>
                    <p className="solgrid__tagline">{tSol(`${s.slug}.tagline`)}</p>
                    <p className="solgrid__desc">{tSol(`${s.slug}.body`)}</p>
                    <span className="solgrid__link">
                      {t("cta")}
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              </Appear>
            ))}
          </div>

          <Appear y={24}>
            <div className="solhelp">
              <div>
                <h2 className="solhelp__title">{t("helpTitle")}</h2>
                <p className="solhelp__body">{t("helpBody")}</p>
              </div>
              <a
                className="btn btn--primary btn--lg"
                href={cta}
                {...(CALCOM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {t("helpCta")}
                <ArrowIcon />
              </a>
            </div>
          </Appear>
        </div>
      </section>
    </main>
  );
}
