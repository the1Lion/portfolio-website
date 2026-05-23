"use client";

import { motion } from "framer-motion";
import { skillsData, SkillCategory } from "@/data/data";

const bentoStyles = [
  {
    colSpan: "md:col-span-7",
    glowColor: "from-emerald-500/10 to-teal-500/5",
    accentColor: "bg-emerald-500",
  },
  {
    colSpan: "md:col-span-5",
    glowColor: "from-cyan-500/10 to-blue-500/5",
    accentColor: "bg-cyan-500",
  },
  {
    colSpan: "md:col-span-6",
    glowColor: "from-violet-500/10 to-fuchsia-500/5",
    accentColor: "bg-violet-500",
  },
  {
    colSpan: "md:col-span-3",
    glowColor: "from-amber-500/10 to-orange-500/5",
    accentColor: "bg-amber-500",
  },
  {
    colSpan: "md:col-span-3",
    glowColor: "from-rose-500/10 to-pink-500/5",
    accentColor: "bg-rose-500",
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section
      id="skills"
      className="py-24 px-6 sm:px-12 md:px-24 bg-transparent relative"
      aria-label="Skills Bento Section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="font-[var(--font-jetbrains)] text-xs sm:text-sm tracking-[0.25em] text-zinc-300 uppercase mb-4 font-semibold">
            02 Competencies
          </p>
          <h2 className="font-[var(--font-playfair)] font-black text-white text-4xl sm:text-5xl tracking-tight">
            Skills Bento Box
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg max-w-2xl font-[var(--font-lora)] italic leading-relaxed tracking-wide">
            A comprehensive overview of my technological stacks, frameworks, and database preferences.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto"
        >
          {skillsData.map((category: SkillCategory, index: number) => {
            const config = bentoStyles[index] || {
              colSpan: "md:col-span-4",
              glowColor: "from-neutral-500/10 to-neutral-500/5",
              accentColor: "bg-neutral-500",
            };

            return (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 sm:p-8 transition-all duration-500 hover:border-white/10 ${config.colSpan}`}
              >
                {/* Background Ambient Glow on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${config.glowColor} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Subtly glowing top-left border accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`w-1.5 h-1.5 rounded-full ${config.accentColor} shadow-[0_0_8px_currentColor]`} />
                    <h3 className="font-[var(--font-jetbrains)] text-sm tracking-wider text-zinc-100 uppercase font-bold">
                      {category.category}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-white/10 transition-all duration-300 hover:bg-neutral-800 hover:border-white/20 select-none"
                      >
                        <span className="text-sm font-semibold text-white font-[var(--font-jetbrains)]">
                          {skill.name}
                        </span>
                        {skill.level && (
                          <span className="text-[10px] sm:text-xs font-mono tracking-wider text-zinc-200 px-1.5 py-0.5 bg-black/60 border border-zinc-800 rounded uppercase font-bold">
                            {skill.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
