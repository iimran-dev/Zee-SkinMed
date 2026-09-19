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
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.776.978-.951 1.178-.175.2-.351.225-.651.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.497-1.784-1.673-2.084-.175-.3-.019-.462.131-.611.136-.134.301-.35.451-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.926-2.23-.244-.585-.493-.506-.676-.515-.175-.009-.376-.01-.576-.01-.2 0-.526.075-.802.375-.276.3-1.052 1.028-1.052 2.508s1.077 2.908 1.228 3.109c.15.2 2.12 3.237 5.136 4.54.717.311 1.278.496 1.715.635.722.23 1.378.198 1.897.12.578-.088 1.78-.728 2.03-1.431.25-.703.25-1.305.175-1.431-.075-.125-.275-.2-.576-.35zm-5.467 7.502h-.008a10.04 10.04 0 0 1-5.12-1.408l-.367-.218-3.805.998 1.016-3.71-.239-.38a10.046 10.046 0 0 1-1.542-5.32c0-5.545 4.512-10.055 10.06-10.055 2.686 0 5.212 1.046 7.11 2.946a10.007 10.007 0 0 1 2.944 7.098c-.004 5.547-4.516 10.05-10.048 10.05zM12.005.002C5.385.002.012 5.378 0 12.001a11.94 11.94 0 0 0 1.841 6.397L.002 24l5.772-1.514a11.95 11.95 0 0 0 6.227 1.733h.004c6.623 0 11.996-5.376 12-12 0-3.208-1.25-6.224-3.52-8.496A11.927 11.927 0 0 0 12.005.002z" />
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
