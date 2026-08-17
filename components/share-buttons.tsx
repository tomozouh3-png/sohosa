"use client";

import { useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { CheckIcon, CopyIcon, XIcon } from "./icons";

export function ShareButtons({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [copied, setCopied] = useState(false);
  const shareUrl = locale === "ja" ? SITE_URL : `${SITE_URL}/en`;
  const tweetHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    dict.share.tweetText
  )}&url=${encodeURIComponent(shareUrl)}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto mt-6 flex w-full max-w-[1240px] flex-wrap items-center justify-center gap-3">
      <span className="text-sm text-zinc-500">{dict.share.heading}</span>
      <a
        href={tweetHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      >
        <XIcon className="h-3.5 w-3.5" />
        {dict.share.xLabel}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      >
        {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
        {copied ? dict.share.copiedLabel : dict.share.copyLabel}
      </button>
    </div>
  );
}
