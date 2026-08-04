"use client";

import { useTranslations } from "next-intl";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";

/**
 * The reference's four-card bento. Each card is a soft gradient art panel
 * with a small product mock built in DOM (the originals are PNGs), and a
 * title + description underneath.
 */
export function Bento() {
  const t = useTranslations("home.bento");
  const cards = t.raw("cards") as { title: string; body: string }[];
  const ui = t.raw("ui") as Record<string, string>;

  const art = [
    <ChannelsArt key="a" ui={ui} />,
    <ChecklistArt key="b" ui={ui} />,
    <OutreachArt key="c" ui={ui} />,
    <AutomateArt key="d" ui={ui} />,
  ];

  return (
    <section className="section bento" id="what">
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

        <div className="bento__grid">
          {cards.map((c, i) => (
            <Appear key={c.title} y={30} delay={0.06 * i} className="bento__cell">
              <article className="bento__card">
                <div className={`bento__art bento__art--${i + 1}`}>
                  <span className="u-noise" />
                  {art[i]}
                </div>
                <div className="bento__text">
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </article>
            </Appear>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Card mocks ───────────────────────────────────────────── */

function ChannelsArt({ ui }: { ui: Record<string, string> }) {
  const rows = [
    { label: ui.chWeb, tone: "#d37bff" },
    { label: ui.chIg, tone: "#fcac84" },
    { label: ui.chWa, tone: "#80aafd" },
    { label: ui.chTe, tone: "#7fd6f0" },
  ];
  return (
    <div className="mock mock--channels">
      <ul className="mock__rows">
        {rows.map((r) => (
          <li key={r.label} className="mock__row">
            <span className="mock__dot" style={{ background: r.tone }} />
            {r.label}
          </li>
        ))}
      </ul>
      <div className="mock__bar">
        <span className="mock__spin" />
        {ui.training}
        <span className="mock__badge" />
      </div>
    </div>
  );
}

function ChecklistArt({ ui }: { ui: Record<string, string> }) {
  return (
    <div className="mock mock--checklist">
      <div className="mock__panel">
        <p className="mock__title">{ui.autoTitle}</p>
        <ul className="mock__checks">
          {[70, 55, 82].map((w, i) => (
            <li key={i}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m4 12 6 6L20 6" />
              </svg>
              <i style={{ width: `${w}%` }} />
            </li>
          ))}
        </ul>
        <span className="mock__cta">{ui.generate}</span>
      </div>
    </div>
  );
}

function OutreachArt({ ui }: { ui: Record<string, string> }) {
  return (
    <div className="mock mock--outreach">
      <div className="mock__panel">
        <div className="mock__field">
          <span>{ui.to}</span>
          <i style={{ width: "58%" }} />
        </div>
        <div className="mock__field">
          <span>{ui.subject}</span>
          <i style={{ width: "72%" }} />
        </div>
        <p className="mock__mail">{ui.mailBody}</p>
        <span className="mock__cta mock__cta--dark">{ui.book}</span>
      </div>
    </div>
  );
}

function AutomateArt({ ui }: { ui: Record<string, string> }) {
  return (
    <div className="mock mock--automate">
      <div className="mock__input">
        <span className="mock__caret" />
        {ui.automate}
      </div>
      <span className="mock__cursor" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 3l14 8-6 1.6L10.6 19 5 3Z" />
        </svg>
      </span>
    </div>
  );
}
