/** Hero — full-viewport landing with typewriter role cycling, availability badge, and magnetic CTAs. */
"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Download, ArrowRight } from "lucide-react";

/** Roles cycled through by the typewriter */
const ROLES = [
  "Frontend Developer",
  "React Specialist",
  "UI/UX Enthusiast",
  "Digital Craftsman",
];

/** Typewriter — types and deletes a list of strings in a loop */
function Typewriter({ words }: { words: string[] }) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const delay = isDeleting ? 55 : 110;

    const timeout = setTimeout(() => {
      setDisplayText((prev) => {
        if (!isDeleting) {
          const next = current.slice(0, prev.length + 1);
          if (next === current) {
            setTimeout(() => setIsDeleting(true), 1800);
          }
          return next;
        } else {
          const next = prev.slice(0, prev.length - 1);
          if (next === "") {
            setIsDeleting(false);
            setWordIndex((idx) => (idx + 1) % words.length);
          }
          return next;
        }
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words]);

  return (
    <span className="gradient-text font-display">
      {displayText}
      <span className="animate-cursor-blink ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[1px] rounded-sm bg-violet-400 align-middle" />
    </span>
  );
}

/** Animated letter-by-letter name reveal */
function AnimatedName({ name }: { name: string }) {
  return (
    <span aria-label={name} className="inline-block">
      {name.split("").map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4 + index * 0.07,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

/** Social link with hover glow */
function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl glass border border-white/10 text-muted-foreground transition-all duration-300 hover:text-white hover:border-violet-500/50 hover:glow-primary"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="h-4 w-4" />
    </motion.a>
  );
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-20 text-center overflow-hidden"
    >
      {/* Radial glow behind content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-cyan-500/8 blur-[100px]" />

      <div className="relative z-10 max-w-4xl">
        {/* Availability badge */}
        <motion.div
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available for new opportunities
        </motion.div>

        {/* Greeting */}
        <motion.p
          className="mb-3 text-lg font-medium text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <h1
          className="mb-4 font-display text-6xl font-bold leading-none tracking-tight md:text-8xl lg:text-9xl"
          style={{ perspective: "800px" }}
        >
          <AnimatedName name="Oluwasegun" />
        </h1>

        {/* Typewriter role */}
        <motion.div
          className="mb-6 font-display text-2xl font-semibold md:text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Typewriter words={ROLES} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          I craft beautiful, performant, and accessible web experiences — blending
          clean code with thoughtful design to build things people love using.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mb-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          {/* Primary CTA */}
          <motion.button
            onClick={scrollToProjects}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #06b6d4 100%)",
              backgroundSize: "200% 200%",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">View My Work</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            {/* Shimmer overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={scrollToContact}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition-all duration-300 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Let&apos;s Talk</span>
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <SocialLink
            href="https://github.com/Oluwasegun1"
            icon={Github}
            label="GitHub"
          />
          <SocialLink
            href="https://www.linkedin.com/in/ogunbanjo-oluwasegun-b02831114/"
            icon={Linkedin}
            label="LinkedIn"
          />
          <SocialLink
            href="https://x.com/OgunbanjoSegun2"
            icon={Twitter}
            label="Twitter / X"
          />
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="text-[10px] font-medium tracking-widest text-muted-foreground/60 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 pt-1.5"
        >
          <div className="h-1.5 w-1 rounded-full bg-violet-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
