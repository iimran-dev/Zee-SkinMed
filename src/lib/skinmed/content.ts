/* ============================================================
   Dr Zee's SKINMED — Brand content & site configuration
   Single source of truth for editorial copy.
   ============================================================ */

import { IMG } from "./images";

export const BRAND = {
  name: "Dr Zee's SKINMED",
  doctorShort: "Dr Zee",
  doctorFull: "Dr. Zeenath Begum",
  doctorCredentials: "MBBS, MD – Dermatology & Cosmetology",
  phoneDisplay: "+91 98948 66224",
  phoneHref: "tel:+919894866224",
  whatsappHref: "https://wa.me/919894866224",
  email: "care@drzeeskinned.com",
  city: "Chennai",
  rating: "4.7+",
  patients: "10,000+",
  years: "12+",
  procedures: "100+",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Skin Concerns", href: "#ai-analysis" },
  { label: "Results", href: "#results" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO_STATS = [
  { value: "10,000+", label: "Happy Patients" },
  { value: "4.7+", label: "Google Rating" },
  { value: "12+", label: "Years Experience" },
  { value: "100+", label: "Advanced Procedures" },
] as const;

export const TRUST_STATS = [
  { value: 10000, suffix: "+", label: "Happy Patients" },
  { value: 4.7, suffix: "+", label: "Google Rating", decimals: 1 },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Advanced Procedures" },
] as const;

export const DOCTOR_CREDENTIALS = [
  "Specialized in Medical, Cosmetic & Laser Dermatology",
  "Patient-first, ethical approach to long-term skin health",
  "Trusted by 10,000+ happy patients across South India",
  "Focused on natural-looking, sustainable results",
] as const;

export type Treatment = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  alt: string;
};

export const TREATMENTS: Treatment[] = [
  {
    id: "acne",
    title: "Acne & Acne Scars",
    blurb:
      "Targeted medical and laser protocols that calm active acne and soften post-acne marks.",
    image: IMG.acne,
    alt: "Close-up of clear, healthy facial skin",
  },
  {
    id: "laser",
    title: "Laser Treatments",
    blurb:
      "FDA-approved laser technology for resurfacing, scar revision and even-toned skin.",
    image: IMG.laser,
    alt: "Aesthetic laser treatment in progress",
  },
  {
    id: "pigmentation",
    title: "Pigmentation Correction",
    blurb:
      "Personalised plans for melasma, dark spots and uneven tone — gentle yet effective.",
    image: IMG.pigmentation,
    alt: "Bright, even-toned complexion",
  },
  {
    id: "hair",
    title: "Hair Restoration",
    blurb:
      "Clinically proven therapies for thinning hair, scalp health and regrowth.",
    image: IMG.hair,
    alt: "Healthy, full hair",
  },
  {
    id: "anti-aging",
    title: "Anti-Aging Solutions",
    blurb:
      "Refined aesthetic medicine that preserves natural expression while restoring volume.",
    image: IMG.antiaging,
    alt: "Smooth, youthful mature skin",
  },
  {
    id: "rejuvenation",
    title: "Skin Rejuvenation",
    blurb:
      "Hydrafacials, peels and medical facials designed for visible glow and long-term skin health.",
    image: IMG.rejuvenation,
    alt: "Glowing, rejuvenated facial skin",
  },
];

export const ADVANCED_CARE_FEATURES = [
  {
    title: "FDA Approved Technologies",
    description:
      "Every device in our clinic is internationally certified and clinically validated.",
  },
  {
    title: "Safe & Proven Procedures",
    description:
      "Treatment protocols refined over 12+ years with patient safety at the core.",
  },
  {
    title: "Personalized Treatment Plans",
    description:
      "No two skins are alike — your protocol is designed around your skin's unique needs.",
  },
  {
    title: "Natural Looking Results",
    description:
      "Subtle, graceful outcomes that preserve your character and expression.",
  },
] as const;

export type SkinConcern = {
  id: string;
  label: string;
  description: string;
  x: number; // % horizontal position
  y: number; // % vertical position
};

export const SKIN_CONCERNS: SkinConcern[] = [
  {
    id: "acne",
    label: "Acne",
    description:
      "Inflammatory and comedonal breakouts often linked to sebum, hormones or barrier imbalance.",
    x: 38,
    y: 56,
  },
  {
    id: "pigmentation",
    label: "Pigmentation",
    description:
      "Patches of uneven melanin — melasma, post-inflammatory spots and sun-induced tone shifts.",
    x: 60,
    y: 50,
  },
  {
    id: "dark-spots",
    label: "Dark Spots",
    description:
      "Localised hyperpigmentation from sun exposure, blemishes or ageing.",
    x: 30,
    y: 42,
  },
  {
    id: "wrinkles",
    label: "Wrinkles",
    description:
      "Fine lines and deeper folds from collagen loss, repeated movement and time.",
    x: 66,
    y: 32,
  },
  {
    id: "uneven-tone",
    label: "Uneven Tone",
    description:
      "Texture and tone irregularities that dull the skin's natural radiance.",
    x: 48,
    y: 70,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "My skin feels healthier and I'm more confident now. Thank you Dr Zee!",
    name: "Patient — Acne Programme",
    treatment: "Acne & Scars",
    rating: 5,
    initials: "A.R.",
  },
  {
    quote:
      "The most considered, ethical dermatology I've experienced. Visible, natural results.",
    name: "Patient — Laser Resurfacing",
    treatment: "Laser Treatments",
    rating: 5,
    initials: "M.K.",
  },
  {
    quote:
      "Personalised, calm and genuinely effective. My pigmentation has visibly faded.",
    name: "Patient — Pigmentation Correction",
    treatment: "Pigmentation",
    rating: 5,
    initials: "S.N.",
  },
];

export const FAQS = [
  {
    q: "Does acne return after treatment?",
    a: "Acne is a chronic condition, but with a structured medical protocol and the right home care, recurrence can be minimised significantly. Dr Zee designs long-term maintenance plans tailored to your skin's triggers.",
  },
  {
    q: "How many laser sessions are needed?",
    a: "Most laser programmes require 4–8 sessions spaced a few weeks apart, depending on the concern, skin type and the technology used. A precise plan is shared after your consultation.",
  },
  {
    q: "Is hair treatment permanent?",
    a: "Medical hair restoration can significantly slow thinning and stimulate regrowth, though maintenance sessions may be recommended. Results are reviewed at defined milestones throughout your journey.",
  },
  {
    q: "What is the consultation process?",
    a: "Each consultation begins with a detailed skin and history analysis, followed by an honest conversation about realistic outcomes and a personalised plan. Nothing is rushed — clarity and ethics come first.",
  },
  {
    q: "Is there any downtime after treatment?",
    a: "Most procedures are lunchtime treatments with little to no downtime. A small number of advanced protocols may require 1–3 days of gentle recovery, which is always communicated upfront.",
  },
];

export const CLINIC_LOCATION = {
  addressLines: ["Dr Zee's SKINMED", "T. Nagar, Chennai", "Tamil Nadu 600017, India"],
  hours: [
    { day: "Mon – Fri", time: "10:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 6:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  phoneDisplay: "+91 98948 66224",
  phoneHref: "tel:+919894866224",
  directionsHref: "https://www.google.com/maps/search/?api=1&query=T+Nagar+Chennai+Dermatology",
} as const;

export const FINAL_CTA_BENEFITS = [
  "Expert Care",
  "Advanced Technology",
  "Personalized Treatment",
  "Visible Results",
] as const;

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About Dr Zee", href: "#about" },
    { label: "Treatments", href: "#treatments" },
    { label: "Patient Stories", href: "#testimonials" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
  ourTreatments: [
    { label: "Acne & Scars", href: "#treatments" },
    { label: "Pigmentation", href: "#treatments" },
    { label: "Hair Restoration", href: "#treatments" },
    { label: "Anti-Aging", href: "#treatments" },
    { label: "Laser Treatments", href: "#treatments" },
    { label: "Skin Rejuvenation", href: "#treatments" },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "WhatsApp", href: "https://wa.me/919894866224" },
] as const;
