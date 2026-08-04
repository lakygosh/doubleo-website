"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { useChat } from "./useChat";
import { EASE } from "@/components/motion/Appear";
import { CALCOM_URL } from "@/lib/config";

/**
 * The hero chat card — the reference's mock chat UI, but wired to the real
 * n8n agent so a visitor can try the product without leaving the page.
 *
 * Layout mirrors the original: a glass surface holding the transcript, then
 * an input block with a context pill, the textarea, suggestion chips and a
 * circular aurora send button.
 */
export function HeroChat() {
  const t = useTranslations("home.hero.chat");
  const { messages, busy, send } = useChat();
  const [value, setValue] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const chips = t.raw("chips") as string[];
  const started = messages.length > 0;

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  function submit(text: string) {
    if (!text.trim() || busy) return;
    send(text);
    setValue("");
    if (inputRef.current) inputRef.current.style.height = "auto";
  }

  // Grows past the CSS min-height as the visitor types, up to a cap.
  function autoGrow(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
  }

  return (
    <div className="hchat">
      <div className="hchat__stage">
        {/* data-lenis-prevent: SmoothScroll hijacks wheel events document-wide,
            so without this the transcript can't be scrolled with the mouse. */}
        <div
          className={started ? "hchat__scroll" : "hchat__scroll hchat__scroll--empty"}
          ref={scrollerRef}
          data-lenis-prevent
        >
          {!started && (
            <div className="hchat__greeting">
              <span className="hchat__avatar" aria-hidden="true" />
              <p>{t("greeting")}</p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                className={`hchat__msg hchat__msg--${m.role}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: EASE }}
              >
                {m.role === "user" ? (
                  <>
                    <p className="hchat__bubble">{m.text}</p>
                    <span className="hchat__me" aria-hidden="true" />
                  </>
                ) : m.role === "bot" ? (
                  <>
                    <span className="hchat__avatar" aria-hidden="true" />
                    <p className="hchat__bubble">{m.text}</p>
                  </>
                ) : (
                  <>
                    <span className="hchat__avatar" aria-hidden="true" />
                    <p className="hchat__bubble hchat__bubble--err">
                      {t("error")}{" "}
                      {CALCOM_URL && (
                        <a href={CALCOM_URL} target="_blank" rel="noopener noreferrer">
                          {t("errorCta")}
                        </a>
                      )}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {busy && (
            <div className="hchat__msg hchat__msg--bot">
              <span className="hchat__avatar" aria-hidden="true" />
              <p className="hchat__bubble hchat__typing" aria-label={t("typing")}>
                <i />
                <i />
                <i />
              </p>
            </div>
          )}
        </div>
      </div>

      <form
        className="hchat__composer"
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
      >
        <div className="hchat__ctx">
          <span className="hchat__ctxpill">
            <span className="pill__dot" />
            {t("agent")}
          </span>
          <span className="hchat__live">
            <i />
            {t("live")}
          </span>
        </div>

        <label className="u-sr-only" htmlFor="hero-chat-input">
          {t("placeholder")}
        </label>
        <textarea
          id="hero-chat-input"
          ref={inputRef}
          className="hchat__input"
          rows={1}
          placeholder={t("placeholder")}
          value={value}
          disabled={busy}
          onChange={(e) => {
            setValue(e.target.value);
            autoGrow(e.target);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(value);
            }
          }}
        />

        <div className="hchat__bottom">
          <div className="hchat__chips">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                className="hchat__chip"
                disabled={busy}
                onClick={() => submit(c)}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z" />
                </svg>
                {c}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="hchat__send"
            disabled={busy || !value.trim()}
            aria-label={t("send")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10.2 15 12 3.4 13.8 3.4 20.4Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
