import type { Dictionary } from "@/lib/i18n";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mx-auto w-full max-w-[1240px] px-2 py-8 text-center text-xs text-zinc-400">
      <p>
        {dict.footer.text}{" "}
        <a
          href="https://github.com/tomozouh3-png/sohosa"
          className="underline hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          {dict.footer.githubLabel}
        </a>
        .
      </p>
      <p className="mt-2">
        <a href={dict.footer.privacyHref} className="underline hover:text-zinc-600 dark:hover:text-zinc-300">
          {dict.footer.privacyLabel}
        </a>
      </p>
    </footer>
  );
}
