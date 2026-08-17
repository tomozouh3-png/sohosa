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
