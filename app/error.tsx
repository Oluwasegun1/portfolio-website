/** Global error boundary — catches runtime errors in the route tree and offers a way to recover instead of a blank/broken page. */
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="relative z-10 flex min-h-[70vh] items-center justify-center py-20">
      <div className="container flex max-w-lg flex-col items-center text-center">
        <p className="font-mono text-sm text-destructive">Something went wrong</p>
        <h1 className="font-display mt-4 text-3xl font-bold sm:text-4xl">
          An unexpected error occurred
        </h1>
        <p className="mt-4 text-muted-foreground">
          This has been logged. You can try again, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RotateCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
