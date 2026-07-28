/** Footer — brand footer with logo, nav links, socials, and back-to-top. */
"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];

const SOCIALS = [
  { href: "https://github.com/Oluwasegun1", icon: Github, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/ogunbanjo-oluwasegun-b02831114/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "https://x.com/OgunbanjoSegun2", icon: Twitter, label: "X / Twitter" },
  {
    href: "https://www.instagram.com/ogunbanjooluwasegun/",
    icon: Instagram,
    label: "Instagram",
  },
];

/** Scroll-to-top button */
function BackToTop() {
  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.button
      onClick={scrollUp}
      aria-label="Back to top"
      className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-accent hover:text-foreground"
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowUp className="h-4 w-4" />
    </motion.button>
  );
}

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl gradient-border">
                <span className="font-display gradient-text select-none text-sm font-bold">
                  OS
                </span>
              </div>
              <span className="font-display text-base font-semibold">Oluwasegun</span>
            </div>
            <p className="max-w-[220px] text-xs leading-relaxed text-muted-foreground">
              Frontend Developer crafting precise web experiences, one component at a time.
            </p>
            <p className="font-mono text-xs text-muted-foreground/60">Lagos, Nigeria</p>
          </div>

          {/* Nav links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-start gap-x-6 gap-y-2 md:justify-center"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={`#${link.href}`}
                onClick={(evt) => {
                  evt.preventDefault();
                  scrollTo(link.href);
                }}
                className="focus-ring rounded-md text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials + back to top */}
          <div className="flex items-center justify-start gap-3 md:justify-end">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-accent hover:text-foreground"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
            <div className="ml-1">
              <BackToTop />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center md:flex-row md:text-left">
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Ogunbanjo Oluwasegun. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground/50">
            Built with Next.js · Framer Motion · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
