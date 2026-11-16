import type { Lang } from "./translations";

export const LEGAL_PATHS: Record<Lang, { terms: string; privacy: string }> = {
  sr: { terms: "/uslovi", privacy: "/privatnost" },
  hu: { terms: "/aszf", privacy: "/adatvedelem" },
  en: { terms: "/terms", privacy: "/privacy" },
};

export function legalKind(path: string): "terms" | "privacy" | null {
  for (const routes of Object.values(LEGAL_PATHS)) {
    if (path === routes.terms) return "terms";
    if (path === routes.privacy) return "privacy";
  }
  return null;
}

export function langFromLegalPath(path: string): Lang | null {
  const langs: Lang[] = ["sr", "hu", "en"];
  for (const lang of langs) {
    const routes = LEGAL_PATHS[lang];
    if (path === routes.terms || path === routes.privacy) return lang;
  }
  return null;
}
