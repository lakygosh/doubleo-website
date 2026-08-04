"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
