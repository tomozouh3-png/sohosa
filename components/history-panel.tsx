import type { HistoryItem } from "@/lib/history";
import { HistoryIcon } from "./icons";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HistoryPanel({
  items,
  onSelect,
  onClear,
}: {
  items: HistoryItem[];
  onSelect: (text: string) => void;
  onClear: () => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-1.5">
        <HistoryIcon className="h-4 w-4 text-zinc-500" />
        <span className="text-sm font-medium">入力履歴(最大30件)</span>
      </div>

      {items.length === 0 ? (
        <p className="py-2 text-sm text-zinc-400">まだ履歴がありません</p>
      ) : (
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <button
              key={item.date}
              type="button"
              onClick={() => onSelect(item.text)}
              className="rounded-lg px-3 py-2.5 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <p className="truncate font-mono text-xs text-zinc-900 dark:text-zinc-100">
                {item.text.replace(/\s/g, "").slice(0, 34)}
                {item.text.replace(/\s/g, "").length > 34 ? "…" : ""}
              </p>
              <p className="mt-0.5 text-xs text-zinc-400">{formatDate(item.date)}</p>
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onClear}
        className="mt-3 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        履歴をクリア
      </button>
    </div>
  );
}
