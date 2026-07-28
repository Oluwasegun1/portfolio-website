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
  { icon: Rocket, value: 10, suffix: "+", label: "Projects Shipped" },
  { icon: Code2, value: 2, suffix: "+", label: "Years Experience" },
  { icon: Layers, value: 10, suffix: "+", label: "Tools Mastered" },
  { icon: Users, value: 5, suffix: "+", label: "Happy Clients" },
];

const PRINCIPLES = [
  {
    icon: Zap,
    title: "Performance-first",
    description: "Every interaction is measured, not assumed — fast by default.",
  },
  {
    icon: Eye,
    title: "Detail-obsessed",
    description: "Spacing, motion, and edge-case states are never an afterthought.",
  },
  {
    icon: Accessibility,
    title: "Accessible by default",
    description: "Keyboard, screen-reader, and reduced-motion support, built in.",
  },
  {
    icon: GitBranch,
    title: "Ship & iterate",
    description: "Clean, typed code that's easy for a team to extend and hand off.",
  },
];

/** Animated counter — eases from 0 to `target` over a fixed duration, not a fixed step */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      // Deferred to the next frame so state isn't set synchronously within the effect body
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

  return (
    <span ref={ref}>
      {count}
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
            Turning ideas into <span className="text-primary">production-ready</span> interfaces
          </h3>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            I&apos;m a frontend developer based in{" "}
            <span className="font-medium text-foreground">Lagos, Nigeria</span>, focused on
            building interfaces that are functional, fast, and genuinely pleasant to use.
          </p>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            With hands-on experience shipping production applications for platforms like{" "}
            <span className="font-medium text-foreground">Gopaddi</span> and{" "}
            <span className="font-medium text-foreground">DiscovaTrips</span>, I specialize in
            the React/Next.js ecosystem, pixel-accurate implementation, and performance-first
            development.
          </p>
          <a
            href="/Oluwasegun-Ogunbanjo-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex w-fit items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-accent"
          >
            Download Resume
            <Download className="h-4 w-4" />
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
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-accent/50 text-primary">
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
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 px-4 py-6 text-center">
            <stat.icon className="h-5 w-5 text-primary" />
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
