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
    title: "Gopaddi ",
    description:
      "A comprehensive travel ecosystem that merges social networking with booking capabilities. Users can plan trips, book flights and hotels, explore a dynamic travel marketplace, and interact with travel content shared by other explorers. I built the responsive user interface for key modules including live streaming, trip planning dashboards, and business service listings.",
    image: "/gopaddi.png",
    technologies: [
      "React",
      "Axios",
      "API Integration",
      "Tailwind CSS",
      "Next.Js",
    ],
    liveUrl: "https://www.gopaddi.com/",
    githubUrl: "https://www.gopaddi.com/",
  },
  {
    id: 2,
    title: "Apple iPhone 15 Pro website",
    description:
      " A high-fidelity recreation of Apple’s iPhone 15 Pro landing page, showcasing cutting-edge frontend techniques. The page blends GSAP-powered animations with 3D interactions using Three.js to deliver a seamless, visually engaging product experience. I implemented every detail—from motion scroll effects to interactive camera transitions.",
    image: "/iphoneImage.png",
    technologies: ["React", "ThreeJs", "Tailwind CSS", "GSAP"],
    liveUrl: "https://iphone-15-lac-xi.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/IPHONE-15",
  },
  {
    id: 3,
    title: "DiscovaTrips ",
    description:
      "A travel discovery platform designed to inspire wanderlust through curated experiences. Users can explore themed trips, view highlights shared by fellow travelers, and engage with destination-based content. I developed the frontend components that support trip browsing, highlight galleries, and interactive user profiles.",
    image: "/discova.png",
    technologies: [
      "React",
      "Axios",
      "API Integration",
      "Tailwind CSS",
      "Next.Js",
      "framer-motion",
    ],
    liveUrl: "https://www.discovatrips.com",
    githubUrl: "https://www.discovatrips.com",
  },
  {
    id: 4,
    title: "Restaurant Landing Page",
    description:
      "A visually appealing and modern landing page tailored for restaurants. It features dynamic sections for featured dishes, chef specials, open hours, and reservations—designed to elevate brand identity and customer engagement. I focused on clean layout structure, intuitive navigation, and responsive design across devices",
    image:
      "/68747470733a2f2f692e6962622e636f2f356a78424b70772f696d6167652e706e67.png",
    technologies: ["React", "Next.js", "Tailwind CSS", "Redux"],
    liveUrl: "https://gerich-resturants.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/gerich-resturants",
  },
  {
    id: 5,
    title: "React Job Platform",
    description:
      "A modern job board platform built exclusively for React developers. Users can browse curated job listings, post openings, and manage applications—all within a clean, developer-friendly interface. I implemented the full-stack solution, focusing on intuitive user flows, dynamic filtering, and form interactions that streamline the job search and hiring experience.",
    image: "/job.png",
    technologies: ["React", "Tailwind CSS"],
    liveUrl: "https://react-jobs-iota-flax.vercel.app/",
    githubUrl: "https://github.com/Oluwasegun1/react-jobs",
  },
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
                      <span>Live</span>
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
