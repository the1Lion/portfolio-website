import type { Metadata } from "next";
// Rendered outside every layout (it never receives `lang`), so it brings its
// own <html>/<body> and styles and always uses the default locale's copy.
import "./globals.css";
import { defaultLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

const t = getDictionary(defaultLocale).notFound;

export const metadata: Metadata = {
  title: t.title,
  description: t.description,
};

export default function GlobalNotFound() {
  return (
    <html lang={defaultLocale} className="dark bg-[#0a0a0a]">
      <body className="bg-[#0a0a0a] text-white antialiased">
        <main className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
          <p className="font-mono text-sm text-neutral-500 mb-2">404</p>
          <h1 className="text-2xl font-semibold mb-3">{t.title}</h1>
          <p className="text-sm text-neutral-400 mb-8">{t.description}</p>
          <a
            href={`/${defaultLocale}`}
            className="px-5 py-2 rounded-full border border-white/15 text-sm hover:bg-white/5 transition"
          >
            {t.backHome}
          </a>
        </main>
      </body>
    </html>
  );
}
