import { Link } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { type PriceCategory } from "@/data/priceList";
import { productFamilies } from "@/data/productFamilies";
import { useLanguage } from "@/i18n/LanguageContext";
import { publicUrl } from "@/lib/publicUrl";

const CATEGORIES: PriceCategory[] = [
  "brass",
  "unions",
  "clamps",
  "seals",
  "radiator",
  "finish",
  "heating",
];

function formatPrice(n: number, lang: string) {
  const locale = lang === "en" ? "en-GB" : lang === "hu" ? "hu-HU" : "sr-RS";
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export default function Products() {
  const { lang, t } = useLanguage();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<PriceCategory | "all">("all");
  const families = useMemo(() => productFamilies(), []);

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return families.filter((family) => {
      if (cat !== "all" && family.category !== cat) return false;
      if (!needle) return true;
      return (
        family.title.toLowerCase().includes(needle) ||
        family.variants.some(
          (v) => v.sku.toLowerCase().includes(needle) || v.name.toLowerCase().includes(needle),
        )
      );
    });
  }, [families, q, cat]);

  return (
    <SiteShell headerTone="light">
      <section className="range-intro range-intro--lead">
        <h1>{t.products.h1}</h1>
        <p className="products-styron-note">{t.products.styronNote}</p>
      </section>

      <section className="plist" id="ponuda">
        <div className="plist__tools">
          <label className="plist__search">
            <Search size={16} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.pricePage.search}
              type="search"
            />
          </label>
          <Link href="/katalozi" className="btn btn--blue">
            {t.products.catalogBtn}
          </Link>
        </div>

        <div className="plist__cats" role="tablist" aria-label={t.products.eyebrow}>
          <button type="button" className={cat === "all" ? "is-active" : ""} onClick={() => setCat("all")}>
            {t.pricePage.all}
          </button>
          {CATEGORIES.map((id) => (
            <button
              key={id}
              type="button"
              className={cat === id ? "is-active" : ""}
              onClick={() => setCat(id)}
            >
              {t.pricePage.categories[id]}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="plist__empty">{t.pricePage.empty}</p>
        ) : (
          <div className="shop-grid">
            {filtered.map((family) => {
              const from = Math.min(...family.variants.map((v) => v.price));
              return (
                <Link key={family.id} href={`/proizvodi/${family.id}`} className="shop-card">
                  <div className="shop-card__img">
                    <img src={publicUrl(family.image)} alt="" />
                  </div>
                  <div className="shop-card__body">
                    <p>{t.pricePage.categories[family.category]}</p>
                    <h3>{family.title}</h3>
                    <strong>
                      {t.products.from} {formatPrice(from, lang)} <small>RSD</small>
                    </strong>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        <p className="plist__note">{t.pricePage.note}</p>
      </section>
    </SiteShell>
  );
}
