/** Shared project data — single source of truth for the home grid, /work/[slug] case studies, the command palette, and the sitemap. */

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  role: string;
  year: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
  /** Set when the codebase is private corporate code. Displayed as a badge on the case study. */
  privateNote?: string;
  highlights: string[];
  /** "Decisions & Trade-offs" section — why specific architectural choices were made */
  decisions?: { title: string; rationale: string }[];
  /** "Results" section — measured or scoped outcomes */
  results?: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "goagent",
    title: "GoAgent",
    tagline: "A multi-vertical supplier dashboard for travel and hospitality",
    description:
      "A B2B platform for Gopaddi's supplier network. Agents manage travel, hotel, restaurant, POS, and workspace bookings from a single dashboard — alongside CRM tools, in-app VOIP calling via Callpad, a multi-currency wallet, AI-powered features, and real-time analytics.",
    problem:
      "Gopaddi's supplier ecosystem spanned multiple verticals but had no unified agent interface. Suppliers needed one dashboard to manage bookings, communicate with clients, track revenue, and access tools across all verticals without context-switching between separate apps.",
    role:
      "I worked across multiple verticals building and maintaining feature modules, shared components, and route files. Contributed to the Callpad VOIP integration, wallet transaction flows, multi-vertical routing architecture, and analytics views.",
    year: "2024",
    image: "/goagent.png",
    technologies: ["React", "TypeScript", "Redux Toolkit", "TanStack Query", "Tailwind CSS", "Shadcn UI", "React Router"],
    liveUrl: "https://supplier.gopaddi.com/en/",
    privateNote: "Closed-source — company code on Azure DevOps (Voyatek Group). Live app linked above.",
    highlights: [
      "Contributed to a large multi-vertical SPA spanning travel, hotel, restaurant, POS, and workspace booking flows across 13 verticals",
      "Integrated Callpad VOIP SDK for in-app calling and built wallet flows with multi-currency support and transaction history",
      "Built feature-scoped modules with lazy-loaded routes, shared UI primitives, and Redux/TanStack Query state layers",
      "Implemented end-to-end API payload encryption (RSA-OAEP + AES-256-GCM) via Axios interceptors, protecting data across all supplier flows",
    ],
    decisions: [
      {
        title: "Redux Toolkit + TanStack Query (dual state layers)",
        rationale:
          "Redux Toolkit owns complex cross-vertical UI state — active booking context, wallet balance, VOIP call status — that multiple routes read simultaneously. TanStack Query handles all server state with stale-while-revalidate caching; this split prevents cache invalidation from triggering unrelated UI re-renders and keeps bundle size predictable via code splitting.",
      },
      {
        title: "Feature-folder structure",
        rationale:
          "With 13 verticals in a single SPA, a flat components/ directory would have created merge conflicts and unclear ownership. Each vertical owns its own feature/ folder (routes, components, hooks, types) — a team member can ship a restaurant feature without touching travel code.",
      },
      {
        title: "Axios interceptors for E2E encryption",
        rationale:
          "Centralising RSA-OAEP + AES-256-GCM encryption in request/response interceptors means individual feature developers don't need to handle crypto themselves, reducing the risk of missed encryption at the call site.",
      },
    ],
    results: [
      "Consolidated 13 travel and hospitality verticals into a single supplier SPA — eliminating the need for separate portals",
      "End-to-end payload encryption rolled out across all supplier API traffic via a single interceptor layer",
      "Lazy-loaded route splitting reduced initial JS bundle size and improved time-to-interactive on slower connections",
    ],
    featured: true,
  },
  {
    slug: "gopaddi-hr",
    title: "Gopaddi HR",
    tagline: "An enterprise HR management platform",
    description:
      "A full-featured HR platform covering the complete employee lifecycle — recruitment pipelines, onboarding, payroll, leave and shift management, attendance tracking, role-based permissions, and smart document generation — with bilingual (EN/FR) support.",
    problem:
      "HR teams were operating across disconnected tools with no unified view of employee data, leave schedules, or payroll. The platform needed to consolidate every HR workflow into a single, permissions-aware product while scaling cleanly across a large multi-feature codebase.",
    role:
      "I built and maintained feature modules across the HR dashboard — including employee management, leave requests, shift scheduling, and document workflows — using a strict feature-folder architecture, TanStack Query for server state, and Zustand for UI state.",
    year: "2025",
    image: "/gopaddi-hr.png",
    technologies: ["React 19", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS", "Axios", "i18next"],
    liveUrl: "https://workforce.gopaddi.com/en/",
    privateNote: "Closed-source — company code on Azure DevOps (Voyatek Group). Live app linked above.",
    highlights: [
      "Built 30+ RBAC-gated feature modules covering payroll, leave, attendance, recruitment ATS, and multi-entity org management",
      "Implemented shared TanStack Query caching across HR modules — eliminating duplicate API requests and ensuring consistent data across views",
      "Delivered bilingual (EN/FR) i18next support across all modules using scoped translation namespaces",
      "Integrated Flutterwave for payroll funding and payslip generation; built recruitment ATS with Kanban pipeline and public careers board",
    ],
    decisions: [
      {
        title: "Zustand for UI state, TanStack Query for server state",
        rationale:
          "HR dashboards have two very different state problems: ephemeral UI state (modal open, active tab, form step) that belongs in the component tree, and server data (leave balances, payroll runs) that needs caching, background refetching, and invalidation. Mixing them in a single store creates unnecessary re-renders. Zustand's small API handles UI state with zero boilerplate; TanStack Query owns server state with stale-while-revalidate semantics — each tool does one job well.",
      },
      {
        title: "Feature-folder architecture",
        rationale:
          "An HR platform with 30+ modules (payroll, leave, attendance, recruitment…) can't be maintained in a flat components/ directory. Co-locating each feature's routes, components, hooks, and types in a features/[name]/ folder gives clear ownership, makes PRs easier to review, and prevents accidental coupling between unrelated modules.",
      },
      {
        title: "Scoped i18n namespaces (i18next)",
        rationale:
          "Loading all EN/FR strings into a single namespace would cause a large initial bundle and make translations hard to manage across 30+ modules. Scoped namespaces (leave.json, payroll.json…) load lazily per route, keep translation files small and PR-reviewable, and make it easy to hand off individual namespaces to translators.",
      },
    ],
    results: [
      "Consolidated HR operations for an enterprise workforce platform into 30+ RBAC-gated modules — replacing disconnected spreadsheet and manual workflows",
      "Shared TanStack Query caching cut duplicate API requests across views, reducing server load on high-traffic HR screens",
      "Full EN/FR bilingual coverage delivered across all modules — enabling rollout to French-speaking enterprise clients",
      "Recruitment ATS with Kanban pipeline and public careers board shipped end-to-end within the same codebase",
    ],
  },
  {
    slug: "gopaddi",
    title: "Gopaddi",
    tagline: "A social-first travel booking ecosystem",
    description:
      "A comprehensive travel ecosystem merging social networking with booking capabilities. Users plan trips, book flights and hotels, explore a dynamic travel marketplace, and interact with travel content.",
    problem:
      "Travel planning is fragmented across booking sites, social recommendations, and itinerary tools. Gopaddi needed a single, responsive product surface that felt as fluid as a social feed while still handling real booking flows.",
    role:
      "I built the responsive UI layer end-to-end for live streaming pages, trip-planning dashboards, and business service listings, integrating against REST APIs and collaborating closely with design on interaction details.",
    year: "2024",
    image: "/gopaddi.png",
    technologies: ["React", "Next.js", "Axios", "Tailwind CSS", "API Integration"],
    liveUrl: "https://www.gopaddi.com/",
    privateNote: "Closed-source — company code on Azure DevOps (Voyatek Group). Live app linked above.",
    highlights: [
      "Shipped a responsive trip-planning dashboard used across booking, discovery, and social flows serving 10,000+ registered users",
      "Built live-streaming UI with real-time state handling and graceful fallback states",
      "Integrated a marketplace listing system against REST APIs with pagination and filtering",
    ],
    decisions: [
      {
        title: "Next.js for SSR on public-facing pages",
        rationale:
          "Discovery and marketplace pages are crawled by search engines — server-rendering them ensures content is indexed immediately and time-to-first-byte stays fast even for users on slow mobile connections in target markets.",
      },
    ],
    results: [
      "Platform serves 10,000+ registered users and 100+ partner businesses",
      "Social and booking flows unified into a single responsive surface — reducing the need for separate apps per use case",
    ],
  },
  {
    slug: "discovatrips",
    title: "DiscovaTrips",
    tagline: "A curated travel discovery platform",
    description:
      "A travel discovery platform inspiring wanderlust through curated experiences. Users explore themed trips, view highlights shared by fellow travelers, and engage with destination content.",
    problem:
      "The team needed a content-forward discovery experience — closer to a media product than a booking form — that still funneled cleanly into trip engagement and profile interactions.",
    role:
      "I developed the frontend components for trip browsing, highlight galleries, and interactive traveler profiles, focusing on motion-aware, image-heavy layouts that stayed performant on mobile.",
    year: "2024",
    image: "/discova.png",
    technologies: ["React", "Next.js", "Framer Motion", "Axios", "Tailwind CSS"],
    liveUrl: "https://www.discovatrips.com",
    privateNote: "Closed-source — company code on Azure DevOps (Voyatek Group). Live app linked above.",
    highlights: [
      "Built a themed-trip browsing experience with smooth, motion-driven transitions",
      "Implemented a highlight gallery pattern reused across traveler profiles",
      "Optimized image-heavy views for fast mobile load times with Next.js Image and lazy loading",
    ],
    decisions: [
      {
        title: "Framer Motion for declarative animation",
        rationale:
          "A discovery product lives or dies on feel. Framer Motion's layout animations and shared-element transitions gave the gallery and trip-card interactions an app-like quality without hand-rolling requestAnimationFrame logic. Animations are conditionally skipped via prefers-reduced-motion.",
      },
    ],
    results: [
      "Image-heavy gallery pages optimized for mobile — core screens load within LCP budget using Next.js Image with blur placeholders",
      "Highlight gallery component reused across 3+ traveler-profile page types without modification",
    ],
  },
  {
    slug: "iphone-15-pro",
    title: "Apple iPhone 15 Pro",
    tagline: "A high-fidelity marketing page recreation",
    description:
      "A high-fidelity recreation of Apple's iPhone 15 Pro landing page, featuring GSAP-powered scroll animation and 3D camera interactions with Three.js.",
    problem:
      "Apple's product pages are a well-known benchmark for scroll-driven storytelling. The goal was to faithfully reproduce that motion language — not just the visuals — as a deliberate animation-engineering exercise.",
    role:
      "I implemented the full scroll-timeline choreography: pinned sections, scroll-scrubbed camera moves, and a Three.js-driven 3D model sequence synced to GSAP's ScrollTrigger.",
    year: "2023",
    image: "/iphoneImage.png",
    technologies: ["React", "Three.js", "GSAP", "Tailwind CSS"],
    liveUrl: "https://iphone-15-lac-xi.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/IPHONE-15",
    highlights: [
      "Reproduced Apple's pinned-scroll storytelling pattern with GSAP ScrollTrigger",
      "Synced a Three.js 3D model sequence to scroll position for camera/product transitions",
      "Kept scroll-jacked sections performant with careful animation batching",
    ],
    decisions: [
      {
        title: "Three.js + GSAP ScrollTrigger (not a CSS-only approach)",
        rationale:
          "The 3D model needs to respond to scroll position in real time — CSS scroll animations can't drive WebGL uniforms. GSAP ScrollTrigger was chosen as the single orchestration layer to avoid two independent scroll listeners fighting each other.",
      },
    ],
    results: [
      "Recreation exercise completed — publicly viewable with full source code on GitHub",
      "Demonstrates GSAP ScrollTrigger + Three.js integration, used as an animation engineering reference",
    ],
  },
  {
    slug: "gerich-restaurant",
    title: "Gerich Restaurant",
    tagline: "A restaurant landing page with reservations",
    description:
      "A visually striking landing page for a restaurant brand, featuring featured dishes, chef specials, open hours, and reservations.",
    problem:
      "A local restaurant brand needed a landing page that reads as premium on first load, with a reservation path that didn't get lost among the marketing content.",
    role:
      "I owned layout structure, navigation, and responsive behavior across breakpoints, keeping the reservation call-to-action visible without competing with the visual storytelling.",
    year: "2023",
    image: "/restaurant-landing.png",
    technologies: ["React", "Next.js", "Tailwind CSS", "Redux"],
    liveUrl: "https://gerich-restaurants.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/gerich-resturants",
    highlights: [
      "Designed an information hierarchy that keeps reservations one tap away on mobile",
      "Built a featured-dishes section with lightweight, dependency-free image transitions",
      "Managed shared UI state with Redux across the menu and reservation flows",
    ],
    results: [
      "Landing page delivered with public source code — demonstrating responsive layout and Redux state management patterns",
    ],
  },
  {
    slug: "credit-card-fraud-detection",
    title: "Credit Card Fraud Detection",
    tagline: "Ensemble ML models for financial fraud classification",
    description:
      "Trained and compared ensemble models (XGBoost, Random Forest, KNN, Logistic Regression) to classify fraudulent credit card transactions. Evaluated with precision-recall curves and F1 scores to handle class imbalance.",
    problem:
      "Credit card fraud datasets are highly imbalanced, making naive accuracy a misleading metric. The challenge was selecting and tuning models that maximise recall on the minority fraud class without flooding the fraud queue with false positives.",
    role:
      "End-to-end ML pipeline: data preprocessing and resampling, feature engineering, training four model variants, hyperparameter tuning, and comparative evaluation using precision-recall curves and F1 scoring.",
    year: "2024",
    image: "/restaurant-landing.png",
    technologies: ["Python", "Scikit-Learn", "XGBoost", "Random Forest", "Pandas"],
    liveUrl: "https://github.com/Oluwasegun1",
    githubUrl: "https://github.com/Oluwasegun1",
    highlights: [
      "Compared XGBoost, Random Forest, KNN, and Logistic Regression on a heavily imbalanced dataset",
      "Used precision-recall curves and F1 scores to evaluate classifier performance beyond raw accuracy",
      "Applied resampling techniques to improve recall on the minority fraud class",
    ],
    results: [
      "XGBoost achieved highest F1 on minority fraud class after SMOTE resampling — outperforming baseline logistic regression",
    ],
  },
  {
    slug: "react-jobs",
    title: "React Job Platform",
    tagline: "A developer-focused job board",
    description:
      "A modern job board built exclusively for React developers. Users browse curated listings, post openings, and manage applications with dynamic filtering.",
    problem:
      "Generic job boards bury React-specific roles in noise. This platform needed fast, dynamic filtering and a posting flow simple enough for small teams to actually use.",
    role:
      "I built the full frontend: listing/filter UI, form-driven job posting, and application management, with an emphasis on a clean, developer-friendly interface.",
    year: "2023",
    image: "/job.png",
    technologies: ["React", "Tailwind CSS"],
    liveUrl: "https://react-jobs-iota-flax.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/react-jobs",
    highlights: [
      "Built dynamic multi-criteria filtering without a backend query layer",
      "Designed a job-posting form flow with clear inline validation",
      "Kept the listing UI fast and scannable for a developer audience",
    ],
    results: [
      "Open-source demo with full source on GitHub — illustrating form validation and dynamic filter patterns in plain React",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project; next: Project } {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  return { prev, next };
}
