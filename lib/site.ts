/**
 * Update NEXT_PUBLIC_SITE_URL in production so sitemap.ts/robots.ts point at
 * the real deployed domain instead of this placeholder.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
