// Server-side only: pages resolve the dictionary and pass the slices client
// components need as props, so one language ships per page.
import type { Lang } from "@/lib/i18n";
import { en, type Dictionary } from "./en";
import { de } from "./de";
import { ar } from "./ar";

export type { Dictionary };

const dictionaries: Record<Lang, Dictionary> = { en, de, ar };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
