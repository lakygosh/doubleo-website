import { useTranslations } from "next-intl";

/**
 * Hero product card — a compact, static preview of the Double O chatbot
 * ("Nova") answering a visitor and booking an appointment. Replaces the old
 * operations-log ticker as the hero's right-column visual.
 */
export function HeroChatCard() {
  const t = useTranslations("heroCard");

  return (
    <aside className="herochat" aria-label={t("aria")}>
      <div className="herochat__head">
        <span className="herochat__avatar" aria-hidden="true">
          <span className="herochat__avatar-dot"></span>
        </span>
        <div className="herochat__id">
          <b>{t("name")}</b>
          <span>{t("status")}</span>
        </div>
        <span className="herochat__channel">{t("channel")}</span>
      </div>

      <div className="herochat__thread">
        <p className="herochat__msg herochat__msg--them">{t("q")}</p>
        <p className="herochat__msg herochat__msg--us">{t("a")}</p>
        <div className="herochat__slot">
          <div>
            <span className="herochat__slot-k">{t("slotLabel")}</span>
            <b className="herochat__slot-v">{t("slot")}</b>
          </div>
          <span className="herochat__check" aria-hidden="true">✓</span>
        </div>
      </div>

      <p className="herochat__foot">{t("foot")}</p>
    </aside>
  );
}
