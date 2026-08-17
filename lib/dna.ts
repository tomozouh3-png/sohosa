const COMPLEMENT: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };

/** Complements a single uppercase A/T/G/C base. Unknown input is returned unchanged. */
export function complement(base: string): string {
  return COMPLEMENT[base] ?? base;
}

/** Computes the reverse complement (5' -> 3') of an uppercase A/T/G/C sequence. */
export function reverseComplement(seq: string): string {
  return seq.split("").map(complement).reverse().join("");
}

/** GC content as a percentage, rounded to one decimal place. */
export function gcContent(seq: string): number {
  if (seq.length === 0) return 0;
  const gcCount = seq.split("").filter((base) => base === "G" || base === "C").length;
  return Math.round((gcCount / seq.length) * 1000) / 10;
}

/** Converts a reverse-complement DNA sequence to its mRNA equivalent (T -> U). */
export function toMrna(reverseComplementSeq: string): string {
  return reverseComplementSeq.replace(/T/g, "U");
}

/** Counts occurrences of each base in a sequence. */
export function baseComposition(seq: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const base of seq) {
    counts[base] = (counts[base] ?? 0) + 1;
  }
  return counts;
}
