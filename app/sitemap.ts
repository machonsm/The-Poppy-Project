import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const pages = [
  { pl: "/", en: "/en/", priority: 1, changeFrequency: "weekly" as const },
  { pl: "/artykuly/", en: "/en/articles/", priority: 0.9, changeFrequency: "weekly" as const },
  { pl: "/materialy/", en: "/en/resources/", priority: 0.8, changeFrequency: "monthly" as const },
  { pl: "/podcast/", en: "/en/podcast/", priority: 0.8, changeFrequency: "monthly" as const },
  { pl: "/o-nas/", en: "/en/about/", priority: 0.7, changeFrequency: "monthly" as const }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.flatMap(page => {
    const plUrl = `${SITE_URL}${page.pl}`;
    const enUrl = `${SITE_URL}${page.en}`;
    const alternates = { languages: { "pl-PL": plUrl, en: enUrl, "x-default": plUrl } };
    return [
      { url: plUrl, lastModified, changeFrequency: page.changeFrequency, priority: page.priority, alternates },
      { url: enUrl, lastModified, changeFrequency: page.changeFrequency, priority: page.priority, alternates }
    ];
  });
}
