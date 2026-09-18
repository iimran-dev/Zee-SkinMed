import { clsx } from "clsx";
import type { ReactNode } from "react";

// Re-export animation primitives so all shared UI comes from one module
export {
  Reveal,
  RevealStagger,
  RevealStaggerItem,
  MaskReveal,
} from "./Reveal";

/* ============================================================
   Dr Zee's SKINMED — Shared layout primitives
   ============================================================ */

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("skinmed-container", className)}>{children}</div>;
}

export function Eyebrow({
  children,
  className,
  center = false,
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <span className={clsx("eyebrow", center && "eyebrow-center", className)}>{children}</span>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={clsx("section-heading text-balance", className)}>{children}</h2>;
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={clsx("relative w-full", className)}>
      {children}
    </section>
  );
}

/* Decorative botanical line-art corner — purely ornamental */
export function BotanicalCorner({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={clsx("pointer-events-none absolute text-skinmed-gold/25", className)}
      style={{
        width: "200px",
        height: "200px",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M20 180 C 40 140, 60 100, 100 80 C 80 110, 75 150, 90 180" />
      <path d="M100 80 C 110 60, 130 50, 160 50" />
      <path d="M105 95 C 120 85, 140 85, 155 95" />
      <path d="M110 110 C 125 105, 145 110, 158 120" />
      <ellipse cx="160" cy="50" rx="10" ry="4" transform="rotate(-30 160 50)" />
      <ellipse cx="155" cy="95" rx="10" ry="4" transform="rotate(-15 155 95)" />
      <ellipse cx="158" cy="120" rx="10" ry="4" />
      <ellipse cx="100" cy="80" rx="6" ry="3" transform="rotate(45 100 80)" />
      <ellipse cx="90" cy="180" rx="8" ry="3" />
    </svg>
  );
}

/* Arrow used in buttons */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx("h-3.5 w-3.5", className)}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
