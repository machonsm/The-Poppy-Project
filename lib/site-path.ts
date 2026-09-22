const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteBasePath = configuredBasePath === "/"
  ? ""
  : configuredBasePath.replace(/\/$/, "");

/** Prefix a root-relative URL when GitHub Pages serves the site below /owner/repository/. */
export function sitePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (siteBasePath && (path === siteBasePath || path.startsWith(`${siteBasePath}/`))) return path;
  return `${siteBasePath}${path}`;
}

export function isSiteHome(pathname: string) {
  return pathname === `${siteBasePath}/`
    || pathname === siteBasePath
    || pathname === `${siteBasePath}/en`
    || pathname === `${siteBasePath}/en/`;
}
