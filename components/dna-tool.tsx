"use client";

import { useMemo, useState } from "react";
import { DEFAULT_ENZYME_NAMES, ENZYME_PRESETS } from "@/lib/enzymes";
import { parseFasta } from "@/lib/fasta";
import { useHistory } from "@/lib/history";
import { findInvalidChars } from "@/lib/validate";
import { Hero } from "./hero";
import { HistoryPanel } from "./history-panel";
import { AlertIcon, EraserIcon, RepeatIcon, WandIcon } from "./icons";
import { OptionsPanel } from "./options-panel";
import { ResultCard, type ValidatedRecord } from "./result-card";

const SAMPLE_SEQ =
  ">配列A (サンプル配列)\nATGCCGTAAGCTTGACCTGGA\n>配列B (制限酵素サイト確認用)\nGGATCCGAATTCAAGCTTCTGCAGGTCGACCCCGGGTCTAGACCATGG";

function updateShareUrl(text: string) {
  const params = new URLSearchParams(window.location.search);
  if (text.trim()) {
    params.set("seq", text);
  } else {
    params.delete("seq");
  }
  const query = params.toString();
  window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
}

export function DnaTool({ initialSeq }: { initialSeq: string }) {
  const [inputText, setInputText] = useState(initialSeq);
  const [submittedText, setSubmittedText] = useState<string | null>(
    initialSeq ? initialSeq : null
  );
  const [mrnaMode, setMrnaMode] = useState(false);
  const [enzymeMode, setEnzymeMode] = useState(false);
  const [selectedEnzymeNames, setSelectedEnzymeNames] = useState<string[]>(DEFAULT_ENZYME_NAMES);
  const { history, addItem: addHistoryItem, clear: clearHistoryItems } = useHistory();

  const validatedRecords: ValidatedRecord[] | null = useMemo(() => {
    if (submittedText === null) return null;
    if (!submittedText.trim()) return [];
    return parseFasta(submittedText).map((record) => {
      const raw = record.raw.toUpperCase();
      return { label: record.label, raw, invalid: findInvalidChars(raw) };
    });
  }, [submittedText]);

  const isEmptySubmit = submittedText !== null && submittedText.trim().length === 0;
  const isFasta = submittedText !== null && /(^|\n)>/.test(submittedText.trim());
  const formatLabel =
    validatedRecords && validatedRecords.length > 0
      ? isFasta
        ? `FASTA形式(${validatedRecords.length}配列)を検出`
        : "単一配列として認識"
      : null;

  const selectedEnzymes = ENZYME_PRESETS.filter((enzyme) =>
    selectedEnzymeNames.includes(enzyme.name)
  );

  function handleConvert() {
    setSubmittedText(inputText);
    addHistoryItem(inputText);
    updateShareUrl(inputText);
  }

  function handleSample() {
    setInputText(SAMPLE_SEQ);
  }

  function handleClear() {
    setInputText("");
    setSubmittedText(null);
  }

  function handleSelectHistory(text: string) {
    setInputText(text);
    setSubmittedText(text);
    addHistoryItem(text);
    updateShareUrl(text);
  }

  function handleClearHistory() {
    clearHistoryItems();
  }

  function toggleEnzyme(name: string) {
    setSelectedEnzymeNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  return (
    <div className="mx-auto max-w-[900px] overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <Hero />

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label htmlFor="seq" className="text-[13px] text-zinc-500">
              DNA配列(A, T, G, C) / FASTA形式
            </label>
            {formatLabel && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                {formatLabel}
              </span>
            )}
          </div>
          <textarea
            id="seq"
            rows={6}
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder={">配列名(任意)\nATGCCGTAAGCTTG"}
            className="w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 font-mono text-[13px] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          />

          {isEmptySubmit && (
            <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
              <AlertIcon className="h-4 w-4 flex-shrink-0" />
              配列が入力されていません
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleConvert}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <RepeatIcon className="h-[15px] w-[15px]" />
              相補鎖に変換する
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSample}
                className="flex items-center gap-1 rounded-md border border-zinc-200 px-3 py-1.5 text-[13px] hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <WandIcon className="h-3.5 w-3.5" />
                サンプル配列を入力
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 rounded-md border border-zinc-200 px-3 py-1.5 text-[13px] hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <EraserIcon className="h-3.5 w-3.5" />
                クリア
              </button>
            </div>
          </div>

          <div className="mt-6">
            {validatedRecords?.map((record, index) => (
              <ResultCard
                key={`${record.label}-${index}`}
                record={record}
                mrnaMode={mrnaMode}
                enzymeMode={enzymeMode}
                selectedEnzymes={selectedEnzymes}
              />
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <OptionsPanel
            mrnaMode={mrnaMode}
            onMrnaModeChange={setMrnaMode}
            enzymeMode={enzymeMode}
            onEnzymeModeChange={setEnzymeMode}
            enzymes={ENZYME_PRESETS}
            selectedEnzymeNames={selectedEnzymeNames}
            onToggleEnzyme={toggleEnzyme}
          />
          <div className="mt-5">
            <HistoryPanel
              items={history}
              onSelect={handleSelectHistory}
              onClear={handleClearHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
