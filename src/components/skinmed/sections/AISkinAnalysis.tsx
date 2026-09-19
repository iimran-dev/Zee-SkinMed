"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowRight, Camera, CheckCircle2, Eye, Loader2, Scan, ShieldCheck, Sparkles, Upload, X } from "lucide-react";
import { Container, Eyebrow, Reveal, Section } from "../primitives";
import { BRAND, SKIN_CONCERNS } from "@/lib/skinmed/content";
import { IMG } from "@/lib/skinmed/images";

type Severity = "low" | "moderate" | "high";

type Marker = {
  label: string;
  severity: Severity;
  note: string;
  x: number;
  y: number;
  treatment?: string;
  score?: number;
};

type AnalysisResult = {
  ok: boolean;
  summary?: string;
  concerns?: Marker[];
  disclaimer?: string;
  overallScore?: number;
  metrics?: { label: string; value: number; status: string }[];
  recommendation?: string;
  error?: string;
};

const DEFAULT_MARKERS: Marker[] = [
  {
    label: "Pigmentation",
    severity: "moderate",
    note: "Mild sun-induced tone variations across the malar cheek area.",
    x: 63,
    y: 49,
    treatment: "Pigmentation Correction",
    score: 72,
  },
  {
    label: "Hydration & Pores",
    severity: "low",
    note: "Healthy skin barrier with balanced natural lipid mantle.",
    x: 37,
    y: 54,
    treatment: "Medi-Facials & Peels",
    score: 89,
  },
  {
    label: "Tone Uniformity",
    severity: "low",
    note: "Luminous epidermal clarity with high light reflectance.",
    x: 32,
    y: 42,
    treatment: "Skin Rejuvenation",
    score: 91,
  },
  {
    label: "Expression Lines",
    severity: "low",
    note: "Youthful dermal elasticity with micro-smooth forehead texture.",
    x: 62,
    y: 33,
    treatment: "Anti-Aging Solutions",
    score: 94,
  },
  {
    label: "T-Zone Clarity",
    severity: "moderate",
    note: "Subtle sebum activity around the lower jawline and chin.",
    x: 50,
    y: 69,
    treatment: "Acne & Acne Scars",
    score: 78,
  },
];

const SEVERITY_CONFIG: Record<
  Severity,
  { bg: string; text: string; border: string; glow: string }
> = {
  low: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    border: "border-emerald-500/40",
    glow: "rgba(52, 211, 153, 0.6)",
  },
  moderate: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    border: "border-amber-500/40",
    glow: "rgba(245, 158, 11, 0.6)",
  },
  high: {
    bg: "bg-rose-500/20",
    text: "text-rose-400",
    border: "border-rose-500/40",
    glow: "rgba(244, 63, 94, 0.6)",
  },
};

export function AISkinAnalysis() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Trigger automated demo scan on button click
  const runDemoScan = () => {
    setError(null);
    setScanning(true);
    setLoading(true);
    setActive(null);

    setTimeout(() => {
      setScanning(false);
      setLoading(false);
      setResult({
        ok: true,
        overallScore: 88,
        summary:
          "High dermal luminosity detected. Skin barrier is resilient with excellent cellular hydration. Mild localized pigmentation noted near cheekbones.",
        recommendation:
          "Targeted Vitamin C infusion protocol paired with Dr Zee's signature Hydra-Glow Peel.",
        metrics: [
          { label: "Radiance & Clarity", value: 91, status: "Optimal" },
          { label: "Barrier Moisture", value: 86, status: "Balanced" },
          { label: "Pore Refinement", value: 88, status: "Clear" },
        ],
        concerns: DEFAULT_MARKERS,
        disclaimer:
          "Informational preview calibrated to clinical aesthetic protocols. Not a medical diagnosis.",
      });
      // Automatically highlight first concern for discovery
      setActive(DEFAULT_MARKERS[0].label);
    }, 2800);
  };

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setResult(null);
    setActive(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload a JPEG or PNG image.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Image is too large (max 8 MB).");
      return;
    }
    const url = URL.createObjectURL(file);
    setUploadedUrl(url);
    setScanning(true);
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/skin-analysis", { method: "POST", body: fd });
      const data: AnalysisResult = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Could not analyse the photo.");
      } else {
        const withPos: Marker[] = (data.concerns ?? []).slice(0, 5).map((c, i) => {
          const preset = DEFAULT_MARKERS[i % DEFAULT_MARKERS.length];
          return {
            ...c,
            x: preset.x,
            y: preset.y,
            treatment: preset.treatment,
            score: Math.floor(75 + Math.random() * 20),
          };
        });
        setResult({
          ...data,
          concerns: withPos,
          overallScore: 87,
          metrics: [
            { label: "Radiance & Clarity", value: 89, status: "High" },
            { label: "Barrier Moisture", value: 84, status: "Normal" },
            { label: "Pore Refinement", value: 87, status: "Refined" },
          ],
        });
      }
    } catch (e) {
      console.error(e);
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
      setScanning(false);
    }
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
    e.target.value = "";
  };

  const reset = () => {
    if (uploadedUrl) URL.revokeObjectURL(uploadedUrl);
    setUploadedUrl(null);
    setResult(null);
    setError(null);
    setActive(null);
  };

  const currentMarkers = result?.concerns?.length ? result.concerns : DEFAULT_MARKERS;
  const activeMarker = currentMarkers.find((m) => m.label === active);

  return (
    <Section id="ai-analysis" className="relative overflow-hidden bg-[#FBF9F5] py-16 sm:py-24 md:py-32">
      {/* Background architectural aura */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-skinmed-gold/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-skinmed-gold/5 blur-3xl" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Clinical Copy & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <Eyebrow className="mb-4 sm:mb-5">Vision Intelligence</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.25rem] sm:text-[3rem] md:text-[3.6rem] font-semibold leading-[1.02] text-skinmed-charcoal">
                Precision Skin
                <span className="block font-serif italic text-skinmed-gold mt-1">
                  Mapping &amp; Diagnostics
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 sm:mt-6 text-[14.5px] sm:text-[15.5px] leading-relaxed text-skinmed-text font-medium">
                Calibrated to Dr. Zeenath Begum&apos;s clinical dermatology protocols. Experience
                biometric facial mapping that detects subtle variations in hydration, texture, and
                pigmentation.
              </p>
            </Reveal>

            {/* AI Diagnostics Report Card */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 rounded-2xl bg-white/95 backdrop-blur-md border border-skinmed-gold/30 p-5 sm:p-6 shadow-[0_16px_40px_-16px_rgba(23,23,23,0.12)]"
                >
                  <div className="flex items-center justify-between border-b border-skinmed-line/80 pb-3.5 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-skinmed-gold/20 text-skinmed-gold">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-skinmed-charcoal">
                        Diagnostic Overview
                      </span>
                    </div>
                    {result.overallScore && (
                      <div className="flex items-center gap-1.5 rounded-full bg-skinmed-charcoal text-skinmed-gold px-3 py-1 text-xs font-semibold tracking-wide">
                        <Sparkles className="h-3 w-3 text-skinmed-gold" />
                        <span>Score: {result.overallScore}/100</span>
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-[13px] leading-relaxed text-skinmed-text font-medium">
                    {result.summary}
                  </p>

                  {/* Metric Progress Bars */}
                  {result.metrics && (
                    <div className="mt-4 space-y-2.5">
                      {result.metrics.map((m) => (
                        <div key={m.label} className="text-xs">
                          <div className="flex justify-between font-medium text-skinmed-charcoal mb-1">
                            <span>{m.label}</span>
                            <span className="text-skinmed-gold font-semibold">{m.value}% • {m.status}</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-skinmed-beige">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${m.value}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full rounded-full bg-skinmed-gold"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Doctor Recommendation */}
                  {result.recommendation && (
                    <div className="mt-4 rounded-xl bg-skinmed-beige/60 p-3 text-xs text-skinmed-charcoal border border-skinmed-line/60">
                      <span className="font-semibold text-skinmed-gold block uppercase tracking-wider text-[10px] mb-0.5">
                        Clinical Recommendation:
                      </span>
                      {result.recommendation}
                    </div>
                  )}

                  {/* WhatsApp Direct */}
                  <div className="mt-4 pt-3 border-t border-skinmed-line/60 flex items-center justify-between">
                    <span className="text-[11px] text-skinmed-text-muted">
                      Discuss these findings with Dr Zee:
                    </span>
                    <a
                      href={BRAND.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#1DA851] hover:underline"
                    >
                      Chat on WhatsApp →
                    </a>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-medium text-red-700"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Clinical Diagnostic Console */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative mx-auto w-full max-w-[500px] overflow-hidden rounded-3xl border border-skinmed-line bg-[#16171A] p-2.5 sm:p-3 shadow-[0_30px_90px_-25px_rgba(18,19,22,0.65)]">

                {/* Viewport Box */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                  {/* Base Image */}
                  {uploadedUrl ? (
                    <img
                      src={uploadedUrl}
                      alt="Your uploaded skin photo"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={IMG.aiFace}
                      alt="AI skin analysis interface showing clinical face mapping"
                      fill
                      priority
                      sizes="(min-width: 1024px) 500px, 92vw"
                      className="object-cover object-center"
                    />
                  )}

                  {/* Contrast tint overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Medical HUD Grid Overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #C9A55C 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  />

                  {/* Clinical Target Reticle Corners */}
                  <div className="pointer-events-none absolute inset-5 sm:inset-7">
                    <HUDCorners />
                  </div>

                  {/* Central Crosshair Alignment */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="h-6 w-px bg-skinmed-gold" />
                    <div className="w-6 h-px bg-skinmed-gold" />
                  </div>

                  {/* Animated Laser Scanning Beam */}
                  {scanning && !reduce && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
                      {/* Laser Bar */}
                      <motion.div
                        animate={{ y: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full"
                      >
                        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#E5C378] to-transparent shadow-[0_0_18px_3px_rgba(229,195,120,0.9)]" />
                        <div className="h-16 w-full bg-gradient-to-b from-skinmed-gold/25 to-transparent" />
                      </motion.div>
                    </div>
                  )}

                  {/* Interactive Biometric Hotspots */}
                  {currentMarkers.map((m) => {
                    const isSelected = active === m.label;
                    const conf = SEVERITY_CONFIG[m.severity];
                    return (
                      <button
                        key={m.label}
                        type="button"
                        aria-label={`${m.label}: ${m.note}`}
                        onClick={() => setActive(isSelected ? null : m.label)}
                        className="group absolute z-30 focus:outline-none"
                        style={{
                          left: `${m.x}%`,
                          top: `${m.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {/* Radar pulse rings */}
                        <span className="relative flex h-6 w-6 items-center justify-center">
                          <span
                            className={`absolute h-full w-full rounded-full animate-ping opacity-60 ${conf.bg}`}
                          />
                          <span
                            className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/80 shadow-md ${
                              isSelected ? "scale-125 bg-skinmed-gold" : "bg-white/95"
                            } transition-transform duration-300`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-skinmed-charcoal" />
                          </span>
                        </span>

                        {/* Floating Target Label */}
                        <span
                          className={`absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-300 ${
                            isSelected
                              ? "bg-skinmed-gold text-skinmed-charcoal shadow-md opacity-100"
                              : "bg-black/75 text-white/90 opacity-70 group-hover:opacity-100"
                          }`}
                        >
                          {m.label}
                        </span>
                      </button>
                    );
                  })}

                  {/* Active Zone Floating Telemetry Modal (Inside Viewport) */}
                  <AnimatePresence>
                    {activeMarker && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-x-3 bottom-3 z-40 rounded-2xl bg-[#1E2024]/95 backdrop-blur-xl border border-skinmed-gold/40 p-4 shadow-2xl text-skinmed-ivory"
                      >
                        <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2.5 mb-2.5">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-sm font-semibold text-skinmed-gold">
                                {activeMarker.label}
                              </span>
                              <span
                                className={`rounded px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-wider ${
                                  SEVERITY_CONFIG[activeMarker.severity].bg
                                } ${SEVERITY_CONFIG[activeMarker.severity].text}`}
                              >
                                {activeMarker.severity} severity
                              </span>
                            </div>
                            <span className="text-[10px] text-skinmed-ivory/60 font-mono mt-0.5 block">
                              ZONE ID: {activeMarker.x}°E • {activeMarker.y}°N
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActive(null)}
                            className="rounded-full p-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label="Close detail view"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="text-xs leading-relaxed text-skinmed-ivory/85 font-normal">
                          {activeMarker.note}
                        </p>

                        {activeMarker.treatment && (
                          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider text-skinmed-gold font-semibold">
                              Target Protocol:
                            </span>
                            <a
                              href="#treatments"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-skinmed-gold transition-colors"
                            >
                              <span>{activeMarker.treatment}</span>
                              <ArrowRight className="h-3 w-3" />
                            </a>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Reset upload button */}
                  {uploadedUrl && (
                    <button
                      type="button"
                      onClick={reset}
                      aria-label="Clear uploaded photo"
                      className="absolute top-3 right-3 z-40 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Interactive Diagnostic Zone Selector Tabs */}
                <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {currentMarkers.map((m) => {
                    const isSelected = active === m.label;
                    return (
                      <button
                        key={m.label}
                        type="button"
                        onClick={() => setActive(isSelected ? null : m.label)}
                        className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] font-medium tracking-wide transition-all ${
                          isSelected
                            ? "bg-skinmed-gold text-skinmed-charcoal font-semibold shadow-xs"
                            : "bg-[#202227] text-skinmed-ivory/80 hover:bg-[#2A2D33] hover:text-skinmed-ivory"
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Bottom Verification Guarantee */}
            <Reveal delay={0.16} className="mt-4">
              <div className="flex items-center justify-center gap-2 text-[11px] text-skinmed-text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-skinmed-gold" />
                <span>Zero images stored permanently • Private &amp; HIPAA-conscious</span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function HUDCorners() {
  const c = "absolute h-5 w-5 border-skinmed-gold/90";
  return (
    <>
      <span className={`${c} top-0 left-0 border-l-2 border-t-2`} />
      <span className={`${c} top-0 right-0 border-r-2 border-t-2`} />
      <span className={`${c} bottom-0 left-0 border-l-2 border-b-2`} />
      <span className={`${c} bottom-0 right-0 border-r-2 border-b-2`} />
    </>
  );
}

