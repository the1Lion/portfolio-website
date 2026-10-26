"use client";

import { usePathname } from "next/navigation";
import { locales, localeNames, LANG_COOKIE, type Lang } from "@/lib/i18n";

const shortLabel: Record<Lang, string> = { en: "EN", de: "DE", ar: "ع" };

/** Same path in another language: swaps the leading /en|/de|/ar segment. */
function pathFor(pathname: string, target: Lang) {
  const rest = pathname.split("/").slice(2).join("/");
  return `/${target}${rest ? `/${rest}` : ""}`;
}

/** Remember an explicit choice so proxy.ts stops following Accept-Language. */
function rememberLanguage(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

export default function LanguageSwitcher({ lang, label }: { lang: Lang; label: string }) {
  const pathname = usePathname();

  const switchTo = (e: React.MouseEvent<HTMLAnchorElement>, target: Lang) => {
    e.preventDefault();
    rememberLanguage(target);
    // Full navigation (not router.push): <html lang/dir> and the font set live
    // in the root layout and must be re-rendered. Keep the section anchor.
    window.location.assign(pathFor(pathname, target) + window.location.hash);
  };

  return (
    <nav
      aria-label={label}
      className="fixed top-4 end-4 sm:top-6 sm:end-6 z-[60] flex items-center gap-0.5 p-1 rounded-full bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10 select-none"
    >
      {locales.map((l) => {
        const active = l === lang;
        return (
          <a
            key={l}
            href={pathFor(pathname, l)}
            hrefLang={l}
            lang={l}
            title={localeNames[l]}
            aria-current={active ? "page" : undefined}
            onClick={(e) => (active ? e.preventDefault() : switchTo(e, l))}
            className={`min-w-8 px-2.5 py-1 rounded-full text-center text-[11px] font-[var(--font-jetbrains)] font-bold transition-colors duration-200 ${
              active ? "bg-white text-black" : "text-neutral-400 hover:text-white"
            }`}
          >
            {shortLabel[l]}
          </a>
        );
      })}
    </nav>
  );
}
