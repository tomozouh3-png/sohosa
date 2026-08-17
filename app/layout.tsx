import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
