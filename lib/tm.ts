import { complement } from "./dna";

const NN_PARAMS: Record<string, { dH: number; dS: number }> = {
  AA: { dH: -7.9, dS: -22.2 },
  TT: { dH: -7.9, dS: -22.2 },
  AT: { dH: -7.2, dS: -20.4 },
  TA: { dH: -7.2, dS: -21.3 },
  CA: { dH: -8.5, dS: -22.7 },
  TG: { dH: -8.5, dS: -22.7 },
  GT: { dH: -8.4, dS: -22.4 },
  AC: { dH: -8.4, dS: -22.4 },
  CT: { dH: -7.8, dS: -21.0 },
  AG: { dH: -7.8, dS: -21.0 },
  GA: { dH: -8.2, dS: -22.2 },
  TC: { dH: -8.2, dS: -22.2 },
  CG: { dH: -10.6, dS: -27.2 },
  GC: { dH: -9.8, dS: -24.4 },
  GG: { dH: -8.0, dS: -19.9 },
  CC: { dH: -8.0, dS: -19.9 },
};

function reverseComplement(seq: string): string {
  return seq
    .split("")
    .reverse()
    .map((base) => complement(base))
    .join("");
}

function initiationTerm(base: string): { dH: number; dS: number } {
  return base === "G" || base === "C" ? { dH: 0.1, dS: -2.8 } : { dH: 2.3, dS: 4.1 };
}

export type TmParams = {
  naMillimolar: number;
  primerNanomolar: number;
};

export const DEFAULT_TM_PARAMS: TmParams = { naMillimolar: 50, primerNanomolar: 250 };

/**
 * Melting temperature via the SantaLucia (1998) unified nearest-neighbor
 * parameters, with monovalent-salt correction. Matches the model used by
 * most standard primer-design tools (assumes no Mg2+ correction).
 */
export function calculateTm(seq: string, params: TmParams = DEFAULT_TM_PARAMS): number {
  const naMolar = params.naMillimolar / 1000;
  const totalStrandMolar = params.primerNanomolar * 1e-9;

  let dH = 0;
  let dS = 0;
  const initStart = initiationTerm(seq[0]);
  const initEnd = initiationTerm(seq[seq.length - 1]);
  dH += initStart.dH + initEnd.dH;
  dS += initStart.dS + initEnd.dS;

  for (let i = 0; i < seq.length - 1; i++) {
    const pair = NN_PARAMS[seq[i] + seq[i + 1]];
    dH += pair.dH;
    dS += pair.dS;
  }

  const R = 1.987; // cal/(mol*K)
  const isSelfComplementary = seq === reverseComplement(seq);
  const x = isSelfComplementary ? 1 : 4;
  const dSSaltCorrected = dS + 0.368 * (seq.length - 1) * Math.log(naMolar);
  const tmKelvin = (dH * 1000) / (dSSaltCorrected + R * Math.log(totalStrandMolar / x));
  return tmKelvin - 273.15;
}

export type GcClamp = {
  level: "good" | "warn";
  gcCount: number;
};

/** Checks the last 5 bases (3' end) for a healthy GC clamp. */
export function checkGcClamp(seq: string): GcClamp {
  const last5 = seq.slice(-5);
  const gcCount = last5.split("").filter((base) => base === "G" || base === "C").length;
  const lastBaseIsGc = seq[seq.length - 1] === "G" || seq[seq.length - 1] === "C";
  const level = !lastBaseIsGc || gcCount === 0 || gcCount >= 4 ? "warn" : "good";
  return { level, gcCount };
}

export type Hairpin = {
  armStart1: number;
  armStart2: number;
  stemLength: number;
};

/**
 * Scans for a self-complementary stem-loop. This is a structural heuristic
 * (longest self-complementary arms with a minimum loop gap), not a full
 * thermodynamic (delta-G) hairpin prediction.
 */
export function findHairpin(seq: string, minStem = 4, minLoop = 3): Hairpin | null {
  const n = seq.length;
  const maxStem = Math.floor((n - minLoop) / 2);

  for (let stemLength = Math.min(8, maxStem); stemLength >= minStem; stemLength--) {
    for (let i = 0; i <= n - 2 * stemLength - minLoop; i++) {
      const arm1 = seq.slice(i, i + stemLength);
      for (let j = i + stemLength + minLoop; j <= n - stemLength; j++) {
        const arm2 = seq.slice(j, j + stemLength);
        if (arm1 === reverseComplement(arm2)) {
          return { armStart1: i, armStart2: j, stemLength };
        }
      }
    }
  }

  return null;
}
