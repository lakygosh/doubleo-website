"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import ThreeDSlider from "@/components/lightswind/3d-slider";

/**
 * "Why Double O" — the six reasons as Lightswind's 3d-slider, plus the three
 * gradient key-point cards below it.
 *
 * The slider's cards carry only a number and a title; each reason's body copy
 * lives under the slider and follows the front-most card. That is why the
 * component was patched to report active changes — a click, a drag and a
 * settle all have to move the text, or the section reads as broken.
 */
export function Benefits() {
  const t = useTranslations("home.benefits");
  const items = t.raw("items") as { title: string; body: string }[];
  const keys = t.raw("keyPoints") as { title: string; body: string }[];

  const [active, setActive] = useState(0);
  const onActiveChange = useCallback((i: number) => setActive(i), []);

  const slides = useMemo(
    () =>
      items.map((b, i) => ({
        title: b.title,
        body: b.body,
        num: String(i + 1).padStart(2, "0"),
        imageUrl: `/why/${i + 1}.svg`,
      })),
    [items]
  );

  return (
    <section className="section benefits" id="why">
      <div className="wrap">
        <div className="sec-head">
          <Appear y={16}>
            <span className="pill">{t("kicker")}</span>
          </Appear>
          <SplitWords as="h2" text={t("h2")} />
          <Appear y={20} delay={0.1}>
            <p className="sec-head__sub">{t("sub")}</p>
          </Appear>
        </div>

        <Appear y={26} className="benefits__slider">
          <ThreeDSlider
            items={slides}
            onActiveChange={onActiveChange}
            speedDrag={-0.12}
            containerStyle={{ background: "var(--dark)" }}
          />

          {/* The cards carry the copy now, so all that's left below is where
              you are in the six. aria-live so a drag is still announced. */}
          <p className="benefits__count" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>

          {/* The slider builds its cards with document.createElement inside an
              effect, so none of them exist in the server HTML. Everything the
              section claims stays crawlable and available without JS here. */}
          <ul className="u-sr-only">
            {items.map((b) => (
              <li key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ul>
        </Appear>

        <div className="keypoints">
          {keys.map((k, i) => (
            <Appear key={k.title} y={26} delay={0.06 * i}>
              <article className={`keypoint keypoint--${i + 1}`}>
                <span className="u-noise" />
                <h3>{k.title}</h3>
                <p>{k.body}</p>
              </article>
            </Appear>
          ))}
        </div>
      </div>
    </section>
  );
}
