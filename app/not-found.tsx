/** Branded 404 — replaces the default Next.js not-found page for any unmatched route. */
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="relative z-10 flex min-h-[70vh] items-center justify-center py-20">
      <div className="container flex max-w-lg flex-col items-center text-center">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="font-display mt-4 text-4xl font-bold sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get
          you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/#projects"
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            View projects
          </Link>
        </div>
      </div>
    </main>
  );
}
