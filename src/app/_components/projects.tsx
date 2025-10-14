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

    const slides = gsap.utils.toArray<HTMLElement>(".slide");

    gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontalSection",
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => "+=" + window.innerWidth * (slides.length - 1),
        anticipatePin:1
      },
    });

    // Per-slide creative reveals
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
        // Subtle continuous float
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
  }, []);

  return (
    <main className="horizontalSection flex flex-row overflow-hidden">
      {projects.map((project) => (
        <section
          key={project.id}
          className="slide relative flex flex-col md:flex-row items-center justify-center w-screen flex-shrink-0 gap-10 px-6 md:px-16 py-20 bg-[url('/images/ice.jpg')] bg-cover bg-center"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0" />
          {/* Decorative glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -left-10 w-72 h-72 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-16 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
            {/* Project image */}
            <div className="proj-img group relative flex-shrink-0">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/40 shadow-2xl">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={420}
                  height={320}
                  className="rounded-3xl object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </div>

            {/* Project details */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="proj-title inline-block relative">
                <h2
                  className={`text-4xl md:text-5xl font-bold ${playfair.className} text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600`}
                >
                  {project.name}
                </h2>
                <span className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full " />
              </div>

              <p
                className={`proj-desc text-lg md:text-xl text-gray-800 font-medium leading-relaxed ${grotesk.className}`}
              >
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 relative z-20">
                {project.techStack.map((tech, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className={` flex items-center bg-primary/50 text-white border-2 border-white/40 hover:scale-125 rounded-full px-5 py-2 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-none ${grotesk.className} `}
                  >
                    <CodeXml className="w-5 h-5 mr-2 text-purple-300" />
                    {tech}
                  </Button>
                ))}
              </div>

              {/* Project links */}
              <div className="flex justify-center md:justify-start gap-6 pt-4">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="secondary"
                    className={`cta-button border-2 border-white/30 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 rounded-full px-6 py-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${grotesk.className}`}
                  >
                    <Tv className="w-5 h-5 mr-2" />
                    Live demo
                  </Button>
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className={`cta-button bg-zinc-800 border-2 border-white/30 text-white hover:bg-zinc-700 rounded-full px-6 py-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${grotesk.className}`}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                </a>
              </div>

              {/* Project note/message */}
              {project.message && (
                <p className="text-sm text-red-500 font-medium">
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

