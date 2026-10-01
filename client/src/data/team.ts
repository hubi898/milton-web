import type { TeamId } from "@/i18n/translations";
import { CONTACT_EMAIL, contactPhones } from "@/data/contacts";

export type TeamMember = {
  id: TeamId;
  initials: string;
  phone: string;
  phoneHref: string;
  email: string;
  photo?: string;
};

function phoneFor(id: TeamId) {
  const row = contactPhones.find((p) => p.key === id);
  if (!row) throw new Error(`Missing phone for ${id}`);
  return { phone: row.value, phoneHref: row.href, email: CONTACT_EMAIL };
}

export const team: TeamMember[] = [
  {
    id: "lilla",
    initials: "BL",
    photo: "/images/team/bozso-lilla.jpg",
    ...phoneFor("lilla"),
  },
  {
    id: "ilona",
    initials: "BI",
    photo: "/images/team/bozso-ilona.jpg",
    ...phoneFor("ilona"),
  },
  {
    id: "makra",
    initials: "MÁ",
    photo: "/images/team/makra-akos.jpg",
    ...phoneFor("makra"),
  },
];
