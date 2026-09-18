"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Container } from "../primitives";
import { BRAND } from "@/lib/skinmed/content";
import { IMG } from "@/lib/skinmed/images";
import { Award, ChevronRight, Phone, Smile, Sparkles, Star } from "lucide-react";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  const variants = IMG.heroVariants || [
    { id: 1, src: IMG.hero, alt: IMG.heroAlt, tag: "Radiance" },
  ];
  const activeImage = variants[activeVariantIndex] || variants[0];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -35]);

  const handleNextVariant = () => {
    setActiveVariantIndex((prev) => (prev + 1) % variants.length);
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-skinmed-ivory flex flex-col justify-between"
    >
      {/* FULL BACKGROUND IMAGE */}
      <motion.div
        style={{ scale: imageScale }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_32%] sm:object-[76%_32%] lg:object-[82%_35%] transition-opacity duration-700 ease-out"
        />
      </motion.div>

      {/* ART-DIRECTED PROTECTIVE GRADIENT:
          Soft luminous ivory wash on the text column to ensure 100% crisp readability
          while allowing the model's eyes, skin texture, and freckles to shine through on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full sm:w-[65%] lg:w-[54%] xl:w-[48%] pointer-events-none z-[1] bg-gradient-to-r from-skinmed-ivory via-skinmed-ivory/85 sm:via-skinmed-ivory/75 to-transparent"
      />

      {/* MAIN HERO CONTENT */}
      <Container className="relative z-10 flex-1 flex flex-col justify-center pt-28 pb-6 sm:pt-32 lg:pt-36 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Column: Eyebrow, Heading, Paragraph, CTA Buttons */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-7 xl:col-span-7 max-w-2xl"
          >
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-skinmed-gold/40 shadow-xs text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-skinmed-charcoal mb-5 sm:mb-6"
            >
              <span>Dermatology</span>
              <span className="text-skinmed-gold font-bold">•</span>
              <span>Aesthetics</span>
              <span className="text-skinmed-gold font-bold">•</span>
              <span>Hair</span>
            </motion.div>

            {/* H1 Headline — Elegant Semibold Luxury Serif */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[3.2rem] sm:text-[4.25rem] md:text-[5rem] lg:text-[5.4rem] xl:text-[6rem] text-skinmed-charcoal font-semibold tracking-[-0.03em] leading-[0.96]"
            >
              <span className="block font-serif font-semibold">Healthy Skin</span>
              <span className="block mt-1 sm:mt-2 font-serif font-semibold text-skinmed-charcoal">
                Happier You
              </span>
            </motion.h1>

            {/* Subtext description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-7 text-[16px] sm:text-[17px] leading-relaxed text-skinmed-charcoal font-medium max-w-lg"
            >
              Expert care. Advanced technology. Visible results.
              <br />
              <span className="text-skinmed-text-muted font-medium">Welcome to a more confident you.</span>
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-9 flex flex-col xs:flex-row sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              {/* Primary Consultation Button */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 rounded-xl bg-[#8F6B28] hover:bg-[#78571D] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-[0_8px_24px_-6px_rgba(143,107,40,0.5)] hover:shadow-[0_12px_28px_-6px_rgba(143,107,40,0.65)] transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <span>Book Consultation</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[2.5]" />
              </a>

              {/* Secondary WhatsApp Button */}
              <a
                href={BRAND.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-4 rounded-xl bg-white/95 hover:bg-white text-skinmed-charcoal border border-[#D5C9B3] hover:border-skinmed-gold font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-[#25D366]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.825 9.825 0 001.519 5.252l-.999 3.648 3.753-.999zm5.644-14.221c-.4 0-1.047-.146-1.615.312-.566.457-2.158 2.123-2.158 5.179 0 3.056 2.232 5.965 2.546 6.373.314.408 4.4 6.733 10.796 9.12 5.263 1.967 6.336 1.575 7.476 1.475 1.14-.1 3.683-1.505 4.204-2.962.521-1.457.521-2.708.365-2.962-.157-.256-.573-.408-1.2-.713-.627-.305-3.683-1.818-4.256-2.027-.573-.21-.99-.314-1.405.314-.418.627-1.62 2.027-1.988 2.439-.366.41-.732.46-1.359.155-.627-.314-2.65-.978-5.044-3.116-1.864-1.662-3.122-3.717-3.488-4.344-.366-.627-.039-.966.275-1.27.283-.283.627-.731.942-1.098.313-.367.418-.627.627-1.045.21-.42.105-.781-.052-1.095-.156-.314-1.4-3.376-1.962-4.62z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
