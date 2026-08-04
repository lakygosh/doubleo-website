"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SOLUTIONS } from "@/lib/solutions";
import { CALCOM_URL } from "@/lib/config";
import { Wordmark } from "./BrandMark";
import { LangSwitcher } from "./LangSwitcher";
import { SolutionIcon } from "@/components/ui/SolutionIcon";

const LINKS = [
  { href: "/#how", key: "process" },
  { href: "/#about", key: "about" },
  { href: "/#testimonials", key: "testimonials" },
  { href: "/#faq", key: "faq" },
  { href: "/blog", key: "blog" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const tSol = useTranslations("sol");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const solRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Compact pill after the first screenful of scroll, as on the reference.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route change closes everything.
  useEffect(() => {
    setMenuOpen(false);
    setSolOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setSolOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Pointer-out closes the dropdown, but with a grace period so moving the
  // cursor from the trigger into the panel doesn't dismiss it.
  const openSolutions = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSolOpen(true);
  };
  const closeSolutions = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setSolOpen(false), 140);
  };

  const cta = CALCOM_URL || "/#contact";

  return (
    <>
      <div className={`nav-wrap${scrolled ? " is-scrolled" : ""}`}>
        <nav className="nav" aria-label={t("primary")}>
          <Link href="/" className="nav__brand" aria-label="Double O">
            <Wordmark size={30} />
          </Link>

          <div className="nav__links">
            <div
              className="nav__sol"
              ref={solRef}
              onMouseEnter={openSolutions}
              onMouseLeave={closeSolutions}
            >
              <button
                type="button"
                className={`nav__link nav__link--trigger${solOpen ? " is-open" : ""}`}
                aria-expanded={solOpen}
                aria-haspopup="true"
                onClick={() => setSolOpen((v) => !v)}
                onFocus={openSolutions}
              >
                {t("solutions")}
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {solOpen && (
                <div className="solmenu" onMouseEnter={openSolutions} onMouseLeave={closeSolutions}>
                  <ul className="solmenu__grid">
                    {SOLUTIONS.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/solutions/${s.slug}`} className="solmenu__item">
                          <span className="solmenu__icon" style={{ color: s.accent }}>
                            <SolutionIcon name={s.icon} />
                          </span>
                          <span className="solmenu__body">
                            <span className="solmenu__name">
                              {tSol(`${s.slug}.name`)}
                              {s.featured && <span className="solmenu__badge">{t("flagship")}</span>}
                            </span>
                            <span className="solmenu__desc">{tSol(`${s.slug}.tagline`)}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/solutions" className="solmenu__all">
                    {t("solutionsAll")}
                  </Link>
                </div>
              )}
            </div>

            {LINKS.map((l) => (
              <Link key={l.key} href={l.href} className="nav__link">
                {t(l.key)}
              </Link>
            ))}
          </div>

          <div className="nav__end">
            <LangSwitcher />
            <a
              className="btn btn--primary nav__cta"
              href={cta}
              {...(CALCOM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {t("cta")}
            </a>
            <button
              type="button"
              className="nav__burger"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={menuOpen ? "burger is-open" : "burger"}>
                <i />
                <i />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <div
          className="sheet"
          role="dialog"
          aria-modal="true"
          aria-label={t("primary")}
          data-lenis-prevent
        >
          <div className="sheet__inner">
            <p className="sheet__label">{t("solutions")}</p>
            <ul className="sheet__sol">
              {SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solutions/${s.slug}`} className="sheet__solitem">
                    <span className="solmenu__icon" style={{ color: s.accent }}>
                      <SolutionIcon name={s.icon} size={20} />
                    </span>
                    {tSol(`${s.slug}.name`)}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="sheet__label">{t("more")}</p>
            <ul className="sheet__links">
              {LINKS.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="sheet__link">
                    {t(l.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="sheet__link">
                  {t("contact")}
                </Link>
              </li>
            </ul>

            <div className="sheet__foot">
              <LangSwitcher />
              <a
                className="btn btn--primary btn--lg"
                href={cta}
                {...(CALCOM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {t("cta")}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
