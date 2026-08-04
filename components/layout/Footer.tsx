import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SOLUTIONS } from "@/lib/solutions";
import { CONTACT_EMAIL, SOCIALS } from "@/lib/config";
import { Shape } from "@/components/motion/Shapes";
import { Wordmark } from "./BrandMark";
import { LangSwitcher } from "./LangSwitcher";

const SOCIAL_ICONS: Record<string, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.68.8.9 1.4.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2a3.8 3.8 0 0 1-.9 1.4c-.4.4-.8.68-1.4.9-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.6.5-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Zm5.7-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm6.5 0h3.8v1.5h.06a4.2 4.2 0 0 1 3.78-2c4 0 4.76 2.6 4.76 6v5.5h-4V16c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v4.6h-4v-11Z",
  x: "M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1-5.8 6.1H1.5l7.5-8.6L1.2 3h6.6l4.5 5.6L17.5 3Zm-1.1 16.1h1.8L7.7 4.8H5.8l10.6 14.3Z",
  facebook:
    "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z",
};

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tSol = await getTranslations("sol");
  const year = new Date().getFullYear();

  const socials = Object.entries(SOCIALS).filter(([, url]) => url);

  return (
    <footer className="footer section--dark">
      <Shape name={1} size={190} className="footer__shape" />

      <div className="wrap footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Wordmark size={32} />
            <p className="footer__tagline">{t("tagline")}</p>

            {socials.length > 0 && (
              <ul className="footer__social">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={SOCIAL_ICONS[key]} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav className="footer__cols" aria-label={t("navLabel")}>
            <div className="footer__col">
              <h3 className="footer__coltitle">{tNav("solutions")}</h3>
              <ul>
                {SOLUTIONS.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/solutions/${s.slug}`}>{tSol(`${s.slug}.name`)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__coltitle">{t("company")}</h3>
              <ul>
                <li>
                  <Link href="/#about">{tNav("about")}</Link>
                </li>
                <li>
                  <Link href="/#how">{tNav("process")}</Link>
                </li>
                <li>
                  <Link href="/blog">{tNav("blog")}</Link>
                </li>
                <li>
                  <Link href="/contact">{tNav("contact")}</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">{t("privacy")}</Link>
                </li>
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__coltitle">{t("getInTouch")}</h3>
              <ul>
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </li>
                <li className="footer__muted">{t("address")}</li>
              </ul>
              <LangSwitcher />
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} Double O. {t("rights")}
          </p>
          <p className="footer__muted">doubleo.agency</p>
        </div>
      </div>

      {/* Oversized ghost wordmark bleeding off the bottom, as on the reference. */}
      <span className="footer__ghost" aria-hidden="true">
        Double O
      </span>
    </footer>
  );
}
