import { AboutSection } from "@/components/about-section";
import { DnaTool } from "@/components/dna-tool";
import { SiteFooter } from "@/components/site-footer";
import type { Dictionary } from "@/lib/i18n";
import { buildJsonLd } from "@/lib/site";

export function HomePage({ dict, initialSeq }: { dict: Dictionary; initialSeq: string }) {
  const jsonLd = buildJsonLd(dict);

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-12 dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DnaTool locale={dict.locale} initialSeq={initialSeq} />
      <AboutSection dict={dict} />
      <SiteFooter dict={dict} />
    </div>
  );
}
