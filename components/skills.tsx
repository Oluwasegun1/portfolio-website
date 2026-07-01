/** Skills — categorized skill grid with SVG progress rings and an infinite marquee logo strip. */
"use client";

import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useInView } from "framer-motion";
import {
  faReact,
  faCss3,
  faHtml5,
  faBootstrap,
  faFigma,
  faJs,
  faGitAlt,
  faNodeJs,
  faSass,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

// ─── Type definitions ───
interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  category: "frontend" | "tools" | "design";
  color: string;
}

// ─── Skill data ───
const SKILLS: Skill[] = [
  {
    name: "React",
    icon: <FontAwesomeIcon icon={faReact} />,
    level: 90,
    category: "frontend",
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    icon: (
      <Image
        src="/icons8-nextjs-96.png"
        alt="Next.js"
        width={32}
        height={32}
        className="invert"
      />
    ),
    level: 85,
    category: "frontend",
    color: "#ffffff",
  },
  {
    name: "JavaScript",
    icon: <FontAwesomeIcon icon={faJs} />,
    level: 95,
    category: "frontend",
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    icon: (
      <span className="font-display text-xs font-bold text-[#3178C6]">TS</span>
    ),
    level: 80,
    category: "frontend",
    color: "#3178C6",
  },
  {
    name: "HTML5",
    icon: <FontAwesomeIcon icon={faHtml5} />,
    level: 98,
    category: "frontend",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    icon: <FontAwesomeIcon icon={faCss3} />,
    level: 95,
    category: "frontend",
    color: "#264de4",
  },
  {
    name: "Tailwind CSS",
    icon: (
      <Image
        src="/icons8-tailwind-css-64.png"
        alt="Tailwind CSS"
        width={32}
        height={32}
      />
    ),
    level: 92,
    category: "frontend",
    color: "#06B6D4",
  },
  {
    name: "GSAP",
    icon: (
      <Image
        src="/gsap-greensock-logo-64.png"
        alt="GSAP"
        width={32}
        height={32}
      />
    ),
    level: 75,
    category: "tools",
    color: "#88CE02",
  },
  {
    name: "Git",
    icon: <FontAwesomeIcon icon={faGitAlt} />,
    level: 85,
    category: "tools",
    color: "#F05032",
  },
  {
    name: "Redux",
    icon: (
      <Image
        src="/icons8-redux-32.png"
        alt="Redux"
        width={32}
        height={32}
      />
    ),
    level: 80,
    category: "tools",
    color: "#764ABC",
  },
  {
    name: "Figma",
    icon: <FontAwesomeIcon icon={faFigma} />,
    level: 88,
    category: "design",
    color: "#F24E1E",
  },
  {
    name: "Bootstrap",
    icon: <FontAwesomeIcon icon={faBootstrap} />,
    level: 85,
    category: "design",
    color: "#7952B3",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Skills" },
  { key: "frontend", label: "Frontend" },
  { key: "tools", label: "Tools & Libs" },
  { key: "design", label: "Design" },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

/** SVG circular progress ring */
function ProgressRing({
  level,
  color,
  isInView,
  delay,
}: {
  level: number;
  color: string;
  isInView: boolean;
  delay: number;
}) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      className="absolute inset-0"
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx="28"
        cy="28"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="3"
      />
      {/* Progress */}
      <motion.circle
        cx="28"
        cy="28"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={
          isInView
            ? { strokeDashoffset }
            : { strokeDashoffset: circumference }
        }
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        transform="rotate(-90 28 28)"
        style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
      />
    </svg>
  );
}

/** Individual skill card with ring progress indicator */
function SkillCard({
  skill,
  index,
  isInView,
}: {
  skill: Skill;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="glass-card group flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition-all duration-300"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -5, scale: 1.03 }}
    >
      {/* Icon with ring */}
      <div className="relative flex h-14 w-14 items-center justify-center">
        <ProgressRing
          level={skill.level}
          color={skill.color}
          isInView={isInView}
          delay={index * 0.07 + 0.3}
        />
        <div
          className="z-10 flex h-9 w-9 items-center justify-center rounded-full text-lg transition-transform duration-300 group-hover:scale-110"
          style={{ color: skill.color }}
        >
          {skill.icon}
        </div>
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-foreground/90 group-hover:text-white transition-colors duration-200">
        {skill.name}
      </p>

      {/* Level */}
      <p className="text-[11px] font-medium" style={{ color: skill.color }}>
        {skill.level}%
      </p>
    </motion.div>
  );
}

/** Infinite marquee strip of skill labels */
function SkillsMarquee() {
  const items = [...SKILLS, ...SKILLS]; // duplicate for seamless loop
  return (
    <div className="relative mt-12 overflow-hidden py-4">
      {/* Fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="animate-marquee flex gap-4 whitespace-nowrap w-max">
        {items.map((skill, index) => (
          <span
            key={`${skill.name}-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm font-medium text-muted-foreground"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: skill.color }}
            />
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  /** Active category filter */
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filtered =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 overflow-hidden" ref={sectionRef}>
      {/* Background glow */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/6 blur-[100px]" />

      <div className="relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">Expertise</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            My{" "}
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Technologies and tools I work with daily to build world-class
            web experiences.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          className="mb-10 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative rounded-xl px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {activeCategory === cat.key && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 rounded-xl bg-violet-600/30 border border-violet-500/40"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Marquee strip */}
        <SkillsMarquee />
      </div>
    </section>
  );
}
