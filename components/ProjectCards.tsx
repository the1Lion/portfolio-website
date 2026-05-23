"use client";

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { projectsData, ProjectItem } from "@/data/data";

interface SpotlightCardProps {
  project: ProjectItem;
  className?: string;
}

function SpotlightCard({ project, className = "" }: SpotlightCardProps) {
  // Use MotionValues to track coordinates. This updates the DOM directly
  // via style attributes, entirely bypassing React's re-render lifecycle
  // for high-performance 60fps tracking.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-xl border border-zinc-800/80 bg-zinc-950 p-[1px] overflow-hidden ${className}`}
    >
      {/* 1px Border Spotlight Glow Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.25),
              transparent 80%
            )
          `,
        }}
      />

      {/* Card Inner Content Container */}
      <div className="relative h-full w-full rounded-[11px] bg-zinc-950 p-6 sm:p-8 z-10 flex flex-col justify-between overflow-hidden">
        
        {/* Subtle Radial Gradient Overlay following the mouse inside the card */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.035),
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Project Category */}
            <span className="font-[var(--font-jetbrains)] text-xs tracking-wider text-indigo-400 uppercase block mb-3 font-bold">
              {project.category}
            </span>

            {/* Project Title */}
            <h4 className="font-[var(--font-playfair)] font-black text-white text-xl sm:text-2xl leading-tight">
              {project.title}
            </h4>

            {/* Project Description */}
            <p className="mt-3 text-zinc-300 text-sm sm:text-base font-normal leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Tech Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-zinc-200 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded group-hover:border-zinc-700/80 transition-colors duration-300 select-none font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ProjectCards() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-24 px-6 sm:px-12 md:px-24 bg-transparent relative"
      aria-label="Spotlight Project Section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="font-[var(--font-jetbrains)] text-xs sm:text-sm tracking-[0.25em] text-zinc-300 uppercase mb-4 font-semibold">
            04 Portfolio
          </p>
          <h2 className="font-[var(--font-playfair)] font-black text-white text-4xl sm:text-5xl tracking-tight">
            Selected Projects
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Exploring scalable cloud-native architectures, time-series machine learning models, and complex data pipeline engineering.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {projectsData.map((project: ProjectItem, index: number) => {
            // Asymmetrical layout configuration
            const colSpan = project.featured ? "md:col-span-8" : "md:col-span-4";

            return (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className={colSpan}
              >
                <SpotlightCard project={project} className="h-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
