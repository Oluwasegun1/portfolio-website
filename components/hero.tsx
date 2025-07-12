"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const nameElement = nameRef.current;
    if (!nameElement) return;

    const letters = nameElement.innerText.split("");
    nameElement.innerHTML = "";

    letters.forEach((letter, index) => {
      const span = document.createElement("span");
      span.innerText = letter;
      span.style.animationDelay = `${index * 0.15}s`;
      span.className = "inline-block animate-float-intense opacity-0";
      nameElement.appendChild(span);
    });
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.p
          className="mb-4 text-xl font-medium text-primary"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hello, I'm
        </motion.p>

        <h1
          ref={nameRef}
          className="mb-6 text-5xl font-bold leading-tight tracking-tighter md:text-7xl"
        >
          Oluwasegun
        </h1>

        <motion.p
          className="mb-8 md:text-xl sm:text-sm  text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          I’m a passionate and detail-oriented web developer dedicated to
          building beautiful, interactive, and fully responsive websites that
          don’t just look great—but also perform seamlessly. With a strong grasp
          of modern web technologies like HTML, CSS, JavaScript, React, and
          Tailwind CSS, I bring digital ideas to life through clean code,
          thoughtful design, and user-focused functionality. Whether it’s
          creating smooth animations, optimizing performance, or making sure
          every layout looks stunning on all devices, I’m driven by the
          challenge of blending creativity with code to deliver immersive online
          experiences. Let’s build something remarkable together.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="gap-2 relative overflow-hidden group"
              onClick={scrollToProjects}
            >
              <span className="relative z-10">View Projects</span>
              <ArrowDown className="h-4 w-4 relative z-10" />
              <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">Contact Me</span>
              <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <ArrowDown className="h-6 w-6 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
