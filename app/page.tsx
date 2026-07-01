/** Main portfolio page — assembles all sections in order. */
import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import StarfieldBackground from "@/components/starfield-background";
import CursorSpotlight from "@/components/cursor-spotlight";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Animated starfield canvas — fixed behind everything */}
      <StarfieldBackground />

      {/* Cursor torch spotlight */}
      <CursorSpotlight />

      {/* Page content above the canvas */}
      <div className="container relative z-10 mx-auto px-4">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}
