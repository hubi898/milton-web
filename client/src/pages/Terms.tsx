import { useEffect } from "react";
import { useLocation } from "wouter";
import LegalDoc from "@/components/LegalDoc";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/i18n/LanguageContext";
import { legalByLang } from "@/i18n/legalContent";
import { langFromLegalPath } from "@/i18n/legalPaths";

export default function Terms() {
  const { lang, setLang } = useLanguage();
  const [location] = useLocation();
  const doc = legalByLang[lang].terms;

  useEffect(() => {
    const fromPath = langFromLegalPath(location);
    if (fromPath && fromPath !== lang) setLang(fromPath);
  }, [location, lang, setLang]);

  return (
    <SiteShell headerTone="light">
      <LegalDoc title={doc.title} sections={doc.sections} />
    </SiteShell>
  );
}
