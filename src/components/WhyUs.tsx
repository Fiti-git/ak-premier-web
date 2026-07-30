'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const KEYS = ['vetted', 'insured', 'response', 'custom'] as const;

export default function WhyUs() {
  const t = useTranslations('why');

  return (
    <section className="section relative" aria-labelledby="why-title">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-3"
          >
            {t('eyebrow')}
          </motion.div>
          <motion.h2
            id="why-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl xs:text-4xl lg:text-5xl text-navy font-semibold tracking-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 aspect-[4/3] rounded-3xl overflow-hidden relative group"
          >
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-[8s] group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=1000&q=80')"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
          </motion.div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 sm:gap-5">
          {KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              className="card group"
            >
              <div className="relative w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center text-sm font-semibold mb-4 overflow-hidden">
                <span className="relative z-10">{String(i + 1).padStart(2, '0')}</span>
                <div className="absolute inset-0 bg-forest scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
              </div>
              <div className="font-display text-lg sm:text-xl text-navy font-semibold mb-1.5">
                {t(`items.${key}.title`)}
              </div>
              <p className="text-navy/65 text-sm leading-relaxed">
                {t(`items.${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
