import { Link } from "wouter";
import { useLanguage } from "@/i18n/LanguageContext";
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
          <Link href="/o-nama">{t.nav.about}</Link>
          <Link href="/katalozi">{t.nav.catalogs}</Link>
          <Link href="/cenovnik">{t.nav.priceList}</Link>
          <Link href="/kontakt">{t.nav.contact}</Link>
        </div>
        <div>
          <h4>{t.footer.contact}</h4>
          <a href="tel:+381244878354">024 / 487 8354</a>
          <a href="mailto:milton.koko@gmail.com">milton.koko@gmail.com</a>
          <p>{t.footer.address}</p>
          <Link href="/privatnost">{t.footer.privacy}</Link>
          <Link href="/uslovi">{t.footer.terms}</Link>
        </div>
      </div>
      <div className="mf__bar">
        <span>© {new Date().getFullYear()} MILTON d.o.o.</span>
        <span>{t.footer.rights}</span>
      </div>
    </footer>
  );
}
