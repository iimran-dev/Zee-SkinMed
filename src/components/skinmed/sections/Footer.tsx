"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Container, Reveal } from "../primitives";
import { BRAND, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/skinmed/content";
import { CLINIC_LOCATION } from "@/lib/skinmed/content";

function getSocialIcon(label: string) {
  switch (label.toLowerCase()) {
    case "instagram":
      return <Instagram className="h-4 w-4" />;
    case "facebook":
      return <Facebook className="h-4 w-4" />;
    case "youtube":
      return <Youtube className="h-4 w-4" />;
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative bg-skinmed-charcoal text-skinmed-ivory">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-skinmed-gold/60 to-transparent" />
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="md:col-span-4">
            <Image
              src="/skinmed-logo-dark.svg"
              alt="Dr Zee's SKINMED"
              width={170}
              height={48}
              className="h-[36px] w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-skinmed-ivory/65">
              Luxury dermatology & aesthetics in Chennai — Expert care, advanced technology,
              visible results.
            </p>

            <form onSubmit={onSubmit} className="mt-7 max-w-sm" aria-label="Newsletter signup">
              <label
                htmlFor="newsletter-email"
                className="text-[10px] uppercase tracking-[0.22em] text-skinmed-ivory/55"
              >
                Get skincare tips, updates &amp; offers
              </label>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-skinmed-ivory/25 bg-skinmed-charcoal-soft/60 p-1.5 pl-4 focus-within:border-skinmed-gold/70 transition-colors">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-skinmed-ivory placeholder:text-skinmed-ivory/40 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-skinmed-gold text-skinmed-charcoal transition-transform hover:scale-105"
                >
                  <ArrowRight />
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-[11px] text-skinmed-gold">
                  Thank you — please confirm via your inbox.
                </p>
              )}
            </form>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.22em] text-skinmed-gold mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-skinmed-ivory/75 hover:text-skinmed-gold transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Treatments */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.22em] text-skinmed-gold mb-5">
              Our Treatments
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.ourTreatments.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-skinmed-ivory/75 hover:text-skinmed-gold transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Follow */}
          <div className="md:col-span-4">
            <h3 className="text-[10px] uppercase tracking-[0.22em] text-skinmed-gold mb-5">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-skinmed-ivory/75">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-skinmed-gold" />
                <span>
                  {CLINIC_LOCATION.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <a
                  href={BRAND.phoneHref}
                  className="flex items-center gap-3 hover:text-skinmed-gold transition-colors"
                >
                  <Phone className="h-4 w-4 text-skinmed-gold" />
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 hover:text-skinmed-gold transition-colors"
                >
                  <Mail className="h-4 w-4 text-skinmed-gold" />
                  {BRAND.email}
                </a>
              </li>
            </ul>

            <div className="mt-7">
              <h4 className="text-[10px] uppercase tracking-[0.22em] text-skinmed-gold mb-4">
                Follow Us
              </h4>
              <ul className="flex flex-wrap items-center gap-2.5">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={`Follow Dr Zee's SKINMED on ${s.label}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-skinmed-ivory/20 text-skinmed-ivory/80 hover:border-skinmed-gold hover:text-skinmed-gold hover:bg-skinmed-gold/10 transition-all duration-300 group"
                    >
                      {getSocialIcon(s.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom legal */}
        <div className="mt-14 pt-6 border-t border-skinmed-ivory/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-skinmed-ivory/55">
            © 2026 Dr Zee&apos;s SKINMED. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-skinmed-ivory/55">
            <a href="#" className="hover:text-skinmed-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-skinmed-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-skinmed-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
