import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AuroraBackdrop } from "@/components/motion/AuroraBackdrop";
import { Shape } from "@/components/motion/Shapes";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main id="main" className="nf">
      <div className="nf__bg">
        <AuroraBackdrop />
        <Shape name={3} size={145} className="nf__shape" />
      </div>

      <div className="wrap nf__inner">
        <span className="nf__code">{t("code")}</span>
        <h1 className="nf__title">{t("h1")}</h1>
        <p className="nf__sub">{t("sub")}</p>
        <div className="cta-row">
          <Link href="/" className="btn btn--primary btn--lg">
            {t("home")}
          </Link>
          <Link href="/solutions" className="btn btn--ghost btn--lg">
            {t("solutions")}
          </Link>
        </div>
      </div>
    </main>
  );
}
