"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      gsap.to(dot, { x, y, duration: 0.12, ease: "power2.out" });
      gsap.to(ring, { x, y, duration: 0.25, ease: "power2.out" });
    };

    const scaleUp = () => {
      gsap.to(ring, { scale: 1.6, duration: 0.2, ease: "power2.out", opacity: 0.6 });
    };
    const scaleDown = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: "power2.out", opacity: 0.35 });
    };

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, .cta-button, .proj-chip").forEach((el) => {
      el.addEventListener("mouseenter", scaleUp);
      el.addEventListener("mouseleave", scaleDown);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, .cta-button, .proj-chip").forEach((el) => {
        el.removeEventListener("mouseenter", scaleUp);
        el.removeEventListener("mouseleave", scaleDown);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm" />
      <div ref={dotRef} className="pointer-events-none fixed top-0 left-0 z-[10000] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white" />
    </>
  );
}


