/** Case-study detail page — server-rendered project deep dive with prev/next navigation. */
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Github, CheckCircle2, Lock, Lightbulb, TrendingUp } from "lucide-react";
import { PROJECTS, getProjectBySlug, getAdjacentProjects } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

// The case-study list is fixed and small — reject any slug outside it at the
// routing layer instead of rendering a dynamic page that could mis-report its status
export const dynamicParams = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oluwasegun-portfolio.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const pageUrl = `${SITE_URL}/work/${slug}`;
  const ogImage = project.image.startsWith("/")
    ? `${SITE_URL}${project.image}`
    : project.image;

  return {
    title: project.title,
    description: `${project.tagline} — ${project.description.slice(0, 120)}…`,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${project.title} · Case Study`,
      description: `${project.tagline} — ${project.description.slice(0, 120)}…`,
      url: pageUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.title} preview` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} · Case Study`,
      description: `${project.tagline} — ${project.description.slice(0, 120)}…`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <main id="main-content" className="relative z-10 py-16">
      <div className="container max-w-4xl">
        <Link
          href="/#projects"
          className="focus-ring mb-10 inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="section-label mb-3">{project.year} Case Study</p>
          <h1 className="font-display mb-3 text-4xl font-bold leading-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{project.tagline}</p>
        </div>

        {/* Actions */}
        <div className="mb-10 flex flex-wrap gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Live
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          {project.githubUrl && !project.privateNote && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <Github className="h-4 w-4" />
              Source
            </a>
          )}
        </div>

        {/* Private / corporate notice */}
        {project.privateNote && (
          <div className="mb-10 flex items-start gap-3 rounded-xl border border-border bg-accent/30 px-5 py-4">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-sm leading-relaxed text-muted-foreground">{project.privateNote}</p>
          </div>
        )}

        {/* Cover image */}
        <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl border border-border">
          <Image
            src={project.image}
            alt={`${project.title} — project screenshot`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>

        {/* Meta row */}
        <div className="mb-12 grid grid-cols-2 gap-6 rounded-2xl border border-border p-6 sm:grid-cols-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Year</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{project.year}</p>
          </div>
          <div className="col-span-1 sm:col-span-3">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Stack</p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {project.technologies.join(" · ")}
            </p>
          </div>
        </div>

        {/* Narrative */}
        <div className="mb-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display mb-3 text-xl font-bold">The Challenge</h2>
            <p className="leading-relaxed text-muted-foreground">{project.problem}</p>
          </div>
          <div>
            <h2 className="font-display mb-3 text-xl font-bold">My Role</h2>
            <p className="leading-relaxed text-muted-foreground">{project.role}</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-12">
          <h2 className="font-display mb-4 text-xl font-bold">What I Built</h2>
          <ul className="space-y-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decisions & Trade-offs */}
        {project.decisions && project.decisions.length > 0 && (
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-2.5">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold">Decisions &amp; Trade-offs</h2>
            </div>
            <div className="space-y-5">
              {project.decisions.map((decision) => (
                <div
                  key={decision.title}
                  className="rounded-xl border border-border bg-accent/20 p-5"
                >
                  <p className="mb-2 text-sm font-semibold text-foreground">{decision.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{decision.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <div className="mb-16">
            <div className="mb-4 flex items-center gap-2.5">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold">Results</h2>
            </div>
            <ul className="space-y-3">
              {project.results.map((result) => (
                <li key={result} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prev / next */}
        <div className="grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
          <Link
            href={`/work/${prev.slug}`}
            className="focus-ring group flex flex-col gap-1 rounded-xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-accent"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" />
              Previous
            </span>
            <span className="font-display font-semibold text-foreground group-hover:text-primary">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="focus-ring group flex flex-col gap-1 rounded-xl border border-border p-4 text-right transition-colors hover:border-primary/40 hover:bg-accent"
          >
            <span className="inline-flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground">
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="font-display font-semibold text-foreground group-hover:text-primary">
              {next.title}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
