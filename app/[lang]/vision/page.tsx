import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { isValidLocale, languageAlternates } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getVisionProjects } from "@/data/vision/vision";
import VisionView from "./VisionView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    title: meta.visionTitle,
    description: meta.visionDescription,
    alternates: languageAlternates(lang, "/vision"),
  };
}

export default async function VisionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <LanguageSwitcher lang={lang} label={dict.nav.language} />
      <VisionView lang={lang} t={dict.vision} visionProjects={getVisionProjects(lang)} />
    </>
  );
}
