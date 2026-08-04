import "@fontsource-variable/inter";
import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { generalSans, fragmentMono } from "@/lib/fonts";
import { GA_MEASUREMENT_ID } from "@/lib/config";

// Static "sr" default (the site's primary locale) rather than next-intl's getLocale():
// this root layout is shared with /admin (not locale-prefixed), and reading the request
// locale here forces every page — including on-demand blog slugs outside
// generateStaticParams — into fully dynamic rendering. SetHtmlLang (in the [locale]
// layout, which already knows the locale from its route params) corrects the attribute
// client-side after hydration.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sr" className={`js ${generalSans.variable} ${fragmentMono.variable}`}>
      <body>
        {children}
        <Analytics />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            {/* GA4's enhanced measurement picks up client-side route changes from
                the History API, so no manual page_view on navigation is needed. */}
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
