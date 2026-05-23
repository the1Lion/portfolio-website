# Vision Data Directory

This folder holds all the content shown on the **Vision page** (`/vision`).

---

## Files

| File | Purpose |
|------|---------|
| `vision.ts` | All typed vision-project entries — edit this to add, remove, or reorder ideas |
| `README.md` | This guide |

---

## How to Add a New Vision Project

Open `vision.ts` and add a new object to the `visionProjects` array:

```ts
{
  // Unique two-digit string used as the display index
  num: "07",

  // Short category label shown top-right of the card
  category: "Your Category",

  // The headline shown on the card
  title: "Your Project Title",

  // One or two sentence description (italic serif on card)
  body: "Describe what you want to build and why it matters.",

  // Tech / concept tags shown as pill badges at the bottom
  tags: ["Tag1", "Tag2", "Tag3"],

  // Tailwind gradient classes for the title text
  // Pick any two compatible Tailwind color stops:
  accentFrom: "from-indigo-400",
  accentTo: "to-violet-400",

  // RGBA color used for the card's ambient hover glow
  // Keep alpha low (0.10 – 0.18) so it stays subtle
  glowColor: "rgba(99,102,241,0.15)",

  // Optional: a longer write-up, links, images, or notes
  // shown on a dedicated detail modal/page in the future
  details: {
    problem: "What problem does this solve?",
    approach: "How would you tackle it?",
    status: "idea" | "research" | "prototype" | "building",
    links: [
      { label: "Reference paper", url: "https://..." },
    ],
  },
}
```

### Accent color palette reference

| Theme       | `accentFrom`       | `accentTo`        | `glowColor`                  |
|-------------|--------------------|--------------------|------------------------------|
| Indigo–Violet | `from-indigo-400` | `to-violet-400`   | `rgba(99,102,241,0.15)`      |
| Violet–Fuchsia | `from-violet-400` | `to-fuchsia-400` | `rgba(139,92,246,0.15)`      |
| Fuchsia–Pink | `from-fuchsia-400` | `to-pink-400`    | `rgba(217,70,239,0.15)`      |
| Sky–Indigo   | `from-sky-400`    | `to-indigo-400`   | `rgba(56,189,248,0.12)`      |
| Emerald–Teal | `from-emerald-400`| `to-teal-400`     | `rgba(52,211,153,0.12)`      |
| Amber–Orange | `from-amber-400`  | `to-orange-400`   | `rgba(251,191,36,0.12)`      |
| Rose–Pink    | `from-rose-400`   | `to-pink-400`     | `rgba(251,113,133,0.12)`     |
| Cyan–Blue    | `from-cyan-400`   | `to-blue-400`     | `rgba(34,211,238,0.12)`      |

---

## Project Status Values

Use the `details.status` field to track where each idea stands:

| Status      | Meaning                                      |
|-------------|----------------------------------------------|
| `idea`      | Just a concept — not yet researched          |
| `research`  | Actively reading / exploring the problem     |
| `prototype` | A rough proof-of-concept exists              |
| `building`  | Actively in development                      |
