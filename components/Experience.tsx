"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  experienceData,
  educationData,
  personalInfo,
  ExperienceItem,
  EducationItem,
} from "@/data/data";

export default function Experience() {
  // PII masking and copy interaction state
  const [revealed, setRevealed] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Group schubwerk experiences together to show clear progression
  const schubwerkRoles = experienceData.filter((exp) => exp.isSchubwerk);
  const otherRoles = experienceData.filter((exp) => !exp.isSchubwerk);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      // TODO(security): Standard silent fallback if clipboard access fails
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="experience"
      className="py-24 px-6 sm:px-12 md:px-24 bg-black relative border-t border-white/5"
      aria-label="Experience & Education Section"
    >
      {/* Background decoration */}
      <div className="absolute left-[10%] top-1/4 w-[35vw] h-[35vh] rounded-full bg-violet-950/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Left column: Sticky Header info */}
        <div className="lg:col-span-4 flex flex-col justify-start lg:sticky lg:top-32 h-fit">
          <p className="font-[var(--font-jetbrains)] text-xs tracking-[0.25em] text-neutral-500 uppercase mb-4">
            03 Background
          </p>
          <h2 className="font-[var(--font-inter)] font-black text-white text-4xl sm:text-5xl tracking-tight leading-none mb-6">
            Experience &amp; Education
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed mb-8">
            A chronological timeline of my professional work history, academic degree, and specialized certifications.
          </p>

          {/* Secure Interactive Contact Card */}
          <div
            id="contact"
            className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 relative overflow-hidden scroll-mt-24"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
            <h3 className="font-[var(--font-jetbrains)] text-xs tracking-wider text-neutral-400 uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Secure Contact Card
            </h3>

            <div className="space-y-4">
              {/* Location */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-600 block">Location</span>
                <span className="text-sm font-light text-neutral-300">{personalInfo.location}</span>
              </div>

              {/* Email */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-600 block">Email</span>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span className="text-sm font-mono text-neutral-300">
                    {revealed ? personalInfo.email : "Mohamad******@gmail.com"}
                  </span>
                  {revealed && (
                    <button
                      onClick={() => handleCopy(personalInfo.email, "email")}
                      className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors duration-200"
                      aria-label="Copy email"
                    >
                      {copiedText === "email" ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-600 block">Phone</span>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span className="text-sm font-mono text-neutral-300">
                    {revealed ? personalInfo.phone : "+49 (0)174 *** ****"}
                  </span>
                  {revealed && (
                    <button
                      onClick={() => handleCopy(personalInfo.phone, "phone")}
                      className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors duration-200"
                      aria-label="Copy phone"
                    >
                      {copiedText === "phone" ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </div>

              {/* Reveal trigger */}
              <button
                onClick={() => setRevealed(!revealed)}
                className="w-full mt-2 py-2 px-4 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors duration-200 cursor-pointer text-center"
              >
                {revealed ? "Hide Details" : "Reveal Contact Info"}
              </button>
            </div>
          </div>
        </div>

        {/* Right column: The Timelines */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Section: Professional Experience */}
          <div className="relative">
            <h3 className="font-[var(--font-inter)] font-extrabold text-white text-xl mb-8 flex items-center gap-3">
              <span className="text-neutral-500 font-mono text-sm font-normal">03.1</span> Professional Roles
            </h3>

            {/* Timeline Vertical Track */}
            <div className="absolute left-[11px] top-10 bottom-0 w-px bg-gradient-to-b from-white/10 via-neutral-900 to-transparent pointer-events-none" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-12"
            >
              {/* Timeline Block: schubwerk GmbH Progression */}
              <motion.div variants={cardVariants} className="relative pl-10">
                {/* Timeline Node Icon */}
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border border-indigo-400 bg-black flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                </div>

                <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 sm:p-8 hover:border-white/10 transition-all duration-300">
                  <span className="font-[var(--font-jetbrains)] text-[10px] tracking-widest text-indigo-400 uppercase block mb-1">
                    Career Progression
                  </span>
                  <h4 className="font-[var(--font-inter)] font-black text-white text-xl sm:text-2xl">
                    schubwerk GmbH
                  </h4>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1 mb-6">
                    Wiesbaden, Germany
                  </p>

                  {/* Sub-timeline for Schubwerk roles */}
                  <div className="space-y-8 relative pl-4 border-l border-white/5">
                    {schubwerkRoles.map((role: ExperienceItem, idx: number) => (
                      <div key={idx} className="relative group">
                        {/* Nested tiny node dot */}
                        <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-neutral-600 group-hover:bg-indigo-400 transition-colors duration-300" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                          <h5 className="font-semibold text-neutral-200 text-sm sm:text-base transition-colors duration-300 group-hover:text-white">
                            {role.role}
                          </h5>
                          <span className="font-[var(--font-jetbrains)] text-[10px] text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300">
                            {role.period}
                          </span>
                        </div>

                        <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                          {role.description}
                        </p>

                        {role.highlights && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {role.highlights.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono text-neutral-500 px-2 py-0.5 bg-neutral-900 border border-white/5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Timeline Block: Other Roles */}
              {otherRoles.map((role: ExperienceItem, index: number) => (
                <motion.div key={index} variants={cardVariants} className="relative pl-10">
                  {/* Timeline Node Icon */}
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border border-neutral-800 bg-black flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-800" />
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 sm:p-8 hover:border-white/10 transition-all duration-300 group">
                    <span className="font-[var(--font-jetbrains)] text-[10px] tracking-widest text-neutral-500 uppercase block mb-1">
                      {role.period}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <h4 className="font-[var(--font-inter)] font-black text-white text-lg sm:text-xl">
                        {role.role}
                      </h4>
                      <span className="font-semibold text-neutral-400 text-sm">
                        {role.company}
                      </span>
                    </div>

                    <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                      {role.description}
                    </p>

                    {role.highlights && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {role.highlights.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-neutral-500 px-2 py-0.5 bg-neutral-900 border border-white/5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Section: Education & Certifications */}
          <div className="relative">
            <h3 className="font-[var(--font-inter)] font-extrabold text-white text-xl mb-8 flex items-center gap-3">
              <span className="text-neutral-500 font-mono text-sm font-normal">03.2</span> Education
            </h3>

            {/* Timeline Vertical Track */}
            <div className="absolute left-[11px] top-10 bottom-0 w-px bg-gradient-to-b from-white/10 via-neutral-900 to-transparent pointer-events-none" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-12"
            >
              {educationData.map((edu: EducationItem, idx: number) => (
                <motion.div key={idx} variants={cardVariants} className="relative pl-10">
                  {/* Timeline Node Icon */}
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border border-neutral-800 bg-black flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-800" />
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 sm:p-8 hover:border-white/10 transition-all duration-300 group">
                    <span className="font-[var(--font-jetbrains)] text-[10px] tracking-widest text-neutral-500 uppercase block mb-1">
                      {edu.period}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <h4 className="font-[var(--font-inter)] font-black text-white text-lg sm:text-xl">
                        {edu.degree}
                      </h4>
                      <span className="font-semibold text-neutral-400 text-sm">
                        {edu.institution}
                      </span>
                    </div>

                    <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                      {edu.details}
                    </p>

                    {edu.thesis && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                          Bachelor Thesis
                        </span>
                        <p className="text-sm font-medium text-neutral-300 leading-normal">
                          {edu.thesis.title}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {edu.thesis.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-mono text-neutral-500 px-1.5 py-0.5 bg-neutral-900 border border-white/5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
