export const CONTACT_EMAIL = "milton.koko@gmail.com";

export type PhoneKey = "central" | "fax" | "lilla" | "ilona" | "makra";

export type ContactPhone = {
  key: PhoneKey;
  value: string;
  href: string;
  withEmail?: boolean;
};

export const contactPhones: ContactPhone[] = [
  { key: "central", value: "024 / 487 8354", href: "tel:+381244878354" },
  { key: "fax", value: "024 / 487 8088", href: "tel:+381244878088" },
  { key: "lilla", value: "062 / 115 1591", href: "tel:+381621151591", withEmail: true },
  { key: "ilona", value: "+381 63 7439 653", href: "tel:+381637439653", withEmail: true },
  { key: "makra", value: "062/191-42-65", href: "tel:+381621914265", withEmail: true },
];
