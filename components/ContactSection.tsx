"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { personalInfo } from "@/data/data";

export default function ContactSection() {
  const [revealed, setRevealed] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out progress using spring for a buttery-smooth feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Background ghost text parallax (scale and vertical translation)
  const bgScale = useTransform(smoothProgress, [0, 1], [0.95, 1.05]);
  const bgY = useTransform(smoothProgress, [0, 1], [-50, 50]);

  // Portrait parallax (moves opposite to scroll direction for depth)
  const portraitY = useTransform(smoothProgress, [0, 1], [40, -40]);
  const portraitScale = useTransform(smoothProgress, [0, 1], [0.97, 1.03]);

  // Content column parallax (moves slightly to exaggerate depth)
  const contentY = useTransform(smoothProgress, [0, 1], [20, -20]);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      // TODO(security): Standard silent fallback if clipboard access fails
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="min-h-screen md:h-screen bg-black relative border-t border-zinc-900 scroll-mt-20 overflow-hidden flex items-center px-6 sm:px-12 md:px-24 py-12 md:py-0"
      aria-label="Contact Section"
    >
      {/* ── Z-0 · Background ghost text ───────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 flex items-center justify-center select-none pointer-events-none"
        style={{ scale: bgScale, y: bgY }}
      >
        <span
          className="
            font-[var(--font-playfair)] font-black leading-none text-white
            text-[20vw] sm:text-[18vw] lg:text-[16vw]
            opacity-[0.04]
            tracking-tighter
          "
        >
          Contact
        </span>
      </motion.div>

      <div className="absolute right-[10%] bottom-10 w-[30vw] h-[30vh] rounded-full bg-indigo-950/10 blur-3xl pointer-events-none" />

      {/* ── Z-10 · Portrait ────────────────────────────────────────────── */}
      <motion.div
        className="
          absolute z-10 inset-0
          flex items-center justify-center
          sm:justify-end
          pointer-events-none
        "
        style={{ y: portraitY }}
      >
        <motion.div
          className="relative h-full flex items-center justify-center sm:justify-end"
          style={{ scale: portraitScale }}
        >
          <div className="relative h-full aspect-[3/4]">
            <Image
              src="/portrait-writing.png"
              alt="Mohamad writing/working"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-contain"
              draggable={false}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Z-20 · Content Column ──────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto w-full h-full flex items-center justify-start pointer-events-none relative z-20">
        <motion.div 
          className="w-full max-w-[90vw] sm:max-w-[55vw] md:max-w-[50vw] lg:max-w-[46vw] text-center md:text-left flex flex-col items-center md:items-start pointer-events-auto"
          style={{ y: contentY }}
        >
          <p className="font-[var(--font-jetbrains)] text-xs tracking-[0.25em] text-neutral-500 uppercase mb-4 select-none">
            05 Contact
          </p>
          <h2 className="font-[var(--font-inter)] font-black text-white leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] tracking-tight mb-6">
            Let&apos;s Talk
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-sm font-[var(--font-inter)] font-light tracking-wide mb-10 text-center md:text-left">
            Interested in working together or have a question? Reveal my contact information below to get in touch.
          </p>

          {/* Secure Interactive Contact Card */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-8 relative overflow-hidden w-full max-w-md mx-auto md:mx-0 group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
            
            <h3 className="font-[var(--font-jetbrains)] text-xs sm:text-sm tracking-wider text-zinc-200 uppercase mb-6 flex items-center justify-center md:justify-start gap-2 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse" />
              Secure Contact Card
            </h3>

            <div className="space-y-6 text-left">
              {/* Location */}
              <div className="border-b border-zinc-900 pb-4">
                <span className="text-xs uppercase tracking-wider text-zinc-400 block mb-1.5 font-bold">Location</span>
                <span className="text-sm sm:text-base font-normal text-white">{personalInfo.location}</span>
              </div>

              {/* Email */}
              <div className="border-b border-zinc-900 pb-4">
                <span className="text-xs uppercase tracking-wider text-zinc-400 block mb-1.5 font-bold">Email</span>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm sm:text-base font-mono text-white select-all font-medium">
                    {revealed ? personalInfo.email : "Mohamad******@gmail.com"}
                  </span>
                  {revealed && (
                    <button
                      onClick={() => handleCopy(personalInfo.email, "email")}
                      className="text-xs uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-bold cursor-pointer"
                      aria-label="Copy email"
                    >
                      {copiedText === "email" ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="pb-2">
                <span className="text-xs uppercase tracking-wider text-zinc-400 block mb-1.5 font-bold">Phone</span>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm sm:text-base font-mono text-white select-all font-medium">
                    {revealed ? personalInfo.phone : "+49 (0)174 *** ****"}
                  </span>
                  {revealed && (
                    <button
                      onClick={() => handleCopy(personalInfo.phone, "phone")}
                      className="text-xs uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-bold cursor-pointer"
                      aria-label="Copy phone"
                    >
                      {copiedText === "phone" ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
              </div>

              {/* Reveal button */}
              <button
                onClick={() => setRevealed(!revealed)}
                className="w-full mt-4 py-2.5 px-4 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors duration-200 cursor-pointer text-center"
              >
                {revealed ? "Hide Details" : "Reveal Contact Info"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
