import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { CALCOM_URL } from "@/lib/config";

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
      <Faq />
      <BlogTeaser locale={locale as Locale} />
      <FinalCta />
    </main>
  );
}
