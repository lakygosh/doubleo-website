"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BrandMark } from "./BrandMark";
import { LangSwitcher } from "./LangSwitcher";
import { CALCOM_URL } from "@/lib/config";

export function Header() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const navLinks = (
    <>
      <Link href="/#solutions">{t("nav.solutions")}</Link>
      <Link href="/#process">{t("nav.process")}</Link>
      <Link href="/#why">{t("nav.why")}</Link>
      <Link href="/#contact">{t("nav.contact")}</Link>
    </>
  );

  return (
    <header className="header">
      <div className="header__inner">
        <Link className="brand" href="/#top">
          <BrandMark />
          <span className="brand__name">Double&nbsp;O</span>
        </Link>

        <nav className="nav" aria-label="Main navigation">
          {navLinks}
        </nav>

        <div className="header__actions">
          <LangSwitcher />
          <a
            className="btn btn--small btn--solid"
            href={CALCOM_URL || "/#contact"}
            target={CALCOM_URL ? "_blank" : undefined}
            rel={CALCOM_URL ? "noopener" : undefined}
          >
            {t("nav.cta")}
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`mobile-menu${open ? " is-open" : ""}`} id="mobile-menu" hidden={!open}>
        <div onClick={() => setOpen(false)}>{navLinks}</div>
        <a
          className="btn btn--solid"
          href={CALCOM_URL || "/#contact"}
          target={CALCOM_URL ? "_blank" : undefined}
          rel={CALCOM_URL ? "noopener" : undefined}
          onClick={() => setOpen(false)}
        >
          {t("hero.ctaPrimary")}
        </a>
      </div>
    </header>
  );
}
