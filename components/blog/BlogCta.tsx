import { getTranslations } from "next-intl/server";
import { CALCOM_URL } from "@/lib/config";

/**
 * The two blog CTA surfaces, both wearing the aurora `.callcard` treatment
 * already used on /contact. `BlogCtaCard` fills a slot in the index grid the
 * way the reference drops a promo tile between posts; `BlogCtaPanel` is the
 * sticky rail beside a post body.
 */

function ctaHref() {
  return CALCOM_URL || "/contact";
}

function ctaAttrs() {
  return CALCOM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export async function BlogCtaCard() {
  const t = await getTranslations("blog.cta");

  return (
    <aside className="callcard bctacard">
      <span className="u-noise" />
      <p className="callcard__title bctacard__title">{t("cardTitle")}</p>
      <p className="callcard__body">{t("cardBody")}</p>
      <a className="btn btn--ghost" href={ctaHref()} {...ctaAttrs()}>
        {t("button")}
      </a>
    </aside>
  );
}

export async function BlogCtaPanel() {
  const t = await getTranslations("blog.cta");

  return (
    <aside className="callcard bctapanel">
      <span className="u-noise" />
      <span className="kicker bctapanel__kicker">{t("panelKicker")}</span>
      <p className="callcard__title bctacard__title">{t("panelTitle")}</p>
      <p className="callcard__body">{t("panelBody")}</p>
      <a className="btn btn--ghost" href={ctaHref()} {...ctaAttrs()}>
        {t("button")}
      </a>
    </aside>
  );
}
