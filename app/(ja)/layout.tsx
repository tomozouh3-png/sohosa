import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Script from "next/script";
import { geistMono, geistSans } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n";
import { ADSENSE_CLIENT_ID, buildMetadata } from "@/lib/site";
import "../globals.css";

const dict = getDictionary("ja");

export const metadata: Metadata = buildMetadata(dict);

export default function JaRootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={dict.htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {ADSENSE_CLIENT_ID && (
          <Script
            async
            strategy="beforeInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
