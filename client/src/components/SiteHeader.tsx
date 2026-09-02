import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LANGS } from "@/i18n/translations";
import { publicUrl } from "@/lib/publicUrl";

export default function SiteHeader({ tone = "auto" }: { tone?: "auto" | "light" | "dark" }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const isHome = location === "/";
  const dark = tone === "dark" || (tone === "auto" && isHome && !scrolled);

  const nav = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/o-nama" },
    { label: t.nav.catalogs, href: "/katalozi" },
    { label: t.nav.priceList, href: "/cenovnik" },
    { label: t.nav.contact, href: "/kontakt" },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className={`mh ${dark ? "mh--dark" : "mh--light"} ${scrolled ? "mh--solid" : ""}`}>
      <div className="mh__inner">
        <Link href="/" className="mh__brand" aria-label={t.nav.homeAria}>
          <img
            src={
              dark && !scrolled
                ? publicUrl("/images/milton-logo.png")
                : publicUrl("/images/milton-logo-dark.png")
            }
            alt="MILTON d.o.o. export-import"
          />
        </Link>

        <nav className={`mh__nav ${open ? "is-open" : ""}`} aria-label={t.nav.mainAria}>
          {nav.map((item) => {
            const active =
              location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className={active ? "is-active" : ""}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/katalozi" className="mh__cta">
          {t.nav.catalogs}
        </Link>

        <button
          type="button"
          className="mh__burger"
          aria-label={t.nav.menu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="mh__langs" role="group" aria-label={t.nav.language}>
          {LANGS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={lang === item.id ? "is-active" : ""}
              aria-pressed={lang === item.id}
              onClick={() => setLang(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
