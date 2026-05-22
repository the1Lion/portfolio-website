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
      { name: "Java", level: "Advanced" },
      { name: "PHP", level: "Advanced" },
      { name: "C", level: "Advanced" },
      { name: "C#", level: "Advanced" },
    ],
  },
  {
    category: "Web & Frontend",
    skills: [
      { name: "HTML", level: "Advanced" },
      { name: "CSS", level: "Advanced" },
      { name: "SASS", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "Laravel" },
      { name: "Vue JS" },
      { name: "React" },
      { name: "SpringBoot" },
      { name: "Next JS" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Docker" },
      { name: "GIT" },
      { name: "Dagster" },
    ],
  },
];

export const experienceData: ExperienceItem[] = [
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
    location: "Wiesbaden",
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
