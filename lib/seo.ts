import type { Metadata, MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/config";

type Alternates = NonNullable<Metadata["alternates"]>;
/**
 * Taken from the sitemap entry rather than from `Metadata`, because that one is
 * `Languages<string>` while the metadata version also admits null and URL —
 * the narrower type satisfies both callers.
 */
type Languages = NonNullable<NonNullable<MetadataRoute.Sitemap[number]["alternates"]>["languages"]>;

/**
 * hreflang set for one page, keyed by its locale-less path — "" for the home
 * page, "/solutions/chatbot" for a solution.
 *
 * Every locale lists itself alongside its siblings; Google throws out a set
 * whose return links are missing. `x-default` points at the default locale
 * because that is where `/` redirects an unmatched visitor.
 */
export function languageAlternates(path = ""): Languages {
  const languages: Languages = {
    "x-default": `${SITE_URL}/${routing.defaultLocale}${path}`,
  };

  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }

  return languages;
}

/**
 * The `alternates` block for a page's metadata. Always pass the path — leaving
 * it out inherits the parent segment's canonical, which is how the blog index
 * ended up telling Google it was a duplicate of the home page.
 */
export function alternates(locale: string, path = ""): Alternates {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: languageAlternates(path),
  };
}

/**
 * FAQPage node for an accordion the page already renders. The answers must stay
 * in the markup for this to be legitimate — collapsed is fine, absent is not.
 */
export function faqJsonLd(items: { q: string; a: string }[], id: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
