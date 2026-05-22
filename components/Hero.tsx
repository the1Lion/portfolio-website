"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll-based transforms with spring smoothing
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const scale = useSpring(scrollScale, { stiffness: 70, damping: 25 });

  const scrollTextY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textY = useSpring(scrollTextY, { stiffness: 70, damping: 25 });

  const scrollTextOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.8, 0]);

  // Mouse Parallax coordinates (from -0.5 to 0.5 relative to screen center)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 22 });

  // Shift image inversely to mouse position (3D depth offset)
  const imageX = useTransform(smoothMouseX, [-0.5, 0.5], [25, -25]);
  const imageY = useTransform(smoothMouseY, [-0.5, 0.5], [25, -25]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = clientX / width - 0.5;
      const y = clientY / height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh] bg-black w-full"
      style={{ contentVisibility: "auto" }}
    >
      {/* Sticky Inner Container */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-black px-6 sm:px-12 md:px-24">
        
        {/* Subtle background ambient glow */}
        <div className="absolute right-10 top-1/4 -translate-y-1/2 w-[45vw] h-[45vh] rounded-full bg-indigo-950/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
          
          {/* Typography Panel (Left) */}
          <motion.div
            className="md:col-span-7 flex flex-col justify-center"
            style={{ y: textY, opacity: scrollTextOpacity }}
          >
            <span className="font-[var(--font-jetbrains)] text-xs sm:text-sm tracking-[0.25em] text-neutral-500 uppercase mb-4">
              01 Profile
            </span>
            <h1 className="font-[var(--font-inter)] font-black text-white leading-[1.05] text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight">
              Informatiker &amp;
              <span className="block bg-gradient-to-r from-neutral-200 via-neutral-400 to-white bg-clip-text text-transparent">
                Full Stack Developer.
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-neutral-400 max-w-lg font-[var(--font-inter)] font-light leading-relaxed">
              Architecting scalable SaaS platforms and high-performance digital systems.
            </p>
          </motion.div>

          {/* Portrait Panel (Right) */}
          <div className="md:col-span-5 flex justify-center md:justify-end relative h-[40vh] md:h-[65vh] w-full">
            <motion.div
              className="relative w-full h-full max-w-[380px] md:max-w-none aspect-[3/4]"
              style={{
                scale,
                x: imageX,
                y: imageY,
              }}
            >
              <Image
                src="/portrait03.png"
                alt="Mohamad Katramez Portrait"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain mix-blend-lighten pointer-events-none selection:bg-transparent"
                draggable={false}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
