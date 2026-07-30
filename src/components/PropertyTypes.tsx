'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const KEYS = ['garden', 'midRise', 'highRise'] as const;

const ICONS: Record<(typeof KEYS)[number], React.ReactNode> = {
  garden: (
    // Small houses in row
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 20V10l3-3 3 3M8 20V13l3-3 3 3v7M16 20V11l3-3 3 3v9M2 20h20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  midRise: (
    // Medium building
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="6" width="14" height="15" strokeLinejoin="round" />
      <path d="M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2" strokeLinecap="round" />
      <path d="M12 21v-3" strokeLinecap="round" />
    </svg>
  ),
  highRise: (
    // Tall skyscraper
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="3" width="12" height="18" strokeLinejoin="round" />
      <path d="M9 7h2M13 7h2M9 10h2M13 10h2M9 13h2M13 13h2M9 16h2M13 16h2M9 19h6" strokeLinecap="round" />
    </svg>
  )
};

export default function PropertyTypes() {
  const t = useTranslations('propertyTypes');

  return (
    <section className="section bg-cream" aria-labelledby="proptypes-title">
      <div className="container-x">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="eyebrow mb-3">
            {t('eyebrow')}
          </motion.div>
          <motion.h2 id="proptypes-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display text-3xl xs:text-4xl lg:text-5xl text-navy font-semibold tracking-tight">
            {t('title')}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-4 text-navy/65 text-base sm:text-lg">
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              whileHover={{ y: -8 }}
              className="card h-full group relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(58,122,62,0.08), transparent 60%)'
                }}
              />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-navy text-white flex items-center justify-center mb-5 shadow-lg group-hover:bg-forest transition-colors">
                  {ICONS[key]}
                </div>
                <div className="font-display text-2xl text-navy font-semibold mb-2">
                  {t(`items.${key}.title`)}
                </div>
                <p className="text-navy/65 leading-relaxed">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
