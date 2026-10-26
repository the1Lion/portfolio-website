// ─── Vision Project Types ────────────────────────────────────────────────────

import { tx, type Lang, type Text } from "@/lib/i18n";

export type VisionStatus = "idea" | "research" | "prototype" | "building";

export interface VisionLink {
  label: string;
  url: string;
}

export interface VisionDetails {
  /** What problem or opportunity does this address? */
  problem?: string;
  /** How would you approach building it? */
  approach?: string;
  /** Current development status */
  status: VisionStatus;
  /** Optional external references, repos, papers, etc. */
  links?: VisionLink[];
}

export interface VisionProject {
  /** Two-digit display index, e.g. "01" */
  num: string;
  /** Short category label shown on the card */
  category: Text;
  /** Card headline */
  title: Text;
  /** One-to-two sentence description (rendered italic) */
  body: Text;
  /** Tech / concept tags shown as pill badges */
  tags: Text[];
  /** Tailwind gradient start class for the title text, e.g. "from-indigo-400" */
  accentFrom: string;
  /** Tailwind gradient end class for the title text, e.g. "to-violet-400" */
  accentTo: string;
  /** RGBA string for the card hover glow — keep alpha 0.10–0.18 */
  glowColor: string;
  /**
   * Optional cover image path relative to /public.
   * e.g. "/vision/project-01/cover.webp"
   * Drop the file into public/vision/project-XX/ first.
   */
  coverImage?: string;
  /**
   * Optional HTML document path relative to /public to be shown when clicked.
   */
  htmlPath?: string;
  /**
   * Optional gallery images shown inside the expanded card.
   * All paths relative to /public.
   */
  gallery?: string[];
  /** Optional extended notes, links, and status tracking */
  details?: VisionDetails;
}

// ─── Vision Projects ─────────────────────────────────────────────────────────
// Add, remove, or reorder entries here.
// See data/vision/README.md for the full field reference.

export const visionProjects: VisionProject[] = [
  {
    num: "01",
    category: { en: "National Identity", de: "Nationale Identität", ar: "الهوية الوطنية" },
    title: {
      en: "New Syria — Brand & Visual Identity System",
      de: "Neues Syrien — Marken- & visuelles Identitätssystem",
      ar: "سوريا الجديدة — نظام الهوية البصرية",
    },
    body: {
      en: "A comprehensive national visual identity for the new Syria: emblem, flag, color palette, typography, design patterns, and government infrastructure guidelines — built to last generations.",
      de: "Eine umfassende nationale visuelle Identität für das neue Syrien: Wappen, Flagge, Farbpalette, Typografie, Gestaltungsmuster und Richtlinien für staatliche Infrastruktur — gebaut, um Generationen zu überdauern.",
      ar: "هوية بصرية وطنية شاملة لسوريا الجديدة: الشعار والعلم ولوحة الألوان والخطوط والأنماط الزخرفية وإرشادات البنية الحكومية — مصمّمة لتدوم لأجيال.",
    },
    tags: [
      { en: "Brand Identity", de: "Markenidentität", ar: "هوية العلامة" },
      "SVG",
      { en: "Design System", de: "Designsystem", ar: "نظام تصميم" },
      { en: "Government", de: "Staat", ar: "حكومي" },
    ],
    accentFrom: "from-green-400",
    accentTo: "to-emerald-400",
    glowColor: "rgba(52,211,153,0.18)",
    coverImage: "/vision/project-01/card-image.png",
    htmlPath: "/vision/project-01/doc.html",
    details: {
      status: "building",
      problem:
        "Syria's transition demands a unified, modern national identity that reflects its people, history, and future — no such system currently exists.",
      approach:
        "Design from first principles: emblem, flag proportions, official palette, Arabic + Latin typefaces, pattern library, and a digital-first government UI kit.",
    },
  },
  {
    num: "02",
    category: { en: "Web Platform", de: "Webplattform", ar: "منصّة ويب" },
    title: {
      en: "Real-Time Collaborative Code Editor",
      de: "Kollaborativer Code-Editor in Echtzeit",
      ar: "محرّر أكواد تعاوني فوري",
    },
    body: {
      en: "A browser-based IDE with live multiplayer cursors powered by CRDTs. Think Figma multiplayer but for code — with integrated AI pair-programming and inline diff reviews.",
      de: "Eine IDE im Browser mit Live-Cursorn mehrerer Nutzer auf Basis von CRDTs. Wie der Mehrspielermodus von Figma, nur für Code — mit integriertem KI-Pair-Programming und Diff-Reviews direkt im Editor.",
      ar: "بيئة تطوير في المتصفح بمؤشرات حيّة لعدة مستخدمين تعمل بتقنية CRDTs. مثل العمل الجماعي في Figma لكن للبرمجة — مع برمجة ثنائية بالذكاء الاصطناعي ومراجعة الفروقات داخل المحرّر.",
    },
    tags: ["CRDTs", "WebRTC", "Monaco", "AI"],
    accentFrom: "from-violet-400",
    accentTo: "to-fuchsia-400",
    glowColor: "rgba(139,92,246,0.15)",
    details: {
      status: "research",
      problem:
        "Real-time code collaboration still requires heavy infra (CodeSandbox, StackBlitz). A lightweight, self-hostable alternative is missing.",
      approach:
        "Use Yjs CRDTs over WebRTC for peer-to-peer sync, embed Monaco Editor, and hook into an LLM API for inline suggestions.",
    },
  },
  {
    num: "03",
    category: { en: "Booking Platform", de: "Buchungsplattform", ar: "منصّة حجوزات" },
    title: {
      en: "Playground 360 — Find · Book · Play",
      de: "Playground 360 — Finden · Buchen · Spielen",
      ar: "Playground 360 — ابحث · احجز · العب",
    },
    body: {
      en: "A multi-tenant booking platform for playgrounds, sports fields & recreational areas. Discover spots on a live map, then reserve via time-slots, period rentals, or custom offers — real-time and AI-ready, built for the German market.",
      de: "Eine mandantenfähige Buchungsplattform für Spielplätze, Sportplätze und Freizeitflächen. Orte auf einer Live-Karte entdecken und per Zeitfenster, Zeitraummiete oder individuellem Angebot reservieren — in Echtzeit, KI-fähig und für den deutschen Markt gebaut.",
      ar: "منصّة حجوزات متعددة المستأجرين للملاعب وساحات الألعاب والمساحات الترفيهية. اكتشف الأماكن على خريطة حيّة، ثم احجز بالفترات الزمنية أو بالإيجار لمدة أو بعروض مخصّصة — فورية وجاهزة للذكاء الاصطناعي، ومصمّمة للسوق الألمانية.",
    },
    tags: [
      "NestJS",
      "Next.js",
      "Stripe",
      { en: "Real-time", de: "Echtzeit", ar: "فوري" },
      { en: "Multi-tenant", de: "Mandantenfähig", ar: "متعدد المستأجرين" },
    ],
    accentFrom: "from-lime-400",
    accentTo: "to-teal-400",
    glowColor: "rgba(201,242,75,0.15)",
    htmlPath: "/vision/project-03/doc.html",
    details: {
      status: "idea",
      problem:
        "Booking a playground, sports field, or recreational area still means phone calls and guesswork — there's no unified, real-time way to discover availability and reserve a spot.",
      approach:
        "An API-first NestJS core feeding web, mobile, and an AI chatbot, with concurrency-safe booking (row-level locks), Stripe Connect payments, live WebSocket capacity, and Europe/Berlin-correct, GDPR-ready localization.",
    },
  },
];

// ─── Resolve to one language ─────────────────────────────────────────────────

/** A vision project with every card text in one language. */
export type LocalizedVisionProject = Omit<VisionProject, "category" | "title" | "body" | "tags"> & {
  category: string;
  title: string;
  body: string;
  tags: string[];
};

export function getVisionProjects(lang: Lang): LocalizedVisionProject[] {
  return visionProjects.map((p) => ({
    ...p,
    category: tx(p.category, lang),
    title: tx(p.title, lang),
    body: tx(p.body, lang),
    tags: p.tags.map((t) => tx(t, lang)),
  }));
}
