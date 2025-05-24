"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
  pulse: number
  pulseSpeed: number
}

interface Nebula {
  x: number
  y: number
  radius: number
  color: string
  opacity: number
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const lastMouseMoveTime = useRef(0)
  const isMobile = useMobile()
  const animationFrameIdRef = useRef<number>(0)
  const starsRef = useRef<Star[]>([])
  const nebulaeRef = useRef<Nebula[]>([])

  // Calculate star count based on device
  const starCount = isMobile ? 150 : 250
  const nebulaCount = isMobile ? 3 : 5

  // Initialize stars and nebulae
  const initStarsAndNebulae = useCallback(
    (canvas: HTMLCanvasElement) => {
      const stars: Star[] = []
      const nebulae: Nebula[] = []

      // Initialize stars with better distribution of sizes
      for (let i = 0; i < starCount; i++) {
        const sizeRandom = Math.random()
        // Create a more natural distribution of star sizes
        // Most stars are small, few are large
        let size
        if (sizeRandom < 0.7) {
          size = 0.3 + Math.random() * 0.7 // 70% small stars
        } else if (sizeRandom < 0.9) {
          size = 1.0 + Math.random() * 0.8 // 20% medium stars
        } else {
          size = 1.8 + Math.random() * 1.0 // 10% large stars
        }

        const colorVariation = Math.random()
        let color

        if (theme === "dark") {
          // More subtle colors in dark mode
          if (colorVariation < 0.7) {
            color = "255, 255, 255" // White (most stars)
          } else if (colorVariation < 0.85) {
            color = "200, 220, 255" // Subtle blue-ish
          } else if (colorVariation < 0.95) {
            color = "255, 220, 220" // Subtle red-ish
          } else {
            color = "255, 240, 220" // Subtle yellow-ish
          }
        } else {
          // More visible but still subtle colors in light mode
          if (colorVariation < 0.7) {
            color = "30, 30, 60" // Dark blue (most stars)
          } else if (colorVariation < 0.85) {
            color = "60, 30, 60" // Dark purple
          } else if (colorVariation < 0.95) {
            color = "60, 40, 30" // Dark amber
          } else {
            color = "30, 60, 60" // Dark teal
          }
        }

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speed: 0.02 + Math.random() * 0.1, // Slower speed
          opacity: 0.1 + Math.random() * (theme === "dark" ? 0.9 : 0.6), // Lower opacity in light mode
          color,
          pulse: Math.random() * Math.PI * 2, // Random start phase
          pulseSpeed: 0.01 + Math.random() * 0.02, // Slower pulse
        })
      }

      // Initialize nebulae (colorful cloud-like backgrounds)
      for (let i = 0; i < nebulaCount; i++) {
        let color
        if (theme === "dark") {
          const hue = Math.floor(Math.random() * 360)
          color = `${hue}, 70%, 50%`
        } else {
          const hue = Math.floor(Math.random() * 360)
          color = `${hue}, 30%, 85%`
        }

        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 100 + Math.random() * 200,
          color,
          opacity: theme === "dark" ? 0.02 + Math.random() * 0.03 : 0.01 + Math.random() * 0.02, // Very subtle, especially in light mode
        })
      }

      starsRef.current = stars
      nebulaeRef.current = nebulae
    },
    [theme, starCount, nebulaCount],
  )

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now()
    // Only update mouse position every 50ms to improve performance
    if (now - lastMouseMoveTime.current > 50) {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
      lastMouseMoveTime.current = now
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions and initialize
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStarsAndNebulae(canvas)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)
    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw nebulae
      nebulaeRef.current.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)

        const colorFormat = "hsla"
        gradient.addColorStop(0, `${colorFormat}(${nebula.color}, ${nebula.opacity * 2})`)
        gradient.addColorStop(1, `${colorFormat}(${nebula.color}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fill()

        // Very slow movement for nebulae
        nebula.x += Math.sin(Date.now() * 0.00005) * 0.1
        nebula.y += Math.cos(Date.now() * 0.00005) * 0.1

        // Reset if off screen
        if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius
        if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius
        if (nebula.y > canvas.height + nebula.radius) nebula.y = -nebula.radius
        if (nebula.y < -nebula.radius) nebula.y = canvas.height + nebula.radius
      })

      // Calculate mouse influence (very subtle parallax effect)
      // Reduced from 0.0005 to 0.0001 for more subtle effect
      const mouseInfluenceX = (mousePosition.x - canvas.width / 2) * 0.00008
      const mouseInfluenceY = (mousePosition.y - canvas.height / 2) * 0.00008

      // Draw and update stars
      starsRef.current.forEach((star) => {
        // Update pulse with a more subtle effect
        star.pulse += star.pulseSpeed
        const pulseFactor = 0.1 * Math.sin(star.pulse) + 1 // Reduced from 0.2 to 0.1

        // Draw star with pulse effect
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * pulseFactor, 0, Math.PI * 2)

        // Add glow effect only for larger stars to improve performance
        if (star.size > 1.8 && !isMobile) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
          glow.addColorStop(0, `rgba(${star.color}, ${star.opacity * 0.8})`)
          glow.addColorStop(1, `rgba(${star.color}, 0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw the star itself
        ctx.fillStyle = `rgba(${star.color}, ${star.opacity * pulseFactor})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * pulseFactor, 0, Math.PI * 2)
        ctx.fill()

        // Move star with base speed + mouse influence
        // Apply mouse influence based on star size for a parallax effect
        // Larger stars move more than smaller ones
        star.y += star.speed + mouseInfluenceY * star.size * 2
        star.x += mouseInfluenceX * star.size * 2

        // Reset star position if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        } else if (star.y < 0) {
          star.y = canvas.height
          star.x = Math.random() * canvas.width
        }

        if (star.x > canvas.width) {
          star.x = 0
          star.y = Math.random() * canvas.height
        } else if (star.x < 0) {
          star.x = canvas.width
          star.y = Math.random() * canvas.height
        }
      })

      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameIdRef.current)
    }
  }, [handleMouseMove, initStarsAndNebulae, isMobile])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 h-full w-full ${theme === "light" ? "opacity-60" : "opacity-80"}`}
      aria-hidden="true"
    />
  )
}
