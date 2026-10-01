/** Callouts mapped onto styron-house-wide (percent of image width/height). */
import type { PinSku } from "@/i18n/translations";

export type HouseRoom = "bath" | "util" | "garage";

export type HouseCallout = {
  sku: PinSku;
  x: number;
  y: number;
  side?: "left" | "right";
  room: HouseRoom;
  image: string;
};

export const houseCallouts: HouseCallout[] = [
  { sku: "STY-M-70", x: 30, y: 39, side: "left", room: "bath", image: "/images/styron/shower-channel.jpg" },
  { sku: "STY-740", x: 25, y: 45, side: "left", room: "bath", image: "/images/styron/cisterns.jpg" },
  { sku: "STY-654", x: 46, y: 47, side: "right", room: "bath", image: "/images/styron/tray-siphon.jpg" },
  { sku: "STY-536-A-K", x: 46, y: 71, side: "right", room: "util", image: "/images/styron/bath-siphon.jpg" },
  { sku: "STY-530-E-H", x: 33, y: 77, side: "left", room: "util", image: "/images/styron/ac-siphon.jpg" },
  { sku: "STY-090", x: 40, y: 83, side: "right", room: "util", image: "/images/styron/jollyflex.jpg" },
  { sku: "STY-643", x: 69, y: 61, side: "left", room: "garage", image: "/images/styron/wall-fountain.jpg" },
];

export const rooms: { id: HouseRoom; index: string }[] = [
  { id: "bath", index: "01" },
  { id: "util", index: "02" },
  { id: "garage", index: "03" },
];
