import { siteBasePath, sitePath } from "@/lib/site-path";

export type PoppyLanguage = "pl" | "en";

const localizedRoutes = [
  { pl: "/", en: "/en/" },
  { pl: "/artykuly/", en: "/en/articles/" },
  { pl: "/materialy/", en: "/en/resources/" },
  { pl: "/o-nas/", en: "/en/about/" },
  { pl: "/podcast/", en: "/en/podcast/" }
] as const;

function normalizePath(pathname: string) {
  let path = pathname;
  if (siteBasePath && (path === siteBasePath || path.startsWith(`${siteBasePath}/`))) {
    path = path.slice(siteBasePath.length) || "/";
  }
  if (!path.endsWith("/")) path += "/";
  return path;
}

export function languageFromPath(pathname: string): PoppyLanguage {
  return normalizePath(pathname).startsWith("/en/") ? "en" : "pl";
}

export function languageHome(language: PoppyLanguage) {
  return sitePath(language === "en" ? "/en/" : "/");
}

export function localizedPath(pathname: string, language: PoppyLanguage) {
  const normalized = normalizePath(pathname);
  const route = localizedRoutes.find(item => item.pl === normalized || item.en === normalized);
  return sitePath(route?.[language] ?? (language === "en" ? "/en/" : "/"));
}
