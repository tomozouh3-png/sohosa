import { AboutSection } from "@/components/about-section";
import { DnaTool } from "@/components/dna-tool";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DNA相補鎖ツール",
  description:
    "DNA配列やFASTA形式のデータを入力するだけで、逆相補鎖・mRNA・制限酵素認識部位を瞬時に計算できる無料のオンラインツール。",
  url: SITE_URL,
  applicationCategory: "ScienceApplication",
  operatingSystem: "Any (Web Browser)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
  },
  inLanguage: "ja",
};

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const seqParam = params.seq;
  const initialSeq = Array.isArray(seqParam) ? (seqParam[0] ?? "") : (seqParam ?? "");

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-12 dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DnaTool initialSeq={initialSeq} />
      <AboutSection />
      <SiteFooter />
    </div>
  );
}
