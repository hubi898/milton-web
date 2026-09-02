# PDF katalozi — kako dodati novi

Aktuelni Styron katalog: `styron-katalog-2025-26.pdf` (2025/26).

1. Stavite PDF u `client/public/catalogs/` (npr. `styron-2024.pdf`)
2. Otvorite `client/src/data/catalogs.ts`
3. Ili ažurirajte postojeći unos (`pdf: "/catalogs/styron-2024.pdf"`), ili dodajte novi objekat u niz

Primer:

```ts
{
  id: "styron-2024",
  title: "STYRON 2024",
  subtitle: "Odvodni sistemi",
  year: "2024",
  category: "katalog",
  brand: "STYRON",
  description: "Novi katalog.",
  pdf: "/catalogs/styron-2024.pdf",
  coverImage: "/images/hero-styron.jpg",
  accent: "ink",
  pagesHint: "PDF katalog",
}
```

Čitač (`/katalozi/:id`) automatski omogućava listanje, zoom, fullscreen i preuzimanje.
