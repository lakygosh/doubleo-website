"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/components/motion/Appear";

/**
 * Per-solution FAQ. Same accordion as the landing page, but fed items
 * directly rather than reading a fixed namespace.
 */
export function SolutionFaq({
  items,
  kicker,
  heading,
}: {
  items: { q: string; a: string }[];
  kicker: string;
  heading: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section faq" id="faq">
      <div className="wrap faq__inner">
        <div className="faq__aside">
          <span className="pill">{kicker}</span>
          <h2>{heading}</h2>
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
                {/* Collapsed rather than unmounted: an answer that isn't in the
                    markup is invisible to crawlers that never click, and to the
                    AI crawlers that don't run JS at all. It also has to be there
                    for the FAQPage schema on this page to be legitimate. */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  style={{ overflow: "hidden" }}
                  aria-hidden={!isOpen}
                >
                  <p className="acc__a">{item.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
