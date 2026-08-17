export type Enzyme = {
  name: string;
  site: string;
};

export const ENZYME_PRESETS: Enzyme[] = [
  { name: "EcoRI", site: "GAATTC" },
  { name: "BamHI", site: "GGATCC" },
  { name: "HindIII", site: "AAGCTT" },
  { name: "XhoI", site: "CTCGAG" },
  { name: "NotI", site: "GCGGCCGC" },
];

/** Enzymes checked by default when the highlight feature is first enabled. */
export const DEFAULT_ENZYME_NAMES = ["EcoRI", "BamHI", "HindIII"];

/** Finds every (possibly overlapping) occurrence of each enzyme's recognition site in `seq`. */
export function findSites(seq: string, enzymes: Enzyme[]): Map<string, number[]> {
  const result = new Map<string, number[]>();

  for (const enzyme of enzymes) {
    const positions: number[] = [];
    let index = seq.indexOf(enzyme.site);
    while (index !== -1) {
      positions.push(index);
      index = seq.indexOf(enzyme.site, index + 1);
    }
    result.set(enzyme.name, positions);
  }

  return result;
}
