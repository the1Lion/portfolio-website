// ─── Vision Project Types ────────────────────────────────────────────────────

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
  category: string;
  /** Card headline */
  title: string;
  /** One-to-two sentence description (rendered italic) */
  body: string;
  /** Tech / concept tags shown as pill badges */
  tags: string[];
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
    category: "National Identity",
    title: "New Syria — Brand & Visual Identity System",
    body: "A comprehensive national visual identity for the new Syria: emblem, flag, color palette, typography, design patterns, and government infrastructure guidelines — built to last generations.",
    tags: ["Brand Identity", "SVG", "Design System", "Government"],
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
    category: "Web Platform",
    title: "Real-Time Collaborative Code Editor",
    body: "A browser-based IDE with live multiplayer cursors powered by CRDTs. Think Figma multiplayer but for code — with integrated AI pair-programming and inline diff reviews.",
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
];
