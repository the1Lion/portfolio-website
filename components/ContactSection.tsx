"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { personalInfo } from "@/data/data";

export default function ContactSection() {
  const [revealed, setRevealed] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [scanActive, setScanActive] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out progress using spring for a buttery-smooth feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Background ghost text parallax (scale and vertical translation)
  const bgScale = useTransform(smoothProgress, [0, 1], [0.92, 1.08]);
  const bgY = useTransform(smoothProgress, [0, 1], [-80, 80]);



  // Content column parallax
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

  const handleRevealToggle = () => {
    if (!revealed) {
      setScanActive(true);
      // Simulate scanning animation before revealing PII
      setTimeout(() => {
        setRevealed(true);
        setScanActive(false);
      }, 1200);
    } else {
      setRevealed(false);
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="min-h-[100dvh] flex-1 relative scroll-mt-20 overflow-hidden flex flex-col justify-center pt-24 sm:pt-32 pb-12 sm:pb-16"
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
            opacity-[0.03]
            tracking-tighter
          "
        >
          Contact
        </span>
      </motion.div>

      {/* Decorative ambient blur blobs */}
      <div className="absolute left-[10%] bottom-10 w-[35vw] h-[35vh] rounded-full bg-indigo-950/15 blur-[120px] pointer-events-none" />
      <div className="absolute right-[5%] top-10 w-[30vw] h-[30vh] rounded-full bg-violet-950/10 blur-[100px] pointer-events-none" />

      {/* ── Z-10 · Portrait Background ─────────────── */}
      <div className="absolute z-10 inset-0 w-full h-full pointer-events-none">
        <div className="relative w-full h-full translate-y-24 sm:translate-y-32">
          <Image
            src="/portrait-writing.png"
            alt="Mohamad writing/working"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-contain lg:object-right-bottom opacity-15 sm:opacity-20 transition-opacity duration-300"
            draggable={false}
          />
          {/* Gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/30" />
        </div>
      </div>

      {/* ── Z-20 · Content Foreground Column ───────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 lg:px-24 relative z-20 flex items-center justify-center">
        <motion.div
          className="w-full max-w-2xl flex flex-col items-center text-center space-y-8"
          style={{ y: contentY }}
        >
          <div className="space-y-4 flex flex-col items-center">
            <p className="font-[var(--font-jetbrains)] text-xs tracking-[0.25em] text-neutral-500 uppercase select-none">
              05 Contact
            </p>
            <h2 className="font-[var(--font-playfair)] font-black text-white leading-tight text-4xl sm:text-5xl md:text-6xl tracking-tight">
              Let&apos;s Talk
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-[var(--font-lora)] italic tracking-wide max-w-lg">
              Interested in working together, exploring custom integrations, or just want to connect? Unlock my coordinates below.
            </p>
          </div>

          {/* Secure Contact Details Card */}
          <div className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-6 sm:p-8 md:p-10 relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />

            {/* Laser sweep animation on active scan or reveal */}
            {(scanActive || revealed) && (
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{
                  duration: scanActive ? 1.2 : 2.5,
                  repeat: scanActive ? 0 : Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="absolute inset-x-0 h-0.5 bg-indigo-500/60 shadow-[0_0_10px_rgba(99,102,241,0.8)] z-10"
              />
            )}

            <div className="flex items-center justify-between gap-4 mb-6">
              <h3 className="font-[var(--font-jetbrains)] text-xs sm:text-sm tracking-wider text-zinc-200 uppercase flex items-center gap-2 font-bold select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                Secure Card Decryption
              </h3>
              <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded uppercase select-none">
                {revealed ? "Decrypted" : "Encrypted"}
              </span>
            </div>

            <div className="space-y-5 text-left relative z-20">
              {/* Location */}
              <div className="border-b border-zinc-900/85 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1 font-bold select-none">Location</span>
                  <span className="text-sm font-normal text-white">{personalInfo.location}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase select-none hidden sm:block">Public</span>
              </div>

              {/* Email */}
              <div className="border-b border-zinc-900/85 pb-4">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1 font-bold select-none">Email Coordinates</span>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-mono text-white select-all font-medium transition-all duration-300">
                    {revealed ? personalInfo.email : "mohamad******@gmail.com"}
                  </span>
                  {revealed && (
                    <button
                      type="button"
                      onClick={() => handleCopy(personalInfo.email, "email")}
                      className="text-[10px] uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-bold cursor-pointer bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 hover:border-indigo-500/20 px-2.5 py-1 rounded"
                      aria-label="Copy email"
                    >
                      {copiedText === "email" ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="pb-2">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1 font-bold select-none">Direct Phone</span>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-mono text-white select-all font-medium transition-all duration-300">
                    {revealed ? personalInfo.phone : "+49 (0)174 *** ****"}
                  </span>
                  {revealed && (
                    <button
                      type="button"
                      onClick={() => handleCopy(personalInfo.phone, "phone")}
                      className="text-[10px] uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-bold cursor-pointer bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 hover:border-indigo-500/20 px-2.5 py-1 rounded"
                      aria-label="Copy phone"
                    >
                      {copiedText === "phone" ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
              </div>

              {/* Auth trigger button */}
              <button
                type="button"
                onClick={handleRevealToggle}
                disabled={scanActive}
                className="w-full mt-4 py-3 px-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-indigo-500/40 hover:bg-indigo-500/5 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 select-none"
              >
                {scanActive ? (
                  <>
                    <svg className="animate-pulse h-4 w-4 text-indigo-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                    Scanning Fingerprint...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {revealed ? "Lock Details" : "Decrypt PII details"}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Social Links */}
          <div className="flex flex-wrap justify-center gap-3 items-center pt-4">
            <a
              href="https://www.linkedin.com/in/mohamad-katramez-a24705215"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-800/80 bg-zinc-950/50 hover:bg-zinc-900 hover:border-zinc-700/80 text-zinc-400 hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/the1Lion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-800/80 bg-zinc-950/50 hover:bg-zinc-900 hover:border-zinc-700/80 text-zinc-400 hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-800/80 bg-zinc-950/50 hover:bg-zinc-900 hover:border-zinc-700/80 text-zinc-400 hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
