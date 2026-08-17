import { en } from "./en";
import { ja } from "./ja";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale };
export { LOCALES } from "./types";

const dictionaries: Record<Locale, Dictionary> = { ja, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
