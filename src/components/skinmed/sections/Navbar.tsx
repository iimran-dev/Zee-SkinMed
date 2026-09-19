"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Container } from "../primitives";
import { BRAND, NAV_LINKS } from "@/lib/skinmed/content";
import { withBase } from "@/lib/skinmed/images";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("#home");
  const reduce = useReducedMotion();

  // Linear scroll spy: accurately tracks whichever section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // 1. Bottom of page lock
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (atBottom) {
        setActiveId("#contact");
        return;
      }

      // 2. Top of page lock
      if (window.scrollY < 120) {
        setActiveId("#home");
        return;
      }

      // 3. Linear section position check
      const sectionElements = NAV_LINKS.map((l) => ({
        href: l.href,
        el: document.querySelector(l.href) as HTMLElement | null,
      })).filter((item) => item.el !== null);

      const current = sectionElements.find(({ el }) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom > 140;
      });

      if (current) {
        setActiveId(current.href);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveId(href);

    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    } else {
      const target = document.querySelector(href);
      if (target) {
        const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 74;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      }
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-skinmed-ivory/95 backdrop-blur-md border-b border-skinmed-line/80 shadow-[0_4px_24px_-12px_rgba(23,23,23,0.12)]"
          : "bg-skinmed-ivory/85 backdrop-blur-md border-b border-skinmed-line/50 shadow-[0_2px_16px_-8px_rgba(23,23,23,0.06)]"
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4 md:h-[80px]">
        {/* Brand Logo */}
        <Link
          href="#home"
          onClick={(e) => handleNav(e, "#home")}
          aria-label="Dr Zee's SKINMED — Home"
          className="shrink-0 transition-opacity hover:opacity-90"
        >
          <Image
            src={withBase("/skinmed-logo.svg")}
            alt="Dr Zee's SKINMED — Luxury Dermatology Chennai"
            width={170}
            height={48}
            priority
            className="h-[34px] w-auto md:h-[40px]"
          />
        </Link>

        {/* Desktop Linear Navigation — Google Sans 500, 14–16px, slight letter spacing */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = activeId === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className={`group relative font-sans text-[13px] xl:text-[14px] font-medium tracking-[0.03em] transition-colors py-1 whitespace-nowrap ${
                  active ? "text-skinmed-gold font-semibold" : "text-skinmed-charcoal/80 hover:text-skinmed-gold"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-skinmed-gold transition-all duration-300 ${
                    active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={BRAND.phoneHref}
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-skinmed-charcoal hover:text-skinmed-gold transition-colors px-2 py-1 whitespace-nowrap"
          >
            <Phone className="h-3.5 w-3.5 text-skinmed-gold stroke-[2.5]" />
            <span>{BRAND.phoneDisplay}</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNav(e, "#contact")}
            className="btn-gold !px-4 sm:!px-5 !py-2.5 !text-xs !font-semibold tracking-wider whitespace-nowrap"
          >
            Book Consultation
          </a>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-skinmed-line text-skinmed-charcoal hover:bg-skinmed-beige transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
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
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-skinmed-line">
                <Image src={withBase("/skinmed-logo.svg")} alt="Dr Zee's SKINMED" width={140} height={36} className="h-[32px] w-auto" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-skinmed-line text-skinmed-charcoal hover:bg-skinmed-beige transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Linear Mobile Navigation Links */}
              <nav className="flex flex-col px-3 py-4 overflow-y-auto max-h-[calc(100vh-180px)]" aria-label="Mobile primary">
                {NAV_LINKS.map((link, i) => {
                  const active = activeId === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 + i * 0.03, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => handleNav(e, link.href)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-lg font-sans text-sm font-medium tracking-[0.03em] transition-all border-b border-skinmed-line/40 ${
                          active
                            ? "text-skinmed-gold bg-skinmed-gold/10 font-semibold"
                            : "text-skinmed-charcoal/85 hover:text-skinmed-gold hover:bg-white/60"
                        }`}
                      >
                        <span>{link.label}</span>
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-skinmed-gold" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto p-6 space-y-3 border-t border-skinmed-line bg-skinmed-ivory">
                <a
                  href={BRAND.phoneHref}
                  className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-skinmed-charcoal hover:text-skinmed-gold transition-colors"
                >
                  <Phone className="h-4 w-4 text-skinmed-gold" />
                  {BRAND.phoneDisplay}
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNav(e, "#contact")}
                  className="btn-gold w-full justify-center !text-xs !py-3 tracking-wider"
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
