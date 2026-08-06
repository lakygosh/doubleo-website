import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { CALCOM_URL, SITE_URL } from "@/lib/config";
import { faqJsonLd } from "@/lib/seo";

import { Hero } from "@/components/sections/Hero";
import { Bento } from "@/components/sections/Bento";
import { Solutions } from "@/components/sections/Solutions";
import { MarqueeStrip, CtaTicker } from "@/components/sections/MarqueeStrip";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Benefits } from "@/components/sections/Benefits";
import { Trust } from "@/components/sections/Trust";
import { Testimonials } from "@/components/sections/Testimonials";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Engagement } from "@/components/sections/Engagement";
import { Faq } from "@/components/sections/Faq";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { FinalCta } from "@/components/sections/FinalCta";

/** Section order mirrors the reference site top to bottom. */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  // Read here rather than inside <Faq/> so the answers can be mirrored into
  // structured data — the component itself is a client component.
  const t = await getTranslations("home.faq");
  const faq = t.raw("items") as { q: string; a: string }[];

  return (
    <main id="main">
      <Hero />
      <Bento />
      <Solutions />
      <MarqueeStrip />
      <About />
      <Team />
      <Benefits />
      <Trust />
      <Testimonials />
      <HowItWorks />
      <Engagement />
      <CtaTicker href={CALCOM_URL || "/contact"} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faq, `${SITE_URL}/${locale}#faq`)),
        }}
      />
      <Faq />
      <BlogTeaser locale={locale as Locale} />
      <FinalCta />
    </main>
  );
}
