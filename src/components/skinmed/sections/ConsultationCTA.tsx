"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { ArrowRight, Container, Eyebrow, MaskReveal, Reveal, Section } from "../primitives";
import { BRAND, FINAL_CTA_BENEFITS } from "@/lib/skinmed/content";
import { IMG } from "@/lib/skinmed/images";

export function ConsultationCTA() {
  const reduce = useReducedMotion();
  return (
    <Section className="relative overflow-hidden bg-skinmed-charcoal text-skinmed-ivory py-20 md:py-32">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={IMG.finalCta}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-skinmed-charcoal via-skinmed-charcoal/85 to-skinmed-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-skinmed-charcoal via-transparent to-skinmed-charcoal/30" />
      </div>

      {/* gold particles */}
      {!reduce &&
        Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="pointer-events-none absolute rounded-full bg-skinmed-gold/40 animate-twinkle"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              top: `${(i * 41 + 10) % 90}%`,
              left: `${(i * 29) % 95}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          />
        ))}

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow className="mb-6">Begin Today</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-heading text-[2.5rem] md:text-[4rem] font-semibold leading-[1.02] text-skinmed-ivory">
              Your Skin Transformation
              <span className="block italic text-skinmed-gold mt-1">Starts Today</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-lg text-[15px] sm:text-base leading-relaxed text-skinmed-ivory font-medium">
              Book a consultation with {BRAND.doctorFull} and take the first step towards
              healthier, brighter skin — gently, ethically, expertly.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="btn-gold">
                Book Consultation
                <ArrowRight />
              </a>
              <a
                href={BRAND.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-light"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z" />
                </svg>
                WhatsApp Now
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32} className="mt-10">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {FINAL_CTA_BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-skinmed-ivory font-semibold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-skinmed-gold/60 text-skinmed-gold">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
