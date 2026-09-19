"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Container, Eyebrow, MaskReveal, Reveal, Section } from "../primitives";
import { IMG } from "@/lib/skinmed/images";
import { Star } from "lucide-react";

export function ResultsSection() {
  return (
    <Section id="results" className="relative bg-skinmed-ivory py-20 md:py-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left text */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Reveal>
              <Eyebrow className="mb-5">Real People</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.25rem] md:text-[3rem] font-semibold leading-[1.05] text-skinmed-charcoal">
                Real Results
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-skinmed-text font-medium">
                Visible transformations. Trusted by thousands — every result is real,
                considered and ethically shared.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="mt-7">
              <a href="#contact" className="btn-gold">
                View More Results
                <ArrowRight />
              </a>
            </Reveal>
          </div>

          {/* Slider */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <Reveal>
              <BeforeAfterSlider />
            </Reveal>
          </div>

          {/* Testimonial card */}
          <div className="lg:col-span-3 order-3">
            <Reveal delay={0.16}>
              <TestimonialCard />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // % position of handle 0..100
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  // Pointer-based interaction (works for mouse + touch)
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      updateFromClientX(e.clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, updateFromClientX]);

  const startDrag = (e: React.PointerEvent) => {
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative aspect-[3/4] w-full select-none overflow-hidden rounded-2xl border border-skinmed-line shadow-[0_30px_80px_-30px_rgba(23,23,23,0.35)]"
        onPointerDown={startDrag}
        onKeyDown={onKey}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-label="Before and after comparison slider. Drag or use arrow keys."
        style={{ touchAction: "pan-y" }}
      >
        {/* AFTER (full base image) */}
        <Image
          src={IMG.after}
          alt="After treatment — healthy, radiant skin"
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover pointer-events-none"
          priority
          draggable={false}
        />

        {/* BEFORE (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${pos}%` }}
        >
          <div className="relative h-full w-full" style={{ width: `${100 / (pos / 100)}%` }}>
            <Image
              src={IMG.before}
              alt="Before treatment — visible skin concerns"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
              priority
              draggable={false}
            />

          </div>
        </div>

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 z-30 flex items-center justify-center cursor-ew-resize"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-0 bottom-0 w-0.5 bg-skinmed-gold shadow-[0_0_12px_rgba(201,165,92,0.8)]" />
          <span
            className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-skinmed-white border-2 border-skinmed-gold shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)] transition-transform hover:scale-110 active:scale-95"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-skinmed-charcoal">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* Interaction cue below the card */}
      <div className="mt-3.5 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-skinmed-text-muted font-medium select-none">
        <span className="inline-block w-4 h-px bg-skinmed-gold/50" />
        <span>Drag slider to compare</span>
        <span className="inline-block w-4 h-px bg-skinmed-gold/50" />
      </div>
    </div>
  );
}

function TestimonialCard() {
  return (
    <figure className="relative rounded-2xl bg-skinmed-white border border-skinmed-line p-6 shadow-[0_12px_40px_-12px_rgba(23,23,23,0.18)]">
      <span className="absolute -top-4 left-6 font-serif text-6xl leading-none text-skinmed-gold/40" aria-hidden>
        &ldquo;
      </span>
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-skinmed-gold text-skinmed-gold" />
        ))}
      </div>
      <blockquote className="font-serif text-lg md:text-xl leading-snug text-skinmed-charcoal">
        My skin feels healthier and I'm more confident now. Thank you Dr Zee!
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-skinmed-beige text-skinmed-gold font-serif text-sm">
          A
        </span>
        <div>
          <div className="text-xs font-medium text-skinmed-charcoal">Patient — Acne Programme</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-skinmed-text-muted">
            Acne &amp; Scars
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
