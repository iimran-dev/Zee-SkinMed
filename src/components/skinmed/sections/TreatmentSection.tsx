"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Container, Eyebrow, Reveal, RevealStagger, RevealStaggerItem, Section } from "../primitives";
import { TREATMENTS } from "@/lib/skinmed/content";

export function TreatmentSection() {
  const reduce = useReducedMotion();
  return (
    <Section id="treatments" className="relative bg-skinmed-beige py-12 sm:py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 mb-8 sm:mb-12 md:mb-16 items-end">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow className="mb-3 sm:mb-5">Our Signature</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2rem] sm:text-[3rem] md:text-[3.75rem] leading-[1.02] text-skinmed-charcoal">
                Treatments
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.16}>
              <p className="text-xs sm:text-sm md:text-[15px] leading-relaxed text-skinmed-text font-medium md:text-right">
                Comprehensive solutions for your skin, hair and nail concerns — each protocol
                tailored to your skin's history and your goals.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealStagger
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 lg:gap-8"
          stagger={0.08}
        >
          {TREATMENTS.map((t) => (
            <RevealStaggerItem key={t.id}>
              <TreatmentCard treatment={t} reduce={reduce} />
            </RevealStaggerItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-10 sm:mt-14 md:mt-16 flex justify-center">
          <a href="#contact" className="btn-gold w-full sm:w-auto text-center justify-center">
            Explore All Treatments
            <ArrowRight />
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}

function TreatmentCard({
  treatment,
  reduce,
}: {
  treatment: (typeof TREATMENTS)[number];
  reduce: boolean | null;
}) {
  return (
    <motion.a
      href="#contact"
      aria-label={`Book consultation for ${treatment.title}`}
      whileHover={reduce ? undefined : { y: -6 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-skinmed-gold rounded-2xl"
    >
      {/* Arched image — mirror/portal shape */}
      <div className="relative overflow-hidden arched-image aspect-[3/4] w-full bg-skinmed-cream border border-skinmed-line/80 shadow-[0_6px_20px_-10px_rgba(23,23,23,0.1)] transition-shadow duration-500 group-hover:shadow-[0_16px_36px_-12px_rgba(23,23,23,0.18)]">
        <Image
          src={treatment.image}
          alt={treatment.alt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 50vw"
          className="object-cover object-center transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-skinmed-charcoal/70 via-skinmed-charcoal/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Gold icon — center bottom */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-skinmed-gold text-skinmed-charcoal shadow-[0_6px_20px_-4px_rgba(201,165,92,0.65)] transition-all duration-500 group-hover:bg-skinmed-ivory group-hover:scale-110">
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-3 sm:mt-4 text-left flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-sm sm:text-base md:text-[1.25rem] lg:text-[1.35rem] font-semibold text-skinmed-charcoal transition-colors group-hover:text-skinmed-gold leading-snug line-clamp-2">
            {treatment.title}
          </h3>
          <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs md:text-[13px] leading-relaxed text-skinmed-text font-medium line-clamp-3 sm:line-clamp-none">
            {treatment.blurb}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
