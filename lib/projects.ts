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
  highlights: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
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
    highlights: [
      "Built HR feature modules spanning employee management, leave requests, shift scheduling, and role-based permissions",
      "Integrated TanStack Query across all data-fetching layers with consistent caching, error-handling, and optimistic update patterns",
      "Implemented bilingual (EN/FR) i18n support across feature modules using scoped translation namespaces",
    ],
  },
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
    highlights: [
      "Contributed to a large multi-vertical SPA spanning travel, hotel, restaurant, POS, and workspace booking flows",
      "Integrated Callpad VOIP SDK for in-app calling and built wallet flows with multi-currency support",
      "Built and maintained feature-scoped modules with lazy-loaded routes, shared UI primitives, and Redux/TanStack Query state layers",
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
    highlights: [
      "Shipped a responsive trip-planning dashboard used across booking, discovery, and social flows",
      "Built live-streaming UI with real-time state handling and graceful fallback states",
      "Integrated a marketplace listing system against REST APIs with pagination and filtering",
    ],
    featured: true,
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
    highlights: [
      "Built a themed-trip browsing experience with smooth, motion-driven transitions",
      "Implemented a highlight gallery pattern reused across traveler profiles",
      "Optimized image-heavy views for fast mobile load times",
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
    liveUrl: "https://gerich-resturants.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/gerich-resturants",
    highlights: [
      "Designed an information hierarchy that keeps reservations one tap away on mobile",
      "Built a featured-dishes section with lightweight, dependency-free image transitions",
      "Managed shared UI state with Redux across the menu and reservation flows",
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
