"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LangSwitcher() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next !== locale) router.replace(pathname, { locale: next });
  }

  return (
    <div className="lang" role="group" aria-label={t("langLabel")}>
      <button
        type="button"
        className={`lang__btn${locale === "sr" ? " is-active" : ""}`}
        aria-pressed={locale === "sr"}
        onClick={() => switchTo("sr")}
      >
        SR
      </button>
      <button
        type="button"
        className={`lang__btn${locale === "en" ? " is-active" : ""}`}
        aria-pressed={locale === "en"}
        onClick={() => switchTo("en")}
      >
        EN
      </button>
    </div>
  );
}
