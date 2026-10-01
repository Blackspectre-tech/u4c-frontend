import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Served at /robots.txt (currently a 404 on the live site, which is part of why
 * Google shows "No information is available for this page"). Allows crawling of
 * public pages, blocks private/auth/dashboard routes, and points to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/sign-in",
          "/sign-up",
          "/verify-email",
          "/forgot-password",
          "/edit-password",
          "/edit-password/",
          "/initialize-campaign",
          "/in-app-donation",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
