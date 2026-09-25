import LegalDoc from "@/components/LegalDoc";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Privacy() {
  const { t } = useLanguage();
  return (
    <SiteShell headerTone="light">
      <LegalDoc title={t.legal.privacyTitle} sections={t.legal.privacy} />
    </SiteShell>
  );
}
