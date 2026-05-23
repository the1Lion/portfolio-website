import HeroSection from "@/components/HeroSection";
import Skills from "@/components/Skills";
import ProjectCards from "@/components/ProjectCards";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactSection from "@/components/ContactSection";
import FloatingNav from "@/components/FloatingNav";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-[100dvh] flex flex-col flex-1 relative">
      {/* Immersive global background ambient glows (floating nebulae) */}
      <div className="absolute top-[12%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-950/10 blur-[150px] pointer-events-none z-[-10]" />
      <div className="absolute top-[32%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-violet-950/8 blur-[160px] pointer-events-none z-[-10]" />
      <div className="absolute top-[55%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-950/5 blur-[130px] pointer-events-none z-[-10]" />
      <div className="absolute top-[75%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-indigo-950/8 blur-[140px] pointer-events-none z-[-10]" />
      <div className="absolute top-[90%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-violet-950/6 blur-[120px] pointer-events-none z-[-10]" />

      {/* Floating navigation system (scroll spy) */}
      <FloatingNav />

      {/* Untouched HeroSection (maintains original styling) */}
      <HeroSection />

      {/* Bento box skills grid */}
      <Skills />

      {/* Advanced experience timeline with scroll-drawn glow line */}
      <ExperienceTimeline />

      {/* Bento box project cards with cursor-spotlight border glow */}
      <ProjectCards />

      {/* Secure contact card section with PII click-to-reveal */}
      <ContactSection />
    </main>
  );
}
