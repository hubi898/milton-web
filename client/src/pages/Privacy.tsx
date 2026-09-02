import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Privacy() {
  const { t } = useLanguage();
  return (
    <SiteShell headerTone="light">
      <section className="legal">
        <p className="eyebrow">{t.legal.eyebrow}</p>
        <h1>{t.legal.privacyTitle}</h1>
        <p>{t.legal.privacyP1}</p>
        <p>{t.legal.privacyP2}</p>
        <p>
          {t.legal.privacyP3}{" "}
          <a href="mailto:milton.koko@gmail.com">milton.koko@gmail.com</a>
        </p>
      </section>
    </SiteShell>
  );
}
