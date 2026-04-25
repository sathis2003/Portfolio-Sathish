import vlm1 from "./assets/Vlm/image1.webp";
import vlm2 from "./assets/Vlm/image2.webp";
import vlm3 from "./assets/Vlm/image3.webp";
import vlm4 from "./assets/Vlm/image4.webp";
import vlm5 from "./assets/Vlm/image5.webp";

export const vlmShots = [vlm1, vlm2, vlm3, vlm4, vlm5];

import villza1 from "./assets/villza/iphone_6_5_1.png";
import villza2 from "./assets/villza/iphone_6_5_2.png";
import villza3 from "./assets/villza/iphone_6_5_3.png";
import villza4 from "./assets/villza/iphone_6_5_4.png";
import sw1 from "./assets/ScalingWolf/image1.webp";
import sw2 from "./assets/ScalingWolf/image2.webp";
import sw3 from "./assets/ScalingWolf/Image3.webp";

export const linkedInUrl = "https://www.linkedin.com/in/sathish-kumar-p-287785232/";
export const githubUrl = "https://github.com/sathis2003";
export const emailAddress = "psathishkumar3113@gmail.com";
export const phoneNumber = "+91-9514750493";
export const phoneHref = `tel:${phoneNumber.replace(/[^\d+]/g, "")}`;
export const resumePath = "/Sathish_Kumar_Resume.pdf";

export type NavItem = { id: string; label: string };

export const navItems: NavItem[] = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export type Project = {
  title: string;
  type: string;
  problem: string;
  summary: string;
  outcome: string;
  stack: string[];
  link?: string;
  screen: string[];
  shots?: string[];
};

export const projects: Project[] = [
  {
    title: "Scalingwolf AI",
    type: "AI Business Software",
    problem: "Business teams needed a unified mobile platform to manage AI-driven workflows, operations, and delivery tracking in one place.",
    summary:
      "A production mobile application built at Scalingwolf AI — combining AI-powered features with practical business software for operational teams that rely on it daily.",
    outcome: "Live on Google Play Store. Used by Scalingwolf AI teams daily.",
    stack: ["Flutter", "AI Integration", "Firebase", "REST APIs"],
    link: "https://play.google.com/store/search?q=ScalingWolf&c=apps&hl=en-US",
    screen: ["Dashboard", "Workflows", "Reports", "Settings"],
    shots: [sw1, sw2, sw3],
  },
  {
    title: "Villza",
    type: "Community Platform",
    problem: "Apartment residents had no digital way to manage visitors, book services, or handle wallet transactions.",
    summary:
      "A full-stack resident management app for gated communities — visitor access, service booking, and wallet-backed workflows built for daily repeated use.",
    outcome: "Live on Google Play Store. Used by real apartment communities.",
    stack: ["Android", "Mobile workflows", "Bookings", "Notifications"],
    link: "https://play.google.com/store/apps/details?id=com.villzaa.nextdoor&hl=en-US&pli=1",
    screen: ["Residents", "Bookings", "Wallet", "Access"],
    shots: [villza1, villza2, villza3, villza4],
  },
  {
    title: "VLM – DAC HRM",
    type: "Workforce Operations",
    problem: "Construction teams needed reliable attendance tracking with GPS verification and offline capability for field work.",
    summary:
      "A field-ready HRM app for construction workforce management — attendance with photo proof, GPS validation, and admin-facing reports that work offline.",
    outcome: "Live on Google Play Store. Used by on-ground construction teams.",
    stack: ["Android", "GPS", "Photo proof", "Offline sync"],
    link: "https://play.google.com/store/apps/details?id=com.dacdevelopers.hrm.dacdvelopers&hl=en-US",
    screen: ["Workers", "Attendance", "Reports", "GPS"],
    shots: [vlm1, vlm2, vlm3, vlm4, vlm5],
  },
];

export const proofProjects = [
  "Merchant Labor Recruitment",
  "Expense Tracker",
  "To-Do List",
  "Music Player",
];

export const marqueeItems = [
  "Flutter",
  "Firebase",
  "Dart",
  "Android",
  "REST APIs",
  "Bloc",
  "Provider",
  "Redux",
  "Play Store",
  "Firestore",
  "Node.js",
];

export type StackGroup = { title: string; items: string[] };

export const stackGroups: StackGroup[] = [
  {
    title: "Mobile",
    items: ["Flutter", "Dart", "Android Java"],
  },
  {
    title: "Backend",
    items: ["Firebase Auth", "Firestore", "Realtime DB", "REST APIs", "Node.js"],
  },
  {
    title: "Architecture",
    items: ["Bloc", "Provider", "Redux", "Reusable UI", "Feature structure"],
  },
  {
    title: "Delivery",
    items: ["Performance tuning", "UI consistency", "Play Store prep", "Responsive flows"],
  },
  {
    title: "AI Tools",
    items: ["Antigravity", "Codex", "Claude", "Copilot"],
  },
];

export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
  isCurrent?: boolean;
};

export const experience: Experience[] = [
  {
    period: "Current",
    role: "Software Professional / Mobile Developer",
    company: "Scalingwolf AI",
    description:
      "Working across mobile development, product execution, and practical business software in an AI-oriented delivery environment.",
    isCurrent: true,
  },
  {
    period: "Feb – Apr 2025",
    role: "Flutter Developer Intern",
    company: "Annualr Technologies",
    description:
      "Built cross-platform mobile features, integrated APIs, improved UI quality, and reduced load time by 30%.",
  },
  {
    period: "Jul – Oct 2024",
    role: "App Developer Intern",
    company: "Altruisty",
    description:
      "Worked on Flutter UI for a startup platform and improved consistency through reusable components and cleaner flows.",
  },
  {
    period: "Jul – Aug 2023",
    role: "Flutter Intern",
    company: "CodSoft",
    description: "Built three task-driven Flutter applications and strengthened product implementation discipline.",
  },
  {
    period: "Mar – Apr 2023",
    role: "Android Intern",
    company: "CodeCasa",
    description: "Contributed to Android applications in Java and strengthened native mobile fundamentals.",
  },
];

export const credentials = [
  "B.Tech Information Technology — DMI College of Engineering, 2021–2025",
  "Flutter Development — LinkedIn Learning",
  "Web Development — UNIQ Technologies",
  "Cloud Computing — NPTEL",
  "Demystifying Networking — NPTEL",
];
