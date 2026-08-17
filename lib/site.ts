import type { Metadata } from "next";
import type { Dictionary } from "./i18n";

/**
 * Update NEXT_PUBLIC_SITE_URL in production so sitemap.ts/robots.ts point at
 * the real deployed domain instead of this placeholder.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/**
 * Google AdSense publisher ID. Not a secret — it's embedded in a public
 * <script src> anyway — so it's a plain constant rather than an env var.
 */
export const ADSENSE_CLIENT_ID = "ca-pub-8012498334257593";

/** Google Search Console site-verification token (URL-prefix property covers both locales). */
export const GOOGLE_SITE_VERIFICATION = "Xt3aP3NtvFsuPMH1odWGOzEp37UoVUtXceNEFO-RyM0";

const LOCALE_PATHS = { ja: "", en: "/en" } as const;

/** Builds the shared metadata object for a locale's root layout. */
export function buildMetadata(dict: Dictionary): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    other: {
      "google-adsense-account": ADSENSE_CLIENT_ID,
    },
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
    },
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${SITE_URL}${LOCALE_PATHS[dict.locale]}`,
      languages: {
        ja: SITE_URL,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      locale: dict.locale === "ja" ? "ja_JP" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

/** Builds the schema.org WebApplication JSON-LD object for a locale's page. */
export function buildJsonLd(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: dict.meta.title,
    description: dict.meta.description,
    url: `${SITE_URL}${LOCALE_PATHS[dict.locale]}`,
    applicationCategory: "ScienceApplication",
    operatingSystem: "Any (Web Browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: dict.locale === "ja" ? "JPY" : "USD",
    },
    inLanguage: dict.htmlLang,
  };
}
