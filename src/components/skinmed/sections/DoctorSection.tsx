"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Quote } from "lucide-react";
import { ArrowRight, Container, Eyebrow, MaskReveal, Reveal, Section } from "../primitives";
import { BRAND, DOCTOR_CREDENTIALS } from "@/lib/skinmed/content";
import { IMG } from "@/lib/skinmed/images";

export function DoctorSection() {
  const reduce = useReducedMotion();
  return (
    <Section id="about" className="relative overflow-hidden bg-skinmed-ivory py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Portrait — asymmetric editorial composition */}
          <div className="relative lg:col-span-5">
            {/* Decorative shape */}
            <div className="absolute -inset-6 md:-inset-10 -z-0">
              <div className="absolute top-1/2 left-0 h-40 w-40 -translate-y-1/2 rounded-full border border-skinmed-gold/30" />
              <div className="absolute -bottom-4 right-4 h-28 w-28 rounded-full bg-skinmed-beige" />
            </div>

            <MaskReveal className="relative z-10 aspect-[4/5] w-full max-w-[440px] mx-auto overflow-hidden rounded-[24px_24px_180px_180px] shadow-[0_30px_80px_-30px_rgba(23,23,23,0.35)]">
              <Image
                src={IMG.doctor}
                alt={IMG.doctorAlt}
                fill
                sizes="(min-width: 1024px) 440px, 100vw"
                className="object-cover object-[center_20%]"
              />
            </MaskReveal>

            {/* Signature Z monogram */}
            <div className="absolute -bottom-4 -right-1 z-20 hidden md:flex h-20 w-20 items-center justify-center rounded-full bg-skinmed-charcoal text-skinmed-gold font-serif text-3xl shadow-2xl">
              Z
            </div>
          </div>

          {/* Editorial text block */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow className="mb-6">Meet</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.5rem] md:text-[3.5rem] leading-[1.05] text-skinmed-charcoal">
                {BRAND.doctorFull.split(" ")[0]}{" "}
                <span className="italic text-skinmed-gold">{BRAND.doctorFull.split(" ").slice(1).join(" ")}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-skinmed-text-muted">
                {BRAND.doctorCredentials}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-skinmed-text">
                A patient-first dermatologist dedicated to natural, sustainable outcomes —
                combining medical dermatology, cosmetic expertise and laser technology into
                one calm, considered experience.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 max-w-2xl">
                {DOCTOR_CREDENTIALS.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-skinmed-gold/15 text-skinmed-gold">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm leading-relaxed text-skinmed-text">{c}</span>
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

        {/* Quote card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12"
        >
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-skinmed-charcoal text-skinmed-ivory p-8 md:p-12 overflow-hidden">
              <Quote
                className="absolute -top-3 left-6 h-20 w-20 text-skinmed-gold/15"
                aria-hidden="true"
              />
              <p className="relative font-serif text-3xl md:text-[2.75rem] leading-[1.05] italic">
                More Than
                <br />
                <span className="text-skinmed-gold">Skin Deep.</span>
              </p>
              <p className="relative mt-6 max-w-md text-sm leading-relaxed text-skinmed-ivory/80">
                Every plan begins with understanding — of your skin, your concerns and the
                story behind them. Beautiful skin is the natural by-product of healthy skin.
              </p>
              <div className="relative mt-8 gold-line w-24" />
              <p className="relative mt-4 text-[10px] uppercase tracking-[0.22em] text-skinmed-gold">
                {BRAND.doctorFull}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { k: "Medical", v: "Dermatology" },
                  { k: "Cosmetic", v: "Aesthetics" },
                  { k: "Laser", v: "Technology" },
                  { k: "Ethical", v: "Care" },
                ].map((x) => (
                  <div key={x.k} className="border-l border-skinmed-gold/40 pl-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-skinmed-text-muted">
                      {x.k}
                    </div>
                    <div className="mt-1 font-serif text-2xl text-skinmed-charcoal">{x.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
