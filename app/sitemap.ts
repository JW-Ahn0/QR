import { routing } from "@/i18n/routing";
import { getSiteOrigin } from "@/lib/site-url";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  const now = new Date();
  const staticPaths = ["", "/privacy", "/terms", "/about", "/contact", "/faq", "/guide"] as const;

  return routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency: (path === "" ? "weekly" : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority:
        path === ""
          ? locale === routing.defaultLocale
            ? 1
            : 0.9
          : 0.6,
    })),
  );
}
