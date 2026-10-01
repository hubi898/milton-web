import { Link, useSearch } from "wouter";
import { useMemo } from "react";
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
      return [copy.title, copy.subtitle, c.brand].join(" ").toLowerCase().includes(q);
    });
  }, [q, t]);

  return (
    <SiteShell headerTone="light">
      <section className="page-hero">
        <h1>{t.catalogsPage.h1}</h1>
        <p className="page-hero__lead">{t.catalogsPage.lead}</p>
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
                <h2>{copy.title}</h2>
              </div>
            </>
          );
          return ready ? (
            <Link key={c.id} href={`/katalozi/${c.id}`} className="catalog-rows__item">
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
