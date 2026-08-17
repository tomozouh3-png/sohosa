import type { Enzyme } from "@/lib/enzymes";
import type { Dictionary } from "@/lib/i18n";
import { ScissorsIcon, TransformIcon } from "./icons";
import { ToggleSwitch } from "./toggle-switch";

type OptionsPanelProps = {
  dict: Dictionary;
  mrnaMode: boolean;
  onMrnaModeChange: (checked: boolean) => void;
  enzymeMode: boolean;
  onEnzymeModeChange: (checked: boolean) => void;
  enzymes: Enzyme[];
  selectedEnzymeNames: string[];
  onToggleEnzyme: (name: string) => void;
};

export function OptionsPanel({
  dict,
  mrnaMode,
  onMrnaModeChange,
  enzymeMode,
  onEnzymeModeChange,
  enzymes,
  selectedEnzymeNames,
  onToggleEnzyme,
}: OptionsPanelProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 rounded-xl bg-blue-50 p-4 dark:bg-blue-950">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white dark:bg-zinc-900">
            <TransformIcon className="h-[18px] w-[18px] text-blue-600 dark:text-blue-400" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-medium text-blue-700 dark:text-blue-300">
              {dict.options.mrnaTitle}
            </span>
            <span className="block text-xs text-blue-700 dark:text-blue-300">
              {dict.options.mrnaSubtitle}
            </span>
          </span>
        </div>
        <ToggleSwitch checked={mrnaMode} onChange={onMrnaModeChange} label={dict.options.mrnaTitle} />
      </div>

      <div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-purple-50 p-4 dark:bg-purple-950">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white dark:bg-zinc-900">
              <ScissorsIcon className="h-[18px] w-[18px] text-purple-600 dark:text-purple-400" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-purple-700 dark:text-purple-300">
                {dict.options.enzymeTitle}
              </span>
              <span className="block text-xs text-purple-700 dark:text-purple-300">
                {dict.options.enzymeSubtitle}
              </span>
            </span>
          </div>
          <ToggleSwitch
            checked={enzymeMode}
            onChange={onEnzymeModeChange}
            label={dict.options.enzymeTitle}
          />
        </div>

        {enzymeMode && (
          <div className="mt-2 flex flex-col gap-2.5 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
            {enzymes.map((enzyme) => (
              <label key={enzyme.name} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedEnzymeNames.includes(enzyme.name)}
                  onChange={() => onToggleEnzyme(enzyme.name)}
                />
                {enzyme.name}{" "}
                <span className="font-mono text-xs text-zinc-400">({enzyme.site})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
