import type { Dictionary } from "./types";

const description =
  "Paste a DNA sequence or FASTA data and instantly get the reverse complement, mRNA, restriction site highlights, and primer Tm. Free, no sign-up, runs entirely in your browser.";

export const en: Dictionary = {
  locale: "en",
  htmlLang: "en",
  meta: {
    title: "DNA Complement Tool",
    description,
  },
  languageSwitch: {
    label: "Japanese",
    href: "/",
  },
  hero: {
    title: "DNA Complement Tool",
    subtitle: "Reverse complement, mRNA, and primer Tm in an instant, with FASTA support",
  },
  input: {
    label: "DNA sequence (A, T, G, C) / FASTA",
    placeholder: ">sequence name (optional)\nATGCCGTAAGCTTG",
    formatFasta: (count) => `Detected FASTA format (${count} sequences)`,
    formatSingle: "Detected as a single sequence",
    emptyError: "Enter a sequence first",
  },
  buttons: {
    convert: "Convert",
    sample: "Load sample sequence",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    clearHistory: "Clear history",
  },
  sample: {
    labelA: "Sequence A (sample)",
    labelB: "Sequence B (restriction site demo)",
  },
  options: {
    mrnaTitle: "Show as mRNA",
    mrnaSubtitle: "Replaces T with U",
    enzymeTitle: "Highlight restriction sites",
    enzymeSubtitle: "Color-codes recognition sequences",
    tmTitle: "Show primer stats",
    tmSubtitle: "Tm, GC clamp, hairpin",
    concLabel: "Primer conc. (nM)",
  },
  history: {
    title: "History (up to 30)",
    empty: "No history yet",
  },
  result: {
    invalidChars: (label, chars) => `${label}: contains characters other than ATGC (${chars})`,
    statLine: (length, gcPercent) => `${length} bp · GC ${gcPercent}%`,
    rcLabel: "Reverse complement (5' → 3')",
    mrnaLabel: "mRNA (5' → 3')",
    enzymeSectionTitle: "Restriction sites (on the input sequence)",
    enzymeNone: "none",
    auxTitle: "Base coloring, composition & pairing",
    pairingTitle: "Base pairing (top: input strand 5'→3' / bottom: complement 3'→5')",
    ladderOmitted: (limit) => `Sequence is too long to display here (shown up to ${limit} bp)`,
    lengthLabel: "Length",
    lengthValue: (length) => `${length} bp`,
    gcLabel: "GC content",
    tmSectionTitle: "Primer properties (input sequence)",
    tmValue: (celsius) => `${celsius}°C`,
    gcClampLabel: "GC clamp",
    gcClampGood: "Good",
    gcClampGoodMsg: "Healthy G/C clamp at the 3' end",
    gcClampWarn: "Check",
    gcClampWarnMsg: "Uneven G/C at the 3' end (weak binding or mispriming risk)",
    hairpinLabel: "Hairpin",
    hairpinNone: "No hairpin detected",
    hairpinFound: (stemLength) => `Possible hairpin (stem ${stemLength} bp)`,
    tooShortForTm: (min) => `Recommend at least ${min} bp for a reliable Tm`,
  },
  about: {
    usageTitle: "How to use it",
    steps: [
      "Paste a DNA sequence (A, T, G, C) or FASTA-formatted text into the input box",
      "Click \"Convert\"",
      "See the reverse complement (5'→3'), length, GC content, mRNA view, restriction sites, and primer Tm",
    ],
    aboutTitle: "What is a reverse complement?",
    aboutBody:
      "DNA forms a double helix made of two complementary strands. Given one strand, the other can be derived from base-pairing rules (A-T, G-C); reading that complementary strand in the same 5'→3' direction as the original gives you the \"reverse complement.\" It's a routine conversion in molecular biology — used for designing PCR primers, planning cloning steps, and checking restriction sites. This tool computes the reverse complement, mRNA, and restriction sites from your input entirely in the browser.",
    featuresTitle: "Features",
    features: [
      "Accepts plain DNA sequences or FASTA (including multiple records)",
      "Computes the reverse complement (5'→3')",
      "Toggle to view as mRNA (T→U)",
      "Highlights restriction sites (EcoRI, BamHI, HindIII, XhoI, NotI)",
      "Calculates primer Tm, GC clamp, and hairpin risk (nearest-neighbor method)",
      "Shows sequence length, GC content, and base composition",
      "Saves input history locally in your browser — sequences are never sent to a server",
    ],
  },
  footer: {
    text: "DNA Complement Tool is open source. Bug reports and feature requests are welcome on",
    githubLabel: "GitHub",
  },
  share: {
    heading: "Share",
    xLabel: "Share on X",
    copyLabel: "Copy link",
    copiedLabel: "Copied",
    tweetText:
      "DNA Complement Tool — instantly get the reverse complement, mRNA, and restriction sites from any DNA sequence, free and in your browser.",
  },
};
