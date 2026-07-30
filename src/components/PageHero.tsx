'use client';

import { motion } from 'framer-motion';

export default function PageHero({
  eyebrow,
  title,
  subtitle
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="hero-gradient relative" aria-labelledby="page-hero-title">
      <div className="blob bg-forest absolute" style={{ width: 400, height: 400, top: '-100px', right: '-100px', opacity: 0.2 }} />
      <div className="container-x pt-20 pb-14 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20 max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-3"
        >
          {eyebrow}
        </motion.div>
        <motion.h1
          id="page-hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display text-navy text-[2rem] leading-[1.1] xs:text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-5 text-base sm:text-lg text-navy/70 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
