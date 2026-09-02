import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/i18n/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <SiteShell headerTone="light">
      <section className="empty-state">
        <h1>{t.notFound.title}</h1>
        <Link href="/" className="btn btn--blue">
          {t.notFound.back}
        </Link>
      </section>
    </SiteShell>
  );
}
