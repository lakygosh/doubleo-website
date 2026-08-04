import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Catch-all so unmatched paths under a locale render the localised 404.
 *
 * Without a route match Next has no `[locale]` segment to resolve, so it falls
 * back to the root not-found and app/[locale]/not-found.tsx never renders.
 * This matches the segment, sets the locale for translations, then hands over
 * to that page via notFound().
 */
export default async function CatchAllNotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (routing.locales.includes(locale as Locale)) {
    setRequestLocale(locale as Locale);
  }
  notFound();
}
