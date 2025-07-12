"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { useMobile } from "@/hooks/use-mobile";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
  trailLength: number;
  twinklePhase: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  layer: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const isMobile = useMobile();
  const animationFrameIdRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const nebulaeRef = useRef<Nebula[]>([]);

  const starCount = isMobile ? 200 : 350;
  const nebulaCount = isMobile ? 4 : 7;

  const initStarsAndNebulae = useCallback(
    (canvas: HTMLCanvasElement) => {
      const stars: Star[] = [];
      const nebulae: Nebula[] = [];

      // Initialize stars with enhanced properties
      for (let i = 0; i < starCount; i++) {
        const sizeRandom = Math.random();
        let size =
          sizeRandom < 0.65
            ? 0.4 + Math.random() * 0.8
            : sizeRandom < 0.85
            ? 1.2 + Math.random() * 1.0
            : 2.0 + Math.random() * 1.5;

        const colorVariation = Math.random();
        let color;

        if (theme === "dark") {
          if (colorVariation < 0.6) {
            color = "255, 255, 255"; // Pure white
          } else if (colorVariation < 0.75) {
            color = "200, 220, 255"; // Celestial blue
          } else if (colorVariation < 0.85) {
            color = "255, 200, 200"; // Cosmic red
          } else if (colorVariation < 0.95) {
            color = "255, 230, 180"; // Stellar yellow
          } else {
            color = "200, 255, 200"; // Nebula green
          }
        } else {
          if (colorVariation < 0.6) {
            color = "20, 20, 50"; // Deep space blue
          } else if (colorVariation < 0.75) {
            color = "50, 20, 50"; // Cosmic purple
          } else if (colorVariation < 0.85) {
            color = "50, 30, 20"; // Stellar amber
          } else if (colorVariation < 0.95) {
            color = "20, 50, 50"; // Nebula teal
          } else {
            color = "50, 50, 20"; // Cosmic olive
          }
        }

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speed: 0.03 + Math.random() * 0.15,
          opacity: 0.2 + Math.random() * (theme === "dark" ? 0.8 : 0.5),
          color,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.025,
          trailLength: size > 1.5 ? 10 + Math.random() * 20 : 0,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }

      // Initialize layered nebulae
      for (let i = 0; i < nebulaCount; i++) {
        const hue = Math.floor(Math.random() * 360);
        const layer = Math.random();
        const radius = 150 + Math.random() * 250;

        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color: `${hue}, ${theme === "dark" ? "80%" : "40%"}, ${
            theme === "dark" ? "60%" : "90%"
          }`,
          opacity:
            theme === "dark" ? 0.03 + layer * 0.04 : 0.015 + layer * 0.02,
          layer,
        });
      }

      starsRef.current = stars;
      nebulaeRef.current = nebulae;
    },
    [theme, starCount, nebulaCount]
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastMouseMoveTime.current > 30) {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      lastMouseMoveTime.current = now;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStarsAndNebulae(canvas);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw layered nebulae
      nebulaeRef.current.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.radius
        );

        gradient.addColorStop(
          0,
          `hsla(${nebula.color}, ${nebula.opacity * 2.5})`
        );
        gradient.addColorStop(
          0.5,
          `hsla(${nebula.color}, ${nebula.opacity * 1.5})`
        );
        gradient.addColorStop(1, `hsla(${nebula.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();

        // Gentle nebula drift
        nebula.x += Math.sin(Date.now() * 0.00003 * nebula.layer) * 0.15;
        nebula.y += Math.cos(Date.now() * 0.00003 * nebula.layer) * 0.15;

        if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;
        if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
        if (nebula.y > canvas.height + nebula.radius) nebula.y = -nebula.radius;
        if (nebula.y < -nebula.radius) nebula.y = canvas.height + nebula.radius;
      });

      // Calculate smooth mouse influence
      const mouseInfluenceX = (mousePosition.x - canvas.width / 2) * 0.0001;
      const mouseInfluenceY = (mousePosition.y - canvas.height / 2) * 0.0001;

      // Draw constellation connections
      if (!isMobile) {
        ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
        ctx.lineWidth = 0.5;
        starsRef.current.forEach((star1, i) => {
          starsRef.current.slice(i + 1).forEach((star2) => {
            const distance = Math.hypot(star1.x - star2.x, star1.y - star2.y);
            if (distance < 100 && star1.size > 1 && star2.size > 1) {
              ctx.beginPath();
              ctx.moveTo(star1.x, star1.y);
              ctx.lineTo(star2.x, star2.y);
              ctx.stroke();
            }
          });
        });
      }

      // Draw and update stars
      starsRef.current.forEach((star) => {
        star.pulse += star.pulseSpeed;
        star.twinklePhase += 0.05;
        const pulseFactor = 0.15 * Math.sin(star.pulse) + 1;
        const twinkleFactor = 0.5 * Math.sin(star.twinklePhase) + 1;

        // Draw star trail
        if (star.trailLength > 0 && !isMobile) {
          const trailGradient = ctx.createLinearGradient(
            star.x,
            star.y,
            star.x - star.trailLength * star.speed,
            star.y - star.trailLength * star.speed
          );
          trailGradient.addColorStop(
            0,
            `rgba(${star.color}, ${star.opacity * 0.3})`
          );
          trailGradient.addColorStop(1, `rgba(${star.color}, 0)`);
          ctx.strokeStyle = trailGradient;
          ctx.lineWidth = star.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(
            star.x - star.trailLength * star.speed,
            star.y - star.trailLength * star.speed
          );
          ctx.stroke();
        }

        // Draw star with glow
        if (star.size > 1.5 && !isMobile) {
          const glow = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.size * 4
          );
          glow.addColorStop(0, `rgba(${star.color}, ${star.opacity * 0.9})`);
          glow.addColorStop(1, `rgba(${star.color}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw star
        ctx.fillStyle = `rgba(${star.color}, ${
          star.opacity * pulseFactor * twinkleFactor
        })`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * pulseFactor, 0, Math.PI * 2);
        ctx.fill();

        // Update position with enhanced parallax
        star.y += star.speed + mouseInfluenceY * star.size * 3;
        star.x += mouseInfluenceX * star.size * 3;

        // Reset position
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
          star.twinklePhase = Math.random() * Math.PI * 2;
        } else if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
          star.twinklePhase = Math.random() * Math.PI * 2;
        }

        if (star.x > canvas.width) {
          star.x = 0;
          star.y = Math.random() * canvas.height;
          star.twinklePhase = Math.random() * Math.PI * 2;
        } else if (star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * canvas.height;
          star.twinklePhase = Math.random() * Math.PI * 2;
        }
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [handleMouseMove, initStarsAndNebulae, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 h-full w-full ${
        theme === "light" ? "opacity-50" : "opacity-85"
      }`}
      aria-hidden="true"
    />
  );
}
