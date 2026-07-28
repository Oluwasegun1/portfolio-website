/** Header — sticky glass nav with IntersectionObserver-based active-section tracking, an accessible Sheet-based mobile menu, and a command-palette launcher. */
"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, Moon, Sun, Search } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Monogram logo — gradient "OS" in a glow ring; the one recurring brand mark allowed to use the accent gradient */
function Logo() {
  return (
    <a
      href="#home"
      onClick={(evt) => {
        evt.preventDefault();
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-xl"
      aria-label="Home"
    >
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl gradient-border">
        <span
          className="font-display gradient-text select-none text-sm font-bold"
          aria-hidden="true"
        >
          OS
        </span>
      </div>
    </a>
  );
}

const NAV_ITEMS = [
  { name: "Home", href: "home" },
  { name: "About", href: "about" },
  { name: "Projects", href: "projects" },
  { name: "Skills", href: "skills" },
  { name: "Contact", href: "contact" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is centered in the viewport, without polling on every scroll frame
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.href)).filter(
      (el): el is HTMLElement => el !== null
    );

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observerRef.current?.observe(section));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new Event("open-command-palette"));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass border-b border-border shadow-lg shadow-black/10" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.name}>
                  <a
                    href={`#${item.href}`}
                    onClick={(evt) => {
                      evt.preventDefault();
                      scrollTo(item.href);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "focus-ring relative inline-block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg border border-border bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Command palette trigger */}
          <button
            type="button"
            onClick={openCommandPalette}
            className="focus-ring hidden items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
            aria-label="Open command palette"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="font-mono">⌘K</span>
          </button>
          <button
            type="button"
            onClick={openCommandPalette}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:hidden"
            aria-label="Open command palette"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="focus-ring relative h-9 w-9 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <Button
              variant="ghost"
              size="icon"
              className="focus-ring h-9 w-9 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <SheetContent side="right" className="w-full border-l border-border bg-background/98 backdrop-blur-xl sm:max-w-sm">
              <SheetTitle className="font-display text-lg">Navigate</SheetTitle>
              <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <a
                      href={`#${item.href}`}
                      onClick={(evt) => {
                        evt.preventDefault();
                        scrollTo(item.href);
                      }}
                      className={cn(
                        "focus-ring rounded-xl px-4 py-3 font-display text-xl font-medium transition-colors",
                        activeSection === item.href
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {item.name}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
