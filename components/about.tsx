/** About — quick-snapshot section with animated stats counters and a punchy bio. */
"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Code2, Layers, Rocket, Users, Download, FileText } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const STATS: Stat[] = [
  { icon: Rocket, value: 10, suffix: "+", label: "Projects Shipped", color: "text-violet-400" },
  { icon: Code2, value: 2, suffix: "+", label: "Years Experience", color: "text-cyan-400" },
  { icon: Layers, value: 10, suffix: "+", label: "Tech Mastered", color: "text-pink-400" },
  { icon: Users, value: 5, suffix: "+", label: "Happy Clients", color: "text-emerald-400" },
];

const SKILLS_HIGHLIGHT = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Framer Motion",
  "REST APIs",
  "Figma",
];

const RESUME_FILE = {
  href: "/Oluwasegun_Ogunbanjo_Resume%202026%20O.pdf",
  downloadName: "Oluwasegun_Ogunbanjo_Resume.pdf",
};

/** Animated counter — eases from 0 to `target` over a fixed duration, not a fixed step. */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    const duration = 1200;
    let start: number | null = null;
    let frame: number;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease-out cubic — fast start, gentle settle, reads as more "designed" than linear
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
    <section id="about" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-0 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/6 blur-[100px]" />

      <div className="relative z-10">
        {/* Section label */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">Who I Am</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card group flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={`font-display text-4xl font-bold ${stat.color}`}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio + skills */}
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-display mb-4 text-2xl font-semibold">
              Turning ideas into <span className="gradient-text">digital realities</span>
            </h3>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              I&apos;m a passionate frontend developer based in{" "}
              <span className="font-medium text-foreground">Lagos, Nigeria</span> with a deep love for
              creating web experiences that are not just functional, but beautiful and delightful to use.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With hands-on experience building production applications for platforms like{" "}
              <span className="font-medium text-violet-400">Gopaddi</span> and{" "}
              <span className="font-medium text-cyan-400">DiscovaTrips</span>, I specialize in
              React/Next.js ecosystems, pixel-perfect UI implementation, and performance-first
              development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-display mb-5 text-lg font-semibold text-muted-foreground">
              Core Technologies
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {SKILLS_HIGHLIGHT.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.06 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Resume Download */}
        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mx-auto mt-20 max-w-5xl"
        >
          <div className="glass-card relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-10">
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
              {/* Left */}
              <div className="max-w-2xl text-center lg:text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
                  <Download className="h-4 w-4" />
                  Resume
                </div>

                <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                  Interested in <span className="gradient-text">working together?</span>
                </h3>

                <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
                  Download my resume for a deeper look into my professional
                  experience, technical expertise, projects, and the impact I've made
                  building modern web applications.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                  {[
                    "2+ Years Experience",
                    "10+ Projects",
                    "React & Next.js",
                    "TypeScript",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col items-center gap-4">
                <motion.a
                  href="/Oluwasegun_Ogunbanjo_Resume%202026%20O.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-violet-500/30"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Download Resume

                    <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </span>

                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </motion.a>

                <p className="text-center text-xs text-muted-foreground">
                  PDF • Updated 2026
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}