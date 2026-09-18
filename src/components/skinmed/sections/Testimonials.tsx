"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { Container, Eyebrow, Reveal, RevealStagger, RevealStaggerItem, Section } from "../primitives";
import { TRUST_STATS_LOCAL, TESTIMONIALS_LOCAL } from "@/lib/skinmed/content-testimonials";

export function Testimonials() {
  const reduce = useReducedMotion();
  return (
    <Section
      id="testimonials"
      className="relative overflow-hidden bg-skinmed-charcoal text-skinmed-ivory py-20 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none opacity-50 [background:radial-gradient(circle_at_80%_15%,rgba(201,165,92,0.18),transparent_45%)]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 items-end">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow className="mb-5">Hear What</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.5rem] md:text-[3.75rem] leading-[1.02] text-skinmed-ivory">
                Our Patients Say
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.16}>
              <p className="text-sm leading-relaxed text-skinmed-ivory/70 md:text-right">
                Real stories. Real confidence. Patient identities are kept private — these
                are their journeys.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealStagger className="grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.12}>
          {TESTIMONIALS_LOCAL.map((t) => (
            <RevealStaggerItem key={t.initials}>
              <motion.article
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-skinmed-gold/20 bg-skinmed-charcoal-soft"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={t.image}
                    alt={`${t.treatment} patient journey`}
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-skinmed-charcoal via-skinmed-charcoal/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      aria-label={`Play patient story about ${t.treatment}`}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-skinmed-gold text-skinmed-charcoal shadow-[0_8px_30px_-6px_rgba(201,165,92,0.7)] transition-transform duration-500 group-hover:scale-110"
                    >
                      <Play className="h-5 w-5 ml-0.5 fill-current" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-skinmed-gold text-skinmed-gold" />
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.22em] text-skinmed-ivory/90 bg-skinmed-charcoal/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {t.treatment}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <blockquote className="font-serif text-lg md:text-xl leading-snug text-skinmed-ivory">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-skinmed-gold/15 text-skinmed-gold font-serif text-sm">
                      {t.initials}
                    </span>
                    <span className="text-xs text-skinmed-ivory/80">{t.name}</span>
                  </figcaption>
                </div>
              </motion.article>
            </RevealStaggerItem>
          ))}
        </RevealStagger>

        {/* Stats strip */}
        <Reveal className="mt-14 grid grid-cols-3 gap-4 border-t border-skinmed-gold/20 pt-10">
          {TRUST_STATS_LOCAL.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-3xl md:text-4xl text-skinmed-gold">{s.value}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-skinmed-ivory/60">
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
