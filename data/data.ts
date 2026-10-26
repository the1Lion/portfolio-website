export interface PersonalInfo {
  name: string;
  titles: string[];
  location: string;
  email: string;
  phone: string;
  shortBio: string;
}

export interface SkillItem {
  name: string;
  level?: "Advanced" | "Intermediate" | "Basic";
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  highlights?: string[];
  isSchubwerk?: boolean;
  link?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  thesis?: {
    title: string;
    tech: string[];
  };
  details?: string;
}

export const personalInfo: PersonalInfo = {
  name: "Mohamad Katramez",
  titles: ["Informatiker", "Full-Stack Developer", "Data Engineer"],
  location: "Wiesbaden, Germany",
  email: "Mohamadkatramez98@gmail.com",
  phone: "+49 (0)174 6197197",
  shortBio: "Architecting scalable SaaS platforms, high-performance digital systems, and custom AI integrations.",
};

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "PHP", level: "Advanced" },
      { name: "Java", level: "Advanced" },
      { name: "C", level: "Advanced" },
      { name: "C#", level: "Advanced" },
      { name: "Kotlin" },
    ],
  },
  {
    category: "Web & Frontend",
    skills: [
      { name: "HTML", level: "Advanced" },
      { name: "CSS", level: "Advanced" },
      { name: "SASS", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
      { name: "Framer Motion" },
      { name: "React Query" },
      { name: "Recharts" },
      { name: "next-intl" },
      { name: "Vite" },
    ],
  },
  {
    category: "Frameworks & Backend",
    skills: [
      { name: "Next JS" },
      { name: "React" },
      { name: "Vue JS" },
      { name: "Laravel" },
      { name: "SpringBoot" },
      { name: "FastAPI" },
      { name: "Node.js" },
      { name: "Prisma" },
      { name: "Medusa v2" },
      { name: "Shopware" },
      { name: "WordPress Block Themes" },
      { name: "WebSockets" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL" },
      { name: "Neon" },
      { name: "MySQL" },
      { name: "MongoDB" },
    ],
  },
  {
    category: "AI & Machine Learning",
    skills: [
      { name: "Claude" },
      { name: "Gemini" },
      { name: "OpenAI GPT-4o" },
      { name: "Vercel AI SDK" },
      { name: "YOLOv8" },
      { name: "OpenCV" },
      { name: "ONNX Runtime" },
      { name: "Speechmatics" },
      { name: "Soniox" },
      { name: "Web Speech API" },
    ],
  },
  {
    category: "Robotics & Hardware",
    skills: [
      { name: "ROS 2 Humble" },
      { name: "Raspberry Pi 5" },
      { name: "OAK-D Lite (DepthAI)" },
      { name: "Tinkerforge" },
      { name: "pib v4" },
      { name: "3D Printing" },
    ],
  },
  {
    category: "Automation & APIs",
    skills: [
      { name: "n8n" },
      { name: "WhatsApp Business API" },
      { name: "Google APIs" },
      { name: "Stripe" },
      { name: "Resend" },
    ],
  },
  {
    category: "Mobile",
    skills: [
      { name: "Jetpack Compose" },
      { name: "Android TV / Fire OS" },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Docker" },
      { name: "GIT" },
      { name: "Vercel" },
      { name: "Cloudflare R2" },
      { name: "Playwright" },
      { name: "Vitest" },
      { name: "Gradle" },
      { name: "Dagster" },
    ],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    company: "Silicortex",
    location: "Wiesbaden",
    role: "Founder & CEO",
    period: "04/2026 - Present",
    description: "Founded my own AI and automation agency: AI agents built on RAG and LLMs, workflow automation with n8n, and custom full-stack development — from concept to operation.",
    highlights: ["RAG & LLM agents", "n8n workflow automation", "Full-stack products"],
    isSchubwerk: false,
    link: "https://silicortex.de",
  },
  {
    company: "DVKZWI Wiesbaden e. V.",
    location: "Wiesbaden",
    role: "Volunteer — Robotics Project",
    period: "07/2026 - Present",
    description: "Building the open-source humanoid robot pib (version 4): 3D printing, assembly and commissioning.",
    highlights: ["Humanoid robotics", "3D printing", "ROS 2"],
    isSchubwerk: false,
  },
  {
    company: "UNICEF Germany",
    location: "Wiesbaden",
    role: "Volunteer — UNICEF Working Group",
    period: "07/2026 - Present",
    description: "Fundraising campaigns for UNICEF emergency relief and public outreach.",
    highlights: ["Fundraising", "Public outreach"],
    isSchubwerk: false,
  },
  {
    company: "schubwerk GmbH",
    location: "Wiesbaden",
    role: "Web Development & AI Integration",
    period: "08/2024 - 03/2026",
    description: "Data Warehouse implementation and artificial intelligence integration into existing systems.",
    highlights: ["Data Warehouse architecture", "AI agents & integrations"],
    isSchubwerk: true,
  },
  {
    company: "schubwerk GmbH",
    location: "Wiesbaden",
    role: "Working Student",
    period: "10/2023 - 08/2024",
    description: "API development, optimization, and system-wide bug fixing.",
    highlights: ["API design & development", "Bug diagnostics & hotfixes"],
    isSchubwerk: true,
  },
  {
    company: "schubwerk GmbH",
    location: "Wiesbaden",
    role: "Intern",
    period: "09/2022 - 04/2023",
    description: "Developed sub-modules using PHP-Laravel and Vue.js frameworks.",
    highlights: ["PHP-Laravel sub-modules", "Vue.js reactive components"],
    isSchubwerk: true,
  },
  {
    company: "Evoila GmbH",
    location: "Mainz",
    role: "Intern",
    period: "09/2021 - 10/2021",
    description: "Worked on Java and Spring Boot backend enterprise microservices.",
    highlights: ["Java microservices", "Spring Boot architecture"],
    isSchubwerk: false,
  },
];

export const educationData: EducationItem[] = [
  {
    institution: "IBM via Coursera",
    degree: "Build RAG Applications",
    period: "06/2026",
    details: "Certification in retrieval-augmented generation: embeddings, vector databases and connecting LLMs to real data.",
  },
  {
    institution: "IBM via Coursera",
    degree: "Develop Generative AI Applications",
    period: "04/2026",
    details: "Specialized certification in building generative AI applications using large language models, APIs, and modern orchestration tools.",
  },
  {
    institution: "Hochschule RheinMain",
    degree: "Bachelor in Applied Informatics",
    period: "10/2019 - 04/2024",
    thesis: {
      title: "Sales forecasting system using Machine Learning",
      tech: ["PHP", "Python"],
    },
    details: "Focused on software engineering, data science, and machine learning models for forecasting business metrics.",
  },
];

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tech: string[];
  link?: string;
  featured?: boolean;
}

export const projectsData: ProjectItem[] = [
  {
    title: "Noah — Humanoid Robot",
    category: "Robotics / AI",
    description: "A pib v4 humanoid assembled from 3D-printed parts and extended on a Raspberry Pi 5 with ROS 2: it talks in German and English, recognises people with their consent, detects objects with YOLOv8 on ONNX, and is run from a custom tablet control panel.",
    tech: ["ROS 2", "Python", "FastAPI", "OpenCV", "YOLOv8", "Docker"],
    link: "https://www.linkedin.com/posts/mohamad-katramez-a24705215_robotics-pibrocks-ros2-activity-7511658836634714112-PWnQ",
    featured: true,
  },
  {
    title: "Vibe Center",
    category: "SaaS · Silicortex",
    description: "Multi-tenant booking platform for salons and barber shops: each business gets its own booking site, a dashboard for appointments, team and clients, and a Stripe subscription.",
    tech: ["Next.js", "TypeScript", "Stripe", "Vercel AI SDK"],
    link: "https://vibecenter.de",
    featured: false,
  },
  {
    title: "Sada — Live Translation",
    category: "Speech AI · Client",
    description: "Arabic sermons are transcribed as they are spoken and translated into German and English — on a screen in the prayer room and on every visitor's phone via QR code.",
    tech: ["FastAPI", "WebSockets", "Speechmatics", "Gemini"],
    featured: false,
  },
  {
    title: "Misraba — Workshop Platform",
    category: "Automation · Client",
    description: "One system for a heavy machinery repair workshop in Abu Dhabi: a drag-and-drop job board, quotes as PDF, a parts shop and public website in Arabic and English — with n8n and WhatsApp automation for mechanics and customers.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "n8n", "WhatsApp API", "Claude"],
    featured: true,
  },
  {
    title: "EuroCura",
    category: "Web Platform · Client",
    description: "A home care platform connecting people who need care with professional carers — from search and booking to online payment and PDF invoices.",
    tech: ["Laravel", "Next.js", "Stripe", "Docker"],
    featured: false,
  },
  {
    title: "PowerSource",
    category: "E-Commerce · Silicortex",
    description: "A complete online shop for sports nutrition and apparel on its own Medusa v2 backend, with a multilingual storefront and an AI assistant for product questions.",
    tech: ["Medusa v2", "Next.js", "React Query", "Claude"],
    featured: false,
  },
  {
    title: "DVKZWI Website",
    category: "WordPress · Voluntary",
    description: "A website for a Wiesbaden cultural association on a custom WordPress block theme, with a plugin for events, projects and team that the association maintains itself.",
    tech: ["WordPress", "PHP", "Block Theme"],
    featured: false,
  },
  {
    title: "RETO — Real Estate Tax Optimizer",
    category: "Tax Tech · Client",
    description: "A tax assistant for real estate investors: a rule engine that computes rental income under § 21 EStG — depreciation, the 15% rule and loss carryforward — with tax rules stored per year as data so AI agents can work with them.",
    tech: ["Next.js", "Supabase", "Python", "FastAPI"],
    featured: false,
  },
  {
    title: "Alsalam School App",
    category: "School Management · Voluntary",
    description: "A free school management system for Arabic schools, built for Al-Salam School in Wiesbaden: students, teachers, classes, timetables, grades and attendance, plus invoices and subscription reminders — in Arabic, German and English.",
    tech: ["Laravel", "Vue.js", "PHP", "Tailwind CSS"],
    featured: false,
  },
  {
    title: "Al Sharq — Old Damascus",
    category: "Website · Client",
    description: "A fast one-page site for a shop in Souq Al-Muradiyya, Old Damascus, in Arabic and English: WhatsApp, Instagram, calls and directions to the door, with structured data so it shows up in local search.",
    tech: ["HTML", "CSS", "Vercel"],
    link: "https://alsharq-damascus.vercel.app",
    featured: false,
  },
  {
    title: "Admin & Bookkeeping",
    category: "Internal Tool · Silicortex",
    description: "Silicortex's own back office: GoBD-compliant invoices, receipts and VAT figures, synced with Google Drive and Calendar — with AI that reads incoming invoices and suggests the booking.",
    tech: ["Next.js", "Neon Postgres", "Gemini", "Cloudflare R2"],
    featured: false,
  },
  {
    title: "Bayt — Fire TV Launcher",
    category: "TV App · Silicortex",
    description: "An ad-free, tracking-free home screen for Fire TV that puts Arabic channels and favourite apps first, with big tiles built for the remote.",
    tech: ["Kotlin", "Jetpack Compose", "Fire OS"],
    featured: false,
  },
  {
    title: "silicortex.de",
    category: "Company Website",
    description: "My company's website in German, English and Arabic (right-to-left), with its own generated brand system, light and dark themes and interactive demos.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://silicortex.de",
    featured: false,
  },
  {
    title: "Sales Forecasting ML System",
    category: "Machine Learning / AI",
    description: "Developed a predictive sales analytics dashboard analyzing past retail metrics to forecast future demands using custom linear regression and time-series algorithms.",
    tech: ["Python", "PHP", "Scikit-Learn", "PostgreSQL"],
    featured: true,
  },
  {
    title: "Autonomous Data Warehouse Pipelines",
    category: "Data Engineering",
    description: "Architected automated ET/ELT pipelines using Dagster and Python to sync millions of raw system event logs into a consolidated warehouse, enabling real-time analytics dashboards.",
    tech: ["Python", "Dagster", "Docker", "PostgreSQL"],
    featured: false,
  },
  {
    title: "SaaS Enterprise API Gateway",
    category: "Web Infrastructure",
    description: "Built a highly optimized microservice communication gateway supporting high concurrency, unified API routing, rate limiting, and standard JWT bearer token authentication.",
    tech: ["PHP", "Laravel", "Docker", "Redis"],
    featured: false,
  },
  {
    title: "Java Cloud Microservice Orchestrator",
    category: "Cloud Native",
    description: "Designed scalable, service-oriented REST sub-modules utilizing Spring Boot framework. Handled asynchronous events, inter-service messaging, and fault-tolerant system design.",
    tech: ["Java", "SpringBoot", "Docker", "MongoDB"],
    featured: true,
  },
];
