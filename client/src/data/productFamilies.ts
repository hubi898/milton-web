import { priceList, type PriceCategory, type PriceFamily, type PriceItem } from "@/data/priceList";

export type ProductFamily = {
  id: PriceFamily;
  category: PriceCategory;
  image: string;
  title: string;
  variants: PriceItem[];
};

export const FEATURED_FAMILIES: PriceFamily[] = [
  "holender-ms",
  "koleno",
  "nipla",
  "obujmica",
  "produzivac",
  "poluholender",
];

function familyTitle(names: string[]) {
  if (names.length === 1) return names[0].replace(/\s+/g, " ").trim();
  let i = 0;
  const min = Math.min(...names.map((n) => n.length));
  while (i < min && names.every((n) => n[i] === names[0][i])) i += 1;
  const prefix = names[0]
    .slice(0, i)
    .replace(/[\s\-/x×"”]+$/g, "")
    .trim();
  return prefix || names[0];
}

export function variantSize(name: string, title: string) {
  if (!name.startsWith(title)) return name.replace(/\s+/g, " ").trim();
  const rest = name
    .slice(title.length)
    .replace(/^[\s\-–/]+/, "")
    .replace(/\s+/g, " ")
    .trim();
  return rest || name;
}

export function getProductFamily(id: string) {
  return productFamilies().find((family) => family.id === id);
}

export function productFamilies(): ProductFamily[] {
  const groups = new Map<PriceFamily, PriceItem[]>();
  for (const item of priceList) {
    const list = groups.get(item.family) ?? [];
    list.push(item);
    groups.set(item.family, list);
  }
  return Array.from(groups.values()).map((variants) => ({
    id: variants[0].family,
    category: variants[0].category,
    image: variants[0].image,
    title: familyTitle(variants.map((v) => v.name)),
    variants,
  }));
}
