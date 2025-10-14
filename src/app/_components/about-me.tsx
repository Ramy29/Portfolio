"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Heart, 
  GraduationCap,  
  Award, 
  Users, 
  Lightbulb, 
  Target,
} from 'lucide-react';
import { Playfair_Display, Space_Grotesk } from 'next/font/google';

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"] });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function AboutMe() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background floating elements
      gsap.to(".bg-float-1", {
        y: -20,
        x: 10,
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".bg-float-2", {
        y: 15,
        x: -15,
        rotation: -3,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      gsap.to(".bg-float-3", {
        y: -10,
        x: 20,
        rotation: 8,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      // Hero section - Enhanced animations
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-title", {
          y: 80,
          opacity: 0,
          scale: 0.9,
          duration: 1.4,
          ease: "power4.out",
        })
        .from(".hero-subtitle", {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        }, "-=0.8")
        .from(".hero-description", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        }, "-=0.6")
        .from(".hero-badges", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }, "-=0.4")
        .from(".hero-image", {
          scale: 0.7,
          opacity: 0,
          rotation: 10,
          duration: 1.6,
          ease: "back.out(1.7)",
        }, "-=1.2");

      // Skills section - Creative animations
      gsap.from(".skill-card", {
        y: 80,
        opacity: 0,
        scale: 0.8,
        rotation: 5,
        duration: 1,
        stagger: {
          amount: 0.8,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Skill bars animation
      gsap.from(".skill-bar", {
        scaleX: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 70%",
        },
      });

      // Soft skills - Enhanced hover effects
      gsap.from(".soft-skill-card", {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".soft-skills-section",
          start: "top 85%",
        },
      });

      // Education timeline - Smooth reveal
      gsap.from(".timeline-item", {
        x: -120,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: educationRef.current,
          start: "top 80%",
        },
      });

      // Timeline line animation
      gsap.from(".timeline-line", {
        scaleY: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: educationRef.current,
          start: "top 80%",
        },
      });

      // Continuous floating for skill cards
      gsap.to(".skill-card", {
        y: -8,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });

      // Parallax effect for background elements (batch without returning a value)
      ScrollTrigger.batch(".bg-float-1", {
        onEnter: (elements) => {
          gsap.to(elements, { y: -30, duration: 1, ease: "power2.out" });
        },
        onLeave: (elements) => {
          gsap.to(elements, { y: 0, duration: 1, ease: "power2.out" });
        },
      });

      // Skills marquee enhanced
      gsap.to(".marquee-content", {
        x: "-50%",
        duration: 20,
        ease: "none",
        repeat: -1,
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const technicalSkills = [
    { name: "React", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "Next.js", level: 90, color: "from-gray-700 to-gray-900" },
    { name: "TypeScript", level: 88, color: "from-blue-600 to-blue-800" },
    { name: "Tailwind CSS", level: 92, color: "from-cyan-500 to-teal-500" },
    { name: "GSAP", level: 85, color: "from-green-500 to-emerald-500" },
    { name: "Shadcn", level: 95, color: "from-purple-500 to-pink-500" },
  ];

  const softSkills = [
    { name: "Problem Solving", icon: Lightbulb, description: "Analytical thinking and creative solutions" },
    { name: "Team Collaboration", icon: Users, description: "Effective communication and teamwork" },
    { name: "Adaptability", icon: Target, description: "Quick learning and flexibility" },
    { name: "Attention to Detail", icon: Award, description: "Precision and quality focus" },
  ];

  const education = [
    {
      year: "2021-2025",
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      description: "Specialized in Software Engineering and Web Development",
      achievements: ["Dean's List", "Outstanding Student Award"]
    },
  ];


  return (
    <main ref={mainRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-float-1 absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="bg-float-2 absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-blue-300/15 to-cyan-300/15 rounded-full blur-3xl"></div>
        <div className="bg-float-3 absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-pink-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-br from-cyan-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>
      {/* Hero section */}
      <section ref={heroRef} className="relative py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className={`hero-title text-5xl md:text-7xl font-bold text-gray-900 leading-tight ${playfair.className}`}>
                Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Ramy</span>
              </h1>
              <p className={`hero-subtitle text-2xl text-gray-700 ${grotesk.className}`}>
                Frontend Developer & UI/UX Enthusiast
              </p>
              <p className="hero-description text-lg text-gray-600 leading-relaxed">
                I am passionate about creating beautiful, functional, and user-friendly web experiences. 
                With expertise in modern web technologies, I bring ideas to life through clean code and 
                innovative design solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-lg">
                  <Code className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Frontend Developer</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-lg">
                  <Heart className="w-5 h-5 text-pink-600" />
                  <span className="text-sm font-medium">UI/UX Designer</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="hero-image relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30"></div>
                <div className="relative w-full h-full rounded-full flex items-center justify-center">
                 <Image src='/images/Profile 4.jpg' alt='Main photot' width={300} height={300} className='rounded-full'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical skills section */}
      <section ref={skillsRef} className="py-20 px-6 md:px-16 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
              Technical Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {technicalSkills.map((skill, index) => (
              <div key={index} className="skill-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{skill.name}</h3>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills marquee (seamless carousel) */}
          <div className="relative w-full overflow-hidden select-none text-sm text-gray-600">
            <div className="mrq flex items-center gap-12 whitespace-nowrap will-change-transform px-6">
              <span className="px-2">React</span>
              <span className="px-2">Next.js</span>
              <span className="px-2">TypeScript</span>
              <span className="px-2">Tailwind CSS</span>
              <span className="px-2">Shadcn</span>
              <span className="px-2">MUI</span>
              <span className="px-2">GSAP</span>
              <span className="px-2">Framer Motion</span>
              <span className="px-2">Accessibility</span>
              <span className="px-2">SEO</span>
              <span className="px-2">Performance</span>
              <span className="px-2">Animations</span>
              {/* duplicate once inside the same track for seamless loop */}
              <span className="px-2">React</span>
              <span className="px-2">Next.js</span>
              <span className="px-2">TypeScript</span>
              <span className="px-2">Tailwind CSS</span>
              <span className="px-2">Shadcn</span>
              <span className="px-2">MUI</span>
              <span className="px-2">GSAP</span>
              <span className="px-2">Framer Motion</span>
              <span className="px-2">Accessibility</span>
              <span className="px-2">SEO</span>
              <span className="px-2">Performance</span>
              <span className="px-2">Animations</span>
              <span className="inline-block w-24" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* Soft skills section */}
   <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
  <div className="max-w-7xl mx-auto">
    {/* Section header */}
    <div className="text-center mb-20">
      <h2
        className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight ${playfair.className}`}
      >
        Soft Skills
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        The personal attributes that help me work effectively and harmoniously
      </p>
      <div className="mt-4 h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
    </div>

    {/* Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {softSkills.map((skill, index) => (
        <div
          key={index}
          className="relative group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

          <div className="relative flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-5 group-hover:scale-110 transition-transform duration-300">
              <skill.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
          </div>
        </div>
      ))}
        </div>
      </div>
            </section>


      {/* Education section */}
      <section ref={educationRef} className="py-20 px-6 md:px-16 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
              Education
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My academic journey and achievements
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
            {education.map((edu, index) => (
              <div key={index} className="timeline-item relative pl-20 pb-12">
                <div className="absolute left-6 top-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">{edu.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">{edu.institution}</h4>
                  <p className="text-gray-600 mb-4">{edu.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
