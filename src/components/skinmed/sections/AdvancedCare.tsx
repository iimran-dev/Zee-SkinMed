"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Play } from "lucide-react";
import { ArrowRight, Container, Eyebrow, MaskReveal, Reveal, RevealStagger, RevealStaggerItem, Section } from "../primitives";
import { ADVANCED_CARE_FEATURES, BRAND } from "@/lib/skinmed/content";
import { IMG } from "@/lib/skinmed/images";

export function AdvancedCare() {
  const reduce = useReducedMotion();
  return (
    <Section className="relative overflow-hidden bg-skinmed-charcoal text-skinmed-ivory py-20 md:py-32">
      {/* Subtle radial glow + gold particles */}
      <div className="absolute inset-0 pointer-events-none opacity-60 [background:radial-gradient(circle_at_75%_30%,rgba(201,165,92,0.18),transparent_45%),radial-gradient(circle_at_15%_75%,rgba(201,165,92,0.10),transparent_50%)]" />
      {!reduce &&
        Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="pointer-events-none absolute rounded-full bg-skinmed-gold/40 animate-twinkle"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              top: `${(i * 31 + 5) % 90}%`,
              left: `${(i * 47) % 95}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          />
        ))}

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-5 lg:order-2">
            <MaskReveal className="relative aspect-[4/5] w-full max-w-[480px] mx-auto overflow-hidden rounded-[200px_200px_24px_24px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
              <Image
                src={IMG.advancedCare}
                alt="Skin treatment in progress at Dr Zee's SKINMED clinic"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover object-[center_30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-skinmed-charcoal/70 via-transparent to-transparent" />
            </MaskReveal>

            {/* Video/story card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative -mt-10 mx-auto max-w-[420px] rounded-2xl bg-skinmed-charcoal-soft border border-skinmed-gold/30 p-5 flex items-center gap-4"
            >
              <button
                aria-label="Play clinic story"
                className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-skinmed-gold text-skinmed-charcoal hover:scale-105 transition-transform"
              >
                <Play className="h-4 w-4 ml-0.5 fill-current" />
              </button>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-skinmed-gold">Inside the Clinic</div>
                <div className="text-sm font-medium text-skinmed-ivory mt-1">A 2-minute story of {BRAND.name}</div>
              </div>
            </motion.div>
          </div>

          {/* Text + feature cards */}
          <div className="lg:col-span-7 lg:order-1">
            <Reveal>
              <Eyebrow className="mb-5">Science Meets Beauty</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.5rem] md:text-[3.75rem] font-semibold leading-[1.02] text-skinmed-ivory">
                Advanced Care.
                <span className="block italic text-skinmed-gold">Real Results.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-lg text-[15px] sm:text-base leading-relaxed text-skinmed-ivory/90 font-medium">
                Modern technology. Personalized treatments. A more confident you —
                grounded in safety, proven protocols and an obsession with natural outcomes.
              </p>
            </Reveal>

            <RevealStagger className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6" stagger={0.1}>
              {ADVANCED_CARE_FEATURES.map((f) => (
                <RevealStaggerItem key={f.title}>
                  <div className="group relative rounded-xl bg-skinmed-charcoal-soft/40 px-5 py-5 transition-colors duration-500 hover:bg-skinmed-charcoal-soft">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-skinmed-gold/60 text-skinmed-gold">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-skinmed-ivory">{f.title}</h3>
                        <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-skinmed-ivory/80 font-medium">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealStaggerItem>
              ))}
            </RevealStagger>

            <Reveal delay={0.2} className="mt-10">
              <a href="#results" className="btn-gold">
                See the Difference
                <ArrowRight />
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
