"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container, Eyebrow, Reveal, Section } from "../primitives";
import { IMG } from "@/lib/skinmed/images";

type Severity = "optimal" | "moderate";

type Marker = {
  id: string;
  label: string;
  severity: Severity;
  severityLabel: string;
  note: string;
  x: number;
  y: number;
  treatment: string;
  score: number;
};

const MARKERS: Marker[] = [
  {
    id: "pigmentation",
    label: "Pigmentation",
    severity: "moderate",
    severityLabel: "Moderate Tone Variation",
    note: "Mild sun-induced tone variations across the malar cheek area. Responds best to gentle exfoliation and brightening actives.",
    x: 63,
    y: 49,
    treatment: "Pigmentation Correction",
    score: 74,
  },
  {
    id: "hydration",
    label: "Hydration & Pores",
    severity: "optimal",
    severityLabel: "Balanced Barrier",
    note: "Healthy skin barrier with balanced lipid mantle and refined pore architecture throughout the mid-face.",
    x: 37,
    y: 54,
    treatment: "Medi-Facials & Peels",
    score: 91,
  },
  {
    id: "tone",
    label: "Tone Uniformity",
    severity: "optimal",
    severityLabel: "High Epidermal Clarity",
    note: "High natural light reflectance with smooth cellular turnover across the upper cheekbone plane.",
    x: 32,
    y: 42,
    treatment: "Skin Rejuvenation",
    score: 88,
  },
  {
    id: "expression",
    label: "Expression Lines",
    severity: "optimal",
    severityLabel: "Youthful Elasticity",
    note: "Preserved dermal collagen structure with micro-smooth forehead texture and minimal dynamic creasing.",
    x: 62,
    y: 33,
    treatment: "Anti-Aging Solutions",
    score: 93,
  },
  {
    id: "tzone",
    label: "T-Zone Clarity",
    severity: "moderate",
    severityLabel: "Localized Congestion",
    note: "Subtle sebum activity around the lower jawline and chin. Calibrated extractions and salicylic peel recommended.",
    x: 50,
    y: 69,
    treatment: "Acne & Acne Scars",
    score: 79,
  },
];

export function AISkinAnalysis() {
  const [activeId, setActiveId] = useState<string>("pigmentation");
  const activeMarker = MARKERS.find((m) => m.id === activeId) ?? MARKERS[0];

  return (
    <Section id="ai-analysis" className="relative bg-[#FAF7F2] py-12 sm:py-16 md:py-20 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clinical Copy & Dynamic Zone Report (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal>
              <Eyebrow className="mb-2 sm:mb-3">Vision Intelligence</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="section-heading text-2xl sm:text-3xl md:text-[2.25rem] font-semibold leading-[1.1] text-skinmed-charcoal">
                Precision Skin{" "}
                <span className="block font-sans text-skinmed-gold font-normal">
                  Mapping &amp; Diagnostics
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-skinmed-text font-medium max-w-lg">
                Calibrated to Dr. Zeenath Begum&apos;s clinical dermatology protocols. Select any
                biometric marker on the console to inspect localized dermal readings and targeted corrective protocols.
              </p>
            </Reveal>

            {/* Interactive Zone Filter Tabs */}
            <Reveal delay={0.18} className="mt-4 sm:mt-5">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {MARKERS.map((m) => {
                  const isSelected = activeId === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActiveId(m.id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-all ${
                        isSelected
                          ? "bg-skinmed-charcoal text-skinmed-gold shadow-xs font-semibold"
                          : "bg-white/80 text-skinmed-charcoal/75 border border-skinmed-line/80 hover:bg-white hover:text-skinmed-charcoal"
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Dynamic Active Zone Finding Card */}
            <Reveal delay={0.22} className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMarker.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-skinmed-line bg-white p-5 shadow-xs"
                >

                  <p className="text-xs sm:text-[13px] leading-relaxed text-skinmed-text font-medium">
                    {activeMarker.note}
                  </p>

                  <div className="mt-4 pt-3 border-t border-skinmed-line/60 flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-skinmed-text-muted mr-1.5">Target Protocol:</span>
                      <span className="font-semibold text-skinmed-charcoal">{activeMarker.treatment}</span>
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-skinmed-gold hover:text-skinmed-gold-dark transition-colors"
                    >
                      <span>Consult Dr Zee</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>

          {/* Right Column: Compact Clinical Biometric Face Console (6 cols) */}
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[400px] overflow-hidden rounded-2xl p-2 shadow-lg">
                {/* Viewport Box */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black">
                  <Image
                    src={IMG.aiFace}
                    alt="AI clinical biometric face mapping interface"
                    fill
                    sizes="(min-width: 1024px) 400px, 90vw"
                    className="object-cover object-top"
                    priority
                  />

                  {/* Subtle Central Reticle Crosshair */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
                    <div className="h-5 w-px bg-skinmed-gold" />
                    <div className="w-5 h-px bg-skinmed-gold" />
                  </div>

                  {/* Interactive Biometric Hotspots */}
                  {MARKERS.map((m) => {
                    const isSelected = activeId === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        aria-label={`Select ${m.label} zone`}
                        onClick={() => setActiveId(m.id)}
                        className="group absolute z-30 focus:outline-none cursor-pointer"
                        style={{
                          left: `${m.x}%`,
                          top: `${m.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {/* Pulse Ring */}
                        <span className="relative flex h-6 w-6 items-center justify-center">
                          {isSelected && (
                            <span className="absolute h-full w-full rounded-full animate-ping bg-skinmed-gold/50 opacity-75" />
                          )}
                          <span
                            className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${
                              isSelected
                                ? "scale-125 bg-skinmed-gold border-white"
                                : "bg-white/90 border-black/30 group-hover:bg-skinmed-gold group-hover:scale-110"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isSelected ? "bg-skinmed-charcoal" : "bg-skinmed-gold"
                              }`}
                            />
                          </span>
                        </span>

                        {/* Floating Target Label */}
                        <span
                          className={`absolute left-1/2 -translate-x-1/2 -top-5.5 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-200 ${
                            isSelected
                              ? "bg-skinmed-gold text-skinmed-charcoal shadow-xs opacity-100"
                              : "bg-black/70 text-white/80 opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          {m.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function HUDCorners() {
  const c = "absolute h-3.5 w-3.5 border-skinmed-gold/80";
  return (
    <>
      <span className={`${c} top-0 left-0 border-l border-t`} />
      <span className={`${c} top-0 right-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-l border-b`} />
      <span className={`${c} bottom-0 right-0 border-r border-b`} />
    </>
  );
}
