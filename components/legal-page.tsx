import type { ReactNode } from "react";

export function LegalPage({
  backHref,
  backLabel,
  title,
  children,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-12 dark:bg-zinc-950">
      <div className="w-full max-w-[760px]">
        <a
          href={backHref}
          className="mb-6 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          {backLabel}
        </a>
        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-sm leading-7 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <h1 className="mb-6 text-xl font-medium text-zinc-900 dark:text-zinc-50">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
