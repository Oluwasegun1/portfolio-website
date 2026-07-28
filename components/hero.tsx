/** Hero — asymmetric landing section: intro/CTAs on the left, a terminal-style identity card on the right. */
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Roles cycled through by the typewriter */
const ROLES = ["Frontend Developer", "React Specialist", "UI Engineer", "Digital Craftsman"];

/** Typewriter — types and deletes a list of strings in a loop */
function Typewriter({ words }: { words: string[] }) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const delay = isDeleting ? 45 : 90;

    const timeout = setTimeout(() => {
      setDisplayText((prev) => {
        if (!isDeleting) {
          const next = current.slice(0, prev.length + 1);
          if (next === current) {
            setTimeout(() => setIsDeleting(true), 1900);
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
      <span className="animate-cursor-blink ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[1px] rounded-sm bg-primary align-middle" />
    </span>
  );
}

/** Social link with a consistent focus/hover treatment */
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
      className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors duration-200 hover:border-primary/50 hover:bg-accent hover:text-foreground"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="h-4 w-4" />
    </motion.a>
  );
}

/** Identity snippet — a terminal-styled card standing in for a traditional headshot/illustration */
function IdentityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="animate-float-slow w-full max-w-sm rounded-2xl border border-border bg-card/70 p-6 font-mono text-[13px] shadow-2xl shadow-black/20 backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center gap-3 border-b border-border pb-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
        </div>
        <span className="text-xs text-muted-foreground">whoami.ts</span>
      </div>
      <div className="space-y-1.5 leading-relaxed">
        <p>
          <span className="text-primary">const</span>{" "}
          <span className="text-foreground">developer</span> = {"{"}
        </p>
        <p className="pl-4 text-muted-foreground">
          name: <span className="text-foreground">&quot;Oluwasegun&quot;</span>,
        </p>
        <p className="pl-4 text-muted-foreground">
          role: <span className="text-foreground">&quot;Frontend Engineer&quot;</span>,
        </p>
        <p className="pl-4 text-muted-foreground">
          location: <span className="text-foreground">&quot;Lagos, NG&quot;</span>,
        </p>
        <p className="pl-4 text-muted-foreground">
          stack: [<span className="text-foreground">&quot;React&quot;, &quot;Next.js&quot;, &quot;TS&quot;</span>],
        </p>
        <p className="pl-4 text-muted-foreground">
          available: <span className="text-success">true</span>,
        </p>
        <p className="text-foreground">{"}"}</p>
      </div>
    </motion.div>
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
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20"
    >
      <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left — intro */}
        <div>
          {/* Availability badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-sm font-medium text-success"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Available for new opportunities
          </motion.div>

          {/* Greeting + name */}
          <motion.p
            className="font-mono mb-3 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            className="font-display mb-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Oluwasegun
          </motion.h1>

          <motion.div
            className="font-display mb-6 text-2xl font-semibold sm:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typewriter words={ROLES} />
          </motion.div>

          <motion.p
            className="mb-10 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            I build precise, performant web experiences — pairing clean React/Next.js
            engineering with careful attention to detail across the whole interface.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mb-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="xl" onClick={scrollToProjects} className="group gap-2">
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button size="xl" variant="outline" onClick={scrollToContact} className="group gap-2">
              Let&apos;s Talk
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Button>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <SocialLink href="https://github.com/Oluwasegun1" icon={Github} label="GitHub" />
            <SocialLink
              href="https://www.linkedin.com/in/ogunbanjo-oluwasegun-b02831114/"
              icon={Linkedin}
              label="LinkedIn"
            />
            <SocialLink href="https://x.com/OgunbanjoSegun2" icon={Twitter} label="Twitter / X" />
          </motion.div>
        </div>

        {/* Right — identity card, hidden on small screens to avoid competing with the intro */}
        <div className="hidden justify-self-center lg:flex lg:justify-self-end">
          <IdentityCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-border pt-1.5"
        >
          <div className="h-1.5 w-1 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
