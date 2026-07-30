'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function CTA() {
  const t = useTranslations('cta');
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-forest to-forest-700 text-white px-6 py-14 sm:px-8 sm:py-16 lg:px-16 lg:py-20"
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #fff 0, transparent 70%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
          <motion.div
            className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #1B2C5C 0, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            aria-hidden
          />

          <div className="relative max-w-2xl">
            <h2
              id="cta-title"
              className="font-display text-3xl xs:text-4xl lg:text-5xl font-semibold tracking-tight"
            >
              {t('title')}
            </h2>
            <p className="mt-4 text-white/85 text-base sm:text-lg">{t('subtitle')}</p>
            <div className="mt-8">
              <Link
                href="/quote"
                className="btn inline-flex items-center gap-2 bg-white text-forest-700 hover:bg-cream hover:text-forest-900 group"
              >
                <span>{t('button')}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
