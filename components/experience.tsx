/** Experience — timeline of professional roles pulled from the CV. */
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

interface Role {
  title: string;
  company: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  current?: boolean;
}

const ROLES: Role[] = [
  {
    title: "Frontend Engineer",
    company: "Voyatek Group",
    period: "Feb 2025 – Present",
    location: "Lagos, Nigeria (Hybrid)",
    type: "Full-time",
    current: true,
    highlights: [
      "Integrated 3 production AI assistants: Paddi AI (trip planning), an in-app copilot with voice input on Gopaddi Books, and Ally on Gopaddi HR for policy Q&A with escalation analytics.",
      "Designed a registry-driven reporting architecture powering 14+ financial reports (P&L, Balance Sheet, Cash Flow, Tax Summary, GDS travel revenue) from a single configurable shell — reducing new-report delivery from ~2 days to under 2 hours.",
      "Built feature- and action-level RBAC gating 30+ modules across payroll, leave, attendance, and multi-entity orgs; integrated Flutterwave for payroll funding and payslip generation.",
      "Implemented end-to-end API payload encryption (RSA-OAEP + AES-256-GCM) via Axios interceptors on the Gopaddi Supplier platform, protecting data across 13 hospitality and travel verticals.",
      "Created and maintained the Jungle shared component library adopted across all 4 Gopaddi products, eliminating duplicate UI implementations and standardizing design token usage.",
      "Built live restaurant ordering (WebSocket order tracking, Paystack checkout), the Gopaddi social layer (timelines, communities, collaborative trips, Moments), and a self-serve event management & ticketing product.",
      "Delivered the full double-entry accounting lifecycle on Gopaddi Books plus bank reconciliation with a rules engine and Mono Connect for account linking.",
      "Developed an end-to-end recruitment ATS spanning job requests, approval workflows, a Kanban candidate pipeline, referral tracking, and a public careers board.",
      "Improved performance via React.lazy() route splitting, Vite chunk config, TanStack Query caching, and PWA + IndexedDB for offline CSV import and data-cleaning workflows.",
    ],
  },
  {
    title: "IT Support Associate (NYSC)",
    company: "Voyatek Group",
    period: "Mar 2024 – Feb 2025",
    location: "Lagos, Nigeria",
    type: "NYSC",
    highlights: [
      "Resolved hardware, software, and network issues for internal staff, sustaining 95%+ operational uptime.",
      "Designed and deployed responsive HTML email templates, strengthening brand consistency across communications.",
      "Led technical onboarding for new hires and supported product and engineering teams cross-functionally.",
    ],
  },
];

const EARLIER_ROLES = [
  "IT Support · Kabzeel Investment Limited (2023)",
  "IT Support · Swift Networks Limited (2021–2022)",
  "Digital Transformation Support · Lagos State Ministry of Information & Technology (2021)",
];

function RoleCard({ role, index }: { role: Role; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 flex flex-col items-center">
        <div
          className={`h-3 w-3 rounded-full border-2 ${
            role.current ? "border-primary bg-primary" : "border-border bg-muted"
          }`}
        />
        <div className="mt-1 w-px flex-1 bg-border" style={{ height: "calc(100% - 12px)" }} />
      </div>

      {/* Card */}
      <div className="glass-card rounded-2xl border border-border p-6 transition-colors hover:border-primary/30">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-foreground">{role.title}</h3>
              {role.current && (
                <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  Current
                </span>
              )}
            </div>
            <p className="mt-0.5 font-semibold text-primary">{role.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {role.period}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {role.location}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-2.5">
          {role.highlights.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <section id="experience" ref={sectionRef} className="relative py-24">
      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-3">Career</p>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          Work <span className="text-primary">Experience</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Four production platforms, three AI assistants, and a registry-driven architecture that turned two-day tasks into two-hour ones.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        {ROLES.map((role, index) => (
          <RoleCard key={`${role.company}-${role.period}`} role={role} index={index} />
        ))}

        {/* Earlier roles footnote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-2 pl-8"
        >
          <div className="rounded-xl border border-border bg-accent/20 px-5 py-4">
            <p className="font-mono mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5" />
              Earlier Experience
            </p>
            <ul className="space-y-1">
              {EARLIER_ROLES.map((role) => (
                <li key={role} className="text-sm text-muted-foreground">
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
