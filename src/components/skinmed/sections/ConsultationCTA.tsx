"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Check, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { ArrowRight, Container, Eyebrow, Reveal, Section } from "../primitives";
import { BRAND, FINAL_CTA_BENEFITS } from "@/lib/skinmed/content";
import { IMG } from "@/lib/skinmed/images";

export function ConsultationCTA() {
  const reduce = useReducedMotion();

  return (
    <Section className="relative overflow-hidden bg-skinmed-charcoal text-skinmed-ivory py-14 sm:py-16 md:py-20">
      {/* Background ambient lighting and dark texture */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={IMG.finalCta}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-skinmed-charcoal via-skinmed-charcoal/95 to-skinmed-charcoal/80" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 rounded-full bg-skinmed-gold/10 blur-3xl pointer-events-none" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Proposition, Copy & Primary Action (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow className="mb-3">Begin Today</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-2xl sm:text-3xl md:text-[2.25rem] font-semibold leading-[1.1] text-skinmed-ivory">
                Your Skin Transformation{" "}
                <span className="font-sans text-skinmed-gold font-normal">
                  Starts Today
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-skinmed-ivory/80 font-normal max-w-lg">
                Book a consultation with {BRAND.doctorFull} and take the first step towards
                healthier, brighter skin — gently, ethically, expertly.
              </p>
            </Reveal>

            {/* Minimal Action Buttons */}
            <Reveal delay={0.2} className="mt-6 sm:mt-7">
              <div className="flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn-gold text-xs px-5 py-2.5">
                  <span>Book Consultation</span>
                  <ArrowRight />
                </a>
                <a
                  href={BRAND.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-light text-xs px-5 py-2.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.776.978-.951 1.178-.175.2-.351.225-.651.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.497-1.784-1.673-2.084-.175-.3-.019-.462.131-.611.136-.134.301-.35.451-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.926-2.23-.244-.585-.493-.506-.676-.515-.175-.009-.376-.01-.576-.01-.2 0-.526.075-.802.375-.276.3-1.052 1.028-1.052 2.508s1.077 2.908 1.228 3.109c.15.2 2.12 3.237 5.136 4.54.717.311 1.278.496 1.715.635.722.23 1.378.198 1.897.12.578-.088 1.78-.728 2.03-1.431.25-.703.25-1.305.175-1.431-.075-.125-.275-.2-.576-.35zm-5.467 7.502h-.008a10.04 10.04 0 0 1-5.12-1.408l-.367-.218-3.805.998 1.016-3.71-.239-.38a10.046 10.046 0 0 1-1.542-5.32c0-5.545 4.512-10.055 10.06-10.055 2.686 0 5.212 1.046 7.11 2.946a10.007 10.007 0 0 1 2.944 7.098c-.004 5.547-4.516 10.05-10.048 10.05zM12.005.002C5.385.002.012 5.378 0 12.001a11.94 11.94 0 0 0 1.841 6.397L.002 24l5.772-1.514a11.95 11.95 0 0 0 6.227 1.733h.004c6.623 0 11.996-5.376 12-12 0-3.208-1.25-6.224-3.52-8.496A11.927 11.927 0 0 0 12.005.002z" />
                  </svg>
                  <span>WhatsApp Now</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Senior Luxury Consultation Card (5 cols) */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <motion.div
                whileHover={reduce ? undefined : { y: -3 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-2xl border border-skinmed-gold/30 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-md p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
              >
                {/* Ambient Top Glow with GSAP ScrollTrigger scale */}
                <div className="cta-ambient-glow pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-skinmed-gold/20 rounded-full blur-2xl will-change-transform" />

                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-skinmed-gold font-semibold block">
                      Private Consultation Pass
                    </span>
                    <h3 className="font-sans text-base sm:text-lg font-semibold text-skinmed-ivory mt-0.5">
                      {BRAND.doctorFull}
                    </h3>
                    <span className="text-[11px] text-skinmed-ivory/60 font-sans block">
                      MBBS, MD (Dermatology) • 12+ Yrs Exp
                    </span>
                  </div>
                </div>

                {/* Consultation Inclusions */}
                <div className="py-4 space-y-2.5 relative z-10">
                  <div className="flex items-start gap-2.5 text-xs text-skinmed-ivory/85">
                    <span>
                      <strong className="text-white font-medium">Digital Dermoscopy:</strong> Deep
                      layer barrier &amp; pigment diagnostics
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-skinmed-ivory/85">
                    <span>
                      <strong className="text-white font-medium">Tailored Roadmap:</strong> Customized
                      clinical protocols &amp; home care
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-skinmed-ivory/85">
                    <span>
                      <strong className="text-white font-medium">Unhurried Dialogue:</strong> Honest,
                      ethical guidance with 0 pressure
                    </span>
                  </div>
                </div>

                {/* Direct Phone Line Strip */}
                <div className="pt-3 border-t border-white/10 relative z-10">
                  <a
                    href={BRAND.phoneHref}
                    className="flex items-center justify-between w-full p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-skinmed-gold/25 hover:bg-skinmed-gold/15 hover:border-skinmed-gold/40 text-skinmed-ivory transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-skinmed-gold/20 flex items-center justify-center text-skinmed-gold">
                        <Phone className="h-3.5 w-3.5" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] uppercase tracking-wider text-skinmed-gold font-medium block">
                          Direct Reception Line
                        </span>
                        <span className="text-xs font-semibold text-white tracking-wide">
                          {BRAND.phoneDisplay}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-skinmed-gold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Call <ArrowRight className="h-3 w-3" />
                    </span>
                  </a>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
