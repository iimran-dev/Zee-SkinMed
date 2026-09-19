"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for luxury smooth inertia
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // GSAP ScrollTrigger: Luxury Gold Progress Bar at the top of the viewport
    let progressTween: gsap.core.Tween | null = null;
    if (progressRef.current) {
      progressTween = gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
        },
      });
    }

    // GSAP Global Parallax & Scroll Choreography across site sections
    const ctx = gsap.context(() => {
      // 1. Subtle parallax on Hero image
      gsap.to("#home img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Doctor section floating ambient decorative shapes
      gsap.to(".doctor-decor-1", {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(".doctor-decor-2", {
        y: 25,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // 3. Treatment section cards smooth staggered elevation
      gsap.fromTo(
        ".treatment-card-gsap",
        { y: 30, opacity: 0.85 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#treatments",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // 4. Consultation CTA glowing orb subtle pulse & scale
      gsap.to(".cta-ambient-glow", {
        scale: 1.3,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: "#contact",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });

    // Global Anchor Interceptor: Smoothly scroll to any hash link (#about, #treatments, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -75,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Refresh ScrollTrigger after all elements settle
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      clearTimeout(refreshTimeout);
      document.removeEventListener("click", handleAnchorClick);
      if (progressTween) progressTween.kill();
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* Luxury Scroll Progress Bar (Gold gradient line) */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] bg-gradient-to-r from-skinmed-gold-light via-skinmed-gold to-skinmed-gold-dark origin-left scale-x-0 pointer-events-none shadow-[0_1px_8px_rgba(201,165,92,0.6)]"
      />
      {children}
    </>
  );
}
