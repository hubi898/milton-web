import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import PdfFlipbook from "@/components/PdfFlipbook";
import { getCatalog } from "@/data/catalogs";
import { useLanguage } from "@/i18n/LanguageContext";
import { publicUrl } from "@/lib/publicUrl";

export default function CatalogViewer() {
  const params = useParams<{ id: string }>();
  const catalog = getCatalog(params.id ?? "");
  const { t } = useLanguage();

  if (!catalog) {
    return (
      <SiteShell headerTone="light">
        <section className="empty-state">
          <h1>{t.catalogsPage.notFound}</h1>
          <Link href="/katalozi" className="btn btn--blue">
            <ArrowLeft size={16} /> {t.catalogsPage.back}
          </Link>
        </section>
      </SiteShell>
    );
  }

  const copy = t.catalogs.items[catalog.id];

  if (!catalog.pdf) {
    return (
      <SiteShell headerTone="light">
        <section className="empty-state">
          <p className="eyebrow">{catalog.brand}</p>
          <h1>{copy.title}</h1>
          <p>{t.catalogsPage.pdfMissing}</p>
          <Link href="/katalozi" className="btn btn--blue">
            <ArrowLeft size={16} /> {t.catalogsPage.backTo}
          </Link>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell headerTone="light">
      <section className="viewer-head">
        <Link href="/katalozi" className="link-arrow">
          <ArrowLeft size={16} /> {t.catalogsPage.all}
        </Link>
        <p className="eyebrow">
          {t.catalogs.categories[catalog.category]} · {catalog.year}
        </p>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </section>
      <section className="viewer-body">
        {/^https?:\/\//i.test(catalog.pdf) ? (
          <iframe className="pdf-frame" src={catalog.pdf} title={copy.title} />
        ) : (
          <PdfFlipbook src={publicUrl(catalog.pdf)} title={copy.title} />
        )}
      </section>
    </SiteShell>
  );
}
