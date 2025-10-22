'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Playfair_Display, Space_Grotesk } from "next/font/google"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, MessageCircle,  Sparkles, ArrowDown, ContactRound, Instagram, Facebook } from 'lucide-react';

  const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"] })
  const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"] })

export default function Hero() {
   const [isLoading, setIsLoading] = useState(true);

  const tl = gsap.timeline()
  const imgRef = useRef(null)
  const sectionRef = useRef(null)
  const loadingRef = useRef(null)
  const imageWrapRef = useRef<HTMLDivElement | null>(null)


// Loading animation
useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return () => clearTimeout(timer);
}, []);

// eslint-disable-next-line react-hooks/exhaustive-deps
useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Loading sequence
  if (isLoading) {
    gsap.fromTo(loadingRef.current, 
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
    );
    return;
  }

  // Section reveal with creative clip path
  tl.fromTo(
    sectionRef.current,
    { 
      clipPath: "inset(100% 0 0 0)",
      opacity: 0
    },
    {
      clipPath: "inset(0% 0 0 0)",
      opacity: 1,
      duration: 2.5,
      ease: "power3.inOut",
    }
  );

  // Animated background particles
  gsap.fromTo(".particle", {
    scale: 0,
    opacity: 0,
    rotation: 0
  }, {
    scale: 1,
    opacity: 0.6,
    rotation: 360,
    duration: 2,
    stagger: 0.1,
    ease: "back.out(1.7)",
    delay: 0.5
  });

  // Floating elements animation
  gsap.to(".floating-element", {
    y: -20,
    rotation: 5,
    duration: 3,
    ease: "power2.inOut",
    stagger: 0.2,
    repeat: -1,
    yoyo: true
  });

  // Creative entrance timeline (wrapper + image)
  const enterTl = gsap.timeline();
  enterTl
    .from(imageWrapRef.current, { opacity: 0, scale: 0.92, duration: 0.6, ease: "power2.out" })
    .from(imgRef.current, { opacity: 0, y: 12, scale: 0.995, duration: 0.8, ease: "power3.out" }, "-=0.2");

  // Smooth continuous rotation for the image itself
  gsap.to(imgRef.current, { rotate: 60, duration: 4, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

  // Typewriter effect for text
  tl.from(".hero-text", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    stagger: 0.3,
    delay: 1,
    ease: "power3.out",
  });

  // Social icons animation
  gsap.fromTo(".social-icon", {
    scale: 0,
    rotation: -180
  }, {
    scale: 1,
    rotation: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.7)",
    delay: 2
  });

  // Button hover animation setup
  gsap.set(".cta-button", { transformOrigin: "center center" });


  // Scroll-triggered animations
  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      gsap.to(".floating-element", {
        y: -30,
        rotation: 10,
        duration: 1,
        ease: "power2.out"
      });
    },
    onLeave: () => {
      gsap.to(".floating-element", {
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "power2.out"
      });
    }
  });

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

      {/* Custom Cursor */}
      <div 
       
      />

      <section ref={sectionRef} className={`min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-pink-400 flex items-center justify-center p-4 relative overflow-hidden bg-[url('/images/heroBg.jpg')] bg-cover bg-center ${grotesk.className}`}>
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-lg rotate-45 blur-sm" />
        <div className="floating-element absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-sm" />
        <div className="floating-element absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-lg rotate-12 blur-sm" />
        <div className="floating-element absolute bottom-20 right-40 w-8 h-8 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-full blur-sm" />
      </div>

      {/* Enhanced background decorative circles with animation */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />

      {/* Main card with glassmorphism effect */}
      <div className="relative w-full max-w-6xl bg-white/20 backdrop-blur-xl rounded-[3rem] shadow-2xl p-8 md:p-12 border  border-white/30">
        {/* Decorative circle top left */}
        <div className="absolute -top-20 -left-10">
         <div className="relative flex items-center justify-center ">
            <div className="relative w-48 h-48 ">
              {/* Outer ring with gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 p-8 shadow-2xl">
                {/* Inner ring */}
                <div className="w-full h-full rounded-full bg-pink-600  shadow-inner" />
              </div>
              {/* Reflection effect */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-8 bg-white/10 blur-xl rounded-full" />
            </div>
          </div>
          </div>

        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-2xl opacity-60" />
        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="relative">
              <h1 className={`hero-text text-5xl md:text-7xl font-bold text-secondary leading-tight relative z-10 ${playfair.className}`}>
               Ramy Esam
              </h1>
              {/* Animated underline */}
              <div className="hero-text absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" 
                   style={{ animation: 'expandWidth 2s ease-out 2s forwards' }} />
            </div>
            
            <div className="flex items-center gap-3">
              <h2 className={`hero-text text-2xl font-bold text-secondary/50 leading-tight ${playfair.className}`}>Frontend Developer</h2>
              <Sparkles className="hero-text w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>

            <p className={`hero-text text-chart-3 text-lg max-w-md leading-relaxed ${grotesk.className}`}>
             Nextjs developer with passion for creating beautiful, interactive web experiences
            </p>

            <div className="flex items-center gap-4">
            <a href="https://is.gd/gbKRLQ">
              <Button 
                className={`cta-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${grotesk.className}`}
                onMouseEnter={(e) => {
                  gsap.to(e.target, { scale: 1.1, duration: 0.3, ease: "power2.out" });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, { scale: 1, duration: 0.3, ease: "power2.out" });
                }}
              >
              Read CV
              </Button>
              </a>
              <a href="https://t.me/ramy_esam">
              <Button 
                variant="outline" 
                className={`cta-button border-2 border-white/30 text-primary hover:bg-white/20 rounded-full px-6 py-4 transition-all duration-300 ${grotesk.className}`}
                onMouseEnter={(e) => {
                  gsap.to(e.target, { scale: 1.05, duration: 0.3, ease: "power2.out" });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, { scale: 1, duration: 0.3, ease: "power2.out" });
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact
              </Button>
              </a>
            </div>

            <div className="pt-8">
              <p className="hero-text text-gray-900 font-medium text-lg mb-4">https://github.com/Ramy29</p>

              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/ramy_e_14?igsh=MWR4ZWNzMjZja2owZw=="
                  className="social-icon w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm rounded-full flex items-center justify-center hover:from-gray-700 hover:to-gray-800 transition-all duration-300 border border-white/30 hover:scale-110 hover:shadow-lg group"
                  onMouseEnter={(e) => {
                    gsap.to(e.target, { rotation: 360, duration: 0.5, ease: "power2.out" });
                  }}
                >
                 <Instagram  className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
                </a>
              
                <a
                  href="https://www.linkedin.com/in/ramy-esam-03845a226/"
                  className="social-icon w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 backdrop-blur-sm rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 border border-white/30 hover:scale-110 hover:shadow-lg group"
                  onMouseEnter={(e) => {
                    gsap.to(e.target, { rotation: 360, duration: 0.5, ease: "power2.out" });
                  }}
                >
                <Linkedin className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
                </a>
                 <a
                  href="https://t.me/ramy_esam"
                  className="social-icon w-12 h-12  backdrop-blur-sm rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 border border-white/30 hover:scale-110 hover:shadow-lg group"
                  onMouseEnter={(e) => {
                    gsap.to(e.target, { rotation: 360, duration: 0.5, ease: "power2.out" });
                  }}
                >
                <ContactRound  className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
                </a>
                 <a
                  href="https://www.facebook.com/share/14Pv6VLLKeQ"
                  className="social-icon w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 backdrop-blur-sm rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 border border-white/30 hover:scale-110 hover:shadow-lg group"
                  onMouseEnter={(e) => {
                    gsap.to(e.target, { rotation: 360, duration: 0.5, ease: "power2.out" });
                  }}
                >
                <Facebook  className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Enhanced 3D Ring element with animations */}
          <div ref={imageWrapRef} className="relative flex items-center justify-center group">
            {/* Simple subtle ring shadow to keep focus on image */}
            <div className="absolute inset-0 w-96 h-96 rounded-full" 
                 style={{ boxShadow: '0 0 80px rgba(255,255,255,0.15) inset' }} />
            
            <div className="relative w-80 h-80 group-hover:scale-105 transition-transform duration-500">
              {/* Outer ring with enhanced gradient and glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 p-8 shadow-2xl group-hover:shadow-pink-500/25 transition-all duration-500">
                {/* Inner ring with animated gradient */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400/80 to-purple-500/80 backdrop-blur-xl shadow-inner animate-pulse" />
              </div>

              {/* No spotlight for clearer image */}

              {/* Floating stars around the ring */}
              <div className="absolute -top-4 -right-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
              <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 -left-8 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -right-8 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />

               <Image 
                ref={imgRef}
                 src='/images/heoImg.png' 
                 className="absolute inset-4 rounded-full object-cover shadow-lg group-hover:shadow-2xl transition-all duration-500 hover:scale-105" 
                 alt="hero image" 
                 width={320} 
                 height={260}
                 style={{ objectPosition: 'center' }}
                 onMouseEnter={(e) => {
                   gsap.to(e.target, { 
                     scale: 1.1, 
                     rotation: 5, 
                     duration: 0.3, 
                     ease: "power2.out" 
                   });
                 }}
                 onMouseLeave={(e) => {
                   gsap.to(e.target, { 
                     scale: 1, 
                     rotation: 0, 
                     duration: 0.3, 
                     ease: "power2.out" 
                   });
                 }}
               />

              {/* Enhanced reflection effect with animation */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-8 bg-gradient-to-r from-white/20 via-white/10 to-white/20 blur-xl rounded-full animate-pulse" />
              
              {/* Glowing ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" style={{ animationDuration: '3s' }} />
            </div>

            {/* Orbiting particles around the image */}
            <div className="orbit-container absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute w-1.5 h-1.5 bg-white/70 rounded-full"
                     style={{
                       left: `${50 + Math.cos((i * 45 * Math.PI) / 180) * 200}px`,
                       top: `${50 + Math.sin((i * 45 * Math.PI) / 180) * 200}px`,
                       boxShadow: '0 0 8px rgba(255,255,255,0.6)'
                     }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card reflection */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[95%] h-16 bg-gradient-to-b from-white/10 to-transparent blur-2xl rounded-[3rem]" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60">
        <span className="text-sm mb-2">Scroll to explore</span>
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }
        
        @keyframes textReveal {
          from { 
            clip-path: inset(0 100% 0 0);
            opacity: 0;
          }
          to { 
            clip-path: inset(0 0% 0 0);
            opacity: 1;
          }
        }
        
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .glow-animation {
          animation: glow 2s ease-in-out infinite;
        }
        
        .text-reveal {
          animation: textReveal 1.5s ease-out forwards;
        }
        
       
      `}</style>
    </section>
    </>
  )
}
