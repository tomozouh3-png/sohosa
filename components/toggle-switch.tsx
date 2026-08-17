export function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[22px] w-[38px] flex-shrink-0 rounded-full transition-colors ${
        checked ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-600"
      }`}
    >
      <span
        className={`absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white transition-all ${
          checked ? "left-[18px]" : "left-0.5"
        }`}
      />
    </button>
  );
}
