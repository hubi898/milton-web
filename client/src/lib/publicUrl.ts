/** Prefix public assets so GitHub Pages project URLs keep working. */
export function publicUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, "")}`;
}
