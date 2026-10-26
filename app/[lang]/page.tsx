import HeroSection from "@/components/HeroSection";
import Skills from "@/components/Skills";
import ProjectCards from "@/components/ProjectCards";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactSection from "@/components/ContactSection";
import FloatingNav from "@/components/FloatingNav";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getContent } from "@/data/data";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const content = getContent(lang);

  // overflow-x-clip on <main>: the ambient glow blobs below are positioned past
  // the right edge (right-[-15%] etc.). Without clipping, they widen the document
  // and mobile browsers grow the layout viewport to fit — which pushes
  // position:fixed UI (the bottom nav dock) off-screen and lets the page pan
  // sideways. `clip` (not `hidden`) is used so it doesn't create a scroll
  // container, which would break the sticky hero panel.
  return (
    <main className="bg-[#0a0a0a] min-h-[100dvh] flex flex-col flex-1 relative overflow-x-clip">
      {/* Immersive global background ambient glows (floating nebulae) */}
      <div className="absolute top-[12%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-950/10 blur-[150px] pointer-events-none z-[-10]" />
      <div className="absolute top-[32%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-violet-950/8 blur-[160px] pointer-events-none z-[-10]" />
      <div className="absolute top-[55%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-950/5 blur-[130px] pointer-events-none z-[-10]" />
      <div className="absolute top-[75%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-indigo-950/8 blur-[140px] pointer-events-none z-[-10]" />
      <div className="absolute top-[90%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-violet-950/6 blur-[120px] pointer-events-none z-[-10]" />

      {/* Floating navigation system (scroll spy) */}
      <FloatingNav labels={dict.nav} />

      <LanguageSwitcher lang={lang} label={dict.nav.language} />

      {/* Untouched HeroSection (maintains original styling) */}
      <HeroSection lang={lang} t={dict.hero} name={content.personalInfo.name} />

      {/* Bento box skills grid */}
      <Skills t={dict.skills} skills={content.skills} />

      {/* Advanced experience timeline with scroll-drawn glow line */}
      <ExperienceTimeline t={dict.journey} experience={content.experience} education={content.education} />

      {/* Bento box project cards with cursor-spotlight border glow */}
      <ProjectCards t={dict.projects} projects={content.projects} />

      {/* Secure contact card section with PII click-to-reveal */}
      <ContactSection t={dict.contact} personalInfo={content.personalInfo} />
    </main>
  );
}
