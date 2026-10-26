import { tx, type Lang, type Text } from "@/lib/i18n";

// ─── Rendered shapes (one language, plain strings) ───────────────────────────
// Components receive these from getContent(lang); they never see the other
// languages.

export interface PersonalInfo {
  name: string;
  location: string;
  email: string;
  phone: string;
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

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tech: string[];
  link?: string;
  featured?: boolean;
}

// ─── Source shapes (translatable fields are Text) ────────────────────────────
// A field written as a plain string is the same in every language (names,
// technologies); an { en, de, ar } object is translated.

// Only fields typed as plain `string` become translatable — literal unions
// like SkillItem["level"] stay as they are.
type Translated<T> = {
  [K in keyof T]: string extends NonNullable<T[K]>
    ? Text
    : NonNullable<T[K]> extends string[]
      ? Text[]
      : T[K];
};

type SkillCategorySource = { category: Text; skills: Translated<SkillItem>[] };
type EducationSource = Translated<Omit<EducationItem, "thesis">> & {
  thesis?: { title: Text; tech: string[] };
};

const WIESBADEN: Text = { en: "Wiesbaden", de: "Wiesbaden", ar: "فيسبادن" };
const present = (start: string): Text => ({
  en: `${start} - Present`,
  de: `${start} - heute`,
  ar: `${start} - حتى الآن`,
});

const personalInfo: Translated<PersonalInfo> = {
  name: { en: "Mohamad Katramez", de: "Mohamad Katramez", ar: "محمد قطرميز" },
  location: { en: "Wiesbaden, Germany", de: "Wiesbaden, Deutschland", ar: "فيسبادن، ألمانيا" },
  email: "Mohamadkatramez98@gmail.com",
  phone: "+49 (0)174 6197197",
};

const skillsData: SkillCategorySource[] = [
  {
    category: { en: "Languages", de: "Programmiersprachen", ar: "لغات البرمجة" },
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
    category: { en: "Web & Frontend", de: "Web & Frontend", ar: "الويب والواجهات" },
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
    category: { en: "Frameworks & Backend", de: "Frameworks & Backend", ar: "أطر العمل والخوادم" },
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
    category: { en: "Databases", de: "Datenbanken", ar: "قواعد البيانات" },
    skills: [
      { name: "PostgreSQL" },
      { name: "Neon" },
      { name: "MySQL" },
      { name: "MongoDB" },
    ],
  },
  {
    category: { en: "AI & Machine Learning", de: "KI & Machine Learning", ar: "الذكاء الاصطناعي وتعلّم الآلة" },
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
    category: { en: "Robotics & Hardware", de: "Robotik & Hardware", ar: "الروبوتات والعتاد" },
    skills: [
      { name: "ROS 2 Humble" },
      { name: "Raspberry Pi 5" },
      { name: "OAK-D Lite (DepthAI)" },
      { name: "Tinkerforge" },
      { name: "pib v4" },
      { name: { en: "3D Printing", de: "3D-Druck", ar: "الطباعة ثلاثية الأبعاد" } },
    ],
  },
  {
    category: { en: "Automation & APIs", de: "Automatisierung & APIs", ar: "الأتمتة والواجهات البرمجية" },
    skills: [
      { name: "n8n" },
      { name: "WhatsApp Business API" },
      { name: "Google APIs" },
      { name: "Stripe" },
      { name: "Resend" },
    ],
  },
  {
    category: { en: "Mobile", de: "Mobile", ar: "تطبيقات الأجهزة" },
    skills: [
      { name: "Jetpack Compose" },
      { name: "Android TV / Fire OS" },
    ],
  },
  {
    category: { en: "Tools & DevOps", de: "Tools & DevOps", ar: "الأدوات وDevOps" },
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

const experienceData: Translated<ExperienceItem>[] = [
  {
    company: "Silicortex",
    location: WIESBADEN,
    role: { en: "Founder & CEO", de: "Gründer & Geschäftsführer", ar: "المؤسس والرئيس التنفيذي" },
    period: present("04/2026"),
    description: {
      en: "Founded my own AI and automation agency: AI agents built on RAG and LLMs, workflow automation with n8n, and custom full-stack development — from concept to operation.",
      de: "Gründung meiner eigenen Agentur für KI und Automatisierung: KI-Agenten auf Basis von RAG und LLMs, Workflow-Automatisierung mit n8n und individuelle Full-Stack-Entwicklung — vom Konzept bis zum Betrieb.",
      ar: "أسّست وكالتي الخاصة للذكاء الاصطناعي والأتمتة: وكلاء ذكاء اصطناعي مبنيّون على RAG ونماذج اللغة الكبيرة، وأتمتة سير العمل باستخدام n8n، وتطوير Full Stack مخصّص — من الفكرة حتى التشغيل.",
    },
    highlights: [
      { en: "RAG & LLM agents", de: "RAG- & LLM-Agenten", ar: "وكلاء RAG ونماذج اللغة" },
      { en: "n8n workflow automation", de: "Workflow-Automatisierung mit n8n", ar: "أتمتة سير العمل بـ n8n" },
      { en: "Full-stack products", de: "Full-Stack-Produkte", ar: "منتجات Full Stack" },
    ],
    isSchubwerk: false,
    link: "https://silicortex.de",
  },
  {
    company: "DVKZWI Wiesbaden e. V.",
    location: WIESBADEN,
    role: {
      en: "Volunteer — Robotics Project",
      de: "Ehrenamt — Robotik-Projekt",
      ar: "متطوّع — مشروع الروبوتات",
    },
    period: present("07/2026"),
    description: {
      en: "Building the open-source humanoid robot pib (version 4): 3D printing, assembly and commissioning.",
      de: "Aufbau des Open-Source-Humanoiden pib (Version 4): 3D-Druck, Montage und Inbetriebnahme.",
      ar: "بناء الروبوت البشري مفتوح المصدر pib (الإصدار 4): الطباعة ثلاثية الأبعاد والتجميع والتشغيل.",
    },
    highlights: [
      { en: "Humanoid robotics", de: "Humanoide Robotik", ar: "الروبوتات البشرية" },
      { en: "3D printing", de: "3D-Druck", ar: "الطباعة ثلاثية الأبعاد" },
      "ROS 2",
    ],
    isSchubwerk: false,
  },
  {
    company: { en: "UNICEF Germany", de: "UNICEF Deutschland", ar: "اليونيسف ألمانيا" },
    location: WIESBADEN,
    role: {
      en: "Volunteer — UNICEF Working Group",
      de: "Ehrenamt — UNICEF-Arbeitsgruppe",
      ar: "متطوّع — مجموعة عمل اليونيسف",
    },
    period: present("07/2026"),
    description: {
      en: "Fundraising campaigns for UNICEF emergency relief and public outreach.",
      de: "Spendenaktionen für die UNICEF-Nothilfe und Öffentlichkeitsarbeit.",
      ar: "حملات لجمع التبرعات لصالح الإغاثة الطارئة لليونيسف، والتوعية العامة.",
    },
    highlights: [
      { en: "Fundraising", de: "Spendenaktionen", ar: "جمع التبرعات" },
      { en: "Public outreach", de: "Öffentlichkeitsarbeit", ar: "التوعية العامة" },
    ],
    isSchubwerk: false,
  },
  {
    company: "schubwerk GmbH",
    location: WIESBADEN,
    role: {
      en: "Web Development & AI Integration",
      de: "Webentwicklung & KI-Integration",
      ar: "تطوير الويب ودمج الذكاء الاصطناعي",
    },
    period: "08/2024 - 03/2026",
    description: {
      en: "Data Warehouse implementation and artificial intelligence integration into existing systems.",
      de: "Aufbau eines Data Warehouse und Integration künstlicher Intelligenz in bestehende Systeme.",
      ar: "بناء مستودع بيانات (Data Warehouse) ودمج الذكاء الاصطناعي في الأنظمة القائمة.",
    },
    highlights: [
      { en: "Data Warehouse architecture", de: "Data-Warehouse-Architektur", ar: "بنية مستودع البيانات" },
      { en: "AI agents & integrations", de: "KI-Agenten & Integrationen", ar: "وكلاء وتكاملات الذكاء الاصطناعي" },
    ],
    isSchubwerk: true,
  },
  {
    company: "schubwerk GmbH",
    location: WIESBADEN,
    role: { en: "Working Student", de: "Werkstudent", ar: "طالب عامل" },
    period: "10/2023 - 08/2024",
    description: {
      en: "API development, optimization, and system-wide bug fixing.",
      de: "API-Entwicklung, Optimierung und systemweite Fehlerbehebung.",
      ar: "تطوير الواجهات البرمجية (APIs) وتحسينها وإصلاح الأخطاء على مستوى النظام.",
    },
    highlights: [
      { en: "API design & development", de: "API-Design & -Entwicklung", ar: "تصميم وتطوير APIs" },
      { en: "Bug diagnostics & hotfixes", de: "Fehleranalyse & Hotfixes", ar: "تشخيص الأخطاء والإصلاحات العاجلة" },
    ],
    isSchubwerk: true,
  },
  {
    company: "schubwerk GmbH",
    location: WIESBADEN,
    role: { en: "Intern", de: "Praktikant", ar: "متدرّب" },
    period: "09/2022 - 04/2023",
    description: {
      en: "Developed sub-modules using PHP-Laravel and Vue.js frameworks.",
      de: "Entwicklung von Teilmodulen mit den Frameworks PHP-Laravel und Vue.js.",
      ar: "تطوير وحدات فرعية باستخدام إطاري PHP-Laravel وVue.js.",
    },
    highlights: [
      { en: "PHP-Laravel sub-modules", de: "Teilmodule mit PHP-Laravel", ar: "وحدات فرعية بـ PHP-Laravel" },
      { en: "Vue.js reactive components", de: "Reaktive Vue.js-Komponenten", ar: "مكوّنات Vue.js تفاعلية" },
    ],
    isSchubwerk: true,
  },
  {
    company: "Evoila GmbH",
    location: { en: "Mainz", de: "Mainz", ar: "ماينتس" },
    role: { en: "Intern", de: "Praktikant", ar: "متدرّب" },
    period: "09/2021 - 10/2021",
    description: {
      en: "Worked on Java and Spring Boot backend enterprise microservices.",
      de: "Mitarbeit an Enterprise-Microservices im Backend mit Java und Spring Boot.",
      ar: "العمل على خدمات مصغّرة (Microservices) مؤسسية في الواجهة الخلفية باستخدام Java وSpring Boot.",
    },
    highlights: [
      { en: "Java microservices", de: "Java-Microservices", ar: "خدمات Java مصغّرة" },
      { en: "Spring Boot architecture", de: "Spring-Boot-Architektur", ar: "بنية Spring Boot" },
    ],
    isSchubwerk: false,
  },
];

const educationData: EducationSource[] = [
  {
    institution: { en: "IBM via Coursera", de: "IBM über Coursera", ar: "IBM عبر Coursera" },
    degree: "Build RAG Applications",
    period: "06/2026",
    details: {
      en: "Certification in retrieval-augmented generation: embeddings, vector databases and connecting LLMs to real data.",
      de: "Zertifikat in Retrieval-Augmented Generation: Embeddings, Vektordatenbanken und die Anbindung von LLMs an echte Daten.",
      ar: "شهادة في التوليد المعزّز بالاسترجاع (RAG): التضمينات، وقواعد البيانات المتجهية، وربط نماذج اللغة الكبيرة ببيانات حقيقية.",
    },
  },
  {
    institution: { en: "IBM via Coursera", de: "IBM über Coursera", ar: "IBM عبر Coursera" },
    degree: "Develop Generative AI Applications",
    period: "04/2026",
    details: {
      en: "Specialized certification in building generative AI applications using large language models, APIs, and modern orchestration tools.",
      de: "Spezialisiertes Zertifikat für die Entwicklung generativer KI-Anwendungen mit großen Sprachmodellen, APIs und modernen Orchestrierungswerkzeugen.",
      ar: "شهادة متخصّصة في بناء تطبيقات الذكاء الاصطناعي التوليدي باستخدام نماذج اللغة الكبيرة والواجهات البرمجية وأدوات التنسيق الحديثة.",
    },
  },
  {
    institution: "Hochschule RheinMain",
    degree: {
      en: "Bachelor in Applied Informatics",
      de: "Bachelor Angewandte Informatik",
      ar: "بكالوريوس في المعلوماتية التطبيقية",
    },
    period: "10/2019 - 04/2024",
    thesis: {
      title: {
        en: "Sales forecasting system using Machine Learning",
        de: "Absatzprognosesystem mit Machine Learning",
        ar: "نظام للتنبؤ بالمبيعات باستخدام تعلّم الآلة",
      },
      tech: ["PHP", "Python"],
    },
    details: {
      en: "Focused on software engineering, data science, and machine learning models for forecasting business metrics.",
      de: "Schwerpunkte: Softwaretechnik, Data Science und Machine-Learning-Modelle zur Prognose von Geschäftskennzahlen.",
      ar: "تركيز على هندسة البرمجيات وعلم البيانات ونماذج تعلّم الآلة للتنبؤ بمؤشرات الأعمال.",
    },
  },
];

const projectsData: Translated<ProjectItem>[] = [
  {
    title: { en: "Noah — Humanoid Robot", de: "Noah — Humanoider Roboter", ar: "Noah — روبوت بشري" },
    category: { en: "Robotics / AI", de: "Robotik / KI", ar: "روبوتات / ذكاء اصطناعي" },
    description: {
      en: "A pib v4 humanoid assembled from 3D-printed parts and extended on a Raspberry Pi 5 with ROS 2: it talks in German and English, recognises people with their consent, detects objects with YOLOv8 on ONNX, and is run from a custom tablet control panel.",
      de: "Ein pib-v4-Humanoid aus 3D-gedruckten Teilen, erweitert auf einem Raspberry Pi 5 mit ROS 2: Er spricht Deutsch und Englisch, erkennt Personen mit deren Einwilligung, erkennt Objekte mit YOLOv8 auf ONNX und wird über ein eigenes Tablet-Bedienfeld gesteuert.",
      ar: "روبوت بشري من طراز pib v4 مُجمَّع من قطع مطبوعة ثلاثيًا ومُطوَّر على Raspberry Pi 5 باستخدام ROS 2: يتحدث الألمانية والإنجليزية، ويتعرّف على الأشخاص بموافقتهم، ويكتشف الأجسام باستخدام YOLOv8 على ONNX، ويُدار من لوحة تحكم مخصّصة على جهاز لوحي.",
    },
    tech: ["ROS 2", "Python", "FastAPI", "OpenCV", "YOLOv8", "Docker"],
    link: "https://www.linkedin.com/posts/mohamad-katramez-a24705215_robotics-pibrocks-ros2-activity-7511658836634714112-PWnQ",
    featured: true,
  },
  {
    title: "Vibe Center",
    category: "SaaS · Silicortex",
    description: {
      en: "Multi-tenant booking platform for salons and barber shops: each business gets its own booking site, a dashboard for appointments, team and clients, and a Stripe subscription.",
      de: "Mandantenfähige Buchungsplattform für Salons und Barbershops: Jeder Betrieb erhält eine eigene Buchungsseite, ein Dashboard für Termine, Team und Kunden sowie ein Stripe-Abo.",
      ar: "منصّة حجوزات متعددة المستأجرين لصالونات التجميل والحلاقة: يحصل كل نشاط على موقع حجز خاص به، ولوحة تحكم للمواعيد والفريق والعملاء، واشتراك عبر Stripe.",
    },
    tech: ["Next.js", "TypeScript", "Stripe", "Vercel AI SDK"],
    link: "https://vibecenter.de",
    featured: false,
  },
  {
    title: { en: "Sada — Live Translation", de: "Sada — Live-Übersetzung", ar: "صدى — ترجمة فورية" },
    category: { en: "Speech AI · Client", de: "Sprach-KI · Kunde", ar: "ذكاء صوتي · عميل" },
    description: {
      en: "Arabic sermons are transcribed as they are spoken and translated into German and English — on a screen in the prayer room and on every visitor's phone via QR code.",
      de: "Arabische Predigten werden in Echtzeit transkribiert und ins Deutsche und Englische übersetzt — auf einem Bildschirm im Gebetsraum und per QR-Code auf dem Handy jedes Besuchers.",
      ar: "تُفرَّغ الخطب العربية نصيًا لحظة إلقائها وتُترجَم إلى الألمانية والإنجليزية — على شاشة في المصلّى وعلى هاتف كل زائر عبر رمز QR.",
    },
    tech: ["FastAPI", "WebSockets", "Speechmatics", "Gemini"],
    featured: false,
  },
  {
    title: { en: "Misraba — Workshop Platform", de: "Misraba — Werkstattplattform", ar: "مسربة — منصّة ورشة" },
    category: { en: "Automation · Client", de: "Automatisierung · Kunde", ar: "أتمتة · عميل" },
    description: {
      en: "One system for a heavy machinery repair workshop in Abu Dhabi: a drag-and-drop job board, quotes as PDF, a parts shop and public website in Arabic and English — with n8n and WhatsApp automation for mechanics and customers.",
      de: "Ein System für eine Reparaturwerkstatt für Schwermaschinen in Abu Dhabi: ein Drag-and-drop-Auftragsboard, Angebote als PDF, ein Ersatzteilshop und eine öffentliche Website auf Arabisch und Englisch — mit n8n- und WhatsApp-Automatisierung für Mechaniker und Kunden.",
      ar: "نظام واحد لورشة إصلاح معدّات ثقيلة في أبوظبي: لوحة مهام بالسحب والإفلات، وعروض أسعار بصيغة PDF، ومتجر قطع غيار، وموقع عام بالعربية والإنجليزية — مع أتمتة عبر n8n وواتساب للفنيين والعملاء.",
    },
    tech: ["Next.js", "Prisma", "PostgreSQL", "n8n", "WhatsApp API", "Claude"],
    featured: true,
  },
  {
    title: "EuroCura",
    category: { en: "Web Platform · Client", de: "Webplattform · Kunde", ar: "منصّة ويب · عميل" },
    description: {
      en: "A home care platform connecting people who need care with professional carers — from search and booking to online payment and PDF invoices.",
      de: "Eine Plattform für häusliche Pflege, die Pflegebedürftige mit professionellen Pflegekräften verbindet — von der Suche und Buchung bis zur Online-Zahlung und PDF-Rechnung.",
      ar: "منصّة رعاية منزلية تربط من يحتاجون إلى الرعاية بمقدّمي رعاية محترفين — من البحث والحجز إلى الدفع الإلكتروني وفواتير PDF.",
    },
    tech: ["Laravel", "Next.js", "Stripe", "Docker"],
    featured: false,
  },
  {
    title: "PowerSource",
    category: { en: "E-Commerce · Silicortex", de: "E-Commerce · Silicortex", ar: "تجارة إلكترونية · Silicortex" },
    description: {
      en: "A complete online shop for sports nutrition and apparel on its own Medusa v2 backend, with a multilingual storefront and an AI assistant for product questions.",
      de: "Ein kompletter Onlineshop für Sportnahrung und Bekleidung auf eigenem Medusa-v2-Backend, mit mehrsprachigem Storefront und einem KI-Assistenten für Produktfragen.",
      ar: "متجر إلكتروني متكامل للمكمّلات الرياضية والملابس على واجهة خلفية خاصة مبنية بـ Medusa v2، مع واجهة متجر متعددة اللغات ومساعد ذكي للإجابة عن أسئلة المنتجات.",
    },
    tech: ["Medusa v2", "Next.js", "React Query", "Claude"],
    featured: false,
  },
  {
    title: { en: "DVKZWI Website", de: "DVKZWI-Website", ar: "موقع DVKZWI" },
    category: { en: "WordPress · Voluntary", de: "WordPress · Ehrenamtlich", ar: "WordPress · تطوّعي" },
    description: {
      en: "A website for a Wiesbaden cultural association on a custom WordPress block theme, with a plugin for events, projects and team that the association maintains itself.",
      de: "Eine Website für einen Wiesbadener Kulturverein auf einem eigenen WordPress-Block-Theme, mit einem Plugin für Veranstaltungen, Projekte und Team, das der Verein selbst pflegt.",
      ar: "موقع لجمعية ثقافية في فيسبادن مبني على قالب WordPress Block مخصّص، مع إضافة للفعاليات والمشاريع والفريق تديرها الجمعية بنفسها.",
    },
    tech: ["WordPress", "PHP", "Block Theme"],
    featured: false,
  },
  {
    title: "RETO — Real Estate Tax Optimizer",
    category: {
      en: "Tax Tech · Client · In Development",
      de: "Steuer-Tech · Kunde · In Entwicklung",
      ar: "تقنية ضريبية · عميل · قيد التطوير",
    },
    description: {
      en: "Currently in development — a tax assistant for real estate investors: a rule engine that computes rental income under § 21 EStG — depreciation, the 15% rule and loss carryforward — with tax rules stored per year as data so AI agents can work with them.",
      de: "Derzeit in Entwicklung — ein Steuerassistent für Immobilieninvestoren: eine Regel-Engine, die Einkünfte aus Vermietung nach § 21 EStG berechnet — AfA, 15-%-Grenze und Verlustvortrag — mit Steuerregeln, die pro Jahr als Daten hinterlegt sind, damit KI-Agenten damit arbeiten können.",
      ar: "قيد التطوير حاليًا — مساعد ضريبي للمستثمرين العقاريين: محرّك قواعد يحسب دخل الإيجار وفق المادة 21 من قانون ضريبة الدخل الألماني (EStG) — الإهلاك وقاعدة الـ15% وترحيل الخسائر — مع تخزين القواعد الضريبية لكل سنة كبيانات ليتمكّن وكلاء الذكاء الاصطناعي من العمل بها.",
    },
    tech: ["Next.js", "Supabase", "Python", "FastAPI"],
    featured: false,
  },
  {
    title: { en: "Alsalam School App", de: "Alsalam School App", ar: "تطبيق مدرسة السلام" },
    category: {
      en: "School Management · Voluntary",
      de: "Schulverwaltung · Ehrenamtlich",
      ar: "إدارة مدرسية · تطوّعي",
    },
    description: {
      en: "A free school management system for Arabic schools, built for Al-Salam School in Wiesbaden: students, teachers, classes, timetables, grades and attendance, plus invoices and subscription reminders — in Arabic, German and English.",
      de: "Ein kostenloses Schulverwaltungssystem für arabische Schulen, entwickelt für die Al-Salam-Schule in Wiesbaden: Schüler, Lehrkräfte, Klassen, Stundenpläne, Noten und Anwesenheit sowie Rechnungen und Beitragserinnerungen — auf Arabisch, Deutsch und Englisch.",
      ar: "نظام مجاني لإدارة المدارس العربية، بُني لمدرسة السلام في فيسبادن: الطلاب والمعلمون والصفوف والجداول والدرجات والحضور، إضافة إلى الفواتير وتذكيرات الاشتراك — بالعربية والألمانية والإنجليزية.",
    },
    tech: ["Laravel", "Vue.js", "PHP", "Tailwind CSS"],
    featured: false,
  },
  {
    title: { en: "Al Sharq — Old Damascus", de: "Al Sharq — Altstadt Damaskus", ar: "الشرق — دمشق القديمة" },
    category: { en: "Website · Client", de: "Website · Kunde", ar: "موقع ويب · عميل" },
    description: {
      en: "A fast one-page site for a shop in Souq Al-Muradiyya, Old Damascus, in Arabic and English: WhatsApp, Instagram, calls and directions to the door, with structured data so it shows up in local search.",
      de: "Eine schnelle One-Page-Website für ein Geschäft im Souq Al-Muradiyya in der Altstadt von Damaskus, auf Arabisch und Englisch: WhatsApp, Instagram, Anruf und Wegbeschreibung bis zur Tür, mit strukturierten Daten für die lokale Suche.",
      ar: "موقع سريع من صفحة واحدة لمتجر في سوق المرادية بدمشق القديمة، بالعربية والإنجليزية: واتساب وإنستغرام والاتصال والوصول حتى باب المتجر، مع بيانات منظّمة ليظهر في نتائج البحث المحلي.",
    },
    tech: ["HTML", "CSS", "Vercel"],
    link: "https://alsharq-damascus.vercel.app",
    featured: false,
  },
  {
    title: { en: "Admin & Bookkeeping", de: "Verwaltung & Buchhaltung", ar: "الإدارة والمحاسبة" },
    category: { en: "Internal Tool · Silicortex", de: "Internes Tool · Silicortex", ar: "أداة داخلية · Silicortex" },
    description: {
      en: "Silicortex's own back office: GoBD-compliant invoices, receipts and VAT figures, synced with Google Drive and Calendar — with AI that reads incoming invoices and suggests the booking.",
      de: "Das eigene Backoffice von Silicortex: GoBD-konforme Rechnungen, Belege und Umsatzsteuerzahlen, synchronisiert mit Google Drive und Kalender — mit KI, die eingehende Rechnungen liest und die Buchung vorschlägt.",
      ar: "المكتب الخلفي الخاص بـ Silicortex: فواتير وإيصالات وأرقام ضريبة القيمة المضافة متوافقة مع معايير GoBD، ومتزامنة مع Google Drive والتقويم — مع ذكاء اصطناعي يقرأ الفواتير الواردة ويقترح القيد المحاسبي.",
    },
    tech: ["Next.js", "Neon Postgres", "Gemini", "Cloudflare R2"],
    featured: false,
  },
  {
    title: { en: "Bayt — Fire TV Launcher", de: "Bayt — Fire-TV-Launcher", ar: "بيت — واجهة Fire TV" },
    category: { en: "TV App · Silicortex", de: "TV-App · Silicortex", ar: "تطبيق تلفاز · Silicortex" },
    description: {
      en: "An ad-free, tracking-free home screen for Fire TV that puts Arabic channels and favourite apps first, with big tiles built for the remote.",
      de: "Ein werbe- und trackingfreier Startbildschirm für Fire TV, der arabische Sender und Lieblings-Apps nach vorne stellt — mit großen Kacheln für die Fernbedienung.",
      ar: "شاشة رئيسية لأجهزة Fire TV بلا إعلانات ولا تتبّع، تضع القنوات العربية والتطبيقات المفضّلة في المقدّمة، مع مربّعات كبيرة مصمّمة لجهاز التحكم عن بُعد.",
    },
    tech: ["Kotlin", "Jetpack Compose", "Fire OS"],
    featured: false,
  },
  {
    title: "silicortex.de",
    category: { en: "Company Website", de: "Unternehmenswebsite", ar: "موقع الشركة" },
    description: {
      en: "My company's website in German, English and Arabic (right-to-left), with its own generated brand system, light and dark themes and interactive demos.",
      de: "Die Website meines Unternehmens auf Deutsch, Englisch und Arabisch (von rechts nach links), mit eigenem generiertem Markensystem, hellem und dunklem Design und interaktiven Demos.",
      ar: "موقع شركتي بالألمانية والإنجليزية والعربية (من اليمين إلى اليسار)، مع نظام هوية بصرية مولَّد خصيصًا، ووضعين فاتح وداكن، وعروض تفاعلية.",
    },
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://silicortex.de",
    featured: false,
  },
  {
    title: {
      en: "Sales Forecasting ML System",
      de: "ML-System zur Absatzprognose",
      ar: "نظام تعلّم آلة للتنبؤ بالمبيعات",
    },
    category: { en: "Machine Learning / AI", de: "Machine Learning / KI", ar: "تعلّم الآلة / ذكاء اصطناعي" },
    description: {
      en: "Developed a predictive sales analytics dashboard analyzing past retail metrics to forecast future demands using custom linear regression and time-series algorithms.",
      de: "Entwicklung eines Dashboards für prädiktive Verkaufsanalysen, das vergangene Handelskennzahlen auswertet und die künftige Nachfrage mit eigener linearer Regression und Zeitreihenalgorithmen prognostiziert.",
      ar: "تطوير لوحة تحليلات تنبؤية للمبيعات تحلّل مؤشرات البيع السابقة للتنبؤ بالطلب المستقبلي باستخدام انحدار خطي مخصّص وخوارزميات السلاسل الزمنية.",
    },
    tech: ["Python", "PHP", "Scikit-Learn", "PostgreSQL"],
    featured: true,
  },
  {
    title: {
      en: "Autonomous Data Warehouse Pipelines",
      de: "Autonome Data-Warehouse-Pipelines",
      ar: "خطوط بيانات مؤتمتة لمستودع البيانات",
    },
    category: { en: "Data Engineering", de: "Data Engineering", ar: "هندسة البيانات" },
    description: {
      en: "Architected automated ET/ELT pipelines using Dagster and Python to sync millions of raw system event logs into a consolidated warehouse, enabling real-time analytics dashboards.",
      de: "Konzeption automatisierter ETL/ELT-Pipelines mit Dagster und Python, die Millionen roher Systemereignisse in ein konsolidiertes Warehouse synchronisieren und Echtzeit-Analyse-Dashboards ermöglichen.",
      ar: "تصميم خطوط ETL/ELT مؤتمتة باستخدام Dagster وPython لمزامنة ملايين سجلات أحداث النظام الخام في مستودع موحّد، ما يتيح لوحات تحليلات فورية.",
    },
    tech: ["Python", "Dagster", "Docker", "PostgreSQL"],
    featured: false,
  },
  {
    title: {
      en: "SaaS Enterprise API Gateway",
      de: "SaaS-Enterprise-API-Gateway",
      ar: "بوابة APIs مؤسسية لمنصّات SaaS",
    },
    category: { en: "Web Infrastructure", de: "Web-Infrastruktur", ar: "بنية الويب التحتية" },
    description: {
      en: "Built a highly optimized microservice communication gateway supporting high concurrency, unified API routing, rate limiting, and standard JWT bearer token authentication.",
      de: "Entwicklung eines hochoptimierten Gateways für die Kommunikation zwischen Microservices mit hoher Parallelität, einheitlichem API-Routing, Rate Limiting und JWT-Bearer-Authentifizierung.",
      ar: "بناء بوابة اتصال عالية الأداء بين الخدمات المصغّرة تدعم التزامن العالي، وتوجيهًا موحّدًا للـ APIs، وتحديد معدّل الطلبات، والمصادقة القياسية عبر رموز JWT.",
    },
    tech: ["PHP", "Laravel", "Docker", "Redis"],
    featured: false,
  },
  {
    title: {
      en: "Java Cloud Microservice Orchestrator",
      de: "Java-Cloud-Microservice-Orchestrator",
      ar: "منسّق خدمات مصغّرة سحابية بـ Java",
    },
    category: { en: "Cloud Native", de: "Cloud-native", ar: "أنظمة سحابية" },
    description: {
      en: "Designed scalable, service-oriented REST sub-modules utilizing Spring Boot framework. Handled asynchronous events, inter-service messaging, and fault-tolerant system design.",
      de: "Entwurf skalierbarer, serviceorientierter REST-Teilmodule mit Spring Boot — inklusive asynchroner Events, Kommunikation zwischen Services und fehlertolerantem Systemdesign.",
      ar: "تصميم وحدات REST فرعية قابلة للتوسّع وموجّهة نحو الخدمات باستخدام Spring Boot، مع معالجة الأحداث غير المتزامنة والمراسلة بين الخدمات وتصميم أنظمة متحمّلة للأعطال.",
    },
    tech: ["Java", "SpringBoot", "Docker", "MongoDB"],
    featured: true,
  },
];

// ─── Resolve to one language ─────────────────────────────────────────────────

const all = (items: Text[] | undefined, lang: Lang) => items?.map((t) => tx(t, lang));

export function getContent(lang: Lang) {
  return {
    personalInfo: {
      name: tx(personalInfo.name, lang),
      location: tx(personalInfo.location, lang),
      email: tx(personalInfo.email, lang),
      phone: tx(personalInfo.phone, lang),
    } satisfies PersonalInfo,

    skills: skillsData.map((c) => ({
      category: tx(c.category, lang),
      skills: c.skills.map((s) => ({ name: tx(s.name, lang), level: s.level })),
    })) satisfies SkillCategory[],

    experience: experienceData.map((e) => ({
      ...e,
      company: tx(e.company, lang),
      location: tx(e.location, lang),
      role: tx(e.role, lang),
      period: tx(e.period, lang),
      description: tx(e.description, lang),
      highlights: all(e.highlights, lang),
      link: e.link && tx(e.link, lang),
    })) satisfies ExperienceItem[],

    education: educationData.map((e) => ({
      institution: tx(e.institution, lang),
      degree: tx(e.degree, lang),
      period: tx(e.period, lang),
      details: e.details && tx(e.details, lang),
      thesis: e.thesis && { title: tx(e.thesis.title, lang), tech: e.thesis.tech },
    })) satisfies EducationItem[],

    projects: projectsData.map((p) => ({
      ...p,
      title: tx(p.title, lang),
      category: tx(p.category, lang),
      description: tx(p.description, lang),
      tech: p.tech.map((t) => tx(t, lang)),
      link: p.link && tx(p.link, lang),
    })) satisfies ProjectItem[],
  };
}

export type Content = ReturnType<typeof getContent>;
