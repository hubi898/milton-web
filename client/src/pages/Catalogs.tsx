import { Link, useSearch } from "wouter";
import { useMemo } from "react";
import { FileText } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { catalogs } from "@/data/catalogs";
import { useLanguage } from "@/i18n/LanguageContext";
import { publicUrl } from "@/lib/publicUrl";

export default function Catalogs() {
  const search = useSearch();
  const { t } = useLanguage();
  const q = useMemo(() => new URLSearchParams(search).get("q")?.toLowerCase() ?? "", [search]);
  const filtered = useMemo(() => {
    if (!q) return catalogs;
    return catalogs.filter((c) => {
      const copy = t.catalogs.items[c.id];
      return [copy.title, copy.subtitle, copy.description, c.brand, t.catalogs.categories[c.category]]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [q, t]);

  return (
    <SiteShell headerTone="light">
      <section className="page-hero">
        <p className="eyebrow eyebrow--orange">{t.catalogsPage.eyebrow}</p>
        <h1>
          {t.catalogsPage.h1}
          <span> {t.catalogsPage.h1span}</span>
        </h1>
        <p className="page-hero__lead">{t.catalogsPage.lead}</p>
        {q && (
          <p className="filter-note">
            {t.catalogsPage.search}: „{q}” · {filtered.length}
          </p>
        )}
      </section>

      <section className="catalog-rows">
        {filtered.map((c) => {
          const ready = Boolean(c.pdf);
          const copy = t.catalogs.items[c.id];
          const body = (
            <>
              <div className="catalog-rows__cover">
                <img src={publicUrl(c.coverImage)} alt="" />
              </div>
              <div className="catalog-rows__text">
                <span className={`tag ${ready ? "tag--ok" : ""}`}>
                  <FileText size={12} />
                  {ready ? t.catalogsPage.pdfReady : t.catalogsPage.pdfWait}
                </span>
                <p className="catalog-rows__meta">
                  {c.brand} · {t.catalogs.categories[c.category]} · {c.year}
                </p>
                <h2>{copy.title}</h2>
                <p>{copy.description}</p>
                <strong>{ready ? t.catalogsPage.openReader : t.catalogsPage.addLater}</strong>
              </div>
            </>
          );
          return ready ? (
            <Link
              key={c.id}
              href={c.id === "cenovnik-ms-2023" ? "/proizvodi#ponuda" : `/katalozi/${c.id}`}
              className="catalog-rows__item"
            >
              {body}
            </Link>
          ) : (
            <div key={c.id} className="catalog-rows__item is-empty">
              {body}
            </div>
          );
        })}
      </section>
    </SiteShell>
  );
}
