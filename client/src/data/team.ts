import type { TeamId } from "@/i18n/translations";
import { CONTACT_EMAIL, contactPhones } from "@/data/contacts";

export type TeamMember = {
  id: TeamId;
  initials: string;
  phone: string;
  phoneHref: string;
  email: string;
  /** Drop a photo at this path later; cards fall back to initials. */
  photo?: string;
};

function phoneFor(id: TeamId) {
  const row = contactPhones.find((p) => p.key === id);
  if (!row) throw new Error(`Missing phone for ${id}`);
  return { phone: row.value, phoneHref: row.href, email: CONTACT_EMAIL };
}

export const team: TeamMember[] = [
  { id: "bozso", initials: "KB", ...phoneFor("bozso") },
  { id: "bicskei", initials: "KB", ...phoneFor("bicskei") },
  { id: "makra", initials: "MÁ", ...phoneFor("makra") },
];
