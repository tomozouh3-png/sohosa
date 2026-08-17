import type { Dictionary } from "./types";

const description =
  "Paste a DNA sequence or FASTA data and instantly get the reverse complement, mRNA, and restriction site highlights. Free, no sign-up, runs entirely in your browser.";

export const en: Dictionary = {
  locale: "en",
  htmlLang: "en",
  meta: {
    title: "DNA Complement Tool",
    description,
  },
  languageSwitch: {
    label: "日本語",
    href: "/",
  },
  hero: {
    title: "DNA Complement Tool",
    subtitle: "Reverse complement and mRNA in an instant, with FASTA support",
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
  },
  about: {
    usageTitle: "How to use it",
    steps: [
      "Paste a DNA sequence (A, T, G, C) or FASTA-formatted text into the input box",
      "Click \"Convert\"",
      "See the reverse complement (5'→3'), length, GC content, mRNA view, and restriction sites",
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
      "Shows sequence length, GC content, and base composition",
      "Saves input history locally in your browser — sequences are never sent to a server",
    ],
  },
  footer: {
    text: "DNA Complement Tool is open source. Bug reports and feature requests are welcome on",
    githubLabel: "GitHub",
  },
};
