/** CursorSpotlight — radial torch effect that follows the cursor in dark mode. */
"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const handleMouseMove = (evt: MouseEvent) => {
      spotlight.style.setProperty("--x", `${evt.clientX}px`);
      spotlight.style.setProperty("--y", `${evt.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Only show in dark mode
  if (resolvedTheme !== "dark") return null;

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(124, 58, 237, 0.06), transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
