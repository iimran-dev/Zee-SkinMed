"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Calendar, Phone } from "lucide-react";
import { BRAND } from "@/lib/skinmed/content";

export function FloatingActions() {
  const reduce = useReducedMotion();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      setShowTop(p > 0.25 || window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {/* Cluster — bottom-right, vertical stack */}
      <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 flex flex-col items-end gap-3">
        {/* Back to top */}
        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              aria-label="Back to top"
              onClick={toTop}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-skinmed-gold bg-skinmed-ivory/90 backdrop-blur-md text-skinmed-charcoal shadow-[0_8px_24px_-6px_rgba(201,165,92,0.45)] hover:bg-skinmed-gold hover:text-skinmed-charcoal transition-colors"
            >
              <span className="absolute inset-0 rounded-full ring-1 ring-skinmed-gold/40 animate-pulse-gold opacity-60 pointer-events-none" />
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Consultation */}
        <a
          href="#contact"
          aria-label="Book a consultation"
          className="group flex h-11 w-11 items-center justify-center rounded-full bg-skinmed-charcoal text-skinmed-gold border border-skinmed-gold/40 shadow-[0_8px_24px_-6px_rgba(23,23,23,0.4)] hover:scale-105 transition-transform"
        >
          <Calendar className="h-4 w-4" />
        </a>

        {/* Call */}
        <a
          href={BRAND.phoneHref}
          aria-label={`Call us at ${BRAND.phoneDisplay}`}
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-skinmed-ivory text-skinmed-charcoal border border-skinmed-line shadow-[0_8px_24px_-6px_rgba(23,23,23,0.25)] hover:bg-skinmed-beige transition-colors"
        >
          <Phone className="h-4 w-4" />
        </a>

        {/* WhatsApp — primary floating */}
        <a
          href={BRAND.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)] hover:scale-105 transition-transform"
        >
          <span className="absolute inset-0 rounded-full ring-2 ring-[#25D366]/40 animate-pulse-gold pointer-events-none opacity-70" />
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.825 9.825 0 001.519 5.252l-.999 3.648 3.753-.999zm5.644-14.221c-.4 0-1.047-.146-1.615.312-.566.457-2.158 2.123-2.158 5.179 0 3.056 2.232 5.965 2.546 6.373.314.408 4.4 6.733 10.796 9.12 5.263 1.967 6.336 1.575 7.476 1.475 1.14-.1 3.683-1.505 4.204-2.962.521-1.457.521-2.708.365-2.962-.157-.256-.573-.408-1.2-.713-.627-.305-3.683-1.818-4.256-2.027-.573-.21-.99-.314-1.405.314-.418.627-1.62 2.027-1.988 2.439-.366.41-.732.46-1.359.155-.627-.314-2.65-.978-5.044-3.116-1.864-1.662-3.122-3.717-3.488-4.344-.366-.627-.039-.966.275-1.27.283-.283.627-.731.942-1.098.313-.367.418-.627.627-1.045.21-.42.105-.781-.052-1.095-.156-.314-1.4-3.376-1.962-4.62z" />
          </svg>
        </a>
      </div>
    </>
  );
}

/* Cursor glow — desktop only, disabled on touch and reduced-motion */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hidden, setHidden] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const touch = window.matchMedia("(hover: none)").matches;
    // one-time touch detection — legitimate external-system sync
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(touch);
    if (touch) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    const onLeave = () => setHidden(true);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  if (reduce || isTouch || hidden) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[60] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 mix-blend-multiply"
      style={{
        left: pos.x,
        top: pos.y,
        background:
          "radial-gradient(circle, rgba(201,165,92,0.18) 0%, transparent 70%)",
        transition: "left 0.18s ease-out, top 0.18s ease-out",
      }}
    />
  );
}
