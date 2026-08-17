type IconProps = {
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function DnaIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3c0 6 12 12 12 18M18 3c0 6-12 12-12 18" />
      <path d="M8 7h8M7 12h10M6 17h12" />
    </svg>
  );
}

export function RepeatIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M17 2 21 6 17 10" />
      <path d="M3 12v-2a4 4 0 0 1 4-4h14" />
      <path d="M7 22 3 18 7 14" />
      <path d="M21 12v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

export function WandIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m15 4 1.5 1.5M19 8l1.5 1.5M4 20l10-10" />
      <path d="M12 4v2M17 9h2M4.5 12.5 6 14" />
    </svg>
  );
}

export function EraserIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m7 21-4.3-4.3a1 1 0 0 1 0-1.4l9.6-9.6a1 1 0 0 1 1.4 0l6.3 6.3a1 1 0 0 1 0 1.4L13 21" />
      <path d="M22 21H7" />
      <path d="m5 11 6 6" />
    </svg>
  );
}

export function AlertIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21a9 9 0 1 1 0-18c4.6 0 8.5 3 9 7 .3 2.5-1.5 4-3.5 4h-2a1.5 1.5 0 0 0-1 2.6c.4.5.3 1.2-.2 1.6a2 2 0 0 1-1.3.8Z" />
      <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HistoryIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v4h4" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

export function TransformIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 7h11l-3-3M20 17H9l3 3" />
    </svg>
  );
}

export function ScissorsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="m8.5 8.5 10.5 10.5M20.5 4.5 8.4 16.6" />
    </svg>
  );
}

export function ThermometerIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 13.5V4a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0Z" />
      <path d="M12 9h1.5" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 2.1h3.3l-7.2 8.2 8.5 11.6h-6.6l-5.2-6.8-6 6.8H2.4l7.7-8.8L1.9 2.1h6.8l4.7 6.2ZM17.7 20h1.8L6.4 4H4.5Z" />
    </svg>
  );
}
