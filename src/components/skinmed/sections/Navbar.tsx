"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Container } from "../primitives";
import { BRAND, NAV_LINKS } from "@/lib/skinmed/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("#home");
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth anchor scrolling + active section tracking
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(`#${visible[0].target.id}`);
      },
      { rootMargin: "-40% 0% -55% 0%", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-skinmed-ivory/85 backdrop-blur-md border-b border-skinmed-line/70 shadow-[0_4px_24px_-12px_rgba(23,23,23,0.12)]"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4 md:h-[80px]">
        {/* Logo */}
        <Link
          href="#home"
          onClick={(e) => handleNav(e, "#home")}
          aria-label="Dr Zee's SKINMED — Home"
          className="shrink-0"
        >
          <Image
            src="/skinmed-logo.svg"
            alt="Dr Zee's SKINMED — Luxury Dermatology Chennai"
            width={170}
            height={48}
            priority
            className="h-[34px] w-auto md:h-[40px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = activeId === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="group relative text-[11px] font-medium uppercase tracking-[0.18em] text-skinmed-charcoal/85 transition-colors hover:text-skinmed-charcoal"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-skinmed-gold transition-all duration-500 ${
                    active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 md:gap-4">
          <a
            href={BRAND.phoneHref}
            className="hidden md:inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-skinmed-charcoal/80 hover:text-skinmed-gold transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-skinmed-gold" />
            {BRAND.phoneDisplay}
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "#contact")}
            className="btn-gold !px-5 !py-3 !text-[10px]"
          >
            Book Consultation
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-skinmed-line text-skinmed-charcoal hover:bg-skinmed-beige transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-skinmed-charcoal/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-y-0 right-0 z-50 w-[88%] max-w-sm bg-skinmed-ivory shadow-2xl lg:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-skinmed-line">
                <Image src="/skinmed-logo.svg" alt="" width={140} height={36} className="h-[32px] w-auto" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-skinmed-line"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col px-2 py-4" aria-label="Mobile primary">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNav(e, link.href)}
                      className="block px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-skinmed-charcoal/90 hover:text-skinmed-gold transition-colors border-b border-skinmed-line/60"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto p-6 space-y-3 border-t border-skinmed-line">
                <a
                  href={BRAND.phoneHref}
                  className="flex items-center gap-3 text-sm font-medium text-skinmed-charcoal"
                >
                  <Phone className="h-4 w-4 text-skinmed-gold" />
                  {BRAND.phoneDisplay}
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNav(e, "#contact")}
                  className="btn-gold w-full justify-center"
                >
                  Book Consultation
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
