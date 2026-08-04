import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL, CALCOM_URL, CONTACT_EMAIL } from "@/lib/config";
import { ContactForm } from "@/components/ContactForm";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import { ArrowIcon } from "@/components/ui/Button";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: `${t("h1")} — Double O`,
    description: t("sub"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: { sr: `${SITE_URL}/sr/contact`, en: `${SITE_URL}/en/contact` },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("contact");

  return (
    <main id="main">
      <section className="section pagehead">
        <div className="wrap">
          <div className="sec-head sec-head--start">
            <Appear trigger="load" delay={0.25} y={16}>
              <span className="pill">{t("kicker")}</span>
            </Appear>
            <SplitWords as="h1" text={t("h1")} trigger="load" delay={0.35} />
            <Appear trigger="load" delay={0.6} y={20}>
              <p className="sec-head__sub">{t("sub")}</p>
            </Appear>
          </div>

          <div className="contactgrid">
            <Appear y={26}>
              <div className="contactgrid__form">
                <h2 className="contactgrid__title">{t("emailTitle")}</h2>
                <ContactForm />
              </div>
            </Appear>

            <Appear y={26} delay={0.08}>
              <aside className="contactgrid__aside">
                <div className="callcard">
                  <span className="u-noise" />
                  <h2 className="callcard__title">{t("callTitle")}</h2>
                  <p className="callcard__body">{t("callBody")}</p>
                  {/* Falls back to email so the card is never left buttonless
                      when NEXT_PUBLIC_CALCOM_URL isn't configured. */}
                  <a
                    className="btn btn--light btn--lg"
                    href={CALCOM_URL || `mailto:${CONTACT_EMAIL}`}
                    {...(CALCOM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {t("callCta")}
                    <ArrowIcon />
                  </a>
                </div>

                <a className="mailcard" href={`mailto:${CONTACT_EMAIL}`}>
                  <span className="mailcard__label">Email</span>
                  <span className="mailcard__value">{CONTACT_EMAIL}</span>
                </a>
              </aside>
            </Appear>
          </div>
        </div>
      </section>
    </main>
  );
}
