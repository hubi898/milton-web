import { Link } from "wouter";
import { useLanguage } from "@/i18n/LanguageContext";
import { CONTACT_EMAIL } from "@/data/contacts";
import { publicUrl } from "@/lib/publicUrl";

export default function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="mf">
      <div className="mf__grid">
        <div className="mf__brand">
          <img src={publicUrl("/images/milton-logo.png")} alt="MILTON" />
          <p>{t.footer.blurb}</p>
        </div>
        <div>
          <h4>{t.footer.navigation}</h4>
          <Link href="/">{t.nav.home}</Link>
          <Link href="/proizvodi">{t.nav.products}</Link>
          <Link href="/o-nama">{t.nav.about}</Link>
          <Link href="/katalozi">{t.nav.catalogs}</Link>
          <Link href="/kontakt">{t.nav.contact}</Link>
        </div>
        <div>
          <h4>{t.footer.contact}</h4>
          <a href="tel:+381244878354">024 / 487 8354</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <p>{t.footer.address}</p>
        </div>
      </div>
      <div className="mf__bar">
        <span>
          © {new Date().getFullYear()} MILTON d.o.o. · {t.footer.rights}
        </span>
        <p className="mf__credit">
          <img src={publicUrl("/images/hubai-head.png")} alt="" />
          <span>Created by HubAI.D-vision</span>
        </p>
        <nav className="mf__legal" aria-label={t.footer.legal}>
          <Link href="/privatnost">{t.footer.privacy}</Link>
          <Link href="/uslovi">{t.footer.terms}</Link>
        </nav>
      </div>
    </footer>
  );
}
