import LegalDoc from "@/components/LegalDoc";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Terms() {
  const { t } = useLanguage();
  return (
    <SiteShell headerTone="light">
      <LegalDoc title={t.legal.termsTitle} sections={t.legal.terms} />
    </SiteShell>
  );
}
