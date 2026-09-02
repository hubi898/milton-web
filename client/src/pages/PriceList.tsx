import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { PRICE_LIST_DATE, PRICE_LIST_PDF, priceList, type PriceCategory } from "@/data/priceList";
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

const PAGE_SIZES = [20, 50] as const;
type PageSize = (typeof PAGE_SIZES)[number];

function formatPrice(n: number, lang: string) {
  const locale = lang === "en" ? "en-GB" : lang === "hu" ? "hu-HU" : "sr-RS";
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export default function PriceList() {
  const { lang, t } = useLanguage();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<PriceCategory | "all">("all");
  const [pageSize, setPageSize] = useState<PageSize>(20);
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return priceList.filter((item) => {
      if (cat !== "all" && item.category !== cat) return false;
      if (!needle) return true;
      return item.sku.toLowerCase().includes(needle) || item.name.toLowerCase().includes(needle);
    });
  }, [q, cat]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const from = filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, filtered.length);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  useEffect(() => {
    setPage(1);
  }, [q, cat, pageSize]);

  const go = (n: number) => {
    setPage(n);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SiteShell headerTone="light">
      <section className="page-hero">
        <p className="eyebrow eyebrow--orange">{t.pricePage.eyebrow}</p>
        <h1>
          {t.pricePage.h1}
          <span> {t.pricePage.h1span}</span>
        </h1>
        <p className="page-hero__lead">{t.pricePage.lead}</p>
        <p className="filter-note">
          {t.pricePage.vat} · {t.pricePage.dated} {PRICE_LIST_DATE} · {filtered.length} {t.pricePage.count}
        </p>
      </section>

      <section className="plist">
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
          <div className="plist__size" role="group" aria-label={t.pricePage.perPage}>
            <span>{t.pricePage.perPage}</span>
            {PAGE_SIZES.map((n) => (
              <button
                key={n}
                type="button"
                className={pageSize === n ? "is-active" : ""}
                onClick={() => setPageSize(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <a className="btn btn--blue" href={publicUrl(PRICE_LIST_PDF)} download>
            <Download size={16} /> {t.pricePage.download}
          </a>
        </div>

        <div className="plist__cats" role="tablist" aria-label={t.pricePage.eyebrow}>
          <button
            type="button"
            className={cat === "all" ? "is-active" : ""}
            onClick={() => setCat("all")}
          >
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
          <>
            <div className="plist__grid" ref={gridRef}>
              {paged.map((item) => (
                <article key={item.sku} className="plist-card">
                  <div className="plist-card__img">
                    <img src={publicUrl(item.image)} alt="" />
                  </div>
                  <div className="plist-card__body">
                    <span className="plist-card__sku">{item.sku}</span>
                    <h3>{item.name}</h3>
                    <strong>
                      {formatPrice(item.price, lang)} <small>RSD</small>
                    </strong>
                  </div>
                </article>
              ))}
            </div>

            <div className="plist__pager">
              <p>
                {t.pricePage.showing} {from}–{to} {t.pricePage.of} {filtered.length}
              </p>
              <div>
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => go(safePage - 1)}
                  aria-label={t.pricePage.prev}
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={n === safePage ? "is-active" : ""}
                    onClick={() => go(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={safePage >= pageCount}
                  onClick={() => go(safePage + 1)}
                  aria-label={t.pricePage.next}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}

        <p className="plist__note">{t.pricePage.note}</p>
      </section>
    </SiteShell>
  );
}
