"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo } from "@/data/data";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Wraps a raw MotionValue with a spring for buttery-smooth feel. */
function useSmoothed(value: MotionValue<number>, stiffness = 60, damping = 20) {
  return useSpring(value, { stiffness, damping, restDelta: 0.001 });
}

// ─── Decorative grain overlay ───────────────────────────────────────────────

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

// ─── Animated number counter (eyebrow index) ────────────────────────────────

function EyebrowLabel({ label }: { label: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="font-[var(--font-jetbrains)] text-xs tracking-[0.25em] text-neutral-500 uppercase mb-4 select-none"
    >
      {label}
    </motion.p>
  );
}

// ─── Main Hero ───────────────────────────────────────────────────────────────

export default function HeroSection() {
  /** The tall scrollable container — scroll progress is measured here */
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Portrait parallax ────────────────────────────────────────────────────
  // Scale: 1 → 1.15 over the entire scroll range
  const rawPortraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const portraitScale = useSmoothed(rawPortraitScale, 80, 22);

  // Y translation: subtle downward drift (0 → 60px)
  const rawPortraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const portraitY = useSmoothed(rawPortraitY, 80, 22);

  // Slight vignette/opacity fade on portrait at very end
  const portraitOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.6]);

  // ── Foreground text parallax ─────────────────────────────────────────────
  // Moves up faster than the portrait, exaggerating depth separation
  const rawTextY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textY = useSmoothed(rawTextY, 80, 22);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  // ── Background "About" ghost text ────────────────────────────────────────
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const rawBgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const bgScale = useSmoothed(rawBgScale, 50, 20);



  return (
    <>
      <GrainOverlay />

      {/*
       * ── Outer container ──────────────────────────────────────────────────
       * h-[200vh] creates the scrollable space.
       * The sticky inner panel locks the viewport while the user scrolls.
       */}
      <section
        ref={containerRef}
        id="about"
        className="relative h-[200vh] bg-transparent"
        aria-label="About section"
      >
        {/* ── Sticky viewport ───────────────────────────────────────────── */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* ── Z-0 · Background ghost text ───────────────────────────────── */}
          <motion.div
            aria-hidden
            className="absolute inset-0 z-0 flex items-center justify-center select-none pointer-events-none"
            style={{ opacity: bgOpacity, scale: bgScale }}
          >
            <span
              className="
                font-[var(--font-playfair)] font-black leading-[0.85] text-white
                text-[12vw] sm:text-[10vw] lg:text-[7.2vw]
                opacity-[0.04]
                tracking-tighter text-center
                -translate-y-16 md:-translate-y-24 lg:-translate-y-32
              "
            >
              {personalInfo.name.split(" ").map((part) => (
                <span key={part} className="block">
                  {part}
                </span>
              ))}
            </span>
          </motion.div>

          {/* ── Ambient gradient blob (behind portrait) ────────────────────── */}
          <motion.div
            aria-hidden
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.8], [1, 0]) }}
          >
            {/* Bottom-left accent */}
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] rounded-full bg-gradient-radial from-violet-900/10 via-transparent to-transparent blur-3xl" />
          </motion.div>



          {/* ── Z-10 · Portrait ────────────────────────────────────────────── */}
          <motion.div
            className="
              absolute z-10 inset-0
              flex items-center justify-center
              sm:justify-end
              pointer-events-none
            "
            style={{ y: portraitY, opacity: portraitOpacity }}
          >
            <motion.div
              className="relative h-full flex items-center justify-center sm:justify-end"
              style={{ scale: portraitScale }}
            >
              {/*
               * Use a fixed-height wrapper that preserves the portrait's
               * natural 3:4 aspect ratio (924×1230). object-contain shows
               * the full image — no cropping. The photo's own dark bg
               * merges with #0a0a0a so no heavy gradient mask is needed.
               */}
              <div className="relative h-full aspect-[3/4]">
                <Image
                  src="/portrait-main.png"
                  alt="Portfolio portrait"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain"
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ── Z-20 · Foreground text ─────────────────────────────────────── */}
          <motion.div
            className="
              absolute z-20
              bottom-16 left-6
              sm:bottom-20 sm:left-10
              md:bottom-24 md:left-14
              lg:bottom-28 lg:left-20
              max-w-[90vw] sm:max-w-[55vw] md:max-w-[50vw] lg:max-w-[46vw]
            "
            style={{ y: textY, opacity: textOpacity }}
          >
            {/* Initial reveal animations for text children */}
            <EyebrowLabel label="01 About" />

            {/* Main headline */}
            <motion.h1
              className="
                font-[var(--font-playfair)] font-black text-white leading-[1.05]
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-[4.5rem]
                xl:text-[5.5rem]
                tracking-tight
              "
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Split for gradient accent on "Full Stack" */}
              <span className="block">I&apos;m a</span>
              <span className="block">Computer</span>
              <span className="block">
                Scientist &amp;{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                    Full Stack
                  </span>
                  {/* Subtle underline accent */}
                  <motion.span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    style={{ width: "100%" }}
                  />
                </span>
              </span>
              <span className="block text-neutral-300">Developer</span>
            </motion.h1>

            {/* Sub-text descriptor */}
            <motion.p
              className="
                mt-6 text-base sm:text-lg text-neutral-400 leading-relaxed
                max-w-sm font-[var(--font-lora)] font-normal italic tracking-wide
              "
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Building elegant systems at the intersection of
              <span className="text-neutral-200"> science </span>
              and
              <span className="text-neutral-200"> craft</span>.
            </motion.p>

            {/* CTA strip */}
            <motion.div
              className="mt-8 flex items-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href="#projects"
                id="hero-cta-work"
                className="
                  group relative inline-flex items-center gap-2
                  px-5 py-2.5 rounded-full
                  bg-white text-black text-xs font-semibold tracking-widest uppercase
                  transition-all duration-300 hover:bg-neutral-200 active:scale-95
                "
              >
                View Work
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <a
                href="#contact"
                id="hero-cta-contact"
                className="
                  inline-flex items-center gap-2
                  px-5 py-2.5 rounded-full
                  border border-white/10 text-white/60 text-xs font-semibold tracking-widest uppercase
                  transition-all duration-300 hover:border-white/30 hover:text-white active:scale-95
                "
              >
                Get in touch
              </a>

              <Link
                href="/vision"
                id="hero-cta-vision"
                className="
                  group inline-flex items-center gap-2
                  px-5 py-2.5 rounded-full
                  border border-violet-400/20 text-violet-300/70 text-xs font-semibold tracking-widest uppercase
                  transition-all duration-300 hover:border-violet-400/50 hover:text-violet-200 hover:bg-violet-950/20 active:scale-95
                "
              >
                {/* Eye / vision icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Vision
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Scroll indicator ───────────────────────────────────────────── */}
          <motion.div
            aria-label="Scroll to explore"
            className="absolute right-6 bottom-10 z-20 flex flex-col items-center gap-2 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
            }}
          >
            <span className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.2em] text-neutral-600 uppercase rotate-90 origin-center mb-3">
              Scroll
            </span>
            {/* Animated mouse icon */}
            <div className="w-5 h-8 rounded-full border border-neutral-700 flex items-start justify-center pt-1.5">
              <motion.div
                className="w-0.5 h-1.5 bg-white/60 rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>


        </div>{/* /sticky */}
      </section>
    </>
  );
}
