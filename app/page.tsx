import HeroSection from "@/components/HeroSection";
import Skills from "@/components/Skills";
import ProjectCards from "@/components/ProjectCards";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* Untouched HeroSection (maintains original styling) */}
      <HeroSection />

      {/* Bento box skills grid */}
      <Skills />

      {/* Bento box project cards with cursor-spotlight border glow */}
      <ProjectCards />

      {/* Advanced experience timeline with scroll-drawn glow line */}
      <ExperienceTimeline />

      {/* Secure contact card section with PII click-to-reveal */}
      <ContactSection />
    </main>
  );
}
