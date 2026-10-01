import { Link, useParams, useSearch } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { getProductFamily, productFamilies, variantSize } from "@/data/productFamilies";
import { useLanguage } from "@/i18n/LanguageContext";
import { publicUrl } from "@/lib/publicUrl";

function formatPrice(n: number, lang: string) {
  const locale = lang === "en" ? "en-GB" : lang === "hu" ? "hu-HU" : "sr-RS";
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export default function Product() {
  const params = useParams<{ id: string }>();
  const search = useSearch();
  const { lang, t } = useLanguage();
  const family = getProductFamily(params.id ?? "");
  const requested = useMemo(() => new URLSearchParams(search).get("sku") ?? "", [search]);
  const [sku, setSku] = useState(
    () => family?.variants.find((v) => v.sku === requested)?.sku ?? family?.variants[0]?.sku ?? "",
  );

  useEffect(() => {
    if (!family) return;
    const next =
      family.variants.find((v) => v.sku === requested)?.sku ?? family.variants[0]?.sku ?? "";
    setSku(next);
  }, [params.id, requested]);

  if (!family) {
    return (
      <SiteShell headerTone="light">
        <section className="empty-state">
          <h1>{t.products.missing}</h1>
          <Link href="/proizvodi" className="btn btn--blue">
            <ArrowLeft size={16} /> {t.products.back}
          </Link>
        </section>
      </SiteShell>
    );
  }

  const selected = family.variants.find((v) => v.sku === sku) ?? family.variants[0];
  const related = productFamilies()
    .filter((item) => item.category === family.category && item.id !== family.id)
    .slice(0, 3);

  return (
    <SiteShell headerTone="light">
      <article className="pdp">
        <Link href="/proizvodi" className="link-arrow pdp__back">
          <ArrowLeft size={16} /> {t.products.back}
        </Link>
        <div className="pdp__layout">
          <div className="pdp__img">
            <img src={publicUrl(family.image)} alt="" />
          </div>
          <div className="pdp__buy">
            <h1>{family.title}</h1>
            <p className="pdp__price">
              {formatPrice(selected.price, lang)} <small>RSD</small>
            </p>
            <p className="pdp__sku">
              {t.products.sku} {selected.sku}
            </p>
            <p className="pdp__name">{selected.name}</p>
            <p className="pdp__label">{t.products.size}</p>
            <div className="pdp__sizes" role="group" aria-label={t.products.size}>
              {family.variants.map((v) => (
                <button
                  key={v.sku}
                  type="button"
                  className={v.sku === selected.sku ? "is-active" : ""}
                  aria-pressed={v.sku === selected.sku}
                  onClick={() => setSku(v.sku)}
                >
                  {variantSize(v.name, family.title)}
                </button>
              ))}
            </div>
            <Link href="/kontakt" className="btn btn--orange">
              {t.products.enquire} <ArrowRight size={16} />
            </Link>
            <p className="pdp__note">{t.pricePage.note}</p>
          </div>
        </div>

        <h2>{t.products.allSizes}</h2>
        <div className="pdp__table-wrap">
          <table className="pdp__table">
            <thead>
              <tr>
                <th>{t.products.size}</th>
                <th>{t.products.sku}</th>
                <th>RSD</th>
              </tr>
            </thead>
            <tbody>
              {family.variants.map((v) => (
                <tr
                  key={v.sku}
                  className={v.sku === selected.sku ? "is-active" : ""}
                  onClick={() => setSku(v.sku)}
                >
                  <td>{variantSize(v.name, family.title)}</td>
                  <td>{v.sku}</td>
                  <td>{formatPrice(v.price, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      {related.length > 0 && (
        <section className="plist">
          <h2 className="shop-related__title">{t.products.related}</h2>
          <div className="shop-grid">
            {related.map((item) => {
              const from = Math.min(...item.variants.map((v) => v.price));
              return (
                <Link key={item.id} href={`/proizvodi/${item.id}`} className="shop-card">
                  <div className="shop-card__img">
                    <img src={publicUrl(item.image)} alt="" />
                  </div>
                  <div className="shop-card__body">
                    <h3>{item.title}</h3>
                    <strong>
                      {t.products.from} {formatPrice(from, lang)} <small>RSD</small>
                    </strong>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </SiteShell>
  );
}
