"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { logFeed } from "@/lib/opslog";

const VISIBLE = 5;

export function OpsLogTicker() {
  const locale = useLocale() as "sr" | "en";
  const t = useTranslations();
  const [head, setHead] = useState(0);
  const listRef = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let timer: number | undefined;
    const start = () => {
      if (timer === undefined) {
        timer = window.setInterval(() => {
          setHead((h) => (h - 1 + logFeed.length) % logFeed.length);
        }, 3800);
      }
    };
    const stop = () => {
      if (timer !== undefined) {
        clearInterval(timer);
        timer = undefined;
      }
    };

    const el = listRef.current;
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.2 });
      io.observe(el);
    }
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const visible = Array.from({ length: VISIBLE }, (_, i) => logFeed[(head + i) % logFeed.length]);

  return (
    <aside className="opslog" aria-label="Operations log — example of the system at work">
      <div className="opslog__head">
        <span className="opslog__title">{t("log.title")}</span>
        <span className="opslog__shift">
          <span className="opslog__dot" aria-hidden="true"></span>
          <span>{t("log.shift")}</span>
        </span>
      </div>
      <ol className="opslog__list" ref={listRef}>
        {visible.map((entry, i) => (
          <li key={`${head}-${i}`} className={`opslog__item${i === 0 ? " is-new" : ""}`} data-kind={entry.kind}>
            <time>{entry.time}</time>
            <span>{entry.text[locale]}</span>
          </li>
        ))}
      </ol>
      <p className="opslog__caption">{t("log.caption")}</p>
    </aside>
  );
}
