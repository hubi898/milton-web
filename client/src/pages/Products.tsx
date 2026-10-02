import { Link } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Search } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { productFamilies } from "@/data/productFamilies";
import { useLanguage } from "@/i18n/LanguageContext";
import { publicUrl } from "@/lib/publicUrl";

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
  const families = useMemo(() => productFamilies(), []);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpToProducts = () => {
    document.getElementById("ponuda")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return families;
    return families.filter(
      (family) =>
        family.title.toLowerCase().includes(needle) ||
        family.variants.some(
          (v) => v.sku.toLowerCase().includes(needle) || v.name.toLowerCase().includes(needle),
        ),
    );
  }, [families, q]);

  return (
    <SiteShell headerTone="light">
      <section className="range-intro range-intro--lead">
        <h1>{t.products.h1}</h1>
      </section>

      <section className="usp-block">
        <h2>{t.about.whyH2}</h2>
        <ul>
          {t.about.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="partner-panel partner-panel--text">
        <h2>Styron Kft.</h2>
        <p>{t.about.partnerP1}</p>
        <p>{t.about.partnerP2}</p>
        <p>{t.about.partnerP3}</p>
        <Link href="/katalozi/styron" className="link-arrow">
          {t.about.partnerLink} <ArrowRight size={16} />
        </Link>
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
                    <h3>{family.title}</h3>
                    <strong>
                      {formatPrice(from, lang)} <small>RSD</small>
                    </strong>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        <p className="plist__note">{t.pricePage.note}</p>
      </section>

      <button
        type="button"
        className={`scroll-down ${atTop ? "is-visible" : ""}`}
        onClick={jumpToProducts}
        aria-label={t.nav.products}
        tabIndex={atTop ? 0 : -1}
      >
        <ArrowDown size={20} />
      </button>
    </SiteShell>
  );
}
