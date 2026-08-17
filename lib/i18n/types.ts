export type Locale = "ja" | "en";

export const LOCALES: Locale[] = ["ja", "en"];

export type Dictionary = {
  locale: Locale;
  htmlLang: string;
  meta: {
    title: string;
    description: string;
  };
  languageSwitch: {
    label: string;
    href: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  input: {
    label: string;
    placeholder: string;
    formatFasta: (count: number) => string;
    formatSingle: string;
    emptyError: string;
  };
  buttons: {
    convert: string;
    sample: string;
    clear: string;
    copy: string;
    copied: string;
    clearHistory: string;
  };
  sample: {
    labelA: string;
    labelB: string;
  };
  options: {
    mrnaTitle: string;
    mrnaSubtitle: string;
    enzymeTitle: string;
    enzymeSubtitle: string;
  };
  history: {
    title: string;
    empty: string;
  };
  result: {
    invalidChars: (label: string, chars: string) => string;
    statLine: (length: number, gcPercent: number) => string;
    rcLabel: string;
    mrnaLabel: string;
    enzymeSectionTitle: string;
    enzymeNone: string;
    auxTitle: string;
    pairingTitle: string;
    ladderOmitted: (limit: number) => string;
    lengthLabel: string;
    lengthValue: (length: number) => string;
    gcLabel: string;
  };
  about: {
    usageTitle: string;
    steps: string[];
    aboutTitle: string;
    aboutBody: string;
    featuresTitle: string;
    features: string[];
  };
  footer: {
    text: string;
    githubLabel: string;
  };
};
