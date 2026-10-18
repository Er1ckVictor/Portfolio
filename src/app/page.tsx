import { SmoothScroll } from "@/components/SmoothScroll";
import { Ambient } from "@/components/Ambient";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Ambient />
      <a href="#inicio" className="skip-link">
        Pular para o conteúdo
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Timeline />
        <Contact />
      </main>
    </>
  );
}
