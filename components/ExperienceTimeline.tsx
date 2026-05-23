"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experienceData, educationData } from "@/data/data";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth the scroll line drawing
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="journey"
      className="py-24 px-6 sm:px-12 md:px-24 bg-transparent relative"
      aria-label="Interactive Experience Timeline"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left">
          <p className="font-[var(--font-jetbrains)] text-xs sm:text-sm tracking-[0.25em] text-zinc-300 uppercase mb-4 font-semibold">
            03 Journey
          </p>
          <h2 className="font-[var(--font-playfair)] font-black text-white text-4xl sm:text-5xl tracking-tight">
            Experience Timeline
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg max-w-2xl font-[var(--font-lora)] italic leading-relaxed tracking-wide">
            Scroll to see my professional evolution and academic progression.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-4 sm:pl-8">
          
          {/* Background Track Line */}
          <div className="absolute left-[7px] sm:left-[15px] top-2 bottom-2 w-px bg-zinc-800" />

          {/* Active Glowing Scroll Line */}
          <motion.div
            className="absolute left-[7px] sm:left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-indigo-500 via-violet-500 to-fuchsia-500 origin-top shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            style={{ scaleY }}
          />

          {/* Chronological Entries */}
          <div className="space-y-16">
            
            {/* Timeline Header: Experience */}
            <div className="relative pl-8 sm:pl-12">
              <div className="absolute left-[-2px] sm:left-[6px] top-1.5 w-[5px] sm:w-[7px] h-[5px] sm:h-[7px] rounded-full bg-zinc-500" />
              <h3 className="font-[var(--font-jetbrains)] text-xs sm:text-sm uppercase tracking-[0.2em] text-zinc-200 mb-2 font-bold">
                Professional Experience
              </h3>
            </div>

            {/* Render Experience Items */}
            {experienceData.map((role, idx) => {
              return (
                <motion.div
                  key={`${role.company}-${role.role}-${idx}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-8 sm:pl-12 group"
                >
                  {/* Timeline Dot (Node) */}
                  <div className="absolute left-[-5px] sm:left-[3px] top-1.5 w-3 h-3 rounded-full border border-zinc-700 bg-black group-hover:border-violet-400 group-hover:shadow-[0_0_8px_rgba(167,139,250,0.5)] transition-all duration-300 z-10 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-violet-400 transition-colors duration-300" />
                  </div>

                  {/* Node Content */}
                  <div>
                    {/* Date/Period */}
                    <span className="font-[var(--font-jetbrains)] text-xs tracking-wider text-zinc-300 group-hover:text-white transition-colors duration-300 font-semibold">
                      {role.period}
                    </span>

                    {/* Title & Company */}
                    <h4 className="font-[var(--font-playfair)] font-bold text-white text-lg sm:text-xl mt-1 flex flex-wrap items-baseline gap-y-1">
                      <span>{role.role}</span>
                      <span className="text-sm sm:text-base font-semibold text-zinc-300 font-mono sm:ml-2.5">
                        @ {role.company}
                      </span>
                    </h4>

                    {/* Location */}
                    <span className="text-xs text-zinc-400 font-medium block mt-0.5">
                      {role.location}
                    </span>

                    {/* Description */}
                    <p className="mt-3 text-zinc-300 text-sm sm:text-base font-[var(--font-lora)] italic leading-relaxed max-w-2xl">
                      {role.description}
                    </p>

                    {/* Highlights / Badges */}
                    {role.highlights && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {role.highlights.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono text-zinc-200 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded group-hover:border-zinc-700 transition-colors duration-300 font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Timeline Header: Education */}
            <div className="relative pl-8 sm:pl-12 pt-8">
              <div className="absolute left-[-2px] sm:left-[6px] top-[38px] w-[5px] sm:w-[7px] h-[5px] sm:h-[7px] rounded-full bg-zinc-500" />
              <h3 className="font-[var(--font-jetbrains)] text-xs sm:text-sm uppercase tracking-[0.2em] text-zinc-200 mb-2 font-bold">
                Education &amp; Certifications
              </h3>
            </div>

            {/* Render Education Items */}
            {educationData.map((edu, idx) => {
              return (
                <motion.div
                  key={`${edu.institution}-${idx}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-8 sm:pl-12 group"
                >
                  {/* Timeline Dot (Node) */}
                  <div className="absolute left-[-5px] sm:left-[3px] top-1.5 w-3 h-3 rounded-full border border-zinc-700 bg-black group-hover:border-violet-400 group-hover:shadow-[0_0_8px_rgba(167,139,250,0.5)] transition-all duration-300 z-10 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-violet-400 transition-colors duration-300" />
                  </div>

                  {/* Node Content */}
                  <div>
                    {/* Date/Period */}
                    <span className="font-[var(--font-jetbrains)] text-xs tracking-wider text-zinc-300 group-hover:text-white transition-colors duration-300 font-semibold">
                      {edu.period}
                    </span>

                    {/* Title & Institution */}
                    <h4 className="font-[var(--font-playfair)] font-bold text-white text-lg sm:text-xl mt-1 flex flex-wrap items-baseline gap-y-1">
                      <span>{edu.degree}</span>
                      <span className="text-sm sm:text-base font-semibold text-zinc-300 font-mono sm:ml-2.5">
                        @ {edu.institution}
                      </span>
                    </h4>

                    {/* Description */}
                    <p className="mt-3 text-zinc-300 text-sm sm:text-base font-[var(--font-lora)] italic leading-relaxed max-w-2xl">
                      {edu.details}
                    </p>

                    {edu.thesis && (
                      <div className="mt-4 p-4 rounded-xl bg-zinc-950/40 border border-zinc-900 group-hover:border-zinc-800/80 transition-colors duration-300 max-w-2xl">
                        <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-violet-400 block mb-1.5 font-extrabold">
                          Bachelor Thesis
                        </span>
                        <p className="font-[var(--font-playfair)] font-bold text-white text-sm sm:text-base leading-normal">
                          {edu.thesis.title}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {edu.thesis.tech.map((t) => (
                            <span
                              key={t}
                              className="text-xs font-mono text-zinc-200 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-semibold"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
