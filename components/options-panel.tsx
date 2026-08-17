import type { Enzyme } from "@/lib/enzymes";
import { ScissorsIcon, TransformIcon } from "./icons";
import { ToggleSwitch } from "./toggle-switch";

type OptionsPanelProps = {
  mrnaMode: boolean;
  onMrnaModeChange: (checked: boolean) => void;
  enzymeMode: boolean;
  onEnzymeModeChange: (checked: boolean) => void;
  enzymes: Enzyme[];
  selectedEnzymeNames: string[];
  onToggleEnzyme: (name: string) => void;
};

export function OptionsPanel({
  mrnaMode,
  onMrnaModeChange,
  enzymeMode,
  onEnzymeModeChange,
  enzymes,
  selectedEnzymeNames,
  onToggleEnzyme,
}: OptionsPanelProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2.5 rounded-xl bg-blue-50 p-3.5 dark:bg-blue-950">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white dark:bg-zinc-900">
            <TransformIcon className="h-[17px] w-[17px] text-blue-600 dark:text-blue-400" />
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-medium text-blue-700 dark:text-blue-300">
              mRNA表示に切り替える
            </span>
            <span className="block text-[11px] text-blue-700 dark:text-blue-300">
              T→Uに置換して表示
            </span>
          </span>
        </div>
        <ToggleSwitch checked={mrnaMode} onChange={onMrnaModeChange} label="mRNA表示に切り替える" />
      </div>

      <div>
        <div className="flex items-center justify-between gap-2.5 rounded-xl bg-purple-50 p-3.5 dark:bg-purple-950">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white dark:bg-zinc-900">
              <ScissorsIcon className="h-[17px] w-[17px] text-purple-600 dark:text-purple-400" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-medium text-purple-700 dark:text-purple-300">
                制限酵素部位をハイライト
              </span>
              <span className="block text-[11px] text-purple-700 dark:text-purple-300">
                認識配列を色分け表示
              </span>
            </span>
          </div>
          <ToggleSwitch
            checked={enzymeMode}
            onChange={onEnzymeModeChange}
            label="制限酵素部位をハイライト"
          />
        </div>

        {enzymeMode && (
          <div className="mt-2 flex flex-col gap-2 rounded-lg bg-zinc-50 p-3.5 dark:bg-zinc-900">
            {enzymes.map((enzyme) => (
              <label key={enzyme.name} className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={selectedEnzymeNames.includes(enzyme.name)}
                  onChange={() => onToggleEnzyme(enzyme.name)}
                />
                {enzyme.name}{" "}
                <span className="font-mono text-zinc-400">({enzyme.site})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
