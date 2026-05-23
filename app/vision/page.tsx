"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { visionProjects, type VisionProject } from "@/data/vision/vision";

// ─── Grain overlay ────────────────────────────────────────────────────────────
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

// ─── Status badge ─────────────────────────────────────────────────────────────
const statusConfig = {
  idea:      { label: "Idea",      color: "text-neutral-400 border-neutral-700  bg-neutral-900/60" },
  research:  { label: "Research",  color: "text-sky-400    border-sky-800/60    bg-sky-950/40"     },
  prototype: { label: "Prototype", color: "text-amber-400  border-amber-800/60  bg-amber-950/40"   },
  building:  { label: "Building",  color: "text-emerald-400 border-emerald-800/60 bg-emerald-950/40"},
} as const;

function StatusBadge({ status }: { status: keyof typeof statusConfig }) {
  const cfg = statusConfig[status] ?? statusConfig.idea;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-[var(--font-jetbrains)] tracking-widest uppercase ${cfg.color}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {cfg.label}
    </span>
  );
}

// ─── Gallery lightbox ─────────────────────────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
          <Image
            src={images[idx]}
            alt={`Gallery image ${idx + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setIdx((i) => (i + 1) % images.length)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 justify-center">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIdx(i)}
                className={`relative w-14 h-10 rounded-md overflow-hidden border-2 transition ${
                  i === idx ? "border-white/60" : "border-white/10 hover:border-white/30"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-900 border border-white/10 text-white/70 hover:text-white transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Document Viewer Modal ───────────────────────────────────────────────────
interface DocumentViewerProps {
  project: VisionProject;
  onClose: () => void;
}

function DocumentViewer({ project, onClose }: DocumentViewerProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[150] flex flex-col bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-950/85 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.25em] text-neutral-500 uppercase select-none">
            {project.num}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="font-[var(--font-playfair)] text-sm sm:text-base text-white font-bold truncate max-w-[200px] sm:max-w-md">
            {project.title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {project.htmlPath && (
            <a
              href={project.htmlPath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-[var(--font-jetbrains)] tracking-widest text-neutral-400 uppercase hover:text-white hover:border-white/30 transition-all active:scale-95"
            >
              Open in new tab
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.03] text-[10px] font-[var(--font-jetbrains)] tracking-widest text-white uppercase hover:bg-white/[0.06] hover:border-white/30 transition-all active:scale-95"
          >
            Close
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Iframe container */}
      <div className="flex-1 w-full relative bg-neutral-900">
        <iframe
          src={project.htmlPath}
          title={project.title}
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </motion.div>
  );
}

// ─── Idea Card ────────────────────────────────────────────────────────────────
interface IdeaCardProps {
  idea: VisionProject;
  index: number;
  onOpenDoc: (project: VisionProject) => void;
}

function IdeaCard({ idea, index, onOpenDoc }: IdeaCardProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gallery = idea.gallery ?? [];
  const status = idea.details?.status ?? "idea";

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
        onClick={() => {
          if (idea.htmlPath) {
            onOpenDoc(idea);
          }
        }}
        className={`group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.025] overflow-hidden backdrop-blur-sm transition-all duration-300 ${
          idea.htmlPath ? "cursor-pointer hover:border-white/20 hover:bg-white/[0.04]" : ""
        }`}
        style={{ "--glow": idea.glowColor } as React.CSSProperties}
      >
        {/* Ambient hover glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `radial-gradient(circle at 50% 0%, var(--glow), transparent 65%)` }}
        />

        {/* ── Cover image ─────────────────────────────────────────────────── */}
        {idea.coverImage ? (
          <div
            className={`relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 ${
              gallery.length > 0 ? "cursor-zoom-in" : idea.htmlPath ? "cursor-pointer" : ""
            }`}
            onClick={(e) => {
              if (gallery.length > 0) {
                e.stopPropagation();
                setLightboxIndex(0);
              }
            }}
          >
            <Image
              src={idea.coverImage}
              alt={`${idea.title} cover`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
            {/* Gradient veil so text below reads cleanly */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

            {/* Gallery count badge */}
            {gallery.length > 1 && (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-[var(--font-jetbrains)] text-white/60">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {gallery.length}
              </span>
            )}
          </div>
        ) : (
          /* No cover — decorative gradient placeholder */
          <div
            className={`w-full aspect-[16/9] bg-gradient-to-br ${idea.accentFrom} ${idea.accentTo} opacity-[0.06]`}
          />
        )}

        {/* ── Card body ───────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 p-6 sm:p-7 flex-1">
          {/* Number · category · status */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.25em] text-neutral-600 uppercase select-none">
              {idea.num}
            </span>
            <span className="h-px flex-1 bg-white/[0.06] min-w-4" />
            <span className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
              {idea.category}
            </span>
            {idea.details?.status && (
              <StatusBadge status={status} />
            )}
          </div>

          {/* Title */}
          <h2
            className={`font-[var(--font-playfair)] font-bold text-xl sm:text-2xl leading-snug bg-gradient-to-r ${idea.accentFrom} ${idea.accentTo} bg-clip-text text-transparent`}
          >
            {idea.title}
          </h2>

          {/* Body */}
          <p className="font-[var(--font-lora)] text-neutral-400 leading-relaxed text-sm sm:text-base italic">
            {idea.body}
          </p>

          {/* Gallery thumbnail strip (if cover image exists and gallery has extras) */}
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(i);
                  }}
                  className="relative flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden border border-white/[0.08] hover:border-white/20 transition-all duration-200 hover:scale-105"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {idea.tags.map((tag) => (
              <span
                key={tag}
                className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-white/[0.08] text-neutral-500 bg-white/[0.03]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read Document button indicator */}
          {idea.htmlPath && (
            <div className="mt-2 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-[var(--font-jetbrains)] tracking-wider text-emerald-400/80 group-hover:text-emerald-400 transition-colors duration-300">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Read Proposal Document
              </span>
              <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>

        {/* Bottom gradient accent line */}
        <div
          aria-hidden
          className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r ${idea.accentFrom} ${idea.accentTo} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
        />
      </motion.article>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && gallery.length > 0 && (
          <Lightbox
            images={gallery}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VisionPage() {
  const [selectedProject, setSelectedProject] = useState<VisionProject | null>(null);

  return (
    <main className="bg-[#0a0a0a] min-h-[100dvh] flex flex-col relative overflow-x-hidden">
      <GrainOverlay />

      {/* Ambient background glows */}
      <div className="absolute top-[5%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-950/10 blur-[150px] pointer-events-none z-[-10]" />
      <div className="absolute top-[40%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-violet-950/8 blur-[160px] pointer-events-none z-[-10]" />
      <div className="absolute top-[70%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-fuchsia-950/6 blur-[130px] pointer-events-none z-[-10]" />

      {/* ── Back navigation ───────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-6 left-6 sm:top-8 sm:left-10 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link
          href="/"
          id="vision-back-home"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-white/50 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:border-white/25 hover:text-white hover:bg-white/[0.06] active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 transition-transform duration-300 group-hover:-translate-x-0.5"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back
        </Link>
      </motion.div>

      {/* ── Hero header ───────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-6 sm:px-10 md:px-16 lg:px-24 max-w-6xl mx-auto w-full">
        <div aria-hidden className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="font-[var(--font-playfair)] font-black text-[18vw] text-white opacity-[0.025] leading-none tracking-tighter">
            Vision
          </span>
        </div>

        <motion.p
          className="font-[var(--font-jetbrains)] text-xs tracking-[0.25em] text-neutral-500 uppercase mb-4"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Ideas in progress
        </motion.p>

        <motion.h1
          className="font-[var(--font-playfair)] font-black text-white leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
        >
          <span className="block">Things I</span>
          <span className="block">
            want to{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                build
              </span>
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                style={{ width: "100%" }}
              />
            </span>
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl font-[var(--font-lora)] text-neutral-400 text-base sm:text-lg leading-relaxed italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          A running collection of product ideas, research directions, and passion
          projects — some near, some far, all worth pursuing.
        </motion.p>

        {/* Project count line */}
        <motion.p
          className="mt-4 font-[var(--font-jetbrains)] text-[11px] tracking-widest text-neutral-600 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {visionProjects.length} active project{visionProjects.length !== 1 ? "s" : ""}
        </motion.p>
      </section>

      {/* ── Projects grid ─────────────────────────────────────────────────── */}
      <section className="flex-1 px-6 sm:px-10 md:px-16 lg:px-24 pb-24 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visionProjects.map((project, i) => (
            <IdeaCard
              key={project.num}
              idea={project}
              index={i}
              onOpenDoc={setSelectedProject}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
        >
          <Link
            href="/"
            id="vision-cta-portfolio"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:border-white/30 hover:text-white active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Portfolio
          </Link>
        </motion.div>
      </section>

      {/* ── Document Viewer ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && selectedProject.htmlPath && (
          <DocumentViewer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
