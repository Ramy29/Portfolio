"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type Probs = {
    children : React.ReactNode
}

export default function SmoothScroll({ children }: Probs) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ensure not creating multiple instances of ScrollSmoother
    const existing = ScrollSmoother.get();
    if (existing) existing.kill();

    // Create smooth scrolling wrapper
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5, 
      effects: true,
      normalizeScroll: true,
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
