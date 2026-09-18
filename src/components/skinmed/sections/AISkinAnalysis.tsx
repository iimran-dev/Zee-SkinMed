"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Camera, Loader2, Sparkles, Upload, X } from "lucide-react";
import { ArrowRight, Container, Eyebrow, Reveal, Section } from "../primitives";
import { SKIN_CONCERNS } from "@/lib/skinmed/content";
import { IMG } from "@/lib/skinmed/images";

type Severity = "low" | "moderate" | "high";

type Marker = {
  label: string;
  severity: Severity;
  note: string;
  x: number;
  y: number;
};

type AnalysisResult = {
  ok: boolean;
  summary?: string;
  concerns?: { label: string; severity: Severity; note: string }[];
  disclaimer?: string;
  error?: string;
};

const DEFAULT_MARKERS: Marker[] = SKIN_CONCERNS.map((c) => ({
  label: c.label,
  severity: "moderate" as Severity,
  note: c.description,
  x: c.x,
  y: c.y,
}));

const SEVERITY_COLOR: Record<Severity, string> = {
  low: "bg-skinmed-gold/40 text-skinmed-ivory",
  moderate: "bg-skinmed-gold/70 text-skinmed-charcoal",
  high: "bg-skinmed-charcoal text-skinmed-gold",
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

  // Idle scan animation — runs once on mount + when result reset
  useEffect(() => {
    if (reduce) return;
    setScanning(true);
    const t = setTimeout(() => setScanning(false), 4200);
    return () => clearTimeout(t);
  }, [reduce, result]);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setResult(null);
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
        // Spread concerns around the face for the marker visual
        const withPos: Marker[] = (data.concerns ?? []).slice(0, 5).map((c, i) => {
          const preset = SKIN_CONCERNS[i % SKIN_CONCERNS.length];
          return { ...c, x: preset.x, y: preset.y };
        });
        setResult({ ...data, concerns: withPos });
        setScanning(false);
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
  };

  const markers = result?.concerns?.length ? (result.concerns as Marker[]) : DEFAULT_MARKERS;

  return (
    <Section id="ai-analysis" className="relative overflow-hidden bg-skinmed-beige py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="mb-5">Try Our</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.5rem] md:text-[3.75rem] leading-[1.02] text-skinmed-charcoal">
                AI Skin <span className="italic text-skinmed-gold">Analysis</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-skinmed-text">
                Get a quick AI-based overview of your skin concerns, and take the first step
                toward healthier skin — informational only, never a substitute for a real
                consultation with Dr Zee.
              </p>
            </Reveal>

            <Reveal delay={0.24} className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="btn-dark"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Analysing…
                    </>
                  ) : (
                    <>
                      <Upload className="h-3.5 w-3.5" />
                      Upload Your Photo
                    </>
                  )}
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={onInputChange}
                  className="sr-only"
                  aria-label="Upload a photo of your face for AI skin analysis"
                />
                <a href="#contact" className="btn-ghost">
                  Book In-Person Consult
                  <ArrowRight />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32} className="mt-6">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-skinmed-text-muted">
                <Sparkles className="h-3.5 w-3.5 text-skinmed-gold" />
                Powered by Dr Zee's SKINMED vision intelligence
              </p>
            </Reveal>

            {/* Result summary */}
            <AnimatePresence>
              {result?.summary && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 rounded-2xl bg-skinmed-white border border-skinmed-line p-5 shadow-[0_12px_40px_-12px_rgba(23,23,23,0.18)]"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-skinmed-gold mb-2">
                    Your AI Overview
                  </div>
                  <p className="text-sm leading-relaxed text-skinmed-text">{result.summary}</p>
                  {result.disclaimer && (
                    <p className="mt-3 text-[11px] leading-relaxed text-skinmed-text-muted">
                      {result.disclaimer}
                    </p>
                  )}
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  className="mt-8 rounded-2xl bg-skinmed-white border border-red-300/60 p-4 text-sm text-red-700"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Visual */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-2xl border border-skinmed-gold/40 bg-skinmed-charcoal shadow-[0_30px_80px_-30px_rgba(23,23,23,0.5)]">
                {/* Image */}
                {uploadedUrl ? (
                  <img
                    src={uploadedUrl}
                    alt="Your uploaded skin photo"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={IMG.aiFace}
                    alt="AI skin analysis interface showing a face scan"
                    fill
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-skinmed-charcoal/30" />

                {/* Face detection frame (corners) */}
                <div className="absolute inset-8 sm:inset-12 pointer-events-none">
                  <Frame />
                </div>

                {/* Scan line */}
                {scanning && !reduce && (
                  <div className="absolute inset-x-4 top-4 bottom-4 pointer-events-none overflow-hidden">
                    <div className="absolute inset-x-0 h-px bg-skinmed-gold/90 shadow-[0_0_16px_2px_rgba(201,165,92,0.7)] animate-scan" />
                    <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-skinmed-gold/30 to-transparent animate-scan" />
                  </div>
                )}

                {/* Concern markers / hotspots */}
                {markers.map((m, i) => {
                  const activeThis = active === m.label;
                  return (
                    <button
                      key={m.label}
                      type="button"
                      aria-label={`${m.label} — ${m.note}`}
                      onClick={() => setActive(activeThis ? null : m.label)}
                      className="group absolute z-20"
                      style={{ left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}
                    >
                      <span
                        className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full ring-2 ring-skinmed-ivory/70 ${SEVERITY_COLOR[m.severity]}`}
                      >
                        <span className="absolute inset-0 rounded-full animate-pulse-gold" />
                      </span>

                      {/* Label */}
                      <span
                        className={`absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap rounded-full bg-skinmed-charcoal/85 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-skinmed-ivory transition-opacity ${
                          activeThis ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {m.label}
                      </span>

                      {/* Detail card */}
                      <AnimatePresence>
                        {activeThis && (
                          <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute left-1/2 top-5 z-30 -translate-x-1/2 w-56 rounded-xl bg-skinmed-white border border-skinmed-line p-3 text-left shadow-xl"
                          >
                            <span className="flex items-center justify-between gap-2">
                              <span className="text-[11px] uppercase tracking-[0.18em] text-skinmed-gold">
                                {m.label}
                              </span>
                              <span
                                className={`text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 rounded-full ${SEVERITY_COLOR[m.severity]}`}
                              >
                                {m.severity}
                              </span>
                            </span>
                            <span className="mt-1.5 block text-[11px] leading-relaxed text-skinmed-text">
                              {m.note}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>

                      <span className="sr-only">{`Marker ${i + 1}: ${m.label}, ${m.severity}`}</span>
                    </button>
                  );
                })}

                {/* Bottom label */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full bg-skinmed-charcoal/80 backdrop-blur-sm px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-skinmed-ivory">
                  {loading ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin text-skinmed-gold" />
                      Analysing skin…
                    </>
                  ) : scanning ? (
                    <>
                      <Camera className="h-3 w-3 text-skinmed-gold" />
                      Scanning
                    </>
                  ) : result ? (
                    <>
                      <Sparkles className="h-3 w-3 text-skinmed-gold" />
                      Analysis complete
                    </>
                  ) : (
                    <>
                      <Camera className="h-3 w-3 text-skinmed-gold" />
                      Tap markers to explore
                    </>
                  )}
                </div>

                {/* Reset button */}
                {uploadedUrl && (
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Clear uploaded photo"
                    className="absolute top-4 right-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-skinmed-white/90 text-skinmed-charcoal hover:bg-skinmed-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </Reveal>

            {/* Legend */}
            <Reveal delay={0.16} className="mt-5">
              <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] uppercase tracking-[0.18em] text-skinmed-text-muted">
                {(["low", "moderate", "high"] as Severity[]).map((s) => (
                  <span key={s} className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${SEVERITY_COLOR[s].split(" ")[0]}`} />
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Frame() {
  const corner = "absolute h-6 w-6 border-skinmed-gold/80";
  return (
    <>
      <span className={`${corner} top-0 left-0 border-l border-t`} />
      <span className={`${corner} top-0 right-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-l border-b`} />
      <span className={`${corner} bottom-0 right-0 border-r border-b`} />
    </>
  );
}
