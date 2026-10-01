export type EnquiryItem = {
  familyId: string;
  sku: string;
  title: string;
  size: string;
  name: string;
};

const KEY = "milton-enquiry";

function read(): EnquiryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as EnquiryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: EnquiryItem[]) {
  sessionStorage.setItem(KEY, JSON.stringify(items));
}

export function getEnquiryItems() {
  return read();
}

export function addEnquiryItem(item: EnquiryItem) {
  const items = read().filter((row) => row.sku !== item.sku);
  items.push(item);
  write(items);
  return items;
}

export function removeEnquiryItem(sku: string) {
  const items = read().filter((row) => row.sku !== sku);
  write(items);
  return items;
}

export function clearEnquiry() {
  sessionStorage.removeItem(KEY);
}
