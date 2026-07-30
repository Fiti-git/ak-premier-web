'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const ICONS = [
  // Door with bag
  <svg key="1" viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16M4 21h12M9 12h.01" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="17" cy="18" r="3" strokeLinejoin="round" />
  </svg>,
  // Truck
  <svg key="2" viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7M6 21a2 2 0 100-4 2 2 0 000 4zM18 21a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Dumpster
  <svg key="3" viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 8h18l-2 12H5L3 8zM3 8V5a2 2 0 012-2h14a2 2 0 012 2v3" strokeLinejoin="round" />
    <path d="M9 12v4M15 12v4" strokeLinecap="round" />
  </svg>,
  // Sparkle / check
  <svg key="4" viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z" strokeLinejoin="round" />
  </svg>
];

type Step = { title: string; desc: string };

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const steps = t.raw('steps') as Step[];

  return (
    <section className="section" aria-labelledby="how-title">
      <div className="container-x">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="eyebrow mb-3">
            {t('eyebrow')}
          </motion.div>
          <motion.h2 id="how-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display text-3xl xs:text-4xl lg:text-5xl text-navy font-semibold tracking-tight">
            {t('title')}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-4 text-navy/65 text-base sm:text-lg">
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative"
            >
              <div className="card h-full group">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-navy text-white flex items-center justify-center shadow-lg group-hover:bg-forest group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {ICONS[i]}
                  </div>
                  <div className="font-display text-4xl text-navy/10 font-bold leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="font-display text-lg sm:text-xl text-navy font-semibold mb-2">
                  {step.title}
                </div>
                <p className="text-navy/65 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-3 z-10 text-forest text-2xl">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
