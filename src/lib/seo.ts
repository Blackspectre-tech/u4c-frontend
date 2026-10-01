import type { Metadata } from "next";

/**
 * Single source of truth for the site's SEO identity.
 *
 * The primary/canonical domain is the hyphenated apex `united-4-change.org`
 * (no `www`). Every SEO signal — canonical URLs, Open Graph, sitemap, robots,
 * structured data — must point here so Google consolidates all authority onto
 * one domain instead of splitting it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://united-4-change.org"
).replace(/\/$/, "");

export const SITE_NAME = "United4Change";
export const SITE_LEGAL_NAME = "United For Change";

export const DEFAULT_TITLE = "United4Change — Transparent Blockchain Donations for Africa";

export const DEFAULT_DESCRIPTION =
  "United4Change is a digital donation platform that connects global donors directly to grassroots projects across Africa. Using blockchain-powered vaults and milestone-based funding, we ensure transparency, traceability, and trust.";

export const DEFAULT_KEYWORDS = [
  "digital donation platform",
  "blockchain donations",
  "transparent donations",
  "milestone-based funding",
  "Africa grassroots projects",
  "crypto donations",
  "decentralized giving",
  "real-time impact tracking",
  "social impact funding",
  "United4Change",
];

/**
 * Build page-level metadata that inherits the site defaults while letting each
 * route supply a unique title, description and canonical path — the three
 * things Google weighs most per-page.
 */
export function pageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  noindex = false,
  images,
}: {
  title: string;
  description?: string;
  path?: string;
  noindex?: boolean;
  images?: string[];
}): Metadata {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: images ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images ?? undefined,
    },
  };
}

/**
 * Organization structured data (JSON-LD). This is what powers a knowledge
 * panel and disambiguates United4Change from the similarly-named (unrelated)
 * `united4change.org` NGO in search results. Fill in the socials/contact as
 * they become available — more accurate fields = stronger entity signal.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE_LEGAL_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/u4c-512x512.png`,
    description: DEFAULT_DESCRIPTION,
    // TODO: replace with your verified profiles so Google links them to the entity.
    sameAs: [
      // "https://twitter.com/...",
      // "https://www.linkedin.com/company/...",
      // "https://www.instagram.com/...",
    ],
  };
}
