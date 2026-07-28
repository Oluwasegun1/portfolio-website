/** Skills — grouped capability tags plus an ambient logo marquee. Deliberately drops self-rated percentage scores, which read as unverifiable filler rather than credible signal. */
"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaReact,
  FaHtml5,
  FaCss3,
  FaBootstrap,
  FaFigma,
  FaGitAlt,
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiGreensock, SiRedux } from "react-icons/si";

interface Skill {
  name: string;
  icon: ReactNode;
}

interface SkillGroup {
  title: string;
  skills: Skill[];
}

const GROUPS: SkillGroup[] = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "CSS3", icon: <FaCss3 /> },
    ],
  },
  {
    title: "Styling & Motion",
    skills: [
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Framer Motion", icon: <span className="text-[10px] font-bold">FM</span> },
      { name: "GSAP", icon: <SiGreensock /> },
      { name: "Bootstrap", icon: <FaBootstrap /> },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "Redux", icon: <SiRedux /> },
      { name: "Figma", icon: <FaFigma /> },
      { name: "REST APIs", icon: <span className="text-[10px] font-bold">{"{ }"}</span> },
    ],
  },
];

const MARQUEE_ITEMS = GROUPS.flatMap((group) => group.skills);

function SkillTag({ skill, delay, isInView }: { skill: Skill; delay: number; isInView: boolean }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 rounded-xl border border-border bg-accent/30 px-3.5 py-2.5 transition-colors hover:border-primary/40 hover:bg-accent"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-primary [&_svg]:h-4 [&_svg]:w-4">
        {skill.icon}
      </span>
      <span className="text-sm font-medium text-foreground">{skill.name}</span>
    </motion.div>
  );
}

/** Infinite marquee strip of skill logos — pauses on hover and collapses under prefers-reduced-motion (globals.css) */
function SkillsMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative mt-14 overflow-hidden py-4">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="animate-marquee flex w-max gap-4 whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((skill, index) => (
          <span
            key={`${skill.name}-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/30 px-4 py-2 text-sm font-medium text-muted-foreground"
          >
            <span className="flex h-4 w-4 items-center justify-center text-primary [&_svg]:h-3.5 [&_svg]:w-3.5">
              {skill.icon}
            </span>
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

  return (
    <section id="skills" className="relative py-24" ref={sectionRef}>
      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-3">Expertise</p>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          My <span className="text-primary">Skills</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          The languages, frameworks, and tools I reach for daily to build
          production-quality interfaces.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
        {GROUPS.map((group, groupIndex) => (
          <div key={group.title} className="rounded-2xl border border-border p-6">
            <h3 className="font-mono mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {group.title}
            </h3>
            <div className="flex flex-col gap-2.5">
              {group.skills.map((skill, skillIndex) => (
                <SkillTag
                  key={skill.name}
                  skill={skill}
                  isInView={isInView}
                  delay={groupIndex * 0.1 + skillIndex * 0.05}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <SkillsMarquee />
    </section>
  );
}
