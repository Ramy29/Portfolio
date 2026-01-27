"use client";

import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { CodeXml, Tv, Github } from "lucide-react";
import { projects } from "@/lib/projects";
import { Playfair_Display, Space_Grotesk } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"] })
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"] })


export default function Projects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const slides = gsap.utils.toArray<HTMLElement>(".slide");

    // Desktop only: Horizontal scroll
    mm.add("(min-width: 768px)", () => {
      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontalSection",
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + window.innerWidth * (slides.length - 1),
          anticipatePin: 1,
        },
      });
    });

    // Animations for elements (runs on both, but vertical friendly)
    slides.forEach((slide) => {
      const img = slide.querySelector(".proj-img") as HTMLElement | null;
      const title = slide.querySelector(".proj-title") as HTMLElement | null;
      const desc = slide.querySelector(".proj-desc") as HTMLElement | null;

      if (img) {
        gsap.from(img, {
          y: 60,
          opacity: 0,
          rotate: 2,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: slide, start: "top 70%" },
        });

        // Continuous float
        gsap.to(img, {
          y: -8,
          duration: 2.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (title) {
        gsap.from(title, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: slide, start: "top 78%" },
        });
      }

      if (desc) {
        gsap.from(desc, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: slide, start: "top 76%" },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <main id="projects" className="horizontalSection flex flex-col md:flex-row overflow-x-hidden md:overflow-hidden">
      {projects.map((project) => (
        <section
          key={project.id}
          className="slide relative flex flex-col md:flex-row items-center justify-center w-full md:w-screen min-h-screen md:h-screen flex-shrink-0 gap-6 md:gap-10 px-4 sm:px-6 md:px-16 py-12 md:py-20 bg-[url('/images/ice.jpg')] bg-cover bg-center"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0" />
          {/* Decorative glows */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <div className="absolute -top-16 -left-10 w-72 h-72 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-16 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-6xl mx-auto">
            {/* Project image */}
            <div className="proj-img group relative flex-shrink-0 w-full md:w-auto">
              <div className="absolute -inset-2 md:-inset-3 rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden ring-1 ring-white/40 shadow-2xl">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={420}
                  height={320}
                  className="rounded-2xl md:rounded-3xl object-cover transition-transform duration-500 group-hover:scale-[1.04] w-full"
                />
              </div>
            </div>

            {/* Project details */}
            <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
              <div className="proj-title inline-block relative">
                <h2
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${playfair.className} text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600`}
                >
                  {project.name}
                </h2>
                <span className="absolute -bottom-1 md:-bottom-2 left-0 h-0.5 md:h-1 w-12 md:w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full " />
              </div>

              <p
                className={`proj-desc text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 font-medium leading-relaxed ${grotesk.className}`}
              >
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 relative z-20">
                {project.techStack.map((tech, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className={`flex items-center bg-primary/50 text-white border-2 border-white/40 hover:scale-125 rounded-full px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-none ${grotesk.className}`}
                  >
                    <CodeXml className="w-3 h-3 md:w-5 md:h-5 mr-1 md:mr-2 text-purple-300" />
                    {tech}
                  </Button>
                ))}
              </div>

              {/* Project links */}
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 md:gap-6 pt-2 md:pt-4">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="secondary"
                    className={`cta-button w-full sm:w-auto border-2 border-white/30 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 rounded-full px-5 py-3 md:px-6 md:py-4 text-sm md:text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${grotesk.className}`}
                  >
                    <Tv className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                    Live demo
                  </Button>
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    className={`cta-button w-full sm:w-auto bg-zinc-800 border-2 border-white/30 text-white hover:bg-zinc-700 rounded-full px-5 py-3 md:px-6 md:py-4 text-sm md:text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${grotesk.className}`}
                  >
                    <Github className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                    GitHub
                  </Button>
                </a>
              </div>

              {/* Project note/message */}
              {project.message && (
                <p className="text-xs md:text-sm text-red-500 font-medium">
                  {project.message}
                </p>
              )}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

