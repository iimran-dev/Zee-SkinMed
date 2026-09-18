/* ============================================================
   Dr Zee's SKINMED — Curated Unsplash Image Library
   Centralized collection of high-resolution Unsplash images
   used across the website.
   Source: unsplash.com / images.unsplash.com
   ============================================================ */

export interface HeroVariant {
  id: number;
  src: string;
  alt: string;
  tag: string;
}

export const IMG = {
  // --- Hero Section ---
  hero: "/images/hero-skin-bg.jpg",
  heroAlt: "Close-up of a woman's face with natural freckles and glowing skin — Dr Zee's SKINMED",


  // --- Doctor Section ---
  doctor: "/",
  doctorAlt: "Portrait of Dr. Zeenath Begum, Consultant Dermatologist & Cosmetologist",

  // --- Signature Treatments ---
  acne: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=800&q=80",
  laser: "https://plus.unsplash.com/premium_photo-1661645623435-41d9869758d9?auto=format&fit=crop&w=800&q=80",
  pigmentation: "https://images.unsplash.com/photo-1670201203208-055d6d79db4a?auto=format&fit=crop&w=800&q=80",
  hair: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  antiaging: "https://plus.unsplash.com/premium_photo-1683134305973-81c0011aeb65?auto=format&fit=crop&w=800&q=80",
  rejuvenation: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",

  // --- Advanced Care & Clinic Story ---
  advancedCare: "https://plus.unsplash.com/premium_photo-1661478253345-41d1351f68ae?auto=format&fit=crop&w=1000&q=85",

  // --- Results / Before & After Interactive Slider ---
  before: "https://images.unsplash.com/photo-1730288951113-9cc087c14b83?auto=format&fit=crop&w=900&q=80",
  after: "https://images.unsplash.com/photo-1728727187824-85f1c610a671?auto=format&fit=crop&w=900&q=80",

  // --- AI Skin Analysis Diagnostic Visual ---
  aiFace: "https://plus.unsplash.com/premium_photo-1682096427238-8b2a0490258a?auto=format&fit=crop&w=1000&q=85",

  // --- Clinic Architecture & Treatment Suites ---
  reception: "https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?auto=format&fit=crop&w=1000&q=80",
  treatmentRoom: "https://plus.unsplash.com/premium_photo-1661573165720-be5678d18bcb?auto=format&fit=crop&w=800&q=80",
  consult: "https://plus.unsplash.com/premium_photo-1661507017003-aa8d782df482?auto=format&fit=crop&w=800&q=80",
  equipment: "https://plus.unsplash.com/premium_photo-1661573297404-d558c113a7d8?auto=format&fit=crop&w=1000&q=80",
  studio: "https://images.unsplash.com/photo-1505410603994-c3ac6269711f?auto=format&fit=crop&w=800&q=80",

  // --- Patient Testimonials ---
  patient1: "https://plus.unsplash.com/premium_photo-1664888035613-a6c75aa15b01?auto=format&fit=crop&w=800&q=80",
  patient2: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  patient3: "https://plus.unsplash.com/premium_photo-1677368597077-009727e906db?auto=format&fit=crop&w=800&q=80",

  // --- Final Consultation CTA ---
  finalCta: "https://plus.unsplash.com/premium_photo-1671717725651-cccb2edc119d?auto=format&fit=crop&w=1600&q=85",
} as const;

export default IMG;
