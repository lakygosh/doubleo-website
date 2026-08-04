"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONSENT_REQUIRED, readConsent, writeConsent, type ConsentChoice } from "@/lib/consent";

/**
 * Non-blocking: consent mode already holds the cookies back, so there is no
 * reason to trap the visitor behind a modal before they can read the page.
 */
export function ConsentBanner() {
  const t = useTranslations("consent");
  const [open, setOpen] = useState(false);

  // The stored choice only exists in the browser, and these pages are
  // prerendered — so the banner is decided after mount rather than rendered
  // into the static HTML.
  useEffect(() => {
    if (CONSENT_REQUIRED && readConsent() === null) setOpen(true);
  }, []);

  if (!open) return null;

  function choose(choice: ConsentChoice) {
    writeConsent(choice);
    setOpen(false);
  }

  return (
    <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">
      <p className="consent__title" id="consent-title">
        {t("title")}
      </p>
      <p className="consent__body">{t("body")}</p>
      <div className="consent__actions">
        <button type="button" className="btn btn--primary" onClick={() => choose("granted")}>
          {t("accept")}
        </button>
        <button type="button" className="btn btn--secondary" onClick={() => choose("denied")}>
          {t("decline")}
        </button>
      </div>
      <Link className="consent__link" href="/privacy-policy">
        {t("privacy")}
      </Link>
    </div>
  );
}
