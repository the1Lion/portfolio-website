// Locale metadata shared by the server (proxy, layouts) and client components.
// Kept free of dictionary imports so client bundles never pull in all three
// languages' copy.

export const locales = ["en", "de", "ar"] as const;
export type Lang = (typeof locales)[number];
export const defaultLocale: Lang = "en";

/** Cookie that remembers the visitor's explicit language choice. */
export const LANG_COOKIE = "portfolio-lang";

export const localeNames: Record<Lang, string> = {
  en: "English",
  de: "Deutsch",
  ar: "العربية",
};

export function isValidLocale(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}

export function isRtl(lang: Lang): boolean {
  return lang === "ar";
}

/** A string translated into every locale. */
export type Localized = Record<Lang, string>;

/** Text that is either the same in every language (names, tech) or translated. */
export type Text = string | Localized;

export function tx(text: Text, lang: Lang): string {
  return typeof text === "string" ? text : text[lang];
}

/** Replaces `{name}` placeholders in dictionary strings. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}

/**
 * Canonical URL plus hreflang alternates for a page, where `path` is the part
 * below the locale segment ("" for the home page, "/vision").
 */
export function languageAlternates(lang: Lang, path: string) {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}
