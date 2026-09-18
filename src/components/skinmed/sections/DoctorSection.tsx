"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Stethoscope, User } from "lucide-react";
import { ArrowRight, Container, Eyebrow, MaskReveal, Reveal, Section } from "../primitives";
import { BRAND, DOCTOR_CREDENTIALS } from "@/lib/skinmed/content";
import { IMG } from "@/lib/skinmed/images";

export function DoctorSection() {
  const reduce = useReducedMotion();
  const doctorSrc = IMG.doctor as string;
  const hasDoctorImage = Boolean(
    doctorSrc &&
    doctorSrc !== "/" &&
    !doctorSrc.startsWith("/") &&
    (doctorSrc.startsWith("http://") || doctorSrc.startsWith("https://"))
  );

  return (
    <Section id="about" className="relative overflow-hidden bg-skinmed-ivory py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Portrait / Luxury Placeholder — asymmetric editorial composition */}
          <div className="relative lg:col-span-5">
            {/* Decorative shape */}
            <div className="absolute -inset-6 md:-inset-10 -z-0">
              <div className="absolute top-1/2 left-0 h-40 w-40 -translate-y-1/2 rounded-full border border-skinmed-gold/30" />
              <div className="absolute -bottom-4 right-4 h-28 w-28 rounded-full bg-skinmed-beige" />
            </div>

            <MaskReveal className="relative z-10 aspect-[4/5] w-full max-w-[440px] mx-auto overflow-hidden rounded-[24px_24px_180px_180px] shadow-[0_30px_80px_-30px_rgba(23,23,23,0.35)] border border-skinmed-line/80">
              {hasDoctorImage ? (
                <Image
                  src={IMG.doctor}
                  alt={IMG.doctorAlt}
                  fill
                  sizes="(min-width: 1024px) 440px, 100vw"
                  className="object-cover object-[center_20%]"
                />
              ) : (
                /* Luxury Editorial Medical Placeholder */
                <div className="relative h-full w-full bg-gradient-to-b from-[#F7F2EC] via-[#EFE7DA] to-[#DFD4C2] flex flex-col items-center justify-between p-8 text-center select-none overflow-hidden">
                  {/* Subtle luxury geometric circles & radial halo */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="h-72 w-72 rounded-full border border-skinmed-gold/25" />
                    <div className="absolute h-96 w-96 rounded-full border border-skinmed-gold/15" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,165,92,0.18),transparent_65%)]" />
                  </div>

                  {/* Top Badge: Clinical Designation */}
                  <div className="relative z-10 pt-4">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-skinmed-gold/40 text-[10px] font-semibold uppercase tracking-[0.24em] text-skinmed-gold-dark shadow-2xs">
                      Consultant Dermatologist
                    </span>
                  </div>

                  {/* Center: Stylized Doctor Silhouette / Monogram */}
                  <div className="relative z-10 flex flex-col items-center my-auto">
                    <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-white/95 shadow-md border-2 border-skinmed-gold/45">
                      <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gradient-to-tr from-skinmed-beige to-white text-skinmed-gold-dark">
                        <User className="h-12 w-12 sm:h-14 sm:w-14 text-skinmed-gold-dark stroke-[1.5]" />
                      </div>
                      {/* Floating stethoscope mini badge */}
                      <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-skinmed-charcoal text-skinmed-gold shadow-md border border-skinmed-gold/40">
                        <Stethoscope className="h-4 w-4 stroke-[2]" />
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="font-serif text-2xl sm:text-3xl font-semibold text-skinmed-charcoal">
                        {BRAND.doctorFull}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-skinmed-gold-dark">
                        {BRAND.doctorShort}
                      </p>
                    </div>
                  </div>


                </div>
              )}
            </MaskReveal>
          </div>

          {/* Editorial text block */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow className="mb-6">Meet</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.5rem] md:text-[3.5rem] font-semibold leading-[1.05] text-skinmed-charcoal">
                {BRAND.doctorFull.split(" ")[0]}{" "}
                <span className="italic text-skinmed-gold">{BRAND.doctorFull.split(" ").slice(1).join(" ")}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-skinmed-gold-dark">
                {BRAND.doctorCredentials}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-6 max-w-xl text-[15px] sm:text-base leading-relaxed text-skinmed-text font-medium">
                A patient-first dermatologist dedicated to natural, sustainable outcomes —
                combining medical dermatology, cosmetic expertise and laser technology into
                one calm, considered experience.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <ul className="mt-8 grid gap-3.5 sm:grid-cols-2 max-w-2xl">
                {DOCTOR_CREDENTIALS.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-skinmed-gold/20 text-skinmed-gold-dark">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </span>
                    <span className="text-sm leading-relaxed text-skinmed-text font-medium">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-9">
                <a href="#contact" className="btn-gold">
                  Know More About {BRAND.doctorShort}
                  <ArrowRight />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
