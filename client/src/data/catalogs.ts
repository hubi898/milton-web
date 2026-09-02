/**
 * Katalog registar. Novi PDF: stavi fajl u /public/catalogs/ i dodaj unos ovde.
 * Ako je `pdf` prazan string, prikazuje se "uskoro / dodaj PDF" stanje.
 * Naslov i opis idu kroz i18n (`translations.ts`).
 */
import type { CatalogId } from "@/i18n/translations";

export type Catalog = {
  id: CatalogId;
  year: string;
  category: "katalog" | "cenovnik";
  brand: string;
  /** Relativna putanja u public/, npr. /catalogs/moj.pdf. Ostavi "" dok ne dodas fajl. */
  pdf: string;
  coverImage: string;
  accent: "cobalt" | "orange" | "ink";
  pagesHint?: string;
};

export const catalogs: Catalog[] = [
  {
    id: "styron",
    year: "2025/26",
    category: "katalog",
    brand: "STYRON",
    pdf: "https://www.styron.hu/docs/catalogs/catalogue_2025_HU_GB_SK_RO_HR_RU.pdf",
    coverImage: "/images/styron/shower-channel.jpg",
    accent: "ink",
    pagesHint: "2025/26",
  },
  {
    id: "ms-fiting",
    year: "-",
    category: "katalog",
    brand: "MILTON",
    pdf: "/catalogs/katalog-ms-fiting.pdf",
    coverImage: "/images/product-holender.png",
    accent: "cobalt",
    pagesHint: "PDF",
  },
  {
    id: "cenovnik-ms-2023",
    year: "2023",
    category: "cenovnik",
    brand: "MILTON",
    pdf: "/catalogs/cenovnik-ms-fiting-2023.pdf",
    coverImage: "/images/product-nipla.jpg",
    accent: "orange",
    pagesHint: "April 2023",
  },
];

export function getCatalog(id: string) {
  return catalogs.find((c) => c.id === id);
}
