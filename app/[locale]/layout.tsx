import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SOLUTIONS } from "@/lib/solutions";
import { SITE_URL, CALCOM_URL, CONTACT_EMAIL } from "@/lib/config";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        sr: `${SITE_URL}/sr`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Double O",
      url: `${SITE_URL}/${locale}`,
      title: t("title"),
      description: t("description"),
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630 }],
      locale: locale === "sr" ? "sr_RS" : "en_US",
      alternateLocale: locale === "sr" ? "en_US" : "sr_RS",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${SITE_URL}/og.png`],
    },
    icons: {
      icon: "/favicon.svg",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale as Locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "chat" });
  const tSol = await getTranslations({ locale, namespace: "sol" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  // Service nodes are generated from lib/solutions.ts so the graph can never
  // drift from what the site actually lists.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Double O",
        alternateName: "Double O Agency",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/og.png`,
        email: CONTACT_EMAIL,
        description: tMeta("description"),
      },
      ...SOLUTIONS.map((s) => ({
        "@type": "Service",
        "@id": `${SITE_URL}/${locale}/solutions/${s.slug}#service`,
        serviceType: s.serviceType,
        name: tSol(`${s.slug}.name`),
        description: tSol(`${s.slug}.tagline`),
        url: `${SITE_URL}/${locale}/solutions/${s.slug}`,
        provider: { "@id": `${SITE_URL}/#org` },
      })),
    ],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <MotionProvider>
        <SetHtmlLang locale={locale} />
        <SmoothScroll />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Nav />
        {children}
        <Footer />
        <script
          src="/assets/widget.js"
          defer
          // Same-origin proxy — see app/api/chat/route.ts
          data-webhook-url="/api/chat"
          data-title="Double O"
          data-subtitle={t("subtitle")}
          data-welcome={t("welcome")}
          data-placeholder={t("placeholder")}
          data-error={t("error")}
          data-error-fallback={t("errorFallback", { url: CALCOM_URL || SITE_URL })}
          data-error-retry={t("errorRetry")}
          data-accent="#d37bff"
          data-accent-text="#ffffff"
          data-position="right"
          data-fallback-url={CALCOM_URL}
        />
      </MotionProvider>
    </NextIntlClientProvider>
  );
}
