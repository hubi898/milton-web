import type { TeamId } from "@/i18n/translations";

export type TeamMember = {
  id: TeamId;
  initials: string;
  /** Drop a photo at this path later; cards fall back to initials. */
  photo?: string;
};

export const team: TeamMember[] = [
  { id: "bozso", initials: "KB" },
  { id: "bicskei", initials: "BK" },
  { id: "makra", initials: "MÁ" },
];
