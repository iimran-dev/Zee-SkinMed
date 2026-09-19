"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Columns2,
  LayoutGrid,
  Maximize2,
  Sparkles,
  X,
} from "lucide-react";
import { Container, Eyebrow, Reveal, Section } from "../primitives";
import { IMG } from "@/lib/skinmed/images";

type SpaceCategory = "all" | "clinical" | "sanctuary";
type DisplayLayout = "bento" | "cinematic";

type ClinicSpace = {
  id: string;
  src: string;
  alt: string;
  category: "clinical" | "sanctuary";
  dimensions: string;
  specs: { label: string; value: string }[];
};

const CLINIC_SPACES: ClinicSpace[] = [
  {
    id: "reception",
    src: IMG.reception,
    alt: "Reception and welcome lounge of Dr Zee's SKINMED clinic",
    category: "sanctuary",
    dimensions: "Panoramic Sanctuary",
    specs: [
      { label: "Atmosphere", value: "Acoustic Silence" },
      { label: "Intake", value: "Discreet & Private" },
      { label: "Beverage", value: "Botanical Infusion Bar" },
    ],
  },
  {
    id: "treatmentRoom",
    src: IMG.treatmentRoom,
    alt: "Modern dermatology clinical treatment suite",
    category: "clinical",
    dimensions: "Suite 01",
    specs: [
      { label: "Airflow", value: "HEPA Laminar Cleanair" },
      { label: "Ergonomics", value: "Medical Reclining Suite" },
      { label: "Sterility", value: "Hospital-Grade Protocol" },
    ],
  },
  {
    id: "consult",
    src: IMG.consult,
    alt: "Private doctor consultation lounge",
    category: "sanctuary",
    dimensions: "Consultation",
    specs: [
      { label: "Diagnostics", value: "Digital Dermatoscope" },
      { label: "Dialogue", value: "1-on-1 Confidential" },
      { label: "Acoustics", value: "Double Sound-Insulated" },
    ],
  },
  {
    id: "equipment",
    src: IMG.equipment,
    alt: "FDA-approved energy and laser medical aesthetic technology",
    category: "clinical",
    dimensions: "Energy Workstation",
    specs: [
      { label: "Safety", value: "US FDA Cleared Platforms" },
      { label: "Optics", value: "Multi-Wavelength Lasers" },
      { label: "Calibration", value: "Skin-Phototype Specific" },
    ],
  },
  {
    id: "studio",
    src: IMG.studio,
    alt: "Skin renewal studio and post-care replenishment space",
    category: "sanctuary",
    dimensions: "Recovery Studio",
    specs: [
      { label: "Cooling", value: "Cryo-Recovery Protocol" },
      { label: "Hydration", value: "Medical Hydrafacials" },
      { label: "Ambience", value: "Circadian Glow Therapy" },
    ],
  },
];

export function ClinicGallery() {
  const reduce = useReducedMotion();
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<SpaceCategory>("all");
  const [displayLayout, setDisplayLayout] = useState<DisplayLayout>("bento");

  const filteredSpaces = useMemo(() => {
    if (activeCategory === "all") return CLINIC_SPACES;
    return CLINIC_SPACES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const activeSpace = selectedSpaceIndex !== null ? CLINIC_SPACES[selectedSpaceIndex] : null;

  const handleNext = useCallback(() => {
    setSelectedSpaceIndex((prev) =>
      prev !== null ? (prev + 1) % CLINIC_SPACES.length : null
    );
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedSpaceIndex((prev) =>
      prev !== null ? (prev - 1 + CLINIC_SPACES.length) % CLINIC_SPACES.length : null
    );
  }, []);

  useEffect(() => {
    if (selectedSpaceIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSpaceIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedSpaceIndex, handleNext, handlePrev]);

  return (
    <Section id="gallery" className="relative bg-[#FBF9F5] py-20 sm:py-28 md:py-36 overflow-hidden">
      {/* Background Architectural Accent Lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] [background-size:4rem_4rem]" />

      <Container>
        {/* Editorial Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 sm:mb-14 items-end">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow className="mb-4 sm:mb-5">Spatial Architecture</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.25rem] sm:text-[3.25rem] md:text-[4rem] leading-[1.02] text-skinmed-charcoal font-semibold">
                Sanctuary &amp;
                <span className="block font-serif italic text-skinmed-gold mt-1 font-normal">
                  Clinical Discretion
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4">
            <Reveal delay={0.16}>
              <p className="text-sm leading-relaxed text-skinmed-text font-medium md:text-right">
                Modern. Hygienic. Discreet. Every room is designed around patient privacy,
                calibrated acoustics, hospital-grade sterility, and restorative daylight.
              </p>
            </Reveal>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {displayLayout === "bento" ? (
            <motion.div
              key={`bento-${activeCategory}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeCategory === "all" ? (
                /* Full 5-Module Bento Grid with 100% Landscape Proportions */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-7">
                  {/* Tier 1: Two spacious landscape architectural showcases (6 + 6 cols) */}
                  <div className="md:col-span-1 lg:col-span-6">
                    <LandscapeBentoCard
                      space={CLINIC_SPACES[0]}
                      aspect="aspect-[16/10] sm:aspect-[16/9.5]"
                      isPrimary
                      onSelect={() => setSelectedSpaceIndex(0)}
                      reduce={reduce}
                    />
                  </div>
                  <div className="md:col-span-1 lg:col-span-6">
                    <LandscapeBentoCard
                      space={CLINIC_SPACES[1]}
                      aspect="aspect-[16/10] sm:aspect-[16/9.5]"
                      onSelect={() => setSelectedSpaceIndex(1)}
                      reduce={reduce}
                    />
                  </div>

                  {/* Tier 2: Three balanced landscape suites (4 + 4 + 4 cols) */}
                  <div className="md:col-span-1 lg:col-span-4">
                    <LandscapeBentoCard
                      space={CLINIC_SPACES[2]}
                      aspect="aspect-[16/10]"
                      onSelect={() => setSelectedSpaceIndex(2)}
                      reduce={reduce}
                    />
                  </div>
                  <div className="md:col-span-1 lg:col-span-4">
                    <LandscapeBentoCard
                      space={CLINIC_SPACES[3]}
                      aspect="aspect-[16/10]"
                      onSelect={() => setSelectedSpaceIndex(3)}
                      reduce={reduce}
                    />
                  </div>
                  <div className="md:col-span-2 lg:col-span-4">
                    <LandscapeBentoCard
                      space={CLINIC_SPACES[4]}
                      aspect="aspect-[16/10]"
                      onSelect={() => setSelectedSpaceIndex(4)}
                      reduce={reduce}
                    />
                  </div>
                </div>
              ) : (
                /* Filtered Landscape Bento View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
                  {filteredSpaces.map((space) => {
                    const originalIndex = CLINIC_SPACES.findIndex((s) => s.id === space.id);
                    return (
                      <LandscapeBentoCard
                        key={space.id}
                        space={space}
                        aspect="aspect-[16/10]"
                        onSelect={() => setSelectedSpaceIndex(originalIndex)}
                        reduce={reduce}
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          ) : (
            /* -------------------------------------------------------------
               LAYOUT 2: CINEMATIC BENTO (1 Monumental Panoramic + 2x2 Duos)
               ------------------------------------------------------------- */
            <motion.div
              key={`cinematic-${activeCategory}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 sm:space-y-6 lg:space-y-7"
            >
              {activeCategory === "all" ? (
                <>
                  {/* Panoramic Flagship Hero (12 cols) */}
                  <LandscapeBentoCard
                    space={CLINIC_SPACES[0]}
                    aspect="aspect-[16/9] sm:aspect-[2.2/1] lg:aspect-[2.4/1]"
                    isPanoramic
                    isPrimary
                    onSelect={() => setSelectedSpaceIndex(0)}
                    reduce={reduce}
                  />

                  {/* Landscape Duo Tier 1 (6 + 6 cols) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
                    <LandscapeBentoCard
                      space={CLINIC_SPACES[1]}
                      aspect="aspect-[16/10]"
                      onSelect={() => setSelectedSpaceIndex(1)}
                      reduce={reduce}
                    />
                    <LandscapeBentoCard
                      space={CLINIC_SPACES[2]}
                      aspect="aspect-[16/10]"
                      onSelect={() => setSelectedSpaceIndex(2)}
                      reduce={reduce}
                    />
                  </div>

                  {/* Landscape Duo Tier 2 (6 + 6 cols) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
                    <LandscapeBentoCard
                      space={CLINIC_SPACES[3]}
                      aspect="aspect-[16/10]"
                      onSelect={() => setSelectedSpaceIndex(3)}
                      reduce={reduce}
                    />
                    <LandscapeBentoCard
                      space={CLINIC_SPACES[4]}
                      aspect="aspect-[16/10]"
                      onSelect={() => setSelectedSpaceIndex(4)}
                      reduce={reduce}
                    />
                  </div>
                </>
              ) : (
                /* Filtered View in Cinematic Mode */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
                  {filteredSpaces.map((space) => {
                    const originalIndex = CLINIC_SPACES.findIndex((s) => s.id === space.id);
                    return (
                      <LandscapeBentoCard
                        key={space.id}
                        space={space}
                        aspect="aspect-[16/10]"
                        onSelect={() => setSelectedSpaceIndex(originalIndex)}
                        reduce={reduce}
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Editorial Clinic Trust Seal */}
        <Reveal delay={0.25}>
          <div className="mt-12 sm:mt-16 pt-8 border-t border-skinmed-line/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-skinmed-text-muted">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-skinmed-gold" />
              <span>Certified Sterile &amp; Acoustically Shielded Medical Facilities</span>
            </div>
            <div className="font-mono text-[11px] tracking-wider text-skinmed-gold-dark font-medium">
              DR ZEE'S SKINMED • SPATIAL STANDARDS
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* =============================================================
   LANDSCAPE BENTO CARD COMPONENT
   ============================================================= */
function LandscapeBentoCard({
  space,
  aspect,
  onSelect,
  reduce,
  isPrimary = false,
  isPanoramic = false,
}: {
  space: ClinicSpace;
  aspect: string;
  onSelect: () => void;
  reduce: boolean | null;
  isPrimary?: boolean;
  isPanoramic?: boolean;
}) {
  return (
    <motion.article
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      tabIndex={0}
      role="button"
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer select-none relative flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-skinmed-gold rounded-2xl sm:rounded-3xl"
    >
      {/* Landscape Card Viewport Container */}
      <div
        className={`relative ${aspect} w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#171717] border border-skinmed-line/60 shadow-[0_12px_36px_-12px_rgba(23,23,23,0.08)] transition-all duration-700 group-hover:shadow-[0_24px_60px_-14px_rgba(23,23,23,0.22)] group-hover:border-skinmed-gold/50`}
      >
        {/* High-Resolution Landscape Image with Hover Zoom */}
        <Image
          src={space.src}
          alt={space.alt}
          fill
          sizes={
            isPanoramic
              ? "100vw"
              : isPrimary
              ? "(min-width: 1024px) 680px, 100vw"
              : "(min-width: 1024px) 420px, 100vw"
          }
          className="object-cover object-center transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        {/* Bottom Scrim for editorial typography legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 sm:h-52 bg-gradient-to-t from-black/92 via-black/55 to-transparent" />
        {/* -------------------------------------------------------------
            BOTTOM CONTENT OVERLAY
            ------------------------------------------------------------- */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 lg:p-7 z-10 flex flex-col justify-end">

          {/* Interactive Footer Cue with Specifications */}
          <div className="mt-3 sm:mt-3.5 pt-2.5 sm:pt-3 flex items-center justify-between text-xs">
            {/* Quick Spec Badge */}
            <span className="text-[10px] font-mono text-white/60 tracking-wider hidden sm:inline-block bg-white/10 px-2 py-0.5 rounded">
              {space.specs[0]?.label}: {space.specs[0]?.value}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
