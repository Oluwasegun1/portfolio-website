/** Projects — showcase of selected works with glassmorphism cards and 3D hover tilt. */
"use client";

import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Gopaddi",
    description:
      "A comprehensive travel ecosystem merging social networking with booking capabilities. Users can plan trips, book flights and hotels, explore a dynamic travel marketplace, and interact with travel content. I built responsive UI for live streaming, trip planning dashboards, and business service listings.",
    image: "/gopaddi.png",
    technologies: ["React", "Next.js", "Axios", "Tailwind CSS", "API Integration"],
    liveUrl: "https://www.gopaddi.com/",
    githubUrl: "https://www.gopaddi.com/",
    featured: true,
  },
  {
    id: 2,
    title: "Apple iPhone 15 Pro",
    description:
      "A high-fidelity recreation of Apple's iPhone 15 Pro landing page, featuring GSAP-powered animations with 3D interactions using Three.js. Every detail — from motion scroll effects to interactive camera transitions — is faithfully implemented.",
    image: "/iphoneImage.png",
    technologies: ["React", "Three.js", "GSAP", "Tailwind CSS"],
    liveUrl: "https://iphone-15-lac-xi.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/IPHONE-15",
  },
  {
    id: 3,
    title: "DiscovaTrips",
    description:
      "A travel discovery platform inspiring wanderlust through curated experiences. Users explore themed trips, view highlights shared by fellow travelers, and engage with destination content. I developed frontend components for trip browsing, highlight galleries, and interactive profiles.",
    image: "/discova.png",
    technologies: ["React", "Next.js", "Framer Motion", "Axios", "Tailwind CSS"],
    liveUrl: "https://www.discovatrips.com",
    githubUrl: "https://www.discovatrips.com",
  },
  {
    id: 4,
    title: "Restaurant Landing Page",
    description:
      "A visually striking landing page for a restaurant brand, featuring featured dishes, chef specials, open hours, and reservations. Focused on clean layout structure, intuitive navigation, and responsive design across all devices.",
    image: "/68747470733a2f2f692e6962622e636f2f356a78424b70772f696d6167652e706e67.png",
    technologies: ["React", "Next.js", "Tailwind CSS", "Redux"],
    liveUrl: "https://gerich-resturants.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/gerich-resturants",
  },
  {
    id: 5,
    title: "React Job Platform",
    description:
      "A modern job board built exclusively for React developers. Users browse curated listings, post openings, and manage applications — all within a clean developer-friendly interface with dynamic filtering and intuitive form interactions.",
    image: "/job.png",
    technologies: ["React", "Tailwind CSS"],
    liveUrl: "https://react-jobs-iota-flax.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/react-jobs",
  },
];

/** Tech badge with subtle colored dot */
function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-300">
      <span className="h-1 w-1 rounded-full bg-violet-400" />
      {label}
    </span>
  );
}

/** Project number — large faded numeral */
function ProjectNumber({ num }: { num: number }) {
  return (
    <span className="font-display absolute -top-4 -right-2 text-8xl font-bold text-white/[0.04] select-none leading-none">
      {String(num).padStart(2, "0")}
    </span>
  );
}

/** Individual project card with 3D tilt on hover */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (evt: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((evt.clientY - centerY) / (rect.height / 2)) * -6;
    const rotateY = ((evt.clientX - centerX) / (rect.width / 2)) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        className="glass-card relative overflow-hidden rounded-2xl transition-all duration-300"
      >
      {/* Project number watermark */}
      <ProjectNumber num={project.id} />

      {/* Project image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient overlay always present */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/40 to-transparent" />

        {/* Tech badges slide up on hover */}
        <motion.div
          className="absolute bottom-3 left-3 flex flex-wrap gap-1.5"
          initial={{ opacity: 0, y: 12 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm border border-white/10"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Card body */}
      <div className="relative p-6">
        {/* Title row */}
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-bold leading-tight text-foreground group-hover:text-white transition-colors duration-200">
            {project.title}
          </h3>
          <div className="flex shrink-0 gap-2 pt-0.5">
            {project.githubUrl !== project.liveUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-all duration-200 hover:border-white/30 hover:text-white hover:bg-white/5"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 transition-all duration-200 hover:bg-violet-600/40 hover:text-white"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [featured, ...rest] = PROJECTS;

  return (
    <section id="projects" className="relative py-24 overflow-hidden" ref={sectionRef}>
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-600/6 blur-[120px]" />

      <div className="relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">Portfolio</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Selected{" "}
            <span className="gradient-text">Works</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A selection of projects that showcase my skills across React,
            Next.js, API integration, and immersive UI experiences.
          </p>
        </motion.div>

        {/* Featured project — full width */}
        <motion.div
          className="mb-8 group glass-card relative overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-[320px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050814]/80 md:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/80 to-transparent md:hidden" />

              {/* Featured badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  ⭐ Featured Project
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 md:p-10">
              <h3 className="font-display mb-3 text-3xl font-bold">
                {featured.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {featured.technologies.map((tech) => (
                  <TechBadge key={tech} label={tech} />
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/25"
                >
                  Live Demo <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Remaining projects grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
