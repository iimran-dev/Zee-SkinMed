"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Eyebrow, Reveal, RevealStagger, RevealStaggerItem, Section } from "../primitives";
import { IMG } from "@/lib/skinmed/images";

type Item = (typeof CLINIC_GALLERY_LOCAL)[number];

const CLINIC_GALLERY_LOCAL = [
  {
    src: IMG.reception,
    alt: "Reception of a luxury dermatology clinic",
    label: "Reception",
    sub: "Calm, considered arrival",
    span: "lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto",
  },
  {
    src: IMG.treatmentRoom,
    alt: "Modern treatment room interior",
    label: "Treatment Suite",
    sub: "Medical-grade comfort",
    span: "aspect-square",
  },
  {
    src: IMG.consult,
    alt: "Consultation area detail",
    label: "Consultation Lounge",
    sub: "Unhurried, private",
    span: "aspect-square",
  },
  {
    src: IMG.equipment,
    alt: "Aesthetic equipment in clinic",
    label: "Advanced Equipment",
    sub: "FDA-cleared technology",
    span: "lg:col-span-2 aspect-[2/1] lg:aspect-[2/1]",
  },
  {
    src: IMG.studio,
    alt: "Skin studio interior",
    label: "Skin Studio",
    sub: "Designed for renewal",
    span: "aspect-square",
  },
] as const;

export function ClinicGallery() {
  const reduce = useReducedMotion();
  return (
    <Section id="gallery" className="relative bg-skinmed-ivory py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 items-end">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow className="mb-5">A Space Designed</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.5rem] md:text-[3.75rem] leading-[1.02] text-skinmed-charcoal">
                For Your Comfort
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.16}>
              <p className="text-sm leading-relaxed text-skinmed-text font-medium md:text-right">
                Modern. Hygienic. Premium. — a clinic built around how care should feel.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealStagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[240px] md:auto-rows-[280px]"
          stagger={0.08}
        >
          {CLINIC_GALLERY_LOCAL.map((item) => (
            <RevealStaggerItem key={item.label} className={item.span}>
              <GalleryItem item={item} reduce={reduce} />
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}

function GalleryItem({ item, reduce }: { item: Item; reduce: boolean | null }) {
  return (
    <motion.figure
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full w-full overflow-hidden rounded-2xl border border-skinmed-line bg-skinmed-cream"
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(min-width: 1024px) 700px, (min-width: 768px) 50vw, 50vw"
        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
      />
      <figcaption className="absolute inset-0 flex flex-col items-start justify-end p-5 bg-gradient-to-t from-skinmed-charcoal/85 via-skinmed-charcoal/20 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100">
        <span className="text-[10px] uppercase tracking-[0.24em] text-skinmed-gold-light font-semibold">
          {item.sub}
        </span>
        <span className="font-serif text-lg md:text-xl font-semibold text-skinmed-ivory mt-0.5">
          {item.label}
        </span>
      </figcaption>
      <span className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full border border-skinmed-gold/60 bg-skinmed-white/10 backdrop-blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-skinmed-ivory" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.figure>
  );
}
