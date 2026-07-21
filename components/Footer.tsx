import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BrandMark } from "./BrandMark";
import { LangSwitcher } from "./LangSwitcher";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <BrandMark />
          <p className="footer__tag">{t("footer.tag")}</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <Link href="/#solutions">{t("footer.solutions")}</Link>
          <Link href="/#process">{t("footer.process")}</Link>
          <Link href="/blog">{t("nav.blog")}</Link>
          <Link href="/#contact">{t("footer.contact")}</Link>
        </nav>
        <div className="footer__meta">
          <LangSwitcher />
          <p>doubleo.agency · © 2026 Double O. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
