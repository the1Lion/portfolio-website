import re

with open('/home/rose/projects/protfolio-app/components/HeroSection.tsx', 'r') as f:
    content = f.read()

# We will replace everything from "// ─── Decorative grain overlay" to the end of the file.
new_content = """// ─── Decorative grain overlay ───────────────────────────────────────────────

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.06]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
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
        className="relative h-[200vh] bg-[#0a0a0a]"
        aria-label="About section"
      >
        {/* ── Sticky viewport ───────────────────────────────────────────── */}
        <div className="sticky top-0 h-screen w-full overflow-hidden border-b border-neutral-800">

          {/* ── Magazine Grid Frame (Static) ──────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none z-30 flex">
            {/* Left 40% Frame */}
            <div className="w-full lg:w-[40%] h-full border-r border-neutral-800 flex flex-col p-6 sm:p-8 md:p-12">
               {/* Metadata Top */}
               <div className="border-b border-neutral-800 pb-4 shrink-0 mt-4 lg:mt-0">
                  <p className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                    VOL. 01 — WIESBADEN, DE — ISS. 2026
                  </p>
               </div>
            </div>
            
            {/* Right 60% Frame */}
            <div className="hidden lg:flex w-[60%] h-full flex-col">
               {/* Top Bar */}
               <div className="h-24 border-b border-neutral-800 flex items-center justify-end px-12">
                  <span className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
                    01 // About
                  </span>
               </div>
               <div className="flex-1"></div>
               {/* Bottom Bar */}
               <div className="h-24 border-t border-neutral-800 flex items-center justify-between px-12">
                  <span className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
                    Scroll to explore
                  </span>
                  {/* Animated mouse icon */}
                  <div className="w-5 h-8 rounded-full border border-neutral-700 flex items-start justify-center pt-1.5">
                    <motion.div
                      className="w-0.5 h-1.5 bg-neutral-500 rounded-full"
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
               </div>
            </div>
          </div>

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
                opacity-[0.02]
                tracking-tighter text-center uppercase
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
            <div className="absolute bottom-0 left-[40%] w-[40vw] h-[40vh] rounded-full bg-gradient-radial from-neutral-800/10 via-transparent to-transparent blur-3xl" />
          </motion.div>

          {/* ── Z-10 · Portrait ────────────────────────────────────────────── */}
          <motion.div
            className="
              absolute z-10 inset-0
              flex items-center justify-center
              lg:justify-end lg:pr-[10%]
              pointer-events-none
            "
            style={{ y: portraitY, opacity: portraitOpacity }}
          >
            <motion.div
              className="relative h-[80%] lg:h-[90%] w-full aspect-[3/4]"
              style={{ scale: portraitScale }}
            >
              <Image
                src="/portrait-main.png"
                alt="Portfolio portrait"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* ── Z-40 · Foreground text ─────────────────────────────────────── */}
          <motion.div
             className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-center px-6 sm:px-8 md:px-12 w-full lg:w-[40%]"
             style={{ y: textY, opacity: textOpacity }}
          >
             <div className="pointer-events-auto mt-20 lg:mt-0">
                {/* Main headline */}
                <motion.h1
                  className="
                    font-[var(--font-playfair)] font-normal text-white leading-[1.05]
                    text-[2.75rem]
                    sm:text-6xl
                    md:text-[4.5rem]
                    lg:text-[4.5rem]
                    xl:text-[5rem]
                    tracking-tight
                    uppercase
                  "
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  The Architect<br/>Of Elegant<br/>Systems
                </motion.h1>

                {/* Sub-text descriptor */}
                <motion.p
                  className="
                    mt-8 text-sm sm:text-base text-neutral-400 leading-relaxed
                    font-[var(--font-inter)] font-light tracking-wide max-w-sm
                  "
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-[var(--font-playfair)] italic text-neutral-200 text-lg mr-1">Computer Scientist</span>
                  and
                  <span className="font-[var(--font-playfair)] italic text-neutral-200 text-lg mx-1">Full Stack Developer</span>
                  bridging the gap between uncompromising science and digital craft.
                </motion.p>

                {/* CTA strip */}
                <motion.div
                  className="mt-10 flex items-center gap-6 border-t border-neutral-800 pt-8 max-w-[80%]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href="#projects"
                    id="hero-cta-work"
                    className="
                      uppercase text-xs tracking-[0.15em] font-medium text-neutral-300
                      hover:text-white transition-colors duration-300
                    "
                  >
                    View Work
                  </a>
                  <span className="text-neutral-800">—</span>
                  <a
                    href="#contact"
                    id="hero-cta-contact"
                    className="
                      uppercase text-xs tracking-[0.15em] font-medium text-neutral-500
                      hover:text-white transition-colors duration-300
                    "
                  >
                    Get in touch
                  </a>
                </motion.div>
             </div>
          </motion.div>

        </div>{/* /sticky */}
      </section>
    </>
  );
}
"""

parts = content.split("// ─── Decorative grain overlay ───────────────────────────────────────────────")
if len(parts) >= 2:
    final_content = parts[0] + new_content
    with open('/home/rose/projects/protfolio-app/components/HeroSection.tsx', 'w') as f:
        f.write(final_content)
    print("Replaced successfully")
else:
    print("Could not find the split point.")

