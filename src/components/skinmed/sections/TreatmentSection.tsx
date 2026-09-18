"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Container, Eyebrow, Reveal, RevealStagger, RevealStaggerItem, Section } from "../primitives";
import { TREATMENTS } from "@/lib/skinmed/content";

export function TreatmentSection() {
  const reduce = useReducedMotion();
  return (
    <Section id="treatments" className="relative bg-skinmed-beige py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 items-end">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow className="mb-5">Our Signature</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.5rem] md:text-[3.75rem] leading-[1.02] text-skinmed-charcoal">
                Treatments
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.16}>
              <p className="text-sm leading-relaxed text-skinmed-text-muted md:text-right">
                Comprehensive solutions for your skin, hair and nail concerns — each protocol
                tailored to your skin's history and your goals.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealStagger
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-8"
          stagger={0.08}
        >
          {TREATMENTS.map((t) => (
            <RevealStaggerItem key={t.id}>
              <TreatmentCard treatment={t} reduce={reduce} />
            </RevealStaggerItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-14 flex justify-center">
          <a href="#contact" className="btn-gold">
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
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
    >
      {/* Arched image — mirror/portal shape */}
      <div className="relative overflow-hidden arched-image aspect-[3/4] w-full bg-skinmed-cream border border-skinmed-line">
        <Image
          src={treatment.image}
          alt={treatment.alt}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-skinmed-charcoal/55 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Gold icon — center bottom */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-skinmed-gold text-skinmed-charcoal shadow-[0_8px_24px_-6px_rgba(201,165,92,0.65)] transition-all duration-500 group-hover:bg-skinmed-ivory group-hover:scale-110">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>

        {/* Label */}
        <div className="absolute top-5 left-5 z-10">
          <span className="text-[9px] uppercase tracking-[0.22em] text-skinmed-ivory/90">
            Signature
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-5 text-center md:text-left">
        <h3 className="font-serif text-xl md:text-[1.4rem] text-skinmed-charcoal transition-colors group-hover:text-skinmed-gold">
          {treatment.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-skinmed-text-muted max-w-full">
          {treatment.blurb}
        </p>
      </div>
    </motion.article>
  );
}
