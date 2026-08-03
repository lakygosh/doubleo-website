import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { SITE_URL, CALCOM_URL } from "@/lib/config";

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
      email: "hello@doubleo.agency",
      description:
        "AI automation agency: a chatbot for website, Instagram and Viber/WhatsApp that answers enquiries and books appointments, plus content, lead reactivation and — as an upgrade — an AI phone receptionist. Done-for-you, 24/7.",
    },
    {
      "@type": "Service",
      serviceType: "AI Chatbot",
      name: "AI Chatbot (Website, Instagram, Viber/WhatsApp)",
      provider: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Service",
      serviceType: "Content Dashboard",
      name: "Content Dashboard",
      provider: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Service",
      serviceType: "Lead Reactivation",
      name: "Lead Reactivation",
      provider: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Service",
      serviceType: "Speed to Lead",
      name: "Speed to Lead",
      provider: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Service",
      serviceType: "AI UGC Creatives",
      name: "AI UGC Creatives",
      provider: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Service",
      serviceType: "AI Inbound Receptionist",
      name: "AI Receptionist",
      provider: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

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

  return (
    <NextIntlClientProvider messages={messages}>
      <SetHtmlLang locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      {children}
      <Footer />
      <script
        src="/assets/widget.js"
        defer
        data-webhook-url="https://n8n.doubleo.agency/webhook/11a27b23-153e-4a19-bf67-b83410c1355a/chat"
        data-title="Double O"
        data-subtitle={t("subtitle")}
        data-welcome={t("welcome")}
        data-placeholder={t("placeholder")}
        data-error={t("error")}
        data-error-fallback={t("errorFallback", { url: CALCOM_URL || SITE_URL })}
        data-error-retry={t("errorRetry")}
        data-accent="#8ce2a4"
        data-accent-text="#0e1210"
        data-position="right"
        data-fallback-url={CALCOM_URL}
      />
    </NextIntlClientProvider>
  );
}
