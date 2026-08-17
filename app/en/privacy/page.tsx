import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy | DNA Complement Tool",
  description:
    "Privacy policy for the DNA Complement Tool: what data is collected, how ads are served, and how analytics work.",
};

export default function Page() {
  return (
    <LegalPage backHref="/en" backLabel="← Back to DNA Complement Tool" title="Privacy policy">
      <p className="mb-6 text-xs text-zinc-400">Last updated: August 17, 2026</p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">
        Sequence data
      </h2>
      <p className="mb-6">
        The DNA Complement Tool never sends the DNA sequences or FASTA data you enter to a
        server. Reverse complement, mRNA, GC content, and Tm calculations all run entirely in
        your browser.
      </p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">
        Input history
      </h2>
      <p className="mb-6">
        The history feature is stored only in your browser&apos;s localStorage (on your device).
        This information is never sent to our servers and is never shared with other users.
      </p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">Analytics</h2>
      <p className="mb-6">
        This site uses Vercel Web Analytics to collect anonymous pageview statistics (pages
        viewed, referrer, country, device type). It doesn&apos;t use cookies and doesn&apos;t
        collect personally identifiable information.
      </p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">
        Advertising
      </h2>
      <p className="mb-6">
        This site uses Google AdSense to serve ads. Google and its partner vendors may use
        cookies to serve ads based on your visits to this site and others. Learn more about how
        Google uses advertising cookies, or opt out of personalized advertising, at{" "}
        <a
          href="https://adssettings.google.com/"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Google Ads Settings
        </a>
        .
      </p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">
        Links to other sites
      </h2>
      <p className="mb-6">
        This site may link to third-party sites such as GitHub. Their privacy practices are not
        covered by this policy.
      </p>

      <h2 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-50">Contact</h2>
      <p>
        Questions about this policy can be raised as an issue on{" "}
        <a
          href="https://github.com/tomozouh3-png/sohosa"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          GitHub
        </a>
        .
      </p>
    </LegalPage>
  );
}
