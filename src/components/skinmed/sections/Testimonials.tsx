"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container, Eyebrow, Reveal, RevealStagger, RevealStaggerItem, Section } from "../primitives";
import { TRUST_STATS_LOCAL, TESTIMONIALS_LOCAL } from "@/lib/skinmed/content-testimonials";

export function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="testimonials"
      className="relative overflow-hidden bg-skinmed-charcoal text-skinmed-ivory py-14 sm:py-16 md:py-20"
    >
      {/* Subtle ambient luxury backlight */}
      <div className="absolute inset-0 pointer-events-none opacity-40 [background:radial-gradient(circle_at_75%_20%,rgba(201,165,92,0.14),transparent_50%)]" />

      <Container className="relative z-10">
        {/* Compact Minimal Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 sm:mb-10 items-end">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow className="mb-3">Hear What</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2rem] sm:text-[2.5rem] md:text-[3rem] leading-[1.06] text-skinmed-ivory font-semibold">
                Our Patients Say
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4">
            <Reveal delay={0.16}>
              <p className="text-xs sm:text-sm leading-relaxed text-skinmed-ivory/70 md:text-right">
                Real stories and visible results from our private clinic community.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Minimal Compact Testimonial Cards */}
        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6" stagger={0.08}>
          {TESTIMONIALS_LOCAL.map((t) => (
            <RevealStaggerItem key={t.name}>
              <motion.article
                whileHover={reduce ? undefined : { y: -3 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-skinmed-gold/35 hover:bg-white/[0.05]"
              >
                {/* Patient Description / Testimonial */}
                <blockquote className="font-serif text-base sm:text-[17px] text-skinmed-ivory/95 font-normal leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Patient Name */}
                <figcaption className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-xs sm:text-[13px] font-medium text-skinmed-gold tracking-wide">
                    {t.name}
                  </span>
                </figcaption>
              </motion.article>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}
