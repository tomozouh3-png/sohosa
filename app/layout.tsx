import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ADSENSE_CLIENT_ID, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
  },
  title: "DNA相補鎖ツール",
  description:
    "DNA配列やFASTA形式のデータを入力するだけで、逆相補鎖・mRNA・制限酵素認識部位を瞬時に計算できる無料のオンラインツール。",
  openGraph: {
    title: "DNA相補鎖ツール",
    description:
      "DNA配列やFASTA形式のデータを入力するだけで、逆相補鎖・mRNA・制限酵素認識部位を瞬時に計算できる無料のオンラインツール。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DNA相補鎖ツール",
    description:
      "DNA配列やFASTA形式のデータを入力するだけで、逆相補鎖・mRNA・制限酵素認識部位を瞬時に計算できる無料のオンラインツール。",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {ADSENSE_CLIENT_ID && (
        <Script
          async
          strategy="beforeInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      )}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
