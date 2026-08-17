const BASE_STYLES: Record<string, string> = {
  A: "bg-blue-600 text-white",
  T: "bg-purple-600 text-white",
  U: "bg-purple-600 text-white",
  G: "bg-green-600 text-white",
  C: "bg-amber-500 text-white",
};

const FALLBACK_STYLE = "bg-zinc-400 text-white";

export function BasePill({ base, size = "sm" }: { base: string; size?: "sm" | "md" }) {
  const sizeClasses =
    size === "md" ? "min-w-[20px] px-1 py-0.5 text-[13px]" : "min-w-[16px] px-0.5 text-[11px]";

  return (
    <span
      className={`inline-flex items-center justify-center rounded font-medium leading-none ${sizeClasses} ${
        BASE_STYLES[base] ?? FALLBACK_STYLE
      }`}
    >
      {base}
    </span>
  );
}
