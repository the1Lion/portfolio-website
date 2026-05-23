"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "journey", label: "Journey", num: "03" },
  { id: "projects", label: "Projects", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    // 1. Scroll Spy using IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -45% 0px", // Focus on a horizontal band in the middle of the screen
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    // 2. Fallback for page boundaries (top and bottom)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isAtBottom =
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 60;

      if (scrollY < 50) {
        setActiveSection("about");
      } else if (isAtBottom) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Update URL hash without jumping the page
      window.history.pushState(null, "", `#${id}`);
      setActiveSection(id);
    }
  };

  const isVisible = activeSection !== "about";

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* ── Desktop Right-aligned Floating Navigation ────────────────────── */}
          <motion.nav
            aria-label="Sidebar Navigation"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-6 select-none"
          >
            {/* Faint vertical tracker line */}
            <div className="absolute right-[5px] top-2 bottom-2 w-px bg-white/5 pointer-events-none" />

            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="group relative flex items-center gap-4 py-1 pr-6 cursor-pointer"
                >
                  {/* Text label with modern JetBrains font */}
                  <span
                    className={`
                      font-[var(--font-jetbrains)] text-xs tracking-[0.18em] uppercase transition-all duration-300
                      ${isActive
                        ? "text-white font-bold opacity-100 translate-x-0"
                        : "text-neutral-500 opacity-60 hover:text-neutral-300 hover:opacity-90 translate-x-1 hover:translate-x-0"
                      }
                    `}
                  >
                    <span className="text-[10px] opacity-50 mr-1.5">{item.num}</span>
                    {item.label}
                  </span>

                  {/* Dynamic Sliding Dot Indicator */}
                  <div className="absolute right-0 w-3 h-3 flex items-center justify-center">
                    {isActive ? (
                      <motion.span
                        layoutId="activeDot"
                        className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    ) : (
                      <span className="w-1 h-1 rounded-full bg-neutral-700 group-hover:bg-neutral-500 transition-colors duration-200" />
                    )}
                  </div>
                </a>
              );
            })}
          </motion.nav>

          {/* ── Mobile Floating Bottom Bar (Dock style) ────────────────────────── */}
          <motion.nav
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: 32, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 32, x: "-50%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 z-50 lg:hidden flex items-center gap-1.5 p-1.5 rounded-full bg-[#0a0a0a]/75 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] select-none"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="relative px-3 py-2 rounded-full text-xs font-mono tracking-wider transition-colors duration-300 z-10 block"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {/* Highlight sliding capsule */}
                  {isActive && (
                    <motion.span
                      layoutId="activeMobileCapsule"
                      className="absolute inset-0 bg-white rounded-full z-[-1] shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                    />
                  )}

                  <span
                    className={`
                      font-medium uppercase relative transition-colors duration-300
                      ${isActive ? "text-black font-bold" : "text-neutral-400 hover:text-white"}
                    `}
                  >
                    {item.num}
                  </span>
                </a>
              );
            })}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
