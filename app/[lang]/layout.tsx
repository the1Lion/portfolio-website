import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isValidLocale, isRtl, languageAlternates, type Lang } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

const SITE_URL = "https://portfolio.silicortex.de";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const { meta } = getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: ["portfolio", "developer", "full stack", "computer scientist", "Next.js", "React", "Silicortex"],
    alternates: languageAlternates(lang, ""),
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      type: "website",
      locale: lang,
    },
  };
}

// Playfair, Lora and JetBrains Mono have no Arabic glyphs, so the Arabic
// site also loads Readex Pro (the same Arabic face silicortex.de uses);
// globals.css puts it in front of every font stack under :lang(ar).
const LATIN_FONTS =
  "family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500";
const ARABIC_FONTS = "family=Readex+Pro:wght@300;400;500;600;700";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const fonts = (lang as Lang) === "ar" ? `${LATIN_FONTS}&${ARABIC_FONTS}` : LATIN_FONTS;

  return (
    <html lang={lang} dir={isRtl(lang) ? "rtl" : "ltr"} className="dark bg-[#0a0a0a]">
      <body className="bg-[#0a0a0a] text-white antialiased min-h-[100dvh] flex flex-col">
        {/*
         * React 19 supports <link rel="stylesheet"> directly in JSX.
         * This avoids next/font/google injecting @import url() into the CSS
         * output, which breaks Tailwind v4's PostCSS pipeline.
         * See: https://react.dev/reference/react-dom/components/link
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?${fonts}&display=swap`}
        // React 19 hoists this to <head> and handles de-duplication
        />
        {children}
      </body>
    </html>
  );
}
