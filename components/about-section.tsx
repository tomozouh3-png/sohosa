import type { Dictionary } from "@/lib/i18n";

export function AboutSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto mt-10 w-full max-w-[1240px] rounded-xl border border-zinc-200 bg-white p-8 text-sm leading-7 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
      <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">
        {dict.about.usageTitle}
      </h2>
      <ol className="mb-8 list-decimal space-y-1 pl-5">
        {dict.about.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">
        {dict.about.aboutTitle}
      </h2>
      <p className="mb-8">{dict.about.aboutBody}</p>

      <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">
        {dict.about.featuresTitle}
      </h2>
      <ul className="list-disc space-y-1 pl-5">
        {dict.about.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </section>
  );
}
