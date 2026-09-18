"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { ArrowRight, Container, Eyebrow, Reveal, Section } from "../primitives";
import { FAQS, CLINIC_LOCATION } from "@/lib/skinmed/content";

export function FaqLocation() {
  return (
    <Section id="contact" className="relative bg-skinmed-ivory py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* FAQ */}
          <div>
            <Reveal>
              <Eyebrow className="mb-5">Good To Know</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.25rem] md:text-[3rem] leading-[1.05] text-skinmed-charcoal">
                Frequently
                <br />
                <span className="italic text-skinmed-gold">Asked Questions</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16} className="mt-8">
              <Accordion items={FAQS} />
            </Reveal>
          </div>

          {/* Location */}
          <div>
            <Reveal>
              <Eyebrow className="mb-5">Visit Our Clinic</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-heading text-[2.25rem] md:text-[3rem] leading-[1.05] text-skinmed-charcoal">
                In the heart of <span className="italic text-skinmed-gold">Chennai</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16} className="mt-8 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-skinmed-line bg-skinmed-cream">
                <div className="relative aspect-[16/9] w-full">
                  {/* Stylised map illustration (no external dependency) */}
                  <StylisedMap />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={<MapPin className="h-4 w-4 text-skinmed-gold" />} title="Address">
                  {CLINIC_LOCATION.addressLines.map((line) => (
                    <span key={line} className="block text-sm text-skinmed-text leading-relaxed">
                      {line}
                    </span>
                  ))}
                </InfoCard>
                <InfoCard icon={<Clock className="h-4 w-4 text-skinmed-gold" />} title="Hours">
                  {CLINIC_LOCATION.hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-center justify-between gap-3 text-sm text-skinmed-text"
                    >
                      <span>{h.day}</span>
                      <span className="text-skinmed-text-muted">{h.time}</span>
                    </div>
                  ))}
                </InfoCard>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={CLINIC_LOCATION.directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Get Directions
                  <Navigation className="h-3.5 w-3.5" />
                </a>
                <a href={CLINIC_LOCATION.phoneHref} className="btn-ghost">
                  <Phone className="h-3.5 w-3.5" />
                  Call Now
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
              className="flex w-full items-center justify-between gap-6 py-5 text-left group"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-serif text-base md:text-lg text-skinmed-charcoal transition-colors group-hover:text-skinmed-gold">
                {item.q}
              </span>
              <span
                className={`relative h-5 w-5 shrink-0 rounded-full border border-skinmed-gold/60 transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                <span className="absolute left-1/2 top-1/2 h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-skinmed-gold" />
                <span className="absolute left-1/2 top-1/2 h-px w-2.5 -translate-x-1/2 -translate-y-1/2 bg-skinmed-gold" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-10 text-sm leading-relaxed text-skinmed-text-muted">
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

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-skinmed-white border border-skinmed-line p-5">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.22em] text-skinmed-text-muted">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function StylisedMap() {
  return (
    <svg
      viewBox="0 0 600 340"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Stylised map of clinic location in T. Nagar, Chennai"
    >
      <rect width="600" height="340" fill="#EFE7DB" />
      {/* subtle grid */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="340" stroke="#E3D9C8" strokeWidth="1" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#E3D9C8" strokeWidth="1" />
      ))}
      {/* roads */}
      <path d="M0 180 L 600 180" stroke="#C9A55C" strokeWidth="6" opacity="0.45" />
      <path d="M300 0 L 300 340" stroke="#C9A55C" strokeWidth="5" opacity="0.35" />
      <path d="M120 0 L 120 340" stroke="#A47E3B" strokeWidth="3" opacity="0.25" />
      <path d="M450 0 L 450 340" stroke="#A47E3B" strokeWidth="3" opacity="0.25" />
      {/* buildings */}
      <rect x="60" y="60" width="50" height="60" fill="#D8CDB8" opacity="0.7" />
      <rect x="160" y="80" width="80" height="60" fill="#D8CDB8" opacity="0.7" />
      <rect x="380" y="120" width="50" height="60" fill="#D8CDB8" opacity="0.7" />
      <rect x="500" y="60" width="60" height="60" fill="#D8CDB8" opacity="0.7" />
      {/* pin */}
      <g transform="translate(300 180)">
        <circle r="36" fill="rgba(201,165,92,0.18)" />
        <circle r="22" fill="rgba(201,165,92,0.3)" />
        <path
          d="M0 -18 C 8 -18 14 -10 14 -2 C 14 6 4 14 0 22 C -4 14 -14 6 -14 -2 C -14 -10 -8 -18 0 -18 Z"
          fill="#C9A55C"
          stroke="#A47E3B"
          strokeWidth="1.5"
        />
        <circle r="5" cy="-4" fill="#FFFFFF" />
      </g>
      <text x="300" y="240" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" letterSpacing="2" fill="#3A3531">
        DR ZEE&apos;S SKINMED
      </text>
    </svg>
  );
}
