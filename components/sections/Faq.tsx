"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Appear, EASE } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import { Link } from "@/i18n/navigation";

type Item = { q: string; a: string };

export function Faq({
  namespace = "home.faq",
  className,
}: {
  namespace?: string;
  className?: string;
}) {
  const t = useTranslations(namespace);
  const items = t.raw("items") as Item[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={`section faq ${className ?? ""}`} id="faq">
      <div className="wrap faq__inner">
        <div className="faq__aside">
          <Appear y={16}>
            <span className="pill">{t("kicker")}</span>
          </Appear>
          <SplitWords as="h2" text={t("h2")} />
          <Appear y={20} delay={0.1}>
            <p className="faq__prompt">
              {t("stillHave")}{" "}
              <Link href="/contact">{t("contactUs")}</Link> {t("happyToHelp")}
            </p>
          </Appear>
        </div>

        <div className="acc">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`acc__item${isOpen ? " is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    className="acc__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <span className="acc__sign" aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="acc__a">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
