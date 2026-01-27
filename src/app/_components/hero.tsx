'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Playfair_Display, Space_Grotesk } from "next/font/google"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, MessageCircle, Sparkles, ArrowDown, ContactRound, Instagram, Facebook } from 'lucide-react';

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"] })
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"] })

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  const imgRef = useRef<HTMLImageElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const loadingRef = useRef<HTMLDivElement | null>(null)
  const imageWrapRef = useRef<HTMLDivElement | null>(null)


  // Loading animation
  useEffect(() => {
    // Ensure page loads even if there are issues
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Reduced from 2000 to 1000ms
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    // Safe check for browser environment
    if (typeof window === "undefined") return;

    try {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {

        // Loading sequence
        if (isLoading) {
          if (loadingRef.current) {
            gsap.fromTo(loadingRef.current,
              { scale: 0, rotation: -180 },
              { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
            );
          }
          return;
        }

        // Ensure section is visible even if animations fail
        if (sectionRef.current) {
          gsap.set(sectionRef.current, { opacity: 1, clipPath: "inset(0% 0 0 0)" });
        }

        // Section reveal with creative clip path
        if (sectionRef.current) {
          gsap.fromTo(
            sectionRef.current,
            {
              clipPath: "inset(100% 0 0 0)",
              opacity: 0
            },
            {
              clipPath: "inset(0% 0 0 0)",
              opacity: 1,
              duration: 1.5,
              ease: "power3.inOut",
            }
          );
        }

      // Animated background particles - Reduced count & opacity
      gsap.fromTo(".particle", {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 0.3,
        duration: 1.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
      });

      // Floating elements animation - Optimized
      gsap.to(".floating-element", {
        y: -15,
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3
      });

      // Creative entrance timeline (wrapper + image)
      const enterTl = gsap.timeline();
      if (imageWrapRef.current && imgRef.current) {
        enterTl
          .from(imageWrapRef.current, { opacity: 0, scale: 0.92, duration: 0.8, ease: "power2.out" })
          .from(imgRef.current, { opacity: 0, y: 15, scale: 0.95, duration: 1, ease: "power3.out" }, "-=0.4");
      }

      // Typewriter effect for text
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.8,
        ease: "power3.out",
      });

      // Social icons animation
      gsap.fromTo(".social-icon", {
        scale: 0,
      }, {
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.5)",
        delay: 1.5
      });

      }, sectionRef); // Scope to section

      return () => ctx.revert();
    } catch (error) {
      console.error("GSAP animation error:", error);
      // Ensure content is visible even if GSAP fails
      if (sectionRef.current && sectionRef.current instanceof HTMLElement) {
        sectionRef.current.style.opacity = "1";
        sectionRef.current.style.clipPath = "inset(0% 0 0 0)";
      }
    }
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex items-center justify-center z-50">
          <div ref={loadingRef} className="text-center">
            <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-white">Loading Amazing Experience...</h2>
          </div>
        </div>
      )}

      <section id="hero" ref={sectionRef} className={`min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-pink-400 flex items-center justify-center p-3 md:p-4 relative overflow-hidden bg-[url('/images/heroBg.jpg')] bg-cover bg-center ${grotesk.className}`} style={{ opacity: isLoading ? 0 : 1 }}>
        {/* Animated background particles - Reduced Count */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1.5 h-1.5 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Floating geometric shapes - Simplified */}
        <div className="absolute inset-0 pointer-events-none opacity-60 hidden md:block">
          <div className="floating-element absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-lg rotate-45 blur-sm" />
          <div className="floating-element absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-sm" />
          <div className="floating-element absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-lg rotate-12 blur-sm" />
        </div>

        {/* Enhanced background decorative circles - Static for performance but looks same */}
        <div className="absolute top-20 left-20 w-32 h-32 md:w-64 md:h-64 bg-pink-300/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-20 w-48 h-48 md:w-96 md:h-96 bg-blue-300/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />

        {/* Main card with optimized glassmorphism */}
        <div className="relative w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl md:rounded-[3rem] shadow-2xl p-4 md:p-8 lg:p-12 border border-white/20">
          {/* Decorative circle top left - Simplified */}
          <div className="absolute -top-8 -left-4 md:-top-16 md:-left-8 pointer-events-none hidden md:block">
            <div className="relative flex items-center justify-center ">
              <div className="relative w-20 h-20 md:w-40 md:h-40 ">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 p-3 md:p-6 shadow-xl opacity-90">
                  <div className="w-full h-full rounded-full bg-pink-600 shadow-inner" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-5 -left-5 md:-top-10 md:-left-10 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-2xl opacity-40 pointer-events-none hidden md:block" />

          {/* Main content */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center relative z-10">
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <div className="relative inline-block md:block">
                <h1 className={`hero-text text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-secondary leading-tight relative z-10 ${playfair.className}`}>
                  Ramy Esam
                </h1>
                {/* Underline */}
                <div className="hero-text absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80" />
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3">
                <h2 className={`hero-text text-lg sm:text-xl md:text-2xl font-bold text-secondary/60 leading-tight ${playfair.className}`}>Frontend Developer</h2>
                <Sparkles className="hero-text w-4 h-4 md:w-6 md:h-6 text-yellow-400 animate-pulse" />
              </div>

              <p className={`hero-text text-chart-3 text-sm sm:text-base md:text-lg max-w-md mx-auto md:mx-0 leading-relaxed ${grotesk.className}`}>
                Next.js developer with passion for creating beautiful, interactive web experiences
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
                <a href="https://is.gd/gbKRLQ">
                  <Button
                    className={`cta-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-5 py-3 md:px-8 md:py-6 text-sm md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${grotesk.className}`}
                    onMouseEnter={(e) => {
                      try {
                        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 });
                      } catch {
                        // Fallback if GSAP fails
                      }
                    }}
                    onMouseLeave={(e) => {
                      try {
                        gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                      } catch {
                        // Fallback if GSAP fails
                      }
                    }}
                  >
                    Read CV
                  </Button>
                </a>
                <a href="https://t.me/ramy_esam">
                  <Button
                    variant="outline"
                    className={`cta-button border-2 border-white/30 text-primary hover:bg-white/20 rounded-full px-4 py-2.5 md:px-6 md:py-4 text-sm md:text-base transition-all duration-300 ${grotesk.className}`}
                    onMouseEnter={(e) => {
                      try {
                        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 });
                      } catch {
                        // Fallback if GSAP fails
                      }
                    }}
                    onMouseLeave={(e) => {
                      try {
                        gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                      } catch {
                        // Fallback if GSAP fails
                      }
                    }}
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                    Contact
                  </Button>
                </a>
              </div>

              <div className="pt-4 md:pt-6">
                <p className="hero-text text-gray-900 font-medium text-sm md:text-lg mb-3 md:mb-4 break-all">https://github.com/Ramy29</p>

                <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
                  <a
                    href="https://www.instagram.com/ramy_e_14?igsh=MWR4ZWNzMjZja2owZw=="
                    className="social-icon w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm rounded-full flex items-center justify-center hover:from-gray-700 hover:to-gray-800 transition-all duration-300 border border-white/30 hover:scale-110 hover:shadow-lg group"
                  >
                    <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-yellow-400 transition-colors" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/ramy-esam-03845a226/"
                    className="social-icon w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-blue-700 backdrop-blur-sm rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 border border-white/30 hover:scale-110 hover:shadow-lg group"
                  >
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-yellow-400 transition-colors" />
                  </a>
                  <a
                    href="https://t.me/ramy_esam"
                    className="social-icon w-10 h-10 md:w-12 md:h-12 bg-zinc-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-zinc-700 transition-all duration-300 border border-white/30 hover:scale-110 hover:shadow-lg group"
                  >
                    <ContactRound className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-yellow-400 transition-colors" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/14Pv6VLLKeQ"
                    className="social-icon w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-blue-700 backdrop-blur-sm rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 border border-white/30 hover:scale-110 hover:shadow-lg group"
                  >
                    <Facebook className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-yellow-400 transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Enhanced 3D Ring element - Optimized */}
            <div
              ref={imageWrapRef}
              className="relative flex items-center justify-center group mt-6 md:mt-0 w-full"
            >
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 group-hover:scale-[1.02] transition-transform duration-500 will-change-transform mx-auto">
                {/* Optimized shadow */}
                <div
                  className="absolute inset-0 rounded-full opacity-60"
                  style={{ boxShadow: "0 0 60px rgba(255,255,255,0.1)" }}
                />
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 p-3 sm:p-4 md:p-6 shadow-2xl group-hover:shadow-pink-500/25 transition-all duration-500">
                  {/* Inner ring */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400/90 to-purple-500/90 backdrop-blur-sm shadow-inner" />
                </div>

                {/* Floating stars - CSS Animation instead of GSAP Ping */}
                <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
                <div className="absolute -bottom-2 -left-2 md:-bottom-3 md:-left-3 w-1.5 h-1.5 md:w-2 md:h-2 bg-pink-400 rounded-full animate-[pulse_3s_ease-in-out_infinite] delay-700" />
                <div className="absolute top-1/2 -left-4 md:-left-6 w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-[pulse_2.5s_ease-in-out_infinite] delay-1000" />

                <Image
                  ref={imgRef}
                  src='/images/heoImg.png'
                  className="absolute inset-2 sm:inset-3 md:inset-4 rounded-full object-cover shadow-lg group-hover:shadow-2xl transition-all duration-500"
                  alt="hero image"
                  width={320}
                  height={260}
                  style={{ objectPosition: 'center', width: 'auto', height: 'auto' }}
                  onMouseEnter={(e) => {
                    try {
                      gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 });
                    } catch {
                      // Fallback if GSAP fails
                    }
                  }}
                  onMouseLeave={(e) => {
                    try {
                      gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                    } catch {
                      // Fallback if GSAP fails
                    }
                  }}
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                  }}
                />

                {/* Glowing ring effect */}
                <div className="absolute inset-0 rounded-full border border-white/20 animate-[pulse_4s_ease-in-out_infinite]" />
              </div>

              {/* Orbiting particles - Reduced count */}
              <div className="orbit-container absolute inset-0 pointer-events-none hidden sm:block">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="absolute w-1 h-1 bg-white/60 rounded-full"
                    style={{
                      left: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 180}px`,
                      top: `${50 + Math.sin((i * 60 * Math.PI) / 180) * 180}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50">
          <span className="text-xs md:text-sm mb-1 md:mb-2">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
        </div>
      </section>
    </>
  )
}
