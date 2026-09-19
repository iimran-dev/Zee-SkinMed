"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Container, Eyebrow, Reveal, Section } from "../primitives";
import { FAQS, CLINIC_LOCATION } from "@/lib/skinmed/content";

export function FaqLocation() {
  return (
    <Section id="contact" className="relative bg-skinmed-ivory py-12 sm:py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* FAQ Column (7 cols on desktop) */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow className="mb-2 sm:mb-3">FAQ</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-2xl sm:text-3xl md:text-[2rem] leading-[1.1] text-skinmed-charcoal font-semibold">
                Frequently{" "}
                <span className="font-sans text-skinmed-gold font-normal">
                  Asked Questions
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.14} className="mt-5 sm:mt-6">
              <Accordion items={FAQS} />
            </Reveal>
          </div>

          {/* Location & Visit Column (5 cols on desktop) */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="mb-2 sm:mb-3">Location &amp; Visit</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-2xl sm:text-3xl md:text-[2rem] leading-[1.1] text-skinmed-charcoal font-semibold">
                T. Nagar,{" "}
                <span className="font-sans text-skinmed-gold font-normal">Chennai</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14} className="mt-5 sm:mt-6 space-y-4">
              {/* Official Google Map for T. Nagar, Chennai */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl border border-skinmed-line shadow-xs bg-skinmed-cream">
                <iframe
                  title="Official Google Map of Dr Zee's SKINMED in T. Nagar, Chennai"
                  src="https://maps.google.com/maps?q=T.+Nagar,+Chennai,+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Minimal Location & Hours Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs py-1 border-b border-skinmed-line/50 pb-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-skinmed-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-skinmed-charcoal block">
                      Dr Zee&apos;s SKINMED
                    </span>
                    <span className="text-skinmed-text-muted">T. Nagar, Chennai 600017</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:text-right">
                  <Clock className="h-3.5 w-3.5 text-skinmed-gold shrink-0 mt-0.5 sm:hidden" />
                  <div>
                    <span className="font-medium text-skinmed-charcoal block">
                      Mon – Sat: 10 AM – 8 PM
                    </span>
                    <span className="text-skinmed-text-muted">Sunday by appointment</span>
                  </div>
                </div>
              </div>

              {/* Minimal Clean Action Links */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={CLINIC_LOCATION.directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-xs px-4 py-2"
                >
                  <span>Get Directions</span>
                  <Navigation className="h-3 w-3" />
                </a>
                <a href={CLINIC_LOCATION.phoneHref} className="btn-ghost text-xs px-4 py-2">
                  <Phone className="h-3 w-3" />
                  <span>Call Now</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-skinmed-line border-y border-skinmed-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-3.5 sm:py-4 text-left group"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-sans font-medium text-sm sm:text-base text-skinmed-charcoal transition-colors group-hover:text-skinmed-gold leading-snug">
                {item.q}
              </span>
              <span
                className={`relative h-4 w-4 shrink-0 rounded-full border border-skinmed-gold/60 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                <span className="absolute left-1/2 top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-skinmed-gold" />
                <span className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 bg-skinmed-gold" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-3.5 pr-6 text-xs sm:text-[13px] leading-relaxed text-skinmed-text-muted font-normal">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
