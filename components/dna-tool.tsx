"use client";

import { useMemo, useState } from "react";
import { DEFAULT_ENZYME_NAMES, ENZYME_PRESETS } from "@/lib/enzymes";
import { parseFasta } from "@/lib/fasta";
import { useHistory } from "@/lib/history";
import { getDictionary, type Dictionary, type Locale } from "@/lib/i18n";
import { findInvalidChars } from "@/lib/validate";
import { Hero } from "./hero";
import { HistoryPanel } from "./history-panel";
import { AlertIcon, EraserIcon, RepeatIcon, WandIcon } from "./icons";
import { OptionsPanel } from "./options-panel";
import { ResultCard, type ValidatedRecord } from "./result-card";

function buildSampleSeq(dict: Dictionary): string {
  return `>${dict.sample.labelA}\nATGCCGTAAGCTTGACCTGGA\n>${dict.sample.labelB}\nGGATCCGAATTCAAGCTTCTGCAGGTCGACCCCGGGTCTAGACCATGG`;
}

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

export function DnaTool({ locale, initialSeq }: { locale: Locale; initialSeq: string }) {
  const dict = getDictionary(locale);
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
        ? dict.input.formatFasta(validatedRecords.length)
        : dict.input.formatSingle
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
    setInputText(buildSampleSeq(dict));
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
    <div className="mx-auto w-full max-w-[1240px] overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <Hero dict={dict} />

      <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <div className="mb-2 flex items-center justify-between gap-2">
            <label htmlFor="seq" className="text-sm text-zinc-500">
              {dict.input.label}
            </label>
            {formatLabel && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                {formatLabel}
              </span>
            )}
          </div>
          <textarea
            id="seq"
            rows={7}
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder={dict.input.placeholder}
            className="w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          />

          {isEmptySubmit && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
              <AlertIcon className="h-4 w-4 flex-shrink-0" />
              {dict.input.emptyError}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleConvert}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-[15px] font-medium text-white hover:bg-blue-700"
            >
              <RepeatIcon className="h-4 w-4" />
              {dict.buttons.convert}
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSample}
                className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-3.5 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <WandIcon className="h-4 w-4" />
                {dict.buttons.sample}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-3.5 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <EraserIcon className="h-4 w-4" />
                {dict.buttons.clear}
              </button>
            </div>
          </div>

          <div className="mt-8">
            {validatedRecords?.map((record, index) => (
              <ResultCard
                key={`${record.label}-${index}`}
                dict={dict}
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
            dict={dict}
            mrnaMode={mrnaMode}
            onMrnaModeChange={setMrnaMode}
            enzymeMode={enzymeMode}
            onEnzymeModeChange={setEnzymeMode}
            enzymes={ENZYME_PRESETS}
            selectedEnzymeNames={selectedEnzymeNames}
            onToggleEnzyme={toggleEnzyme}
          />
          <div className="mt-6">
            <HistoryPanel
              dict={dict}
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
