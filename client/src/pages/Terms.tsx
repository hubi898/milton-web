import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Terms() {
  const { t } = useLanguage();
  return (
    <SiteShell headerTone="light">
      <section className="legal">
        <p className="eyebrow">{t.legal.eyebrow}</p>
        <h1>{t.legal.termsTitle}</h1>
        <p>{t.legal.termsP1}</p>
        <p>
          {t.legal.termsP2a}{" "}
          <a href="mailto:milton.koko@gmail.com">milton.koko@gmail.com</a>
        </p>
      </section>
    </SiteShell>
  );
}
