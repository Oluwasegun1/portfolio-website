"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Restaurant Landing Page",
    description:
      "An elegant and modern landing page crafted to highlight your restaurant's unique offerings, with sections for featured dishes, chef specials, operating hours, and contact information",
    image:
      "/68747470733a2f2f692e6962622e636f2f356a78424b70772f696d6167652e706e67.png",
    technologies: ["React", "Next.js", "Tailwind CSS", "Redux"],
    liveUrl: "https://gerich-resturants.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/gerich-resturants",
  },
  {
    id: 2,
    title: "Apple iPhone 15 Pro website",
    description:
      ", I recreated the Apple iPhone 15 Pro landing page, combining the smooth, high-performance animations of GSAP (GreenSock Animation Platform) with immersive Three.js 3D visual effects",
    image: "/iphoneImage.png",
    technologies: ["React", "ThreeJs", "Tailwind CSS", "GSAP"],
    liveUrl: "https://iphone-15-lac-xi.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/IPHONE-15",
  },
  {
    id: 3,
    title: "React Job Platform",
    description:
      "A responsive portfolio website showcasing creative work with smooth animations and interactive elements.",
    image: "job.png",
    technologies: ["React", "Tailwind CSS"],
    liveUrl: "https://react-jobs-iota-flax.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/react-jobs",
  },
  // {
  //   id: 4,
  //   title: "Weather Dashboard",
  //   description: "An interactive weather dashboard with real-time data visualization and location-based forecasts.",
  //   image: "/placeholder.svg?height=300&width=500",
  //   technologies: ["React", "Chart.js", "API Integration", "CSS"],
  //   liveUrl: "https://example.com",
  //   githubUrl: "https://github.com/yourusername/project4",
  // },
];

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section id="projects" className="py-20" ref={sectionRef}>
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          <span className="relative">
            My Projects
            <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-primary to-purple-400"></span>
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Here are some of my recent projects that showcase my skills and
          expertise in web development.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3 },
            }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/20">
              <div className="relative overflow-hidden">
                <motion.div
                  className="bg-cover bg-center transition-transform duration-700 w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9]"
                  style={{ backgroundImage: `url(${project.image})` }}
                  animate={
                    hoveredProject === project.id
                      ? { scale: 1.1 }
                      : { scale: 1 }
                  }
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300`}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full p-2 sm:p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    hoveredProject === project.id
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-black/50 backdrop-blur-sm text-xs sm:text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </div>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-lg sm:text-xl font-bold">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="h-2 sm:h-4"></div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between p-3 sm:p-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="group relative overflow-hidden w-full sm:w-auto"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Github className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                      <span>Code</span>
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </a>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="sm"
                    asChild
                    className="group relative overflow-hidden w-full sm:w-auto"
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </a>
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
