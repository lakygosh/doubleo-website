import { getTranslations } from "next-intl/server";
import { ScrollWordReveal } from "@/components/motion/ScrollWordReveal";

/**
 * The reference's black About block: a pinned paragraph whose words light up
 * one by one as you scroll past.
 */
export async function About() {
  const t = await getTranslations("home.about");

  return (
    <section className="section--dark about" id="about">
      <div className="wrap about__inner">
        <span className="pill pill--dark about__pill">{t("kicker")}</span>
        <ScrollWordReveal text={t("body")} />
      </div>
    </section>
  );
}
