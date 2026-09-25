export const CONTACT_EMAIL = "milton.koko@gmail.com";

export type PhoneKey = "central" | "fax" | "bozso" | "bicskei" | "makra";

export type ContactPhone = {
  key: PhoneKey;
  value: string;
  href: string;
  withEmail?: boolean;
};

export const contactPhones: ContactPhone[] = [
  { key: "central", value: "024 / 487 8354", href: "tel:+381244878354" },
  { key: "fax", value: "024 / 487 8088", href: "tel:+381244878088" },
  { key: "bozso", value: "063 / 596 774", href: "tel:+38163596774", withEmail: true },
  { key: "bicskei", value: "062/191-42-65", href: "tel:+381621914265", withEmail: true },
  { key: "makra", value: "062/191-42-65", href: "tel:+381621914265", withEmail: true },
];
