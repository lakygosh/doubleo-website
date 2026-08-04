import { getTranslations } from "next-intl/server";
import { Shape } from "@/components/motion/Shapes";
import { CALCOM_URL } from "@/lib/config";

export async function FinalCta() {
  const t = await getTranslations("home.cta");
  const cta = CALCOM_URL || "/contact";

  return (
    <section className="section--dark finalcta" id="contact">
      <div className="wrap finalcta__inner">
        <div>
          <span className="pill pill--dark">{t("eyebrow")}</span>
          <h2 className="finalcta__title">{t("h2")}</h2>
          <p className="finalcta__sub">{t("sub")}</p>
          <a
            className="btn btn--light btn--lg finalcta__btn"
            href={cta}
            {...(CALCOM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {t("button")}
          </a>
        </div>
        <Shape name={2} size={200} className="finalcta__shape" />
      </div>
    </section>
  );
}
