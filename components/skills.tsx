"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
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
  faNpm,
  faSass,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import tailwindIcon from "@/public/icons8-tailwind-css-64.png";
import reduxIcon from "@/public/icons8-redux-32.png";
import gsapIcon from "@/public/gsap-greensock-logo-64.png";
import nextIcon from "@/public/icons8-nextjs-96.png";

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  level: number; // 0-100
}

const skills: Skill[] = [
  {
    name: "React",
    icon: <FontAwesomeIcon icon={faReact} />,
    color: "bg-blue-500",
    level: 90,
  },
  {
    name: "Next.js",
    icon: <Image src={nextIcon} alt="Tailwind CSS" width={40} height={40} />,
    color: "bg-black dark:bg-white dark:text-black",
    level: 85,
  },
  {
    name: "CSS",
    icon: <FontAwesomeIcon icon={faCss3} />,
    color: "bg-blue-400",
    level: 95,
  },
  {
    name: "JavaScript",
    icon: <FontAwesomeIcon icon={faJs} />,
    color: "bg-yellow-500",
    level: 95,
  },
  {
    name: "HTML",
    icon: <FontAwesomeIcon icon={faHtml5} />,
    color: "bg-orange-500",
    level: 98,
  },
  {
    name: "Redux",
    icon: <Image src={reduxIcon} alt="Tailwind CSS" width={40} height={40} />,
    color: "bg-purple-200",
    level: 80,
  },
  {
    name: "GSAP",
    icon: <Image src={gsapIcon} alt="Tailwind CSS" width={40} height={40} />,
    color: "bg-green-500",
    level: 75,
  },
  {
    name: "Tailwind CSS",
    icon: (
      <Image src={tailwindIcon} alt="Tailwind CSS" width={40} height={40} />
    ),
    color: "bg-cyan-500",
    level: 92,
  },
  {
    name: "Figma",
    icon: <FontAwesomeIcon icon={faFigma} />,
    color: "bg-pink-500",
    level: 88,
  },
  {
    name: "Bootstrap",
    icon: <FontAwesomeIcon icon={faBootstrap} />,
    color: "bg-purple-500",
    level: 85,
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section id="skills" className="py-20" ref={sectionRef}>
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          <span className="relative">
            My Skills
            <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-primary to-purple-400"></span>
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          I've worked with a variety of technologies and frameworks to create
          responsive and interactive web applications.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="group relative overflow-hidden rounded-lg bg-card p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50">
              {/* Background gradient that moves on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              {/* Skill content */}
              <div className="relative z-10 flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${skill.color} text-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  {skill.icon}
                </div>

                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-medium">{skill.name}</h3>

                  {/* Skill progress bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-purple-500"
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>

                  <div className="mt-1 text-right text-xs text-muted-foreground">
                    {skill.level}%
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="absolute -top-2 -left-2 h-8 w-8 rounded-full bg-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
