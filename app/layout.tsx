import "@fontsource-variable/inter";
import "./globals.css";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

// Static "sr" default (the site's primary locale) rather than next-intl's getLocale():
// this root layout is shared with /admin (not locale-prefixed), and reading the request
// locale here forces every page — including on-demand blog slugs outside
// generateStaticParams — into fully dynamic rendering. SetHtmlLang (in the [locale]
// layout, which already knows the locale from its route params) corrects the attribute
// client-side after hydration.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sr" className="js">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
