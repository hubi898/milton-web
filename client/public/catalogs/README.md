# PDF katalozi — kako dodati novi

Aktuelni MS Fiting cenovnik: `cenovnik-ms-fiting-2026.pdf` (21.09.2026).
Styron proizvodni katalog je eksterni PDF (`https://www.styron.hu/docs/catalogs/catalogue_2025_HU_GB_SK_RO_HR_RU.pdf`).

1. Stavite PDF u `client/public/catalogs/` (npr. `ms-fiting-2027.pdf`)
2. Otvorite `client/src/data/catalogs.ts`
3. Ili ažurirajte postojeći unos (`pdf: "/catalogs/ms-fiting-2027.pdf"`), ili dodajte novi objekat u niz

Primer:

```ts
{
  id: "cenovnik-ms-2026",
  year: "2026",
  category: "cenovnik",
  brand: "MILTON",
  pdf: "/catalogs/cenovnik-ms-fiting-2026.pdf",
  coverImage: "/images/product-nipla.jpg",
  accent: "orange",
  pagesHint: "21.09.2026",
}
```

Naslov i opis idu kroz i18n (`translations.ts`). Čitač (`/katalozi/:id`) automatski omogućava listanje, zoom, fullscreen i preuzimanje.
