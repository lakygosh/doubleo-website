import "@fontsource-variable/inter";
import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { generalSans, fragmentMono } from "@/lib/fonts";
import { GA_MEASUREMENT_ID, GTM_CONTAINER_ID } from "@/lib/config";
import { CONSENT_BOOTSTRAP, CONSENT_REQUIRED } from "@/lib/consent";

/** GTM's install snippet, verbatim apart from the interpolated container ID. */
const GTM_LOADER = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`;

const GTM_NOSCRIPT = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

// Static "sr" default (the site's primary locale) rather than next-intl's getLocale():
// this root layout is shared with /admin (not locale-prefixed), and reading the request
// locale here forces every page — including on-demand blog slugs outside
// generateStaticParams — into fully dynamic rendering. SetHtmlLang (in the [locale]
// layout, which already knows the locale from its route params) corrects the attribute
// client-side after hydration.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sr" className={`js ${generalSans.variable} ${fragmentMono.variable}`}>
      <head>
        {/* Raw inline scripts, not next/script, because the order here is
            load-bearing: the consent defaults must be in the dataLayer before
            GTM starts firing tags, and next/script gives no such guarantee. */}
        {CONSENT_REQUIRED && (
          <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP }} />
        )}
        {GTM_CONTAINER_ID && <script dangerouslySetInnerHTML={{ __html: GTM_LOADER }} />}
      </head>
      <body>
        {/* Fires without consent, but only for visitors with JavaScript off —
            who cannot be shown the banner in the first place. */}
        {GTM_CONTAINER_ID && <noscript dangerouslySetInnerHTML={{ __html: GTM_NOSCRIPT }} />}
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
