"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CodeXml, User, Mail, Home } from "lucide-react";
import { Space_Grotesk } from "next/font/google";

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Show/Hide Navbar on Scroll
        const showAnim = gsap.from(navRef.current, {
            yPercent: -100,
            paused: true,
            duration: 0.4,
            ease: "power2.inOut"
        }).progress(1);

        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                if (self.direction === -1) {
                    showAnim.play();
                } else {
                    showAnim.reverse();
                }
            }
        });

        // Active link highlighting
        const sections = ["hero", "about", "projects", "contact"];
        sections.forEach((section) => {
            ScrollTrigger.create({
                trigger: `#${section}`,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveSection(section),
                onEnterBack: () => setActiveSection(section),
            });
        });

    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const navItems = [
        { name: "Home", id: "hero", icon: Home },
        { name: "About", id: "about", icon: User },
        { name: "Projects", id: "projects", icon: CodeXml },
    ];

    return (
        <div
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-3 md:py-6 pointer-events-none ${grotesk.className}`}
        >
            <nav className="pointer-events-auto bg-white/70 dark:bg-black/70 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full shadow-lg px-1 md:px-2 py-1 md:py-2 flex items-center gap-0.5 md:gap-1">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => scrollToSection(e, item.id)}
                            className={`relative px-3 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1 md:gap-2 group
                ${isActive ? "text-white" : "text-gray-600 hover:text-gray-900 hover:bg-white/50"}`}
                        >
                            {isActive && (
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -z-10 animate-fade-in" />
                            )}
                            <item.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"}`} />
                            <span className="hidden sm:inline">{item.name}</span>
                        </a>
                    );
                })}

                <a
                    href="https://www.linkedin.com/in/ramy-esam-03845a226/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 md:ml-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs md:text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1 md:gap-2 shadow-md hover:shadow-lg"
                >
                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Contact</span>
                </a>
            </nav>
        </div>
    );
}
