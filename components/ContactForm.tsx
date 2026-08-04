"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FORM_ENDPOINT } from "@/lib/config";

export function ContactForm() {
  const t = useTranslations("contact");
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <form className="cform" id="contact-form" ref={formRef} method="POST" noValidate onSubmit={onSubmit}>
      <input type="hidden" name="_subject" value="Nova poruka — doubleo.agency" />
      <input type="hidden" name="_template" value="table" />
      <input
        type="text"
        name="_honey"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="cform__row">
        <div className="field">
          <label htmlFor="f-name">{t("name")}</label>
          <input id="f-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="f-email">{t("email")}</label>
          <input id="f-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-business">{t("business")}</label>
        <input id="f-business" name="business" type="text" autoComplete="organization" />
      </div>

      <div className="field">
        <label htmlFor="f-message">{t("message")}</label>
        <textarea id="f-message" name="message" rows={5} required placeholder={t("messagePh")} />
      </div>

      <button type="submit" className="btn btn--primary btn--lg" disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("send")}
      </button>

      <p
        className={`form__status${status === "ok" ? " form__status--ok" : status === "err" ? " form__status--err" : ""}`}
        role="status"
        aria-live="polite"
      >
        {status === "ok" ? t("success") : status === "err" ? t("error") : ""}
      </p>
    </form>
  );
}
