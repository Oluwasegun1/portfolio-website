/** About — bio, a compact metrics bar, and the working principles that back up the claims. */
"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Code2, Layers, Rocket, Users, Zap, Eye, Accessibility, GitBranch, Download } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { icon: Rocket, value: 4, suffix: "", label: "Production Platforms" },
  { icon: Code2, value: 3, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 10, suffix: "k+", label: "Registered Users" },
  { icon: Layers, value: 100, suffix: "+", label: "Partner Businesses" },
];

const PRINCIPLES = [
  {
    icon: Zap,
    title: "Performance-first",
    description:
      "Route splitting, TanStack Query caching, and PWA offline storage ship measurable results — not assumptions. Core Web Vitals tuning is a standard step before every feature release.",
  },
  {
    icon: Eye,
    title: "Systems thinker",
    description:
      "Registry-driven reporting cut new-report delivery from ~2 days to under 2 hours. Shared component libraries remove duplicate UI work across teams.",
  },
  {
    icon: Accessibility,
    title: "AI-integrated engineering",
    description:
      "Shipped 3 production AI assistants: Paddi AI for trip planning, a copilot with voice input on Gopaddi Books, and Ally for HR policy Q\u0026A with escalation analytics.",
  },
  {
    icon: GitBranch,
    title: "Security-conscious",
    description:
      "End-to-end payload encryption (RSA-OAEP + AES-256-GCM) via Axios interceptors, RBAC across 30+ modules, and keyboard-navigation tested UI components.",
  },
];

/** Counter — SSR renders the real target value so crawlers and slow devices always see a number.
 * On the client it animates from 0 to target once the element is in view. */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      const raf = requestAnimationFrame(() => setCount(target));
      return () => cancelAnimationFrame(raf);
    }

    const duration = 1100;
    let start: number | null = null;
    let frame: number;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, shouldReduceMotion]);

  // Before hydration / animation, render the real number so SSR output and
  // crawlers never see "0"
  const display = count ?? target;

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="about" ref={sectionRef} className="relative py-24">
      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-3">Who I Am</p>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          About <span className="text-primary">Me</span>
        </h2>
      </motion.div>

      {/* Bio + principles */}
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col justify-center"
        >
          <h3 className="font-display mb-4 text-2xl font-semibold">
            Building AI-integrated,{" "}
            <span className="text-primary">production-grade</span> platforms
          </h3>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            I&apos;m a Frontend Engineer at{" "}
            <span className="font-medium text-foreground">Voyatek Group</span> based in{" "}
            <span className="font-medium text-foreground">Lagos, Nigeria</span>, building across four
            concurrent products in the Gopaddi travel, hospitality, finance, and HR ecosystem.
          </p>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            I&apos;ve shipped three production AI assistants, architected a registry-driven reporting
            engine that cut new-report delivery from two days to under two hours, and built RBAC gating
            30+ modules — all while maintaining the{" "}
            <span className="font-medium text-foreground">Jungle shared component library</span> adopted
            across all four products.
          </p>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            I also run a{" "}
            <span className="font-medium text-foreground">frontend engineering bootcamp</span>, mentoring
            early-career developers on React, TypeScript, and production-ready engineering practices.
          </p>
          <a
            href="/OLUWASEGUN%20IFEOLUWA%20OGUNBANJO%20RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex w-fit items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-accent"
          >
            Download Resume
            <Download className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col justify-center gap-5"
        >
          <h4 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            How I work
          </h4>
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="flex items-start gap-4">
              {/* Icon is decorative — the title provides the label */}
              <div
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-accent/50 text-primary"
              >
                <principle.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{principle.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Compact stats bar */}
      <motion.div
        className="mx-auto mt-16 grid max-w-5xl grid-cols-2 divide-x divide-y divide-border rounded-2xl border border-border sm:grid-cols-4 sm:divide-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
        role="list"
        aria-label="Career metrics"
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            role="listitem"
            className="flex flex-col items-center gap-2 px-4 py-6 text-center"
          >
            {/* Icon is decorative — aria-label on the value+label conveys the meaning */}
            <stat.icon className="h-5 w-5 text-primary" aria-hidden="true" />
            <div className="font-display text-3xl font-bold text-foreground">
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
