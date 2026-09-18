"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Container, Eyebrow } from "../primitives";
import { BRAND, HERO_STATS } from "@/lib/skinmed/content";
import { IMG } from "@/lib/skinmed/images";
import { ArrowUpRight, Phone } from "lucide-react";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-skinmed-ivory"
    >
      {/* Background warm wash + botanical ornaments */}
      <div className="absolute inset-0 bg-gradient-to-br from-skinmed-cream via-skinmed-ivory to-skinmed-beige pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] [background:radial-gradient(circle_at_15%_20%,#C9A55C_0,transparent_40%),radial-gradient(circle_at_85%_80%,#A47E3B_0,transparent_45%)]" />

      {/* Botanical line-art corner ornaments */}
      <svg
        aria-hidden="true"
        viewBox="0 0 220 220"
        className="pointer-events-none absolute top-24 left-4 w-32 h-32 md:w-44 md:h-44 text-skinmed-gold/30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M20 200 C 50 150, 70 110, 110 90" />
        <path d="M110 90 C 130 80, 160 80, 195 95" />
        <ellipse cx="195" cy="95" rx="12" ry="4" transform="rotate(-10 195 95)" />
        <ellipse cx="150" cy="85" rx="9" ry="3" transform="rotate(-20 150 85)" />
        <ellipse cx="115" cy="90" rx="7" ry="3" transform="rotate(45 115 90)" />
        <path d="M80 130 C 95 125, 110 125, 125 135" />
        <ellipse cx="125" cy="135" rx="9" ry="3" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 220 220"
        className="pointer-events-none absolute bottom-32 right-4 w-32 h-32 md:w-44 md:h-44 text-skinmed-gold/25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        style={{ transform: "scaleX(-1) scaleY(-1)" }}
      >
        <path d="M20 200 C 50 150, 70 110, 110 90" />
        <path d="M110 90 C 130 80, 160 80, 195 95" />
        <ellipse cx="195" cy="95" rx="12" ry="4" transform="rotate(-10 195 95)" />
        <ellipse cx="150" cy="85" rx="9" ry="3" transform="rotate(-20 150 85)" />
      </svg>

      {/* Gold particles */}
      {!reduce &&
        Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="pointer-events-none absolute rounded-full bg-skinmed-gold/40 animate-twinkle"
            style={{
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
              top: `${(i * 37) % 90}%`,
              left: `${(i * 53) % 95}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          />
        ))}

      <Container className="relative z-10 grid min-h-[100svh] grid-cols-1 items-center gap-10 pt-28 pb-16 md:pt-32 lg:grid-cols-12 lg:gap-8">
        {/* Text block */}
        <motion.div
          style={{ y: textY }}
          className="lg:col-span-6 max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow className="mb-6">Dermatology · Aesthetics · Hair</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-[3rem] leading-[0.95] sm:text-[3.75rem] lg:text-[4.75rem] xl:text-[5.25rem] text-skinmed-charcoal"
          >
            Healthy Skin
            <span className="block italic text-skinmed-gold mt-1">Happier You</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-skinmed-text"
          >
            Expert care. Advanced technology. Visible results.
            <br />
            Welcome to a more confident you — at {BRAND.name}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a href="#contact" className="btn-gold">
              Book Consultation
              <ArrowRight />
            </a>
            <a
              href={BRAND.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.825 9.825 0 001.519 5.252l-.999 3.648 3.753-.999zm5.644-14.221c-.4 0-1.047-.146-1.615.312-.566.457-2.158 2.123-2.158 5.179 0 3.056 2.232 5.965 2.546 6.373.314.408 4.4 6.733 10.796 9.12 5.263 1.967 6.336 1.575 7.476 1.475 1.14-.1 3.683-1.505 4.204-2.962.521-1.457.521-2.708.365-2.962-.157-.256-.573-.408-1.2-.713-.627-.305-3.683-1.818-4.256-2.027-.573-.21-.99-.314-1.405.314-.418.627-1.62 2.027-1.988 2.439-.366.41-.732.46-1.359.155-.627-.314-2.65-.978-5.044-3.116-1.864-1.662-3.122-3.717-3.488-4.344-.366-.627-.039-.966.275-1.27.283-.283.627-.731.942-1.098.313-.367.418-.627.627-1.045.21-.42.105-.781-.052-1.095-.156-.314-1.4-3.376-1.962-4.62z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Floating trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-xl"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label} className="border-l border-skinmed-gold/40 pl-3">
                <div className="font-serif text-2xl text-skinmed-charcoal leading-none">{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-skinmed-text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image block */}
        <motion.div
          style={{ y: imageY }}
          className="lg:col-span-6 relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[180px_180px_24px_24px] shadow-[0_30px_80px_-30px_rgba(23,23,23,0.35)]">
            <motion.div
              initial={{ scale: reduce ? 1 : 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={IMG.hero}
                alt={IMG.heroAlt}
                fill
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover object-[center_25%]"
              />
            </motion.div>
            {/* Image edge fade for integration */}
            <div className="absolute inset-0 bg-gradient-to-r from-skinmed-ivory/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-skinmed-charcoal/30 via-transparent to-transparent" />
          </div>

          {/* Floating accent card */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex absolute -bottom-6 -left-2 lg:-left-8 items-center gap-4 bg-skinmed-white/95 backdrop-blur-sm border border-skinmed-line rounded-2xl px-5 py-4 shadow-[0_12px_40px_-12px_rgba(23,23,23,0.25)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-skinmed-gold/15 text-skinmed-gold">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-skinmed-text-muted">
                Speak to us
              </div>
              <a
                href={BRAND.phoneHref}
                className="text-sm font-medium text-skinmed-charcoal hover:text-skinmed-gold transition-colors"
              >
                {BRAND.phoneDisplay}
              </a>
            </div>
          </motion.div>

          {/* Floating rating chip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex absolute -top-4 right-0 lg:right-8 items-center gap-3 bg-skinmed-charcoal text-skinmed-ivory rounded-full px-5 py-3 shadow-2xl"
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-skinmed-gold">
                  <path d="M12 2l2.94 6.36L22 9.27l-5 4.86 1.18 6.87L12 17.77l-6.18 3.25L7 14.13 2 9.27l7.06-0.91L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] uppercase tracking-[0.18em]">4.7+ · Google</span>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-skinmed-text-muted">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-skinmed-line">
          <span className="absolute inset-x-0 top-0 block h-3 w-px bg-skinmed-gold animate-[skinmed-scan_2s_ease-in-out_infinite]" />
        </span>
      </motion.div>
    </section>
  );
}
