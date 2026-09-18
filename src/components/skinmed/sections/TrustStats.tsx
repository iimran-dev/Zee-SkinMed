"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useInView } from "framer-motion";
import { Container, Eyebrow, Reveal } from "../primitives";
import { TRUST_STATS } from "@/lib/skinmed/content";

function Counter({
  to,
  decimals = 0,
  suffix = "",
  duration = 1800,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      // reduced-motion: show final value immediately
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVal(to);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  const formatted = val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

export function TrustStats() {
  return (
    <section className="relative bg-skinmed-beige py-16 md:py-20">
      <Container>
        <Reveal className="mb-10 flex flex-col items-center text-center">
          <Eyebrow center className="mb-4">
            Trusted by Chennai
          </Eyebrow>
          <p className="max-w-xl text-sm text-skinmed-text-muted leading-relaxed">
            A decade of considered, ethical dermatology — measured not in claims, but in
            the people who trust us with their skin.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-y-10 gap-x-4 md:grid-cols-4">
          {TRUST_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-serif text-[2.75rem] md:text-[3.25rem] leading-none text-skinmed-charcoal">
                <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </div>
              <div className="mt-3 inline-block text-[10px] uppercase tracking-[0.22em] text-skinmed-text-muted">
                <span className="block w-8 h-px bg-skinmed-gold mx-auto mb-3" />
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
