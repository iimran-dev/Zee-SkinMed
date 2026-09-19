"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container, Eyebrow, Reveal, Section } from "../primitives";
import { IMG } from "@/lib/skinmed/images";

export function ResultsSection() {
  return (
    <Section id="results" className="relative bg-skinmed-ivory py-12 sm:py-16 md:py-20 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative & Clinical Context (5 cols) */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="mb-2 sm:mb-3">Clinical Outcomes</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-2xl sm:text-3xl md:text-[2.25rem] font-semibold leading-[1.1] text-skinmed-charcoal">
                Visible Transformations,{" "}
                <span className="block font-sans text-skinmed-gold font-normal">
                  Authentic Care
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-skinmed-text font-medium max-w-md">
                Documented clinical progress following Dr Zee&apos;s bespoke treatment protocols. Every
                transformation is patient-consented, physician-supervised, and unretouched under
                standardized clinical lighting.
              </p>
            </Reveal>

            {/* Minimal Protocol Indicators */}
            <Reveal delay={0.2} className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-skinmed-charcoal">
                <CheckCircle2 className="h-3.5 w-3.5 text-skinmed-gold shrink-0" />
                <span className="font-medium">Pigmentation &amp; Barrier Restoration</span>
                <span className="text-skinmed-text-muted">• 8-Week Programme</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-skinmed-charcoal">
                <CheckCircle2 className="h-3.5 w-3.5 text-skinmed-gold shrink-0" />
                <span className="font-medium">100% Real Patient Results</span>
                <span className="text-skinmed-text-muted">• Zero Filters</span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Compact Before/After Slider (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <BeforeAfterSlider />
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

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  // Pointer-based interaction (mouse + touch)
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
    <div className="w-full max-w-[480px] mx-auto lg:ml-auto">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] sm:aspect-[16/11] w-full select-none overflow-hidden rounded-2xl border border-skinmed-line shadow-md bg-skinmed-cream"
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
        {/* AFTER (Base image) */}
        <Image
          src={IMG.after}
          alt="After treatment — healthy, radiant skin"
          fill
          sizes="(min-width: 1024px) 480px, 92vw"
          className="object-cover object-center pointer-events-none"
          priority
          draggable={false}
        />

        {/* BEFORE (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${pos}%` }}
        >
          <div className="relative h-full w-full" style={{ width: `${100 / (pos / 100)}%` }}>
            <Image
              src={IMG.before}
              alt="Before treatment — visible skin concerns"
              fill
              sizes="(min-width: 1024px) 480px, 92vw"
              className="object-cover object-center"
              priority
              draggable={false}
            />
          </div>
        </div>

        {/* Floating Minimal Badges */}
        <span className="absolute top-3 left-3 z-20 rounded-md bg-black/65 backdrop-blur-xs px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-skinmed-ivory/90 border border-white/10 pointer-events-none">
          Before
        </span>
        <span className="absolute top-3 right-3 z-20 rounded-md bg-skinmed-charcoal/80 backdrop-blur-xs px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-skinmed-gold border border-skinmed-gold/30 pointer-events-none">
          After
        </span>

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 z-30 flex items-center justify-center cursor-ew-resize"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-0 bottom-0 w-0.5 bg-skinmed-gold shadow-[0_0_10px_rgba(201,165,92,0.8)]" />
          <span
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-skinmed-gold shadow-md transition-transform hover:scale-110 active:scale-95"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5 text-skinmed-charcoal">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* Interaction cue below the card */}
      <div className="mt-2.5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-skinmed-text-muted font-medium select-none">
        <span className="inline-block w-3 h-px bg-skinmed-gold/40" />
        <span>Drag to compare • Authentic clinical outcome</span>
        <span className="inline-block w-3 h-px bg-skinmed-gold/40" />
      </div>
    </div>
  );
}

