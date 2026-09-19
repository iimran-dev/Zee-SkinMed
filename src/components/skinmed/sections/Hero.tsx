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
          className="object-cover object-[75%_30%] sm:object-[80%_32%] lg:object-[88%_35%] xl:object-[92%_35%] transition-opacity duration-700 ease-out"
        />
      </motion.div>

      {/* ART-DIRECTED PROTECTIVE GRADIENT:
          Soft luminous ivory wash on the text column to ensure 100% crisp readability
          without muddying the model's portrait. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full sm:w-[72%] lg:w-[60%] xl:w-[54%] pointer-events-none z-[1] bg-gradient-to-r from-skinmed-ivory via-skinmed-ivory/95 sm:via-skinmed-ivory/90 to-transparent"
      />

      {/* MAIN HERO CONTENT */}
      <Container className="relative z-10 flex-1 flex flex-col justify-center pt-28 pb-8 sm:pt-32 lg:pt-36 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Column: Eyebrow, Heading, Paragraph, CTA Buttons (Constrained to 6 cols to prevent face overlap) */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-6 xl:col-span-6 max-w-xl"
          >
            {/* Eyebrow badge — Google Sans 500 Medium */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-skinmed-gold/30 shadow-xs text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-skinmed-gold-dark mb-5 sm:mb-6"
            >
              <span>Dermatology</span>
              <span className="h-1 w-1 rounded-full bg-skinmed-gold shrink-0" />
              <span>Aesthetics</span>
              <span className="h-1 w-1 rounded-full bg-skinmed-gold shrink-0" />
              <span>Hair</span>
            </motion.div>

            {/* H1 Headline — Google Sans 600 Semibold + 400 Regular (Editorial Contrast & Balanced Scale) */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-3xl xs:text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[3.85rem] xl:text-[4.25rem] text-skinmed-charcoal tracking-[-0.03em] leading-[1.04]"
            >
              <span className="block font-semibold text-skinmed-charcoal">Healthy Skin,</span>
              <span className="block font-normal text-skinmed-charcoal/90 mt-0.5">
                Happier You.
              </span>
            </motion.h1>

            {/* Subtext description — Google Sans 500 Lead + 400 Supporting */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 sm:mt-6 space-y-2 max-w-md"
            >
              <p className="text-sm sm:text-base lg:text-[1.0625rem] font-medium text-skinmed-charcoal leading-snug tracking-[-0.01em]">
                Expert care. Advanced technology. Visible results.
              </p>
              <p className="text-xs sm:text-sm lg:text-[0.9375rem] font-normal text-skinmed-text-muted leading-relaxed">
                Personalized medical dermatology and clinical aesthetics in Chennai. Welcome to a more confident you.
              </p>
            </motion.div>

            {/* Action Buttons — Google Sans 600 Semibold */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              {/* Primary Consultation Button */}
              <a
                href="#contact"
                className="btn-gold text-xs px-6 py-3.5 tracking-[0.1em] font-semibold"
              >
                <span>Book Consultation</span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </a>

              {/* Secondary WhatsApp Button */}
              <a
                href={BRAND.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-full bg-white/90 hover:bg-white text-skinmed-charcoal border border-skinmed-line hover:border-skinmed-gold/60 font-medium text-xs tracking-wide transition-all duration-300 shadow-xs hover:shadow-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-[#25D366]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.776.978-.951 1.178-.175.2-.351.225-.651.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.497-1.784-1.673-2.084-.175-.3-.019-.462.131-.611.136-.134.301-.35.451-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.926-2.23-.244-.585-.493-.506-.676-.515-.175-.009-.376-.01-.576-.01-.2 0-.526.075-.802.375-.276.3-1.052 1.028-1.052 2.508s1.077 2.908 1.228 3.109c.15.2 2.12 3.237 5.136 4.54.717.311 1.278.496 1.715.635.722.23 1.378.198 1.897.12.578-.088 1.78-.728 2.03-1.431.25-.703.25-1.305.175-1.431-.075-.125-.275-.2-.576-.35zm-5.467 7.502h-.008a10.04 10.04 0 0 1-5.12-1.408l-.367-.218-3.805.998 1.016-3.71-.239-.38a10.046 10.046 0 0 1-1.542-5.32c0-5.545 4.512-10.055 10.06-10.055 2.686 0 5.212 1.046 7.11 2.946a10.007 10.007 0 0 1 2.944 7.098c-.004 5.547-4.516 10.05-10.048 10.05zM12.005.002C5.385.002.012 5.378 0 12.001a11.94 11.94 0 0 0 1.841 6.397L.002 24l5.772-1.514a11.95 11.95 0 0 0 6.227 1.733h.004c6.623 0 11.996-5.376 12-12 0-3.208-1.25-6.224-3.52-8.496A11.927 11.927 0 0 0 12.005.002z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>

            {/* Micro-proof Trust Bar — Google Sans 500/400 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 pt-5 border-t border-skinmed-line/70 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-skinmed-text-muted"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-skinmed-gold-dark font-semibold">★ 4.7</span>
                <span className="font-normal">Google Rating</span>
              </div>
              <span className="h-3 w-px bg-skinmed-line" />
              <div>
                <span className="font-medium text-skinmed-charcoal">10,000+</span>{" "}
                <span className="font-normal">Happy Patients</span>
              </div>
              <span className="h-3 w-px bg-skinmed-line hidden sm:block" />
              <div className="hidden sm:block">
                <span className="font-normal">Led by </span>
                <span className="font-medium text-skinmed-charcoal">{BRAND.doctorFull}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
