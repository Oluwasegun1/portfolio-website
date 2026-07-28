/** AppProviders — single client boundary for theme, motion, and toast context. One entry point avoids Turbopack HMR desync across multiple provider chunks in the root layout. */
"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      <MotionConfig reducedMotion="user">
        {children}
        <Toaster position="bottom-right" />
      </MotionConfig>
    </ThemeProvider>
  );
}
