/** CursorSpotlight — a very subtle radial glow that follows the pointer in dark mode. Disabled for touch devices (no persistent pointer) and for users who prefer reduced motion. */
"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  // Lazy initializer runs once on mount (client-only component), avoiding a setState-in-effect render cascade
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return finePointer && !reducedMotion;
  });

  useEffect(() => {
    if (!enabled) return;
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const handleMouseMove = (evt: MouseEvent) => {
      spotlight.style.setProperty("--x", `${evt.clientX}px`);
      spotlight.style.setProperty("--y", `${evt.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled]);

  if (!enabled || resolvedTheme !== "dark") return null;

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background:
          "radial-gradient(560px circle at var(--x, 50%) var(--y, 50%), hsl(var(--primary) / 0.04), transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
