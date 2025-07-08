import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import StarfieldBackground from "@/components/starfield-background";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <StarfieldBackground />
      <div className="container relative z-10 mx-auto px-4 py-8">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}
