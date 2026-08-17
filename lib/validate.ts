/**
 * Returns the set of distinct characters (uppercased) in `seq` that are not
 * A, T, G, or C. An empty array means the sequence is valid DNA.
 */
export function findInvalidChars(seq: string): string[] {
  const invalid = seq.toUpperCase().replace(/[ATGC]/g, "");
  return Array.from(new Set(invalid.split("").filter(Boolean)));
}
