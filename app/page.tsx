/** Main portfolio page — assembles all sections in order. */
import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import AmbientBackground from "@/components/ambient-background";
import CursorSpotlight from "@/components/cursor-spotlight";
import CommandPalette from "@/components/command-palette";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <CursorSpotlight />
      <CommandPalette />

      <main id="main-content" className="relative z-10 min-h-screen">
        <div className="container">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </main>
    </>
  );
}
