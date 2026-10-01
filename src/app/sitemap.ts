import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Served at /sitemap.xml. Lists only public, indexable pages so Google has an
 * explicit crawl map. Auth/dashboard routes are intentionally excluded (they're
 * also disallowed in robots.ts).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/explore", priority: 0.9, changeFrequency: "daily" },
    { path: "/how-digital-giving-works", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ngo", priority: 0.8, changeFrequency: "weekly" },
    { path: "/contact-us", priority: 0.6, changeFrequency: "yearly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms-of-use", priority: 0.3, changeFrequency: "yearly" },
    { path: "/aml-ctf-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/treasury-policy", priority: 0.3, changeFrequency: "yearly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
