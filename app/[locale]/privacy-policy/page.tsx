import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/config";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: `${t("title")} — Double O`,
    description: t("intro"),
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy-policy`,
      languages: {
        sr: `${SITE_URL}/sr/privacy-policy`,
        en: `${SITE_URL}/en/privacy-policy`,
      },
    },
  };
}

/** Bumped whenever the policy text changes. */
const LAST_UPDATED = "2026-08-03";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as { h: string; b: string }[];

  const updated = new Date(LAST_UPDATED).toLocaleDateString(locale === "sr" ? "sr-RS" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main id="main">
      <section className="section pagehead">
        <div className="wrap wrap--narrow prose">
          <h1>{t("title")}</h1>
          <p className="prose__meta">
            {t("updated")}: {updated}
          </p>
          <p className="prose__lead">{t("intro")}</p>

          {sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.b}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
