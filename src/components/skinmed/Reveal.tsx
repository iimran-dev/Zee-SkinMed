"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

/**
 * Premium, bulletproof reveal-on-scroll wrapper.
 * Guarantees elements are NEVER stuck invisible if IntersectionObserver is throttled or during hash jumps.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isFallbackVisible, setIsFallbackVisible] = useState(false);

  useEffect(() => {
    // Safety check: if already inside or near viewport on mount (e.g. anchor navigation, reload)
    const checkInView = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
          setIsFallbackVisible(true);
        }
      }
    };

    checkInView();
    // Absolute fallback timer: never stay invisible longer than 1.2s after mount
    const timer = setTimeout(() => setIsFallbackVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isFallbackVisible ? { opacity: 1, y: 0 } : undefined}
      whileInView={!isFallbackVisible ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once, margin: "0px 0px -40px 0px", amount: 0.05 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container — apply to a parent and use RevealStaggerItem on children.
 */
export function RevealStagger({
  children,
  className,
  stagger = 0.1,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isFallbackVisible, setIsFallbackVisible] = useState(false);

  useEffect(() => {
    const checkInView = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
          setIsFallbackVisible(true);
        }
      }
    };

    checkInView();
    const timer = setTimeout(() => setIsFallbackVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isFallbackVisible ? "visible" : undefined}
      whileInView={!isFallbackVisible ? "visible" : undefined}
      viewport={{ once, margin: "0px 0px -40px 0px", amount: 0.05 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStaggerItem({
  children,
  className,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Image reveal — smooth, luxury entrance that never clips or stays invisible.
 */
export function MaskReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isFallbackVisible, setIsFallbackVisible] = useState(false);

  useEffect(() => {
    const checkInView = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
          setIsFallbackVisible(true);
        }
      }
    };

    checkInView();
    const timer = setTimeout(() => setIsFallbackVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={isFallbackVisible ? { opacity: 1, y: 0, scale: 1 } : undefined}
      whileInView={!isFallbackVisible ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, margin: "0px 0px -40px 0px", amount: 0.05 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
