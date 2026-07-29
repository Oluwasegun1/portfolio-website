/** Projects — bento-style showcase grid; each card opens a full case study at /work/[slug]. */
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Tech badge with a subtle colored dot */
function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent/40 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      <span className="h-1 w-1 rounded-full bg-primary" />
      {label}
    </span>
  );
}

/** Image with a skeleton that fades out once the asset has actually loaded, avoiding pop-in */
function ProjectImage({ project, priority }: { project: Project; priority?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-full w-full overflow-hidden bg-muted">
      <div
        className={cn(
          "absolute inset-0 animate-pulse bg-muted transition-opacity duration-300",
          loaded ? "opacity-0" : "opacity-100"
        )}
      />
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        fill
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-all duration-700 group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0"
        )}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
    </div>
  );
}

/** Uniform project card — same size across all slots for a consistent grid */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative"
    >
      <Link
        href={`/work/${project.slug}`}
        className="focus-ring glass-card flex h-full flex-col overflow-hidden rounded-2xl transition-colors"
      >
        {/* Image: 16:9 keeps cards compact and consistent across the row */}
        <div className="relative aspect-video w-full overflow-hidden">
          <ProjectImage project={project} priority={index === 0} />
          {project.featured && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-3 p-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{project.tagline}</p>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="projects" className="relative py-24" ref={sectionRef}>
      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-3">Portfolio</p>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          Selected <span className="text-primary">Works</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          A selection of projects spanning React, Next.js, API integration, and
          motion-driven UI — each one links through to a full case study.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {/* Link to all repos for reviewers who want to keep browsing */}
      <div className="mt-10 flex justify-center">
        <a
          href="https://github.com/Oluwasegun1"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-accent"
        >
          <Github className="h-4 w-4" />
          More on GitHub
        </a>
      </div>
    </section>
  );
}
