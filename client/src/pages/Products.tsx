import { Link } from "wouter";
import { useMemo, useState } from "react";
import { ArrowRight, Download, Search } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { assortment } from "@/data/assortment";
import { PRICE_LIST_DATE, PRICE_LIST_PDF, type PriceCategory } from "@/data/priceList";
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
      <section className="page-hero">
        <p className="eyebrow">{t.products.eyebrow}</p>
        <h1>
          {t.products.h1}
          <span> {t.products.h1span}</span>
        </h1>
        <p className="page-hero__lead">{t.products.lead}</p>
      </section>

      <section className="range-intro">
        <ul className="range-intro__lines">
          {assortment.map((item) => (
            <li key={item.id}>{t.assortment[item.id].title}</li>
          ))}
        </ul>
        <p>{t.about.p2}</p>
      </section>

      <section className="styron-quiet">
        <div>
          <h2>{t.products.styronTitle}</h2>
          <p>{t.products.styronP}</p>
          <p>{t.about.iso}</p>
          <Link href="/katalozi/styron" className="link-arrow">
            {t.about.partnerLink} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="usp-block usp-block--quiet">
        <h2>{t.products.qualityH2}</h2>
        <ul>
          {t.about.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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
          <a className="btn btn--blue" href={publicUrl(PRICE_LIST_PDF)} download>
            <Download size={16} /> {t.pricePage.download}
          </a>
        </div>
        <p className="filter-note">
          {t.pricePage.vat} · {t.pricePage.dated} {PRICE_LIST_DATE} · {filtered.length}{" "}
          {t.pricePage.count}
        </p>

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
