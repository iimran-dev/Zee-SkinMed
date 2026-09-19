"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Container, Reveal } from "../primitives";
import { BRAND, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/skinmed/content";
import { CLINIC_LOCATION } from "@/lib/skinmed/content";
import { withBase } from "@/lib/skinmed/images";

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
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.776.978-.951 1.178-.175.2-.351.225-.651.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.497-1.784-1.673-2.084-.175-.3-.019-.462.131-.611.136-.134.301-.35.451-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.926-2.23-.244-.585-.493-.506-.676-.515-.175-.009-.376-.01-.576-.01-.2 0-.526.075-.802.375-.276.3-1.052 1.028-1.052 2.508s1.077 2.908 1.228 3.109c.15.2 2.12 3.237 5.136 4.54.717.311 1.278.496 1.715.635.722.23 1.378.198 1.897.12.578-.088 1.78-.728 2.03-1.431.25-.703.25-1.305.175-1.431-.075-.125-.275-.2-.576-.35zm-5.467 7.502h-.008a10.04 10.04 0 0 1-5.12-1.408l-.367-.218-3.805.998 1.016-3.71-.239-.38a10.046 10.046 0 0 1-1.542-5.32c0-5.545 4.512-10.055 10.06-10.055 2.686 0 5.212 1.046 7.11 2.946a10.007 10.007 0 0 1 2.944 7.098c-.004 5.547-4.516 10.05-10.048 10.05zM12.005.002C5.385.002.012 5.378 0 12.001a11.94 11.94 0 0 0 1.841 6.397L.002 24l5.772-1.514a11.95 11.95 0 0 0 6.227 1.733h.004c6.623 0 11.996-5.376 12-12 0-3.208-1.25-6.224-3.52-8.496A11.927 11.927 0 0 0 12.005.002z" />
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
              src={withBase("/skinmed-logo-dark.svg")}
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
