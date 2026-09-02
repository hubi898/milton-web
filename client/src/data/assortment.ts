/** Styron asszortiman — design fotók a 2025-ös anyagból. Címek az i18n-ben. */
import type { AssortmentId } from "@/i18n/translations";

export type AssortmentItem = {
  id: AssortmentId;
  image: string;
};

export const assortment: AssortmentItem[] = [
  { id: "floor", image: "/images/styron/floor-drains.jpg" },
  { id: "shower", image: "/images/styron/shower-black.jpg" },
  { id: "siphons", image: "/images/styron/sink-siphon.jpg" },
  { id: "wc", image: "/images/styron/cisterns.jpg" },
  { id: "outdoor", image: "/images/styron/outdoor-channels.jpg" },
  { id: "flex", image: "/images/styron/jollyflex.jpg" },
];
