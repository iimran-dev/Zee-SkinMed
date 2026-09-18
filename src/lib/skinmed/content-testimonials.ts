/* Testimonials content (kept separate for clarity) */

import { IMG } from "./images";

export const TRUST_STATS_LOCAL = [
  { value: "10,000+", label: "Patients Served" },
  { value: "4.7+", label: "Google Reviews" },
  { value: "12+", label: "Years Experience" },
] as const;

export const TESTIMONIALS_LOCAL = [
  {
    quote: "My skin feels healthier and I'm more confident now. Thank you Dr Zee!",
    name: "Patient — Acne Programme",
    treatment: "Acne & Scars",
    rating: 5,
    initials: "A.R.",
    image: IMG.patient1,
  },
  {
    quote: "The most considered, ethical dermatology I've experienced. Visible, natural results.",
    name: "Patient — Laser Resurfacing",
    treatment: "Laser Treatments",
    rating: 5,
    initials: "M.K.",
    image: IMG.patient2,
  },
  {
    quote: "Personalised, calm and genuinely effective. My pigmentation has visibly faded.",
    name: "Patient — Pigmentation Correction",
    treatment: "Pigmentation",
    rating: 5,
    initials: "S.N.",
    image: IMG.patient3,
  },
] as const;

