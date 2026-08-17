"use client";

import { useState, type ReactNode } from "react";
import { baseComposition, gcContent, reverseComplement, toMrna } from "@/lib/dna";
import { findSites, type Enzyme } from "@/lib/enzymes";
import type { Dictionary } from "@/lib/i18n";
import { calculateTm, checkGcClamp, findHairpin, type TmParams } from "@/lib/tm";
import { BasePill } from "./base-pill";
import { AlertIcon, CheckIcon, CopyIcon, DnaIcon, PaletteIcon, ThermometerIcon } from "./icons";

const LADDER_LIMIT = 80;
const MIN_TM_LENGTH = 8;
const BASE_ORDER = ["A", "T", "U", "G", "C"];
const COMPLEMENT: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };

const BASE_BG: Record<string, string> = {
  A: "bg-blue-600",
  T: "bg-purple-600",
  U: "bg-purple-600",
  G: "bg-green-600",
  C: "bg-amber-500",
};

const ENZYME_HIGHLIGHT: Record<string, string> = {
  EcoRI: "bg-blue-600 text-white",
  BamHI: "bg-purple-600 text-white",
  HindIII: "bg-amber-500 text-white",
  XhoI: "bg-green-600 text-white",
  NotI: "bg-red-600 text-white",
};

const ENZYME_BADGE: Record<string, string> = {
  EcoRI: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  BamHI: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  HindIII: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  XhoI: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  NotI: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export type ValidatedRecord = {
  label: string;
  raw: string;
  invalid: string[];
};

function renderHighlighted(
  seq: string,
  enzymes: Enzyme[],
  siteMap: Map<string, number[]>
): ReactNode[] {
  const marks: (number | null)[] = new Array(seq.length).fill(null);
  enzymes.forEach((enzyme, enzymeIndex) => {
    for (const pos of siteMap.get(enzyme.name) ?? []) {
      for (let k = pos; k < pos + enzyme.site.length; k++) marks[k] = enzymeIndex;
    }
  });

  const nodes: ReactNode[] = [];
  let i = 0;
  while (i < seq.length) {
    const mark = marks[i];
    let j = i;
    while (j < seq.length && marks[j] === mark) j++;
    const chunk = seq.slice(i, j);
    if (mark === null) {
      nodes.push(chunk);
    } else {
      const enzyme = enzymes[mark];
      nodes.push(
        <span
          key={i}
          title={`${enzyme.name} (${enzyme.site})`}
          className={`rounded px-0.5 font-medium ${ENZYME_HIGHLIGHT[enzyme.name] ?? "bg-zinc-500 text-white"}`}
        >
          {chunk}
        </span>
      );
    }
    i = j;
  }
  return nodes;
}

function renderHairpinHighlight(
  seq: string,
  hairpin: { armStart1: number; armStart2: number; stemLength: number }
): ReactNode[] {
  const nodes: ReactNode[] = [];
  let i = 0;
  while (i < seq.length) {
    const inArm1 = i >= hairpin.armStart1 && i < hairpin.armStart1 + hairpin.stemLength;
    const inArm2 = i >= hairpin.armStart2 && i < hairpin.armStart2 + hairpin.stemLength;
    let j = i + 1;
    while (j < seq.length) {
      const jInArm1 = j >= hairpin.armStart1 && j < hairpin.armStart1 + hairpin.stemLength;
      const jInArm2 = j >= hairpin.armStart2 && j < hairpin.armStart2 + hairpin.stemLength;
      if ((jInArm1 || jInArm2) !== (inArm1 || inArm2)) break;
      j++;
    }
    const chunk = seq.slice(i, j);
    nodes.push(
      inArm1 || inArm2 ? (
        <span key={i} className="rounded bg-red-600 px-0.5 font-medium text-white">
          {chunk}
        </span>
      ) : (
        chunk
      )
    );
    i = j;
  }
  return nodes;
}

export function ResultCard({
  dict,
  record,
  mrnaMode,
  enzymeMode,
  selectedEnzymes,
  tmMode,
  tmParams,
}: {
  dict: Dictionary;
  record: ValidatedRecord;
  mrnaMode: boolean;
  enzymeMode: boolean;
  selectedEnzymes: Enzyme[];
  tmMode: boolean;
  tmParams: TmParams;
}) {
  if (record.invalid.length > 0) {
    return (
      <div className="mb-3.5 flex items-center gap-2 rounded-xl bg-red-50 px-5 py-4 dark:bg-red-950">
        <AlertIcon className="h-4 w-4 flex-shrink-0 text-red-600 dark:text-red-400" />
        <span className="text-sm text-red-700 dark:text-red-300">
          {dict.result.invalidChars(record.label, record.invalid.join(", "))}
        </span>
      </div>
    );
  }

  return (
    <ValidResultCard
      dict={dict}
      record={record}
      mrnaMode={mrnaMode}
      enzymeMode={enzymeMode}
      selectedEnzymes={selectedEnzymes}
      tmMode={tmMode}
      tmParams={tmParams}
    />
  );
}

function ValidResultCard({
  dict,
  record,
  mrnaMode,
  enzymeMode,
  selectedEnzymes,
  tmMode,
  tmParams,
}: {
  dict: Dictionary;
  record: ValidatedRecord;
  mrnaMode: boolean;
  enzymeMode: boolean;
  selectedEnzymes: Enzyme[];
  tmMode: boolean;
  tmParams: TmParams;
}) {
  const [copied, setCopied] = useState(false);

  const baseArr = record.raw.split("");
  const rc = reverseComplement(record.raw);
  const gcPct = gcContent(record.raw);
  const displayText = mrnaMode ? toMrna(rc) : rc;
  const displayArr = displayText.split("");
  const outputLabel = mrnaMode ? dict.result.mrnaLabel : dict.result.rcLabel;

  const showEnzyme = enzymeMode && selectedEnzymes.length > 0;
  const siteMap = showEnzyme ? findSites(record.raw, selectedEnzymes) : null;

  const showTm = tmMode;
  const tmEligible = baseArr.length >= MIN_TM_LENGTH;
  const tmValue = tmEligible ? calculateTm(record.raw, tmParams) : null;
  const gcClamp = tmEligible ? checkGcClamp(record.raw) : null;
  const hairpin = tmEligible ? findHairpin(record.raw) : null;

  const composition = baseComposition(displayArr.join(""));
  const orderedBases = BASE_ORDER.filter((base) => composition[base] > 0);
  const showLadder = baseArr.length <= LADDER_LIMIT;

  async function handleCopy() {
    await navigator.clipboard.writeText(displayText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="mb-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[15px] font-medium">
          <DnaIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          {record.label}
        </span>
        <span className="text-sm text-zinc-400">{dict.result.statLine(baseArr.length, gcPct)}</span>
      </div>

      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-base font-medium text-blue-700 dark:text-blue-400">
          {outputLabel}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
          {copied ? dict.buttons.copied : dict.buttons.copy}
        </button>
      </div>
      <div className="mb-4 break-all rounded-lg border-2 border-blue-300 bg-blue-50 px-5 py-4 font-mono text-xl font-medium leading-relaxed tracking-wide dark:border-blue-800 dark:bg-blue-950">
        {displayText}
      </div>

      {showTm && (
        <div className="mb-3.5 border-t border-zinc-100 pt-3.5 dark:border-zinc-800">
          <p className="mb-2 flex items-center gap-1.5 text-xs text-zinc-400">
            <ThermometerIcon className="h-3.5 w-3.5" />
            {dict.result.tmSectionTitle}
          </p>
          {!tmEligible || tmValue === null || gcClamp === null ? (
            <p className="text-sm text-zinc-400">{dict.result.tooShortForTm(MIN_TM_LENGTH)}</p>
          ) : (
            <>
              <div className="mb-2 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-950">
                  <p className="mb-0.5 text-[11px] text-amber-700 dark:text-amber-300">Tm</p>
                  <p className="text-lg font-medium text-amber-700 dark:text-amber-300">
                    {dict.result.tmValue(Math.round(tmValue * 10) / 10)}
                  </p>
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    gcClamp.level === "good"
                      ? "bg-green-50 dark:bg-green-950"
                      : "bg-amber-50 dark:bg-amber-950"
                  }`}
                >
                  <p
                    className={`mb-0.5 text-[11px] ${
                      gcClamp.level === "good"
                        ? "text-green-700 dark:text-green-300"
                        : "text-amber-700 dark:text-amber-300"
                    }`}
                  >
                    {dict.result.gcClampLabel}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      gcClamp.level === "good"
                        ? "text-green-700 dark:text-green-300"
                        : "text-amber-700 dark:text-amber-300"
                    }`}
                  >
                    {gcClamp.level === "good" ? dict.result.gcClampGood : dict.result.gcClampWarn}
                  </p>
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    hairpin ? "bg-red-50 dark:bg-red-950" : "bg-green-50 dark:bg-green-950"
                  }`}
                >
                  <p
                    className={`mb-0.5 text-[11px] ${
                      hairpin
                        ? "text-red-700 dark:text-red-300"
                        : "text-green-700 dark:text-green-300"
                    }`}
                  >
                    {dict.result.hairpinLabel}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      hairpin
                        ? "text-red-700 dark:text-red-300"
                        : "text-green-700 dark:text-green-300"
                    }`}
                  >
                    {hairpin ? `${hairpin.stemLength}bp` : dict.result.hairpinNone}
                  </p>
                </div>
              </div>
              <p className="mb-2 text-xs text-zinc-500">
                {gcClamp.level === "good" ? dict.result.gcClampGoodMsg : dict.result.gcClampWarnMsg}
              </p>
              {hairpin && (
                <>
                  <p className="mb-1.5 text-xs text-zinc-500">
                    {dict.result.hairpinFound(hairpin.stemLength)}
                  </p>
                  <div className="break-all rounded-lg bg-zinc-50 px-3 py-2.5 font-mono text-[13px] leading-loose dark:bg-zinc-800">
                    {renderHairpinHighlight(record.raw, hairpin)}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {showEnzyme && siteMap && (
        <div className="mb-3.5 border-t border-zinc-100 pt-3.5 dark:border-zinc-800">
          <p className="mb-1.5 text-xs text-zinc-400">{dict.result.enzymeSectionTitle}</p>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {selectedEnzymes.map((enzyme) => {
              const count = siteMap.get(enzyme.name)?.length ?? 0;
              return (
                <span
                  key={enzyme.name}
                  className={`rounded-full px-2 py-0.5 text-[11px] ${
                    ENZYME_BADGE[enzyme.name] ?? "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {enzyme.name} {count > 0 ? `×${count}` : dict.result.enzymeNone}
                </span>
              );
            })}
          </div>
          <div className="break-all rounded-lg bg-zinc-50 px-3 py-2.5 font-mono text-[13px] leading-loose dark:bg-zinc-800">
            {renderHighlighted(record.raw, selectedEnzymes, siteMap)}
          </div>
        </div>
      )}

      <div className="border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <p className="mb-2.5 flex items-center gap-1.5 text-xs text-zinc-400">
          <PaletteIcon className="h-3.5 w-3.5" />
          {dict.result.auxTitle}
        </p>

        <div className="mb-3 flex flex-wrap gap-0.5 font-mono text-[11px] leading-loose">
          {displayArr.map((base, i) => (
            <BasePill key={i} base={base} />
          ))}
        </div>

        <div className="mb-2 flex h-2 overflow-hidden rounded-full">
          {orderedBases.map((base) => (
            <div
              key={base}
              style={{ width: `${(composition[base] / displayArr.length) * 100}%` }}
              className={BASE_BG[base]}
            />
          ))}
        </div>
        <div className="mb-3.5 flex flex-wrap gap-3">
          {orderedBases.map((base) => {
            const pct = Math.round((composition[base] / displayArr.length) * 1000) / 10;
            return (
              <div key={base} className="flex items-center gap-1.5 text-xs text-zinc-500">
                <span className={`inline-block h-2 w-2 rounded-full ${BASE_BG[base]}`} />
                {base} {composition[base]}({pct}%)
              </div>
            );
          })}
        </div>

        <p className="mb-2 text-xs text-zinc-400">{dict.result.pairingTitle}</p>
        {showLadder ? (
          <div className="flex flex-wrap gap-1 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
            {baseArr.map((base, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <BasePill base={base} />
                <span className="text-[9px] leading-none text-zinc-300">|</span>
                <BasePill base={COMPLEMENT[base]} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-400">{dict.result.ladderOmitted(LADDER_LIMIT)}</p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
            <p className="mb-1 text-xs text-zinc-400">{dict.result.lengthLabel}</p>
            <p className="text-xl font-medium">{dict.result.lengthValue(baseArr.length)}</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
            <p className="mb-1.5 text-xs text-zinc-400">{dict.result.gcLabel}</p>
            <p className="mb-1.5 text-xl font-medium">{gcPct}%</p>
            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${gcPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
