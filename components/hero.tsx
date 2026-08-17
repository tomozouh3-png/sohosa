import { DnaIcon } from "./icons";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-blue-600 px-6 py-7 dark:bg-blue-700">
      <svg
        viewBox="0 0 170 60"
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10px] top-1/2 h-[60px] w-[170px] -translate-y-1/2 opacity-30"
      >
        <path
          d="M0,30 C13,6 27,6 40,30 C53,54 67,54 80,30 C93,6 107,6 120,30 C133,54 147,54 170,30"
          stroke="white"
          strokeWidth={2.5}
          fill="none"
        />
        <path
          d="M0,30 C13,54 27,54 40,30 C53,6 67,6 80,30 C93,54 107,54 120,30 C133,6 147,6 170,30"
          stroke="white"
          strokeWidth={2.5}
          fill="none"
        />
        <line x1="20" y1="22" x2="20" y2="38" stroke="white" strokeWidth={2} />
        <line x1="60" y1="22" x2="60" y2="38" stroke="white" strokeWidth={2} />
        <line x1="100" y1="22" x2="100" y2="38" stroke="white" strokeWidth={2} />
        <line x1="140" y1="22" x2="140" y2="38" stroke="white" strokeWidth={2} />
      </svg>

      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/15">
          <DnaIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-medium text-white">DNA相補鎖ツール</h1>
          <p className="mt-0.5 text-sm text-white">
            DNA配列・FASTA形式に対応、逆相補鎖とmRNAを瞬時に計算
          </p>
        </div>
      </div>
    </div>
  );
}
